"use client";

// 한/영 전환. 서버에서는 항상 한국어로 그리고, 브라우저에서 저장된 선택을 읽어 바꾼다.
// 서버 컴포넌트에서도 <T ko="..." en="..." />만 쓰면 되도록 텍스트 단위로 클라이언트 경계를 둔다.

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "ko" | "en";

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "ko",
  setLang: () => {},
});

const STORAGE_KEY = "lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ko" || saved === "en") setLangState(saved);
    } catch {
      // 저장소를 못 쓰는 환경이면 한국어로 둔다
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 무시 — 이번 방문 동안만 유지된다
    }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function T({ ko, en }: { ko: React.ReactNode; en: React.ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : ko}</>;
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex overflow-hidden rounded-full border border-slate/30 text-xs font-semibold"
    >
      {(["ko", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 transition ${
            lang === code ? "bg-mint text-navy" : "text-slate hover:text-mint"
          }`}
        >
          {code === "ko" ? "한" : "EN"}
        </button>
      ))}
    </div>
  );
}
