import Reveal from "@/components/Reveal";
import { T } from "@/components/Lang";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="experience">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">EXPERIENCE</h2>
        <p className="mb-10 text-2xl font-bold sm:text-3xl">
          <T ko="경력과 팀 프로젝트" en="Experience and team projects" />
        </p>
      </Reveal>

      <div className="flex flex-col gap-10">
        {experiences.map((item, i) => (
          <Reveal key={item.title.en} delay={i * 60}>
            <article className="border-l-2 border-slate/20 pl-6">
              <p className="mb-1 text-xs font-semibold tracking-wide text-mint">
                <T ko={item.kind.ko} en={item.kind.en} />
              </p>
              <h3 className="mb-3 text-lg font-bold text-offwhite">
                <T ko={item.title.ko} en={item.title.en} />
              </h3>
              <p className="mb-3 text-slate">
                <T ko={item.summary.ko} en={item.summary.en} />
              </p>
              <p className="mb-4 text-sm text-offwhite">
                <span className="mr-2 font-semibold text-mint">
                  <T ko="결과" en="Result" />
                </span>
                <T ko={item.result.ko} en={item.result.en} />
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-slate">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
