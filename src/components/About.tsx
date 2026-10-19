import Reveal from "@/components/Reveal";
import { highlights } from "@/data/highlights";
import usage from "@/data/kodex-usage.json";
import SiteUsageStats from "@/components/SiteUsageStats";
import { T } from "@/components/Lang";

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="about">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">ABOUT</h2>
        <p className="mb-8 text-2xl font-bold sm:text-3xl">
          <T ko="코드보다 과정을 더 많이 이야기합니다" en="I talk about the process more than the code" />
        </p>
      </Reveal>

      <Reveal delay={80}>
        <p className="mb-12 max-w-2xl text-slate">
          <T
            ko="저는 직접 만들면서 배우는 걸 좋아해요. Kodex는 15일 동안 처음부터 끝까지 혼자 만들며 매일 인스타그램과 벨로그에 기록했고, 요즘은 영어 면접을 준비하면서 Interview Copilot을 만들고 있어요. 완성된 결과보다 그 사이의 시행착오와 결정 과정을 더 자세히 남기려고 해요. 아래는 지금까지의 기록이에요."
            en="I learn best by building. I built Kodex end to end in 15 days and documented it every day on Instagram and Velog, and I'm now building Interview Copilot while preparing for English interviews. I focus on the trial and error and the decisions along the way rather than only the final result. Below is the timeline so far."
          />
        </p>
      </Reveal>

      <div className="flex flex-col gap-4">
        {highlights.map((item, i) => (
          <Reveal key={item.range} delay={160 + i * 60}>
            <div className="flex items-baseline gap-4 border-l-2 border-slate/20 pl-4">
              <span className="w-20 shrink-0 text-xs font-semibold text-mint">
                {item.range}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-offwhite underline decoration-slate/40 underline-offset-4 hover:text-mint hover:decoration-mint"
                >
                  <T ko={item.title.ko} en={item.title.en} /> →
                </a>
              ) : (
                <span className="text-offwhite">
                  <T ko={item.title.ko} en={item.title.en} />
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {usage.updated_at && (
        <Reveal delay={160 + highlights.length * 60 + 60}>
          <div className="mt-10 rounded-lg border border-slate/20 px-5 py-4 text-sm text-slate">
            <T
              ko={
                <>
                  <span className="font-semibold text-mint">지금까지</span> 리뷰/답변 생성{" "}
                  <span className="font-semibold text-offwhite">{usage.total_generate}번</span>, 검색{" "}
                  <span className="font-semibold text-offwhite">{usage.total_embed}번</span> — CLI와
                  디스코드 봇에서 실제로 호출된 횟수예요.
                </>
              }
              en={
                <>
                  <span className="font-semibold text-mint">So far</span>{" "}
                  <span className="font-semibold text-offwhite">{usage.total_generate}</span> reviews/answers
                  generated and <span className="font-semibold text-offwhite">{usage.total_embed}</span> searches
                  — real calls from the CLI and the Discord bot.
                </>
              }
            />
            <div className="mt-1 text-xs text-muted">
              <T ko="마지막 동기화" en="Last synced" />{" "}
              <T
                ko={new Date(usage.updated_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
                en={new Date(usage.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              />
            </div>
            <SiteUsageStats />
          </div>
        </Reveal>
      )}
    </section>
  );
}
