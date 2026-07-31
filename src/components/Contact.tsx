import Reveal from "@/components/Reveal";

const CONTACT_EMAIL = "ehdbfkfrk@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/DoyuIm" },
  { label: "Velog", href: "https://velog.io/@doro" },
  { label: "Instagram", href: "https://www.instagram.com/doro_dev/" },
];

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24" id="contact">
      <Reveal>
        <h2 className="mb-2 text-sm font-bold tracking-widest text-mint">CONTACT</h2>
        <p className="mb-4 text-2xl font-bold sm:text-3xl">같이 이야기 나눠요</p>
        <p className="mb-8 max-w-xl text-slate">
          새로운 프로젝트 제안, 협업, 혹은 그냥 인사도 좋아요. 편하게 연락 주세요.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-full bg-mint px-6 py-2.5 text-sm font-semibold text-navy transition hover:opacity-90"
          >
            이메일 보내기
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate/30 px-5 py-2 text-sm font-semibold text-offwhite transition hover:border-mint hover:text-mint"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
