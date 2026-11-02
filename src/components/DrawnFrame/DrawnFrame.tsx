import { useEffect, useRef, useState, type ReactNode } from 'react'
import '../../styles/neon-trace.css'
import './drawn-frame.css'

type Phase = 'hidden' | 'drawing' | 'unrolling' | 'revealed'

interface DrawnFrameProps {
  children: ReactNode
  className?: string
  drawDuration?: number
  unrollDuration?: number
  strokeOpacity?: number
}

interface Size {
  width: number
  height: number
}

const DrawnFrame = ({
  children,
  className = '',
  drawDuration = 2000,
  unrollDuration = 750,
  strokeOpacity = 0.8,
}: DrawnFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const [size, setSize] = useState<Size | null>(null)
  const [length, setLength] = useState(0)
  const [phase, setPhase] = useState<Phase>('hidden')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      setSize({ width, height })
    }

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const rect = rectRef.current
    if (!rect || !size) return

    const rafId = requestAnimationFrame(() => {
      setLength(rect.getTotalLength())
    })

    return () => cancelAnimationFrame(rafId)
  }, [size])

  useEffect(() => {
    if (!length) return

    let innerFrame: number | null = null
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        setPhase((p) => (p === 'hidden' ? 'drawing' : p))
      })
    })

    return () => {
      cancelAnimationFrame(outerFrame)
      if (innerFrame !== null) cancelAnimationFrame(innerFrame)
    }
  }, [length])

  useEffect(() => {
    if (phase !== 'unrolling') return

    let frame: number
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / unrollDuration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased)

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setPhase('revealed')
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [phase, unrollDuration])

  const handleBorderDrawn = () => {
    if (phase === 'drawing') setPhase('unrolling')
  }

  const insetPercent = phase === 'revealed' ? 0 : 50 * (1 - progress)
  const showRollBars = phase === 'drawing' || phase === 'unrolling'

  return (
    <div
      ref={containerRef}
      className={`relative ${phase === 'revealed' ? 'neon-trace' : ''} ${className}`}
    >
      {size && (
        <svg className="absolute inset-0 pointer-events-none" width={size.width} height={size.height}>
          <rect
            ref={rectRef}
            x={0.5}
            y={0.5}
            width={Math.max(size.width - 1, 0)}
            height={Math.max(size.height - 1, 0)}
            fill="none"
            stroke="var(--color-blue-sky)"
            strokeOpacity={strokeOpacity}
            strokeWidth={1.5}
            onTransitionEnd={handleBorderDrawn}
            style={{
              visibility: length ? 'visible' : 'hidden',
              strokeDasharray: length,
              strokeDashoffset: phase === 'hidden' ? length : 0,
              transition: `stroke-dashoffset ${drawDuration}ms ease-out`,
            }}
          />
        </svg>
      )}

      {showRollBars && (
        <>
          <div className="roll-bar roll-bar--top" style={{ top: `${insetPercent}%` }} />
          <div className="roll-bar roll-bar--bottom" style={{ bottom: `${insetPercent}%` }} />
        </>
      )}

      <div style={{ clipPath: `inset(${insetPercent}% 0% ${insetPercent}% 0%)` }}>
        {children}
      </div>
    </div>
  )
}

export default DrawnFrame
