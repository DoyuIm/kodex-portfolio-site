export default function Footer() {
  return (
    <footer className="mx-auto max-w-3xl px-6 py-16 text-sm text-muted">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-slate/15 pt-8 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Doyu. Built with Next.js.</p>
        <div className="flex gap-4">
          <a href="https://github.com/DoyuIm" target="_blank" rel="noreferrer" className="hover:text-mint">
            GitHub
          </a>
          <a href="https://velog.io/@doro" target="_blank" rel="noreferrer" className="hover:text-mint">
            Velog
          </a>
        </div>
      </div>
    </footer>
  );
}
