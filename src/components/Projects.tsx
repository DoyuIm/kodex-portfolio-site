import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="projects">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">PROJECTS</h2>
        <p className="mb-10 text-2xl font-bold sm:text-3xl">진행 중인 프로젝트</p>
      </Reveal>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 80}>
            <div className="rounded-2xl border border-slate/20 bg-white/[0.02] p-8 transition duration-300 hover:-translate-y-1 hover:border-mint/40 hover:bg-white/[0.04]">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                  {project.status}
                </span>
              </div>
              <p className="mb-5 text-slate">{project.description}</p>
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
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-offwhite underline decoration-slate/40 underline-offset-4 hover:text-mint hover:decoration-mint"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
