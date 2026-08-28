/**
 * Agrokorea 제품 랜딩 공용 AI 상담 + 문의 접수 프록시 — Cloudflare Worker
 *
 * 하나의 워커가 4개 제품 사이트(베타콜·파보겔·몬스멕타·로타갈)의 챗봇과
 * 문의 폼 접수를 모두 처리한다.
 * API 키/웹훅 URL은 이 워커의 환경변수(시크릿)에만 존재하며 클라이언트 번들에는 포함되지 않는다.
 *
 * 엔드포인트:
 *   POST /api/chat     { product, message }              -> { reply }
 *   POST /api/inquiry  { name, phone, region, ... }       -> { ok: true }
 *
 * 배포(대시보드 방식):
 *   1. Workers & Pages > 해당 Worker > Edit code > 본 파일 전체 붙여넣기 > Deploy
 *   2. Settings > Variables and Secrets > Add Secret
 *        - OPENAI_API_KEY      = OpenAI 키 (챗봇용)
 *        - INQUIRY_WEBHOOK_URL = 문의 전달용 웹훅 URL (Slack/Discord Incoming Webhook 또는 Google Apps Script)
 *        - (선택) ALLOWED_ORIGIN = 추가 허용 오리진(CSV)
 *   3. 배포 주소: https://<이름>.<계정>.workers.dev/api/chat , /api/inquiry
 *
 * 배포(CLI 방식): 저장소 루트에서
 *   npx wrangler deploy
 *   npx wrangler secret put OPENAI_API_KEY
 *   npx wrangler secret put INQUIRY_WEBHOOK_URL
 */

const DEFAULT_ORIGINS = [
  'https://hongsoonil02-maker.github.io',
  'https://parvogel.kr', 'https://www.parvogel.kr',
  'https://rotagal.kr', 'https://www.rotagal.kr',
  'https://monsmecta.kr', 'https://www.monsmecta.kr',
  'https://vetacol.kr', 'https://www.vetacol.kr'
];

const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 10;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, entry] of hits) {
      if (now > entry.resetAt) hits.delete(key);
    }
  }
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

const MAX_MESSAGE_LENGTH = 1000;

const COMMON_RULES = `
Provide practical advice based on veterinary evidence. Keep answers concise (2-3 sentences).
Do not provide illegal or harmful instructions. Mention that serious cases require a veterinarian.
CRITICAL - Language matching: reply in the SAME language as the user's message (한국어/English/Français etc.).`;

const PRODUCT_PROMPTS = {
  vetacol: `You are a professional veterinary AI counselor for Vetacol (베타콜), a French calf colostrum immune nutrition supplement by VETALIS, imported by Agrokorea.
Answer questions about calf diarrhea prevention, colostrum golden time, Vetacol 15ml syringe feeding methods, storage, and ingredients.${COMMON_RULES}`,
  parvogel: `You are a professional veterinary assistant for Parvogel (파보겔), an Agrokorea livestock product for neonatal calf diarrhea care.
Rules: 1) Give safe, practical, concise guidance. 2) Ask for age, weight, and symptom duration when missing.${COMMON_RULES}`,
  monsmecta: `You are a professional veterinary assistant for Monsmecta (몬스멕타), an Agrokorea livestock feed supplement product.
Answer questions about usage, dosage, benefits, storage, and composition.${COMMON_RULES}`,
  rotagal: `You are a professional veterinary assistant for Rotagal (로타갈), an Agrokorea livestock product.
Answer questions about usage, dosage timing, expiry, benefits, and storage.${COMMON_RULES}`
};

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra }
  });
}

