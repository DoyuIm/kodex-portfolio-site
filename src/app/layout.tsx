import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import UrlCleaner from "@/components/UrlCleaner";

const SITE_URL = "https://kodex-portfolio-site.vercel.app";
const SITE_TITLE = "Doyu — AI 에이전트 생태계를 만드는 개발자";
const SITE_DESCRIPTION =
  "코드 리뷰 도우미, 블로그 학습 RAG를 직접 만들고 기록하는 빌드 인 퍼블릭 포트폴리오";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Doyu Portfolio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
