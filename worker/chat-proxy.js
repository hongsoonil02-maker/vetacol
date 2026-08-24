/**
 * Agrokorea 제품 랜딩 공용 AI 상담 프록시 — Cloudflare Worker
 *
 * 하나의 워커가 4개 제품 사이트(베타콜·파보겔·몬스멕타·로타갈)의 챗봇을 모두 처리한다.
 * API 키는 이 워커의 환경변수(시크릿)에만 존재하며 클라이언트 번들에는 포함되지 않는다.
 *
 * 요청: POST { product: 'vetacol'|'parvogel'|'monsmecta'|'rotagal', message: string }
 * 응답: { reply: string }
 *
 * 배포(대시보드 방식):
 *   1. Workers & Pages > Create > Worker > 본 파일 전체 붙여넣기 > Deploy
 *   2. Settings > Variables and Secrets > Add Secret > OPENAI_API_KEY = 새 OpenAI 키
 *      (선택) ALLOWED_ORIGIN = 추가 허용 오리진(CSV)
 *   3. 배포된 주소 확인: https://<이름>.<계정>.workers.dev/api/chat
 *
 * 배포(CLI 방식): 저장소 루트에서 npx wrangler deploy && npx wrangler secret put OPENAI_API_KEY
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/chat') {
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

    if (!env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return json({ error: 'Chat service is not configured' }, 500, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, corsHeaders);
    }

    const systemPrompt = PRODUCT_PROMPTS[body?.product] || PRODUCT_PROMPTS.vetacol;
    const message = String(body?.message || '').trim().slice(0, MAX_MESSAGE_LENGTH);
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
};
