# kodex-portfolio-site

Doyu의 포트폴리오 사이트. Next.js(App Router) + TypeScript + Tailwind CSS로 만들었어요. Kodex 프로젝트(코드 리뷰 도우미 + 블로그 학습 RAG)를 소개하고, 벨로그 데브로그를 모아 보여줘요.

## 실행 방법

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 확인할 수 있어요.

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
- `src/data/projects.ts`, `src/data/posts.ts`, `src/data/highlights.ts` — 콘텐츠 데이터 (새 글/프로젝트 추가 시 여기만 수정하면 됨)

## 배포

Vercel CLI로 배포되어 있어요 (`vercel` → `vercel --prod`). GitHub 레포와 연결하면 이후로는 푸시할 때마다 자동으로 재배포돼요.

## 다음 단계 (앞으로 할 일)

- [ ] GitHub 레포로 분리해서 푸시
- [ ] Vercel 프로젝트와 GitHub 레포 연결 (자동 재배포)
- [ ] 커스텀 도메인 연결
- [ ] 벨로그 새 글 쓸 때마다 `src/data/posts.ts`, `src/data/highlights.ts`에 항목 추가
