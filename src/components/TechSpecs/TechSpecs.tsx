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
      className="relative px-8 lg:px-16 py-28 lg:py-36"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />

      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <SectionHeader
          eyebrow="05 — TOOLS"
          title="TECH STACK"
          meta="FROM EACH PROJECT'S PACKAGE.JSON"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="relative border border-grid-line bg-bg-secondary/30 p-5 lg:p-6"
            >
              <CornerMarks />
              <div className="mb-5 flex items-center justify-between border-b border-grid-line pb-3 font-mono text-[11px] tracking-[0.2em]">
                <span className="text-text-muted">SUITE_{suite.id}</span>
              </div>
              <h3 className="mb-5 font-display text-lg font-bold text-text-primary">
                {suite.title}
              </h3>
              <ul className="space-y-3">
                {suite.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-grid-line pb-2"
                  >
                    <span className="font-sans text-sm text-text-primary">
                      {item.name}
                    </span>
                    <span className="text-right font-mono text-[10px] tracking-[0.1em] text-text-muted">
                      {item.used}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] tracking-[0.1em] text-text-muted">
          ALL = Bookstore, Road to Islam, Aroma and this site. This is a list of
          what I used, not a skill rating.
        </p>
      </div>
    </section>
  )
}

export default TechSpecs
