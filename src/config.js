/**
 * OpenAI API 설정
 * - Vite 환경에서는 import.meta.env를 사용
 * - .env 파일은 프로젝트 루트에 위치해야 함 (VITE_ 접두사 필요)
 */

export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
export const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';