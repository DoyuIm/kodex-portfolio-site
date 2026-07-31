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
];

export function velogUrl(slug: string) {
  return `https://velog.io/@${VELOG_USER}/${slug}`;
}
