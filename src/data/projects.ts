export type Project = {
  name: string;
  status: "진행 중" | "완료";
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Kodex",
    status: "진행 중",
    description:
      "Gemini API 기반 코드 리뷰 도우미 + 블로그 학습 RAG. CLI와 VS Code 확장 두 가지 형태로 제공하며, VS Code 마켓플레이스에 정식 배포되어 있어요.",
    tags: ["Python", "TypeScript", "Gemini API", "RAG", "VS Code Extension"],
    links: [
      { label: "GitHub · CLI", href: "https://github.com/DoyuIm/kodex-code-review-agent" },
      { label: "GitHub · 확장", href: "https://github.com/DoyuIm/kodex-vscode-extension" },
      {
        label: "마켓플레이스",
        href: "https://marketplace.visualstudio.com/items?itemName=doyu.kodex-code-review",
      },
    ],
  },
];
