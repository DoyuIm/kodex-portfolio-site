export type Post = {
  day: number;
  title: string;
  summary: string;
  slug: string;
};

const VELOG_USER = "doro";

export const posts: Post[] = [
  {
    day: 1,
    title: "AI 에이전트 프로젝트 시작",
    summary: "Kodex 프로젝트 기획과 로드맵을 세운 첫날",
    slug: "kodex-day-1-ai-agent-kickoff",
  },
  {
    day: 2,
    title: "VS Code 확장 뼈대 만들기",
    summary: "코드 리뷰 도우미를 VS Code 확장으로 옮긴 날",
    slug: "kodex-day-2-vscode-extension",
  },
  {
    day: 3,
    title: "블로그 학습 RAG 만들기",
    summary: "벨로그 글을 임베딩해서 질문에 답하는 기능을 완성한 날",
    slug: "kodex-day-3-blog-rag",
  },
  {
    day: 4,
    title: "블로그 Q&A를 화면으로",
    summary: "RAG 기능을 VS Code 화면(웹뷰) 안으로 가져온 날",
    slug: "kodex-day-4-blog-qa-ui",
  },
  {
    day: 5,
    title: "드디어 마켓플레이스에 정식 배포",
    summary: "기능 6개를 추가하고 VS Code 마켓플레이스에 배포한 날",
    slug: "kodex-day-5-marketplace-launch",
  },
  {
    day: 6,
    title: "포트폴리오 사이트를 만들기 시작했다",
    summary: "Next.js로 포트폴리오 사이트 첫 세 섹션(Hero·Projects·Devlog)을 만든 날",
    slug: "kodex-day-6-portfolio-site-kickoff",
  },
  {
    day: 7,
    title: "정적인 페이지에 숨을 불어넣었다",
    summary: "스티키 네비와 스크롤 애니메이션으로 사이트에 디테일을 더한 날",
    slug: "kodex-day-7-portfolio-polish",
  },
  {
    day: 8,
    title: "드디어 진짜 링크가 생겼다",
    summary: "About·Contact 섹션을 추가하고 Vercel로 실제 배포한 날",
    slug: "kodex-day-8-live-deploy",
  },
  {
    day: 9,
    title: "GitHub와 연결하고 자동 배포까지",
    summary: "GitHub 레포를 Vercel과 연결해 자동 배포(CI/CD)를 완성한 날",
    slug: "kodex-day-9-github-cd",
  },
  {
    day: 10,
    title: "AI 에이전트가 디스코드에서도 답한다",
    summary: "코드 리뷰·블로그 Q&A 에이전트를 디스코드 슬래시 커맨드로 연결한 날",
    slug: "kodex-day-10-discord-bot",
  },
  {
    day: 11,
    title: "Phase 4를 마무리하다 — 사용량 제한 두 겹",
    summary: "디스코드 봇과 챗 위젯에 사용량 제한을 걸어 Phase 4를 마무리한 날",
    slug: "kodex-day-11-phase4-wrap-up",
  },
  {
    day: 12,
    title: "11일 만에 만든 AI 에이전트 생태계",
    summary: "Kodex 프로젝트 회고 — 타임라인부터 배운 점까지 정리한 케이스 스터디",
    slug: "kodex-day-12-case-study",
  },
  {
    day: 13,
    title: "이제 임베딩은 신경 안 써도 된다",
    summary: "GitHub Actions로 RAG 인덱스를 매일 자동 갱신하도록 만든 날",
    slug: "kodex-day-13-rag-automation",
  },
  {
    day: 14,
    title: "devlog 자동화 및 사이트 기능 개선",
    summary: "devlog 목록 자동 동기화 스크립트를 작성하고 도움말 커맨드, OG 이미지, 사용량 대시보드를 구축한 날.",
    slug: "kodex-day-14-backlog-wrap-up",
  },
];

export function velogUrl(slug: string) {
  return `https://velog.io/@${VELOG_USER}/${slug}`;
}
