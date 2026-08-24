# vetacol-landing

베타콜(Vetacol) 랜딩페이지 — React 19 + Vite + Tailwind CSS 4. GitHub Pages로 배포됩니다.

## 개발

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (dist/)
npm run lint     # oxlint
```

## AI 채팅봇 구성 (보안)

브라우저는 OpenAI를 직접 호출하지 않습니다. API 키가 클라이언트 번들에 노출되는 것을 막기 위해
키 없는 서버리스 프록시(`api/chat.js`)만 호출합니다.

```
[브라우저] --POST {message}--> [프록시 /api/chat] --Authorization: Bearer $OPENAI_API_KEY--> [OpenAI]
```

### 설정 방법 (Vercel)

1. 이 저장소를 Vercel에 import하면 `api/chat.js`가 자동으로 `/api/chat` 엔드포인트로 배포됩니다.
2. Vercel 프로젝트 Settings → Environment Variables에 등록:
   - `OPENAI_API_KEY`: OpenAI 비밀 키 (서버 전용, 절대 `VITE_` 접두사 붙이지 말 것)
   - `ALLOWED_ORIGIN`(선택): 추가 허용 오리진(CSV). 기본값은 `https://hongsoonil02-maker.github.io`만 허용하며,
     Origin 헤더가 없거나 목록에 없는 요청은 403으로 차단됩니다.
   - 남용 방지를 위해 IP당 5분 10회의 인메모리 레이트리밋이 기본 적용됩니다.
3. GitHub Pages 정적 사이트에서 채팅을 쓰려면 `.env`에 프록시 전체 URL 지정:
   ```
   VITE_CHAT_API_URL=https://<your-vercel-app>.vercel.app/api/chat
   ```

> **⚠️ 키 유출 조치**: 과거 버전은 클라이언트에 `VITE_OPENAI_API_KEY`를 포함했습니다.
> 해당 키는 이미 공개 번들에 노출된 것이므로 [platform.openai.com](https://platform.openai.com/api-keys)에서
> 반드시 폐기(revoke)하고 새 키를 발급해 프록시 환경변수에만 설정하세요.
