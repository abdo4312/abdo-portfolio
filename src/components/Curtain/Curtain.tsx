import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import '../../styles/glitch.css'
import '../../styles/shared-animations.css'

interface CurtainProps {
  siteRef: React.RefObject<HTMLDivElement | null>
  onComplete: () => void
}

const Curtain = ({ siteRef, onComplete }: CurtainProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const centerContentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (siteRef.current) {
      gsap.set(siteRef.current, { scale: 1.05 })
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [siteRef])

  const handleEnter = () => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        document.body.style.overflow = ''
        sessionStorage.setItem('hasEntered', 'true')
        onComplete()
      },
    })

    tl.to(centerContentRef.current, { autoAlpha: 0, duration: 0.15 }, 0)
    tl.to(leftPanelRef.current, { xPercent: -100, duration: 0.8 }, 0)
    tl.to(rightPanelRef.current, { xPercent: 100, duration: 0.8 }, 0)
    tl.to(siteRef.current, { scale: 1, duration: 0.9, ease: 'power2.out' }, 0.1)
    tl.to(containerRef.current, { autoAlpha: 0, duration: 0.1 }, 0.8)
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex">
      <div
        ref={leftPanelRef}
        className="relative w-1/2 h-full bg-bg-primary border-r border-grid-line"
      >
        <span className="absolute top-6 left-6 text-blue-sky/40 text-sm font-mono">+</span>
        <span className="absolute bottom-6 left-6 text-blue-sky/40 text-sm font-mono">+</span>
        <div
          className="absolute top-1/2 right-0 w-56 h-56"
          style={{
            transform: 'translate(50%, -50%)',
            clipPath: 'inset(0 50% 0 0)',
          }}
        >
          <div className="w-56 h-56 rounded-full border border-blue-sky/40" />
        </div>
      </div>

      <div
        ref={rightPanelRef}
        className="relative w-1/2 h-full bg-bg-primary border-l border-grid-line"
      >
        <span className="absolute top-6 right-6 text-blue-sky/40 text-sm font-mono">+</span>
        <span className="absolute bottom-6 right-6 text-blue-sky/40 text-sm font-mono">+</span>
        <div
          className="absolute top-1/2 left-0 w-56 h-56"
          style={{
            transform: 'translate(-50%, -50%)',
            clipPath: 'inset(0 0 0 50%)',
          }}
        >
          <div className="w-56 h-56 rounded-full border border-blue-sky/40" />
        </div>
      </div>

      <div
        ref={centerContentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <button
          onClick={handleEnter}
          className="relative w-56 h-56 pointer-events-auto cursor-pointer"
        >
          <svg
            className="absolute inset-0 w-full h-full origin-center animate-[arc-rotate_2.5s_linear_infinite]"
            viewBox="0 0 224 224"
          >
            <circle
              cx="112"
              cy="112"
              r="100"
              fill="none"
              stroke="var(--color-blue-sky)"
              strokeWidth="2"
              strokeDasharray="314 314"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              data-text="ENTER"
              className="glitch-text font-mono text-sm tracking-[0.3em] text-text-primary uppercase"
            >
              ENTER
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Curtain
