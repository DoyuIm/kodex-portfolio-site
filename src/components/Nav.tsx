const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Devlog", href: "#devlog" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate/10 bg-navy/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-extrabold tracking-widest text-offwhite">
          KODEX<span className="text-mint">.</span>
        </a>
        <nav className="flex items-center gap-6 text-sm text-slate">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hidden transition hover:text-mint sm:inline">
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/DoyuIm"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate/30 px-3 py-1 text-xs font-semibold text-offwhite transition hover:border-mint hover:text-mint"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
