import SectionHeader from '../shared/SectionHeader'

const STAGES = [
  {
    ref: '01',
    name: 'DISCUSS',
    text: 'I start with the value: what a visitor or recruiter needs to understand, before any design.',
  },
  {
    ref: '02',
    name: 'DESIGN',
    text: 'I design the layout and structure myself, using the same design system as the rest of the site.',
  },
  {
    ref: '03',
    name: 'BUILD',
    text: 'The implementation is AI-assisted. I direct it one section at a time.',
  },
  {
    ref: '04',
    name: 'VERIFY',
    text: 'Lint, build, then I check the result in the browser.',
  },
  {
    ref: '05',
    name: 'REFINE',
    text: 'I adjust from screenshots and remove effects that distract.',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-7xl px-4 py-16 lg:px-12 lg:py-20"
    >
      <SectionHeader
        eyebrow="04 — PROCESS"
        title="How I work"
        meta="AI-ASSISTED, HUMAN-DIRECTED"
      />

      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {STAGES.map((s) => (
          <article
            key={s.ref}
            className="w-[78%] max-w-xs shrink-0 snap-start border border-grid-line bg-bg-secondary p-6 transition-colors hover:border-blue-sky/60 lg:w-auto lg:max-w-none"
          >
            <div className="font-mono text-xs tracking-[0.2em] text-text-secondary uppercase lg:text-text-muted">
              STAGE {s.ref}
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
              {s.name}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary lg:text-base">
              {s.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
