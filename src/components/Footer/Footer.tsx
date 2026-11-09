const SECTIONS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Tech Stack', href: '#tools' },
  { label: 'Decisions', href: '#decisions' },
  { label: 'Contact', href: '#contact' },
]

const LINK =
  'font-mono text-xs tracking-wider text-text-secondary uppercase transition-colors hover:text-blue-sky max-lg:flex max-lg:min-h-11 max-lg:items-center'

export default function Footer() {
  return (
    <footer className="border-t border-grid-line bg-bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3 lg:gap-10 lg:px-12 lg:py-12">
        <div>
          <div className="font-display text-xl font-bold text-text-primary sm:text-2xl">
            ABDELRHMAN KHALED DIAB
          </div>
          <p className="mt-2 font-mono text-xs tracking-wider text-text-secondary uppercase lg:text-text-muted">
            Frontend developer · React / TypeScript
          </p>
          <p className="mt-1 font-mono text-xs tracking-wider text-text-secondary uppercase lg:text-text-muted">
            Cairo, Egypt
            <span className="max-lg:hidden"> · 30.0444°N / 31.2357°E</span>
          </p>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs tracking-[0.2em] text-blue-sky uppercase">
            SECTIONS
          </div>
          <ul className="grid grid-cols-2 gap-2 max-lg:gap-y-0">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a href={s.href} className={LINK}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs tracking-[0.2em] text-blue-sky uppercase">
            CONTACT
          </div>
          <ul className="space-y-2 max-lg:space-y-0">
            <li>
              <a href="mailto:abdorhamnk134@gmail.com" className={LINK}>
                abdorhamnk134@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/abdo4312"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-grid-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 font-mono text-xs tracking-wider text-text-secondary uppercase lg:px-12 lg:text-text-muted">
          <span>© {new Date().getFullYear()} Abdelrhman Khaled Diab</span>
          <span>Open to full-time &amp; freelance</span>
        </div>
      </div>
    </footer>
  )
}
