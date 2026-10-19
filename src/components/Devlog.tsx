import { posts, postLabel, velogUrl } from "@/data/posts";
import Reveal from "@/components/Reveal";
import { T } from "@/components/Lang";

export default function Devlog() {
  // 최신 글이 위로. 시리즈마다 번호가 따로라서 day가 아니라 발행 순서(배열 순서)를 뒤집는다.
  const sorted = [...posts].reverse();

  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="devlog">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">DEVLOG</h2>
        <p className="mb-10 text-2xl font-bold sm:text-3xl">
          <T ko="벨로그에 기록 중인 개발 일지" en="Dev log on Velog (in Korean)" />
        </p>
      </Reveal>

      <div className="flex flex-col divide-y divide-slate/15 rounded-2xl border border-slate/20">
        {sorted.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <a
              href={velogUrl(post.slug)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-6 px-6 py-5 transition hover:bg-white/[0.03]"
            >
              <div>
                <p className="mb-1 text-xs font-semibold text-muted">{postLabel(post)}</p>
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
