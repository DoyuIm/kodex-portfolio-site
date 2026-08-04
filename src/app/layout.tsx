import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import UrlCleaner from "@/components/UrlCleaner";

export const metadata: Metadata = {
  title: "Doyu — AI 에이전트 생태계를 만드는 개발자",
  description:
    "코드 리뷰 도우미, 블로그 학습 RAG를 직접 만들고 기록하는 빌드 인 퍼블릭 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans">
        {children}
        <ChatWidget />
        <UrlCleaner />
      </body>
    </html>
  );
}
