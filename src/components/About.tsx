import Reveal from "@/components/Reveal";
import { highlights } from "@/data/highlights";

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="about">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">ABOUT</h2>
        <p className="mb-8 text-2xl font-bold sm:text-3xl">
          코드보다 과정을 더 많이 이야기합니다
        </p>
      </Reveal>

      <Reveal delay={80}>
        <p className="mb-12 max-w-2xl text-slate">
          안녕하세요, Doyu입니다. 직접 만들면서 배우는 걸 좋아해서, 이 사이트에 있는
          프로젝트는 전부 처음부터 끝까지 혼자 만들고 매일 인스타그램·벨로그에
          기록한 결과물이에요. 완성된 결과보다 그 사이의 삽질과 결정 과정을
          더 자세히 남기려고 해요.
        </p>
      </Reveal>

      <div className="flex flex-col gap-4">
        {highlights.map((item, i) => (
          <Reveal key={item.range} delay={160 + i * 60}>
            <div className="flex items-baseline gap-4 border-l-2 border-slate/20 pl-4">
              <span className="w-20 shrink-0 text-xs font-semibold text-mint">
                {item.range}
              </span>
              <span className="text-offwhite">{item.title}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
