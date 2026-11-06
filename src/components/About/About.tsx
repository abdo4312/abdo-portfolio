import GlitchSwap from '../GlitchSwap/GlitchSwap'
import ReactiveFrame from '../ReactiveFrame/ReactiveFrame'
import CornerMarks from '../shared/CornerMarks'
import SectionHeader from '../shared/SectionHeader'
import { useInView } from '../../hooks/useInView'

const TECH = [
  'React',
  'TypeScript',
  'Electron',
  'Capacitor',
  'Supabase',
  'SQLite',
  'Zustand',
  'TanStack Query',
  'Zod',
  'GSAP',
]

const PROFILE_ROWS = [
  { label: 'ROLE', value: 'Frontend Developer' },
  { label: 'LOCATION', value: 'Cairo, Egypt' },
  { label: 'STACK', value: 'React / TypeScript' },
  { label: 'APPROACH', value: 'Self-taught' },
  { label: 'STATUS', value: 'Open to full-time & freelance' },
]

const About = () => {
  const { ref, visible } = useInView<HTMLElement>(0.2)

  return (
    <section
      id="about"
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
          eyebrow="02 — PROFILE"
          title={<GlitchSwap text="ABOUT" altText="SELF_TAUGHT" trigger={visible} />}
          meta="FRONTEND DEVELOPER · CAIRO, EGYPT"
        />

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-10 items-start">
          {/* Personnel card */}
          <div className="relative border border-grid-line bg-bg-secondary/30 p-5 lg:p-6">
            <CornerMarks />
            <p className="font-mono text-[11px] tracking-[0.3em] text-text-muted mb-4">
              PROFILE_CARD
            </p>
            <div className="relative aspect-[4/5] w-full border border-grid-line bg-bg-primary/50 flex items-center justify-center mb-6">
              <span className="font-mono text-xs tracking-widest text-text-muted text-center">
                PHOTO
                <br />
                PENDING
              </span>
              <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-[0.1em] text-text-muted bg-bg-primary/70 px-2 py-0.5 border border-grid-line">
                30.0444°N 31.2357°E
              </span>
            </div>
            <dl className="space-y-3">
              {PROFILE_ROWS.map((r) => (
                <div
                  key={r.label}
                  className="flex items-baseline justify-between gap-4 border-b border-grid-line pb-2"
                >
                  <dt className="font-mono text-[11px] tracking-widest text-text-muted">
                    {r.label}
                  </dt>
                  <dd className="font-mono text-xs text-text-primary text-right">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <ReactiveFrame className="border border-grid-line bg-bg-secondary/30 p-6 lg:p-8 h-fit">
              <CornerMarks />
              <p className="font-mono text-[11px] tracking-[0.3em] text-text-muted mb-6 border-b border-grid-line pb-4">
                HOW I LEARNED
              </p>
              <p className="font-sans text-lg lg:text-xl text-text-primary leading-relaxed mb-6">
                I didn&apos;t learn React from a course — I learned it by
                building software real people actually use: a desktop app
                running in a real bookstore, an Android app with native
                prayer-time scheduling, and an inheritance calculator that
                distributes assets using exact arithmetic instead of
                floating-point approximations.
              </p>
              <p className="font-sans text-base lg:text-lg text-text-secondary leading-relaxed mb-8">
                Everything here is self-taught. No certificates, no bootcamp —
                just real projects, debugged until they worked correctly, not
                just until they looked like they did.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 border border-grid-line bg-bg-primary/40 p-4">
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-text-muted mb-1">
                    IN PRODUCTION
                  </p>
                  <p className="font-mono text-sm text-text-primary">
                    BOOKSTORE ORDER MANAGER
                  </p>
                  <p className="font-mono text-xs text-blue-sky mt-0.5">
                    100+ CUSTOMERS · SEASONAL USE
                  </p>
                </div>
                <span className="px-3 py-1 border border-blue-sky/60 font-mono text-[11px] tracking-[0.2em] text-blue-sky">
                  IN PRODUCTION
                </span>
              </div>
            </ReactiveFrame>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-grid-line bg-bg-secondary/30 p-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-blue-sky mb-2">
                  01 {'//'} EXACT ARITHMETIC
                </p>
                <p className="font-mono text-sm text-text-primary mb-1">MIZAN</p>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  BigInt exact arithmetic instead of floating-point approximations.
                </p>
              </div>
              <div className="border border-grid-line bg-bg-secondary/30 p-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-blue-sky mb-2">
                  02 {'//'} NATIVE ANDROID
                </p>
                <p className="font-mono text-sm text-text-primary mb-1">ROAD TO ISLAM</p>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Native prayer-time scheduling, actively maintained.
                </p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-text-muted mb-4">
                USED IN PROJECTS
              </p>
              <ul className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <li
                    key={t}
                    className="px-3 py-1.5 border border-grid-line font-mono text-xs text-text-secondary"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
