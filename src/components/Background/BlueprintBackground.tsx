import { useEffect, useRef } from 'react'
import './blueprint-background.css'
import '../../styles/glitch.css'

interface Wire {
  orientation: 'h' | 'v'
  pos: number
  duration: string
  delay: string
  reverse?: boolean
}

const wires: Wire[] = [
  { orientation: 'h', pos: 18, duration: '7s',   delay: '0s',    reverse: false },
  { orientation: 'h', pos: 45, duration: '9s',   delay: '-3s',   reverse: true  },
  { orientation: 'h', pos: 78, duration: '8s',   delay: '-1.5s', reverse: false },
  { orientation: 'v', pos: 15, duration: '10s',  delay: '-2s',   reverse: true  },
  { orientation: 'v', pos: 52, duration: '8.5s', delay: '-4s',   reverse: false },
  { orientation: 'v', pos: 86, duration: '11s',  delay: '-6s',   reverse: false },
]

const GLITCH_RADIUS = 90

const BlueprintBackground = () => {
  const headRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let frame: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        const { clientX, clientY } = e

        headRefs.current.forEach((head) => {
          if (!head) return
          const rect = head.getBoundingClientRect()
          const headX = rect.left + rect.width / 2
          const headY = rect.top + rect.height / 2
          const distance = Math.hypot(clientX - headX, clientY - headY)

          if (distance < GLITCH_RADIUS && !head.classList.contains('glitch-shake')) {
            head.classList.add('glitch-shake')
            head.addEventListener(
              'animationend',
              () => head.classList.remove('glitch-shake'),
              { once: true }
            )
          }
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-primary">
      <div className="absolute inset-0 blueprint-grid" />
      {wires.map((wire, i) =>
        wire.orientation === 'h' ? (
          <div key={i} className="wire-h" style={{ top: `${wire.pos}%` }}>
            <div
              ref={(el) => { headRefs.current[i] = el }}
              className="pulse-head pulse-head--h"
              style={{
                animationDuration: wire.duration,
                animationDelay: wire.delay,
                animationDirection: wire.reverse ? 'reverse' : 'normal',
              }}
            />
          </div>
        ) : (
          <div key={i} className="wire-v" style={{ left: `${wire.pos}%` }}>
            <div
              ref={(el) => { headRefs.current[i] = el }}
              className="pulse-head pulse-head--v"
              style={{
                animationDuration: wire.duration,
                animationDelay: wire.delay,
                animationDirection: wire.reverse ? 'reverse' : 'normal',
              }}
            />
          </div>
        )
      )}
    </div>
  )
}

export default BlueprintBackground
