import Reveal from "@/components/Reveal";

const links = [
  { label: "GitHub", href: "https://github.com/DoyuIm" },
  { label: "Velog", href: "https://velog.io/@doro" },
  { label: "Instagram", href: "https://www.instagram.com/doro_dev/" },
];

const stack = ["Python", "TypeScript", "Gemini API", "Next.js", "Figma"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[90vh] max-w-3xl flex-col justify-center overflow-hidden px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-mint/20 blur-[120px]"
      />

      <Reveal>
        <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-mint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
          </span>
          지금 만들고 있어요 · BUILD IN PUBLIC
        </div>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          AI 에이전트 생태계를
          <br />
          직접 만들고 기록합니다
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-6 max-w-xl text-lg text-slate">
          코드 리뷰 도우미와 블로그 학습 RAG를 CLI, VS Code 확장으로 만들며
          과정을 인스타그램과 벨로그에 매일 기록하고 있어요.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-8 flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate/30 px-5 py-2 text-sm font-semibold text-offwhite transition hover:border-mint hover:text-mint"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={320}>
        <div className="mt-10 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-slate"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
