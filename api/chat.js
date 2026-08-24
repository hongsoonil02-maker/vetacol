/**
 * AI 채팅 서버리스 프록시 (Vercel Node Function, ESM)
 *
 * 배포 방법:
 *   1. 이 저장소를 Vercel로 import
 *   2. Vercel 프로젝트 Settings > Environment Variables에 OPENAI_API_KEY 등록
 *      (GitHub Pages 정적 배포와 별개로, 이 함수 경로를 CHAT_API_URL로 사용)
 *   3. 또는 Cloudflare Worker 등 동일 역할 프록시를 직접 배포 후
 *      .env의 VITE_CHAT_API_URL에 해당 URL 지정
 *
 * 요청: POST { message: string }
 * 응답: { reply: string }
 */

const DEFAULT_ORIGINS = ['https://hongsoonil02-maker.github.io'];

const allowedOrigins = new Set(
  [
    ...(process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : []),
    ...DEFAULT_ORIGINS
  ]
    .map((s) => s.trim())
    .filter(Boolean)
);

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

const SYSTEM_PROMPT = `You are a professional veterinary AI counselor for Vetacol (VETACOL), a calf colostrum immune nutrition supplement.
Answer questions about calf diarrhea prevention, Vetacol feeding methods, product storage, and ingredient explanations professionally.
Provide practical advice based on veterinary evidence. Keep answers concise (2-3 sentences).

CRITICAL - Language matching: You MUST respond in the SAME language as the user's question.
- 한국어 질문 → 한국어로 답변하세요.
- English question → Answer in English.
- Question en français → Répondez en français.
- Always detect the question's language and reply in that exact language.`;

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (!origin || !allowedOrigins.has(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not configured');
    return res.status(500).json({ error: 'Chat service is not configured' });
  }

  const message = String(req.body?.message || '').trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      return res.status(502).json({ error: 'Upstream API error' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(502).json({ error: 'Empty response from upstream' });
    }
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat proxy error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
