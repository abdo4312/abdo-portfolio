import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import CornerMarks from '../shared/CornerMarks'
import '../../styles/glitch.css'
import '../../styles/shared-animations.css'

interface HeroProps {
  entered: boolean
}

const STATS = [
  { value: '17', label: 'NATIVE JAVA FILES', source: 'ROAD TO ISLAM' },
  { value: '5', label: 'APP LANGUAGES', source: 'ROAD TO ISLAM' },
  { value: '7', label: 'APP VIEWS', source: 'BOOKSTORE ORDER MANAGER' },
]

const BUILDS = [
  {
    n: '01',
    title: 'DESKTOP APP',
    name: 'Bookstore Order Manager',
    desc: 'Orders, customers and reports in one interface, with PDF / Excel / receipt export.',
    stack: 'Electron · React · TypeScript · SQLite · Supabase',
  },
  {
    n: '02',
    title: 'ANDROID APP',
    name: 'Road to Islam',
    desc: 'A React UI with native Java prayer-time scheduling, in five languages.',
    stack: 'React · Capacitor · Native Java',
  },
  {
    n: '03',
    title: 'STOREFRONT UI',
    name: 'Aroma Corner',
    desc: 'Beans and Box Builder shopping paths, cart and delivery preview. Frontend showcase, mock data.',
    stack: 'React · Zustand · TanStack Query · Zod',
  },
  {
    n: '04',
    title: 'EXACT ARITHMETIC',
    name: 'Mizan',
    desc: 'Inheritance calculator using BigInt exact arithmetic instead of floating-point.',
    stack: 'BigInt',
  },
]

const Hero = ({ entered }: HeroProps) => {
  const containerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.hero-animate')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!entered) {
      gsap.set(items, { y: 30, autoAlpha: 0 })
    } else if (reduced) {
      gsap.set(items, { y: 0, autoAlpha: 1 })
    } else {
      gsap.fromTo(
        items,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          overwrite: true,
        }
      )
    }
  }, [entered])

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-screen flex items-center px-8 lg:px-16 pt-32 pb-20 max-lg:min-h-0 max-lg:px-4 max-lg:pt-24 max-lg:pb-12"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none max-lg:hidden" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none max-lg:hidden" />

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-16">
        <div>
          <p className="hero-animate inline-flex items-center gap-3 border border-blue-sky/40 bg-blue-sky/5 px-3 py-1.5 mb-6 font-mono text-[11px] tracking-[0.2em] text-blue-sky max-lg:hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-sky" aria-hidden="true" />
            OPEN TO WORK
          </p>
          <p className="hero-animate font-mono text-[11px] tracking-[0.2em] text-text-muted mb-6 max-lg:tracking-[0.1em] max-lg:text-text-secondary">
            LOC. CAIRO, EGYPT · 30.0444°N / 31.2357°E
          </p>
          <p className="hero-animate font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-6 max-lg:tracking-[0.15em]">
            {'//'} FRONTEND DEVELOPER — REACT & TYPESCRIPT
          </p>
          <h1 className="hero-animate font-display font-bold text-5xl md:text-7xl leading-[0.95] text-text-primary mb-6 max-sm:text-[2.5rem]">
            ABDELRHMAN
            <br />
            KHALED <span className="text-blue-sky">DIAB</span>
          </h1>
          <p className="hero-animate font-sans text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed mb-10">
            I build interfaces with the same precision I&apos;d want in a
            blueprint — nothing approximate, nothing left to guess.
          </p>
          <div className="hero-animate flex flex-wrap items-center gap-4 mb-12 max-sm:flex-col max-sm:items-stretch max-sm:gap-3 max-lg:mb-8">
            <a
              href="#work"
              className="px-8 py-4 border border-blue-sky/60 text-text-primary font-mono text-sm tracking-widest hover:bg-blue-sky/10 hover:border-blue-sky transition-colors duration-200 max-sm:text-center"
            >
              <span data-text="VIEW WORK ↓" className="glitch-hover">
                VIEW WORK ↓
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-grid-line text-text-secondary font-mono text-sm tracking-widest hover:text-text-primary hover:border-text-secondary transition-colors duration-200 max-sm:text-center"
            >
              <span data-text="GET IN TOUCH →" className="glitch-hover">
                GET IN TOUCH →
              </span>
            </a>
          </div>

          <div className="hero-animate grid grid-cols-3 gap-3 max-w-xl max-sm:grid-cols-1">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border border-grid-line bg-bg-secondary/30 p-3 sm:p-4 max-sm:grid max-sm:grid-cols-[3.5rem_1fr] max-sm:items-center max-sm:gap-x-4"
              >
                <p className="font-display font-bold text-2xl sm:text-3xl text-blue-sky mb-1 max-sm:row-span-2 max-sm:mb-0">
                  {s.value}
                </p>
                <p className="font-mono text-[10px] max-lg:text-[11px] tracking-[0.15em] text-text-primary leading-snug">
                  {s.label}
                </p>
                <p className="font-mono text-[9px] max-lg:text-[11px] tracking-[0.1em] text-text-muted max-lg:text-text-secondary mt-1 leading-snug">
                  {s.source}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-animate relative border border-grid-line bg-bg-secondary/30 p-6 lg:p-8 max-sm:p-4">
          <CornerMarks />
          <div className="flex items-center justify-between border-b border-grid-line pb-4 mb-6 font-mono text-xs tracking-[0.3em] text-text-muted max-lg:text-text-secondary">
            <span>SELECTED BUILDS</span>
            <span className="text-accent-red max-lg:hidden">REV. 01</span>
          </div>
          <ul className="space-y-4">
            {BUILDS.map((b) => (
              <li key={b.n} className="border border-grid-line bg-bg-primary/40 p-4">
                <p className="font-mono text-[11px] tracking-[0.2em] text-blue-sky mb-1">
                  {b.n} {'//'} {b.title}
                </p>
                <p className="font-display text-base text-text-primary mb-1">
                  {b.name}
                </p>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-2">
                  {b.desc}
                </p>
                <p className="font-mono text-[10px] max-lg:text-[11px] tracking-[0.1em] text-text-muted max-lg:text-text-secondary">
                  {b.stack}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default Hero
