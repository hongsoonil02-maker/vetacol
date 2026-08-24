/**
 * AI 채팅 프록시 설정
 * - API 키는 절대 클라이언트 번들에 포함하지 않는다.
 * - 브라우저는 키 없는 서버리스 프록시(/api/chat)만 호출하고,
 *   키는 프록시 실행 환경(Vercel/Cloudflare 등)의 환경변수에서 주입한다.
 * - .env의 VITE_CHAT_API_URL로 프록시 주소를 변경할 수 있다.
 */

export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
