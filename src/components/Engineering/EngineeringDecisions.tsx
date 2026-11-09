import SectionHeader from '../shared/SectionHeader'

const DECISIONS = [
  {
    ref: '01',
    kind: 'DESKTOP APP',
    project: 'Bookstore Order Manager',
    decision: 'One codebase, two backends',
    detail:
      'SQLite or Supabase, chosen by a config flag. 7 views share one interface, with PDF, Excel and thermal receipt export.',
    tags: ['Electron', 'SQLite', 'Supabase'],
  },
  {
    ref: '02',
    kind: 'ANDROID APP',
    project: 'Road to Islam',
    decision: 'A web UI with a native layer',
    detail:
      'A React app wrapped in Capacitor, plus 17 native Java files for the Android side. 5 app languages: en, ar, fr, tr, ur.',
    tags: ['React', 'Capacitor', 'Java'],
  },
  {
    ref: '03',
    kind: 'STOREFRONT UI',
    project: 'Aroma Corner',
    decision: 'Separate UI state from server data',
    detail:
      'Zustand for UI state, TanStack Query for data, Zod for validation. A frontend showcase with mock data.',
    tags: ['Zustand', 'TanStack Query', 'Zod'],
  },
]

export default function EngineeringDecisions() {
  return (
    <section
      id="decisions"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20"
    >
      <SectionHeader
        eyebrow="06 — DECISIONS"
        title="ENGINEERING DECISIONS"
        meta="ONE PER PROJECT"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {DECISIONS.map((d) => (
          <article
            key={d.ref}
            className="border border-grid-line bg-bg-secondary p-6 transition-colors hover:border-blue-sky/60 lg:p-8 lg:last:col-span-2"
          >
            <div className="mb-5 flex items-center justify-between border-b border-grid-line pb-3 font-mono text-xs tracking-[0.2em] uppercase">
              <span className="text-blue-sky">{d.kind}</span>
              <span className="text-text-muted">DECISION {d.ref}</span>
            </div>
            <div className="font-mono text-xs tracking-wider text-text-muted uppercase">
              {d.project}
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-text-primary lg:text-3xl">
              {d.decision}
            </h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
              {d.detail}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <span
                  key={t}
                  className="border border-grid-line px-2.5 py-1 font-mono text-xs tracking-wider text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
