import { useEffect, useRef, useState, type ReactNode } from 'react'
import '../../styles/glitch.css'

type Side = 'top' | 'bottom' | 'left' | 'right'

interface TickConfig {
  side: Side
  pos: number
}

interface Point {
  x: number
  y: number
}

interface ReactiveFrameProps {
  children: ReactNode
  className?: string
  tickGap?: number
  radius?: number
}

const getTickPoint = (tick: TickConfig, width: number, height: number): Point => {
  const ratio = tick.pos / 100
  if (tick.side === 'top') return { x: ratio * width, y: 0 }
  if (tick.side === 'bottom') return { x: ratio * width, y: height }
  if (tick.side === 'left') return { x: 0, y: ratio * height }
  return { x: width, y: ratio * height }
}

const ReactiveFrame = ({
  children,
  className = '',
  tickGap = 40,
  radius = 55,
}: ReactiveFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const tickRefs = useRef<(HTMLDivElement | null)[]>([])
  const [ticks, setTicks] = useState<TickConfig[]>([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const computeTicks = () => {
      const { width, height } = el.getBoundingClientRect()
      const next: TickConfig[] = []

      const hCount = Math.max(2, Math.round(width / tickGap))
      const vCount = Math.max(2, Math.round(height / tickGap))

      for (let i = 1; i < hCount; i++) {
        next.push({ side: 'top', pos: (i / hCount) * 100 })
        next.push({ side: 'bottom', pos: (i / hCount) * 100 })
      }
      for (let i = 1; i < vCount; i++) {
        next.push({ side: 'left', pos: (i / vCount) * 100 })
        next.push({ side: 'right', pos: (i / vCount) * 100 })
      }

      tickRefs.current = []
      setTicks(next)
    }

    const observer = new ResizeObserver(computeTicks)
    observer.observe(el)
    return () => observer.disconnect()
  }, [tickGap])

  useEffect(() => {
    let frame: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        const el = containerRef.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top

        ticks.forEach((tick, i) => {
          const node = tickRefs.current[i]
          if (!node) return

          const point = getTickPoint(tick, rect.width, rect.height)
          const distance = Math.hypot(mx - point.x, my - point.y)

          if (distance < radius && !node.classList.contains('is-active')) {
            node.classList.add('is-active')
            node.addEventListener('animationend', () => node.classList.remove('is-active'), { once: true })
          }
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [ticks, radius])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}

      {ticks.map((tick, i) => (
        <div
          key={`${tick.side}-${i}`}
          ref={(node) => {
            tickRefs.current[i] = node
          }}
          className={`glitch-tick glitch-tick--${tick.side}`}
          style={
            tick.side === 'top' || tick.side === 'bottom'
              ? { left: `${tick.pos}%` }
              : { top: `${tick.pos}%` }
          }
        />
      ))}
    </div>
  )
}

export default ReactiveFrame
