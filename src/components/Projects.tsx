import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import { T } from "@/components/Lang";

const statusText = {
  active: { ko: "진행 중", en: "Active" },
  done: { ko: "완료", en: "Done" },
};

export default function Projects() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="projects">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">PROJECTS</h2>
        <p className="mb-10 text-2xl font-bold sm:text-3xl">
          <T ko="직접 만든 프로젝트" en="Things I built" />
        </p>
      </Reveal>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 80}>
            <div className="rounded-2xl border border-slate/20 bg-white/[0.02] p-8 transition duration-300 hover:-translate-y-1 hover:border-mint/40 hover:bg-white/[0.04]">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                  <T {...statusText[project.status]} />
                </span>
              </div>
              <p className="mb-5 text-slate">
                <T ko={project.description.ko} en={project.description.en} />
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-slate"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="text-sm font-semibold text-offwhite underline decoration-slate/40 underline-offset-4 hover:text-mint hover:decoration-mint"
                    >
                      <T ko={link.label.ko} en={link.label.en} /> →
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
