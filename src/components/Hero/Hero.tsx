import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import '../../styles/glitch.css'
import '../../styles/shared-animations.css'

// TODO: استبدل السطر ده بالصورة الحقيقية لما تبقى جاهزة
// import profileImg from '../../assets/profile.jpg'

interface HeroProps {
  entered: boolean
}

const Hero = ({ entered }: HeroProps) => {
  const containerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.hero-animate')
    if (!entered) {
      gsap.set(items, { y: 30, autoAlpha: 0 })
    } else {
      gsap.fromTo(
        items,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          overwrite: true,
        }
      )
    }
  }, [entered])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center px-8 lg:px-16 pt-32 pb-20"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />

      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* ===== النص ===== */}
        <div className="max-w-2xl">
          <p className="hero-animate font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-6">
            {'//'} FRONTEND DEVELOPER — REACT & TYPESCRIPT
          </p>

          <h1 className="hero-animate font-display font-bold text-5xl md:text-7xl leading-[0.95] text-text-primary mb-6">
            ABDELRHMAN
            <br />
            KHALED <span className="text-blue-sky">DIAB</span>
          </h1>

          <p className="hero-animate font-sans text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed mb-10">
            I build interfaces with the same precision I&apos;d want in a
            blueprint — nothing approximate, nothing left to guess.
          </p>

          <div className="hero-animate flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="px-8 py-4 border border-blue-sky/60 text-text-primary font-mono text-sm tracking-widest hover:bg-blue-sky/10 hover:border-blue-sky transition-colors duration-200"
            >
              <span data-text="VIEW WORK ↓" className="glitch-hover">
                VIEW WORK ↓
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-grid-line text-text-secondary font-mono text-sm tracking-widest hover:text-text-primary hover:border-text-secondary transition-colors duration-200"
            >
              <span data-text="GET IN TOUCH →" className="glitch-hover">
                GET IN TOUCH →
              </span>
            </a>
          </div>

          <div className="hero-animate mt-16 flex flex-wrap gap-8 font-mono text-xs tracking-widest text-text-muted">
            <span>LOC. 30.0444°N / 31.2357°E</span>
            <span>STACK. REACT / TS / GSAP</span>
            <span className="text-accent-red">REV. 01</span>
          </div>
        </div>

        {/* ===== مكان الصورة (Placeholder مؤقت) ===== */}
        <div className="hero-animate relative w-56 h-56 lg:w-72 lg:h-72 shrink-0">
          {/* الحلقة الدوارة - نفس أسلوب الـ Curtain */}
          <svg
            className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] animate-[arc-rotate_6s_linear_infinite]"
            viewBox="0 0 224 224"
          >
            <circle
              cx="112"
              cy="112"
              r="108"
              fill="none"
              stroke="#4FA8E0"
              strokeWidth="1.5"
              strokeDasharray="200 500"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          {/* الدائرة الثابتة الخارجية */}
          <div className="absolute inset-0 rounded-full border border-grid-line" />

          {/* Placeholder مؤقت مكان الصورة */}
          <div className="absolute inset-3 rounded-full bg-bg-elevated border border-grid-line flex items-center justify-center">
            <span className="font-mono text-xs tracking-widest text-text-muted">
              PHOTO
              <br />
              PENDING
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
