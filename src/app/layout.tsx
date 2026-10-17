import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import UrlCleaner from "@/components/UrlCleaner";
import { LangProvider } from "@/components/Lang";

const SITE_URL = "https://doyu-portfolio-site.is-a.dev";
const SITE_TITLE = "Doyu Lim — AI 서비스 기획자 · 개발자";
const SITE_DESCRIPTION =
  "AI 기술과 사용자의 문제를 연결하는 임도유의 포트폴리오. IBM watsonx 챗봇, Kodex AI 에이전트, UX 개선 프로젝트";

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
        <LangProvider>
          {children}
          <ChatWidget />
          <UrlCleaner />
        </LangProvider>
      </body>
    </html>
  );
}
