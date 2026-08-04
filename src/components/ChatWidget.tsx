"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

interface Source {
  title: string;
  link: string;
  score: number;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  text: string;
  sources?: Source[];
}

const INTRO_MESSAGE: ChatMessage = {
  role: "assistant",
  text: '안녕하세요! 제 벨로그 글 내용을 근거로 질문에 답해드려요. 예: "코드 리뷰 CLI는 어떤 모델을 써?"',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [limited, setLimited] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading || limited) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/kodex-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "system", text: data.error ?? "문제가 발생했어요. 다시 시도해주세요." },
        ]);
      } else if (data.limited) {
        setLimited(true);
        setMessages((prev) => [...prev, { role: "system", text: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.answer, sources: data.sources },
        ]);
        setRemaining(typeof data.remaining === "number" ? data.remaining : null);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "system", text: "네트워크 문제로 답변을 못 받았어요. 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-slate/20 bg-navy shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-slate/10 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-offwhite">
                Kodex<span className="text-mint">.</span> 에게 물어보기
              </p>
              <p className="text-xs text-muted">벨로그 글 내용 기반 데모</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="rounded-full p-1 text-slate transition hover:text-mint"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-mint px-3 py-2 text-sm font-medium text-navy"
                      : m.role === "system"
                        ? "max-w-[85%] rounded-2xl border border-mint/30 bg-mint/5 px-3 py-2 text-xs text-mint"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm border border-slate/20 bg-white/[0.03] px-3 py-2 text-sm text-offwhite"
                  }
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2 space-y-1 border-t border-slate/10 pt-2">
                      {m.sources.map((s) => (
                        <a
                          key={s.link}
                          href={s.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-xs text-slate underline decoration-slate/40 underline-offset-2 hover:text-mint"
                        >
                          {s.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-slate/20 bg-white/[0.03] px-3 py-2 text-sm text-muted">
                  생각하는 중...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate/10 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limited ? "데모 한도에 도달했어요" : "벨로그 관련 질문을 입력해보세요"}
              disabled={loading || limited}
              maxLength={300}
              className="min-w-0 flex-1 rounded-full border border-slate/20 bg-transparent px-3 py-2 text-sm text-offwhite placeholder:text-muted focus:border-mint focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || limited || !input.trim()}
              className="rounded-full bg-mint px-4 py-2 text-sm font-semibold text-navy transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              보내기
            </button>
          </form>
          {remaining !== null && !limited && (
            <p className="px-4 pb-2 text-right text-[11px] text-muted">남은 질문: {remaining}개</p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-mint px-5 py-3 text-sm font-semibold text-navy shadow-lg shadow-mint/20 transition hover:opacity-90"
      >
        {open ? "닫기" : "Kodex와 대화하기"}
      </button>
    </div>
  );
}
