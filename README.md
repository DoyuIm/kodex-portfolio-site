# kodex-portfolio-site

Doyu의 포트폴리오 사이트. Next.js(App Router) + TypeScript + Tailwind CSS로 만들었어요. Kodex 프로젝트(코드 리뷰 도우미 + 블로그 학습 RAG)를 소개하고, 벨로그 데브로그를 모아 보여줘요.

## 실행 방법

```bash
npm install
cp .env.local.example .env.local   # GEMINI_API_KEY 채우기
npm run dev
```

`http://localhost:3000`에서 확인할 수 있어요.

## 환경 변수

`.env.local.example`을 `.env.local`로 복사하고 값을 채워요.

| 변수 | 필수 | 설명 |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Kodex 챗 위젯이 쓰는 Gemini API 키 (aistudio.google.com에서 무료 발급) |
| `KODEX_CHAT_SESSION_LIMIT` | 선택 | 방문자(세션)당 질문 개수 한도, 기본 8 |
| `KODEX_CHAT_DAILY_LIMIT` | 선택 | 서버 전체 하루 호출 한도, 기본 300 |

## 구조

- `src/app/layout.tsx`, `src/app/page.tsx` — 페이지 뼈대
- `src/app/icon.png` — 파비콘 (VS Code 확장과 같은 브랜드 아이콘 재사용)
- `src/components/Nav.tsx` — 스티키 상단 네비게이션
- `src/components/Hero.tsx` — 소개 섹션
- `src/components/About.tsx` — 자기소개 + Day1~7 하이라이트 타임라인
- `src/components/Projects.tsx` — 프로젝트(Kodex) 소개 섹션
- `src/components/Devlog.tsx` — 벨로그 데브로그 글 목록 (링크는 `src/data/posts.ts`에서 관리)
- `src/components/Contact.tsx` — 이메일·소셜 링크
- `src/components/Reveal.tsx` — 스크롤 진입 시 페이드인 애니메이션 (공용 컴포넌트)
- `src/components/ChatWidget.tsx` — Kodex 에이전트와 대화하는 플로팅 챗 위젯 (전시용 데모)
- `src/app/api/kodex-chat/route.ts` — 챗 위젯이 호출하는 API 라우트 (RAG 검색 + 답변 생성)
- `src/lib/kodex-chat.ts` — `kodex-code-review-agent/ask.py`의 RAG 로직을 TypeScript로 포팅
- `src/lib/kodex-chat-limit.ts` — 세션당 질문 제한 + 서버 하루 전체 호출 한도
- `src/data/kodex-embeddings.json` — `kodex-code-review-agent/embeddings.json` 복사본 (벨로그 글 임베딩)
- `src/data/projects.ts`, `src/data/posts.ts`, `src/data/highlights.ts` — 콘텐츠 데이터 (새 글/프로젝트 추가 시 여기만 수정하면 됨)

## Kodex 챗 위젯 (Phase 4)

포트폴리오 사이트 오른쪽 아래에 떠 있는 "Kodex와 대화하기" 버튼이에요. Phase 2에서 만든 블로그 학습 AI(RAG)를
그대로 재사용해서, 방문자가 제 벨로그 글 내용에 대해 물어볼 수 있어요. 무료 API 한도를 지키기 위해 전시용으로만
동작하도록 제한을 걸어뒀어요.

- 방문자(세션)당 질문 `KODEX_CHAT_SESSION_LIMIT`개(기본 8개)까지만 가능 — 쿠키 기반, 6시간 뒤 리셋
- 서버 전체 하루 호출 `KODEX_CHAT_DAILY_LIMIT`회(기본 300회)까지만 — 인메모리 카운터라 서버리스 인스턴스가
  재시작되면 리셋될 수 있음 (트래픽이 늘면 Vercel KV 등으로 교체 권장)
- 한도 초과 시 실제 Gemini 호출 없이 "GitHub에서 전체 코드를 확인해보세요" 안내로 대체
- 새 벨로그 글 반영은 아래 "임베딩 자동 갱신" 참고 — 수동으로 할 필요 없음

## 임베딩 자동 갱신 (`.github/workflows/sync-kodex-embeddings.yml`)

챗 위젯이 새 벨로그 글을 자동으로 알게 해주는 GitHub Actions 워크플로예요. 매일 06:00(KST)에 실행되고,
Actions 탭에서 수동으로도 바로 돌릴 수 있어요(`workflow_dispatch`).

동작 순서: `kodex-code-review-agent` 저장소를 체크아웃 → `fetch_posts.py`로 최신 벨로그 글 수집 →
`build_index.py`로 증분 임베딩(안 바뀐 글은 재임베딩하지 않음) → 결과를 `src/data/kodex-embeddings.json`에
덮어쓰기 → 바뀐 게 있으면만 커밋·푸시. 푸시되면 Vercel이 알아서 재배포해요.

**한 번만 하면 되는 설정**: 이 저장소(`kodex-portfolio-site`)의 GitHub Settings → Secrets and variables →
Actions에 `GEMINI_API_KEY` 시크릿을 등록해야 해요. `gh` CLI가 있다면:

```bash
gh secret set GEMINI_API_KEY --repo DoyuIm/kodex-portfolio-site
```

값을 붙여넣으라는 프롬프트가 뜨면 기존에 쓰던 Gemini API 키를 입력하면 돼요.

## 배포

Vercel CLI로 배포되어 있어요 (`vercel` → `vercel --prod`). GitHub 레포와 연결하면 이후로는 푸시할 때마다 자동으로 재배포돼요.

## 다음 단계 (앞으로 할 일)

- [x] GitHub 레포로 분리해서 푸시
- [x] Vercel 프로젝트와 GitHub 레포 연결 (자동 재배포)
- 커스텀 도메인은 보류 (지금은 기본 `.vercel.app` 주소 사용)
- [ ] 벨로그 새 글 쓸 때마다 `src/data/posts.ts`, `src/data/highlights.ts`에 항목 추가
