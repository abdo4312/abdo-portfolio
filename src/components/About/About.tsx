import { useRef, useEffect, useState } from 'react'
import GlitchSwap from '../GlitchSwap/GlitchSwap'
import ReactiveFrame from '../ReactiveFrame/ReactiveFrame'

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-8 lg:px-16 py-28 lg:py-36"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />

      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-10">
          {'//'} 02 —{' '}
          <GlitchSwap text="ABOUT" altText="SELF_TAUGHT" trigger={visible} />
        </p>

        <div className="grid lg:grid-cols-[1.3fr_auto_1fr] gap-12 lg:gap-0">
          <div className="lg:pr-12">
            <p className="font-sans text-lg lg:text-xl text-text-primary leading-relaxed mb-6">
              I didn&apos;t learn React from a course — I learned it by
              building software real people actually use: a desktop app
              running in a real bookstore, an Android app with native
              prayer-time scheduling, and an inheritance calculator that
              distributes assets using exact arithmetic instead of
              floating-point approximations.
            </p>
            <p className="font-sans text-base lg:text-lg text-text-secondary leading-relaxed">
              Everything here is self-taught. No certificates, no bootcamp —
              just real projects, debugged until they worked correctly, not
              just until they looked like they did.
            </p>
          </div>

          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-grid-line to-transparent" />

          <ReactiveFrame className="border border-grid-line bg-bg-secondary/30 p-6 lg:p-8 h-fit lg:ml-12">
            <span className="absolute -top-[5px] -left-[5px] text-blue-sky/50 text-xs font-mono leading-none">+</span>
            <span className="absolute -top-[5px] -right-[5px] text-blue-sky/50 text-xs font-mono leading-none">+</span>
            <span className="absolute -bottom-[5px] -left-[5px] text-blue-sky/50 text-xs font-mono leading-none">+</span>
            <span className="absolute -bottom-[5px] -right-[5px] text-blue-sky/50 text-xs font-mono leading-none">+</span>

            <p className="font-mono text-xs tracking-[0.3em] text-text-muted mb-6 border-b border-grid-line pb-4">
              SPEC SHEET
            </p>

            <dl className="space-y-5">
              <div>
                <dt className="font-mono text-[11px] tracking-widest text-text-muted mb-1">
                  APPROACH
                </dt>
                <dd className="font-mono text-sm text-text-primary">
                  SELF-TAUGHT
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[11px] tracking-widest text-text-muted mb-1">
                  IN PRODUCTION
                </dt>
                <dd className="font-mono text-sm text-text-primary">
                  BOOKSTORE ORDER MANAGER
                </dd>
                <dd className="font-mono text-xs text-blue-sky mt-0.5">
                  100+ CUSTOMERS · SEASONAL USE
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[11px] tracking-widest text-text-muted mb-1">
                  ZERO-FLOAT ENGINE
                </dt>
                <dd className="font-mono text-sm text-text-primary">
                  MIZAN
                </dd>
                <dd className="font-mono text-xs text-blue-sky mt-0.5">
                  BIGINT EXACT ARITHMETIC
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[11px] tracking-widest text-text-muted mb-1">
                  ACTIVELY MAINTAINED
                </dt>
                <dd className="font-mono text-sm text-text-primary">
                  ROAD TO ISLAM
                </dd>
                <dd className="font-mono text-xs text-blue-sky mt-0.5">
                  NATIVE ANDROID
                </dd>
              </div>
            </dl>
          </ReactiveFrame>
        </div>
      </div>
    </section>
  )
}

export default About
