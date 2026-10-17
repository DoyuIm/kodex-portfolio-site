type Text = { ko: string; en: string };

export type Project = {
  name: string;
  status: "active" | "done";
  description: Text;
  tags: string[];
  links: { label: Text; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Kodex",
    status: "active",
    description: {
      ko: "Gemini API 기반 코드 리뷰 도우미 + 블로그 학습 RAG. CLI와 VS Code 확장 두 가지 형태로 제공하며, VS Code 마켓플레이스에 정식 배포되어 있어요.",
      en: "A Gemini-powered code review assistant with a RAG pipeline trained on my blog. Available as a CLI and a VS Code extension, published on the VS Code Marketplace.",
    },
    tags: ["Python", "TypeScript", "Gemini API", "RAG", "VS Code Extension"],
    links: [
      { label: { ko: "GitHub · CLI", en: "GitHub · CLI" }, href: "https://github.com/DoyuIm/kodex-code-review-agent" },
      { label: { ko: "GitHub · 확장", en: "GitHub · Extension" }, href: "https://github.com/DoyuIm/kodex-vscode-extension" },
      {
        label: { ko: "마켓플레이스", en: "Marketplace" },
        href: "https://marketplace.visualstudio.com/items?itemName=doyu.kodex-code-review",
      },
    ],
  },
  {
    name: "Interview Copilot",
    status: "active",
    description: {
      ko: "영어 면접을 준비하는 한국어 사용자를 위한 웹앱. 한국어 이력서를 영어 STAR 스토리로 정리하고, AI 면접관과 모의면접을 하며 피드백을 받아요. 서버 없이 브라우저에서 각자 자기 Gemini 키로 동작해요.",
      en: "A web app for Korean speakers preparing for English job interviews. It turns a Korean resume into English STAR stories and runs mock interviews with feedback. It runs fully in the browser with each visitor's own Gemini key.",
    },
    tags: ["JavaScript", "Gemini API", "Web Speech API", "Deepgram", "GitHub Pages"],
    links: [
      { label: { ko: "앱 열기", en: "Open the app" }, href: "/interview-copilot/" },
      { label: { ko: "GitHub", en: "GitHub" }, href: "https://github.com/DoyuIm/interview-copilot" },
    ],
  },
];
