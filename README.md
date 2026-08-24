# vetacol-landing

베타콜(Vetacol) 랜딩페이지 — React 19 + Vite + Tailwind CSS 4. GitHub Actions로 GitHub Pages 배포됩니다.

## 개발

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (dist/)
npm run lint     # oxlint
```

## AI 채팅봇 구성 (보안)

브라우저는 OpenAI를 직접 호출하지 않습니다. API 키가 클라이언트 번들에 노출되는 것을 막기 위해
**공용 Cloudflare Worker 1개**가 4개 제품(베타콜·파보겔·몬스멕타·로타갈) 챗봇을 모두 중계합니다.

```
[4개 제품 사이트] --POST {product, message}--> [Cloudflare Worker /api/chat] --OPENAI_API_KEY--> [OpenAI]
```

- 제품별 전문 시스템 프롬프트는 워커의 `PRODUCT_PROMPTS`에 정의되어 있습니다.
- Origin 화이트리스트(기본: `hongsoonil02-maker.github.io`)와 IP당 5분 10회 레이트리밋이 적용됩니다.
- API 키는 이 저장소 어디에도 없으며, 워커 시크릿에만 존재합니다.

### 최초 설정 (1회, 약 10분)

1. **cloudflare.com 무료 가입** → 대시보드 → Workers & Pages → **Create Worker**
2. `worker/chat-proxy.js` 파일 내용 전체를 붙여넣고 **Deploy**
   (CLI 선호 시: 저장소 루트에서 `npx wrangler deploy`)
3. Worker → **Settings → Variables and Secrets → Add Secret**
   - 이름: `OPENAI_API_KEY` / 값: 발급받은 새 OpenAI 키
4. 배포된 주소 복사: `https://<이름>.<계정>.workers.dev/api/chat`
5. 주소를 각 사이트에 연결:
   - **베타콜**: `src/config.js`의 기본값 또는 GitHub Actions 시크릿 `VITE_CHAT_API_URL`에 입력
   - 파보겔·몬스멕타·로타갈: 동일 주소로 각 저장소 챗봇 URL 교체 (`product` 값만 다름)

미설정 상태에서는 채팅이 친절한 오류 메시지만 표시하며 사이트 자체는 정상 동작합니다.

> **⚠️ 키 유출 조치(완료)**: 과거 베타콜 버전은 클라이언트에 `VITE_OPENAI_API_KEY`를 포함했습니다.
> 해당 키는 폐기 완료했으며, 새 키는 위 워커 시크릿에만 설정합니다.
