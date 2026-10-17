export type Highlight = {
  range: string;
  title: { ko: string; en: string };
};

export const highlights: Highlight[] = [
  { range: "Day 1–2", title: { ko: "코드 리뷰 도우미 CLI + VS Code 확장 뼈대", en: "Code review CLI + VS Code extension skeleton" } },
  { range: "Day 3–4", title: { ko: "블로그 학습 RAG 완성 + 확장 화면(웹뷰) 통합", en: "Blog-trained RAG + extension webview integration" } },
  { range: "Day 5", title: { ko: "기능 6개 추가 + VS Code 마켓플레이스 정식 배포", en: "Six new features + VS Code Marketplace release" } },
  { range: "Day 6–7", title: { ko: "포트폴리오 사이트 제작 + 디자인 폴리시", en: "Portfolio site build + design polish" } },
  { range: "Day 8–9", title: { ko: "Vercel 실배포 + GitHub 연동 자동 재배포(CI/CD)", en: "Vercel deployment + GitHub-driven CI/CD" } },
  { range: "Day 10–11", title: { ko: "디스코드 봇 + 포트폴리오 챗 위젯으로 Phase 4 마무리", en: "Discord bot + portfolio chat widget (Phase 4)" } },
  { range: "Day 12", title: { ko: "11일간의 여정을 정리한 케이스 스터디", en: "Case study of the first 11 days" } },
  { range: "Day 13", title: { ko: "GitHub Actions로 RAG 인덱스 자동 갱신", en: "Automatic RAG index updates with GitHub Actions" } },
];