function getAllowedOrigins(env) {
  return new Set(
    [
      ...(env.ALLOWED_ORIGIN ? env.ALLOWED_ORIGIN.split(',') : []),
      ...DEFAULT_ORIGINS
    ]
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

function clean(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

async function handleChat(body, env, corsHeaders) {
  if (!env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not configured');
    return json({ error: 'Chat service is not configured' }, 500, corsHeaders);
  }

  const systemPrompt = PRODUCT_PROMPTS[body?.product] || PRODUCT_PROMPTS.vetacol;
  const message = clean(body?.message, MAX_MESSAGE_LENGTH);
  if (!message) {
    return json({ error: 'message is required' }, 400, corsHeaders);
  }

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!upstream.ok) {
      console.error(`OpenAI API error: ${upstream.status}`);
      return json({ error: 'Upstream API error' }, 502, corsHeaders);
    }

    const data = await upstream.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return json({ error: 'Empty response from upstream' }, 502, corsHeaders);
    }
    return json({ reply }, 200, corsHeaders);
  } catch (err) {
    console.error('Chat proxy error:', err);
    return json({ error: 'Internal error' }, 500, corsHeaders);
  }
}

const PRODUCT_LABELS = {
  vetacol: '베타콜',
  parvogel: '파보겔',
  monsmecta: '몬스멕타',
  rotagal: '로타갈'
};

async function handleInquiry(body, env, corsHeaders) {
  const name = clean(body?.name, 100);
  const phone = clean(body?.phone, 40);
  const region = clean(body?.region, 100);
  const farmSize = clean(body?.farmSize, 100);
  const inquiry = clean(body?.inquiry, MAX_MESSAGE_LENGTH);
  const language = clean(body?.language, 10);
  const product = clean(body?.product, 40) || 'rotagal';
  const productLabel = PRODUCT_LABELS[product] || product;

  const distSrc = body?.distributor && typeof body.distributor === 'object' ? body.distributor : null;
  const distributor = distSrc ? {
    region: clean(distSrc.region, 100),
    name: clean(distSrc.name, 150),
    rep: clean(distSrc.rep, 100),
    tel: clean(distSrc.tel, 40),
    phone: clean(distSrc.phone, 40)
  } : null;

  if (!name || !phone || !region) {
    return json({ error: 'name, phone, region are required' }, 400, corsHeaders);
  }

  const webhook = env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.error('INQUIRY_WEBHOOK_URL is not configured');
    return json({ error: 'Inquiry service is not configured' }, 500, corsHeaders);
  }

  const submittedAt = new Date().toISOString();
  const distText = distributor
    ? `${distributor.region || '-'} / ${distributor.name || '-'} / ${distributor.rep || '-'} / ${distributor.phone || '-'}`
    : '(미배정)';

  const summary = [
    `📩 ${productLabel} 신규 문의`,
    `• 이름: ${name}`,
    `• 연락처: ${phone}`,
    `• 지역: ${region}`,
    `• 사육두수: ${farmSize || '-'}`,
    `• 문의내용: ${inquiry || '-'}`,
    `• 담당 총판: ${distText}`,
    `• 언어: ${language || '-'}`,
    `• 접수시각: ${submittedAt}`
  ].join('\n');

  const payload = {
    text: summary,
    content: summary,
    inquiry: { product, name, phone, region, farmSize, inquiry, language, distributor, submittedAt }
  };

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error(`Inquiry webhook error: ${res.status}`);
      return json({ error: 'Failed to deliver inquiry' }, 502, corsHeaders);
    }
    return json({ ok: true }, 200, corsHeaders);
  } catch (err) {
    console.error('Inquiry forward error:', err);
    return json({ error: 'Internal error' }, 500, corsHeaders);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isChat = url.pathname === '/api/chat';
    const isInquiry = url.pathname === '/api/inquiry';
    if (!isChat && !isInquiry) {
      return json({ error: 'Not found' }, 404);
    }

    const origin = request.headers.get('Origin');
    if (!origin || !getAllowedOrigins(env).has(origin)) {
      return json({ error: 'Forbidden' }, 403);
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return json({ error: 'Too many requests' }, 429, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, corsHeaders);
    }

    if (isInquiry) {
      return handleInquiry(body, env, corsHeaders);
    }
    return handleChat(body, env, corsHeaders);
  }
};
