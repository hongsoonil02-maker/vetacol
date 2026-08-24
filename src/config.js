/**
 * AI 채팅 프록시 설정
 * - 공용 Cloudflare Worker(worker/chat-proxy.js)를 4개 제품 사이트가 함께 사용한다.
 * - API 키는 절대 클라이언트 번들에 포함하지 않는다. 키는 워커 시크릿(OPENAI_API_KEY)에만 둔다.
 * - 워커 주소가 바뀌면 아래 기본값 또는 .env의 VITE_CHAT_API_URL을 수정한다.
 */

export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL
    || 'https://vetacol.hongsoonil02.workers.dev/api/chat';

