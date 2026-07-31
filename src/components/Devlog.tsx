import { posts, velogUrl } from "@/data/posts";
import Reveal from "@/components/Reveal";

export default function Devlog() {
  const sorted = [...posts].sort((a, b) => b.day - a.day);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="devlog">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">DEVLOG</h2>
        <p className="mb-10 text-2xl font-bold sm:text-3xl">벨로그에 기록 중인 개발 일지</p>
      </Reveal>

      <div className="flex flex-col divide-y divide-slate/15 rounded-2xl border border-slate/20">
        {sorted.map((post, i) => (
          <Reveal key={post.day} delay={i * 60}>
            <a
              href={velogUrl(post.slug)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-6 px-6 py-5 transition hover:bg-white/[0.03]"
            >
              <div>
                <p className="mb-1 text-xs font-semibold text-muted">DAY {post.day}</p>
                <p className="font-semibold text-offwhite group-hover:text-mint">
                  {post.title}
                </p>
                <p className="mt-1 text-sm text-slate">{post.summary}</p>
              </div>
              <span className="shrink-0 text-slate transition-transform group-hover:translate-x-1 group-hover:text-mint">
                →
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
