import Reveal from "@/components/Reveal";
import { T } from "@/components/Lang";

const links = [
  { label: "GitHub", href: "https://github.com/DoyuIm" },
  { label: "Velog", href: "https://velog.io/@doro" },
  { label: "Instagram", href: "https://www.instagram.com/doro_dev/" },
];

const stack = ["AI Service Planning", "UX Research", "Python", "TypeScript", "Gemini API", "IBM watsonx", "Next.js", "Figma"];

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
          <T ko="AI 서비스 기획자 · 개발자" en="AI SERVICE PLANNER · DEVELOPER" />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          <T
            ko={<>AI 기술과 사용자의 문제를<br />연결합니다</>}
            en={<>I connect AI technology<br />with real user problems</>}
          />
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-6 max-w-xl text-lg text-slate">
          <T
            ko="임도유입니다. 인공지능을 전공하고 IBM 인턴십에서 watsonx 기반 챗봇을 기획했어요. 팀 프로젝트에서는 사용자 테스트로 서비스 화면을 개선했고, Kodex AI 에이전트를 혼자 만들어 VS Code 마켓플레이스까지 배포했어요."
            en="I'm Doyu Lim. I studied artificial intelligence and designed a watsonx-based chatbot during my IBM internship. In team projects I improved products through usability testing, and I built and shipped the Kodex AI agent on my own, all the way to the VS Code Marketplace."
          />
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
