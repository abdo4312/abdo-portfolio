import CornerMarks from '../shared/CornerMarks'
import SectionHeader from '../shared/SectionHeader'
import { useInView } from '../../hooks/useInView'

const SUITES = [
  {
    id: '01',
    title: 'FRONTEND',
    items: [
      { name: 'React', used: 'ALL' },
      { name: 'TypeScript', used: 'ALL' },
      { name: 'Tailwind CSS', used: 'ALL' },
      { name: 'GSAP', used: 'THIS SITE' },
    ],
  },
  {
    id: '02',
    title: 'STATE & DATA',
    items: [
      { name: 'Zustand', used: 'AROMA' },
      { name: 'TanStack Query', used: 'AROMA · ROAD TO ISLAM' },
      { name: 'Zod', used: 'AROMA' },
      { name: 'Supabase', used: 'BOOKSTORE · ROAD TO ISLAM' },
      { name: 'SQLite', used: 'BOOKSTORE' },
    ],
  },
  {
    id: '03',
    title: 'PLATFORMS & OUTPUT',
    items: [
      { name: 'Electron', used: 'BOOKSTORE' },
      { name: 'Capacitor', used: 'ROAD TO ISLAM' },
      { name: 'Native Android (Java)', used: 'ROAD TO ISLAM' },
      { name: 'i18next', used: 'ROAD TO ISLAM' },
      { name: 'jsPDF · SheetJS', used: 'BOOKSTORE' },
    ],
  },
]

const TechSpecs = () => {
  const { ref, visible } = useInView<HTMLElement>(0.1)

  return (
    <section
      id="tools"
      ref={ref}
      className="relative px-4 py-16 lg:px-16 lg:py-36"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none max-lg:hidden" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none max-lg:hidden" />

      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out max-lg:duration-500 ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 max-lg:translate-y-3'
        }`}
      >
        <SectionHeader
          eyebrow="05 — TOOLS"
          title="Tech stack"
          meta="FROM EACH PROJECT'S PACKAGE.JSON"
        />

        <div className="grid gap-4 max-lg:mx-auto max-lg:max-w-xl lg:grid-cols-3 lg:gap-6">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="relative border border-grid-line bg-bg-secondary/30 p-5 lg:p-6"
            >
              <CornerMarks />
              <div className="mb-5 flex items-center justify-between border-b border-grid-line pb-3 font-mono text-[11px] tracking-[0.2em] max-lg:hidden">
                <span className="text-text-muted">SUITE_{suite.id}</span>
              </div>
              <h3 className="mb-4 font-display text-lg font-bold text-text-primary lg:mb-5">
                {suite.title}
              </h3>
              <ul className="space-y-3">
                {suite.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-grid-line pb-2"
                  >
                    <span className="font-sans text-sm text-text-primary">
                      {item.name}
                    </span>
                    <span className="text-right font-mono text-[10px] tracking-[0.1em] text-text-muted max-lg:text-[11px] max-lg:text-text-secondary">
                      {item.used}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-text-muted max-lg:text-text-secondary">
          ALL = Bookstore, Road to Islam, Aroma and this site. This is a list of
          what I used, not a skill rating.
        </p>
      </div>
    </section>
  )
}

export default TechSpecs
