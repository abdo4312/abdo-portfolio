import { useEffect, useState } from 'react'
import '../../styles/glitch.css'

interface GlitchSwapProps {
  text: string
  altText: string
  trigger: boolean
  intervalMs?: number
  className?: string
}

const GlitchSwap = ({
  text,
  altText,
  trigger,
  intervalMs = 4000,
  className = '',
}: GlitchSwapProps) => {
  const [display, setDisplay] = useState(text)
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (!trigger) return

    const timeouts = new Set<number>()

    const schedule = (callback: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id)
        callback()
      }, delay)

      timeouts.add(id)
    }

    const playBurst = () => {
      setGlitching(true)
      schedule(() => setDisplay(altText), 180)
      schedule(() => setDisplay(text), 480)
      schedule(() => setGlitching(false), 700)
    }

    schedule(playBurst, 600)
    const loop = window.setInterval(playBurst, intervalMs)

    return () => {
      window.clearInterval(loop)
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [trigger, text, altText, intervalMs])

  return (
    <span
      data-text={display}
      className={`glitch-burst ${glitching ? 'is-glitching' : ''} ${className}`}
    >
      {display}
    </span>
  )
}

export default GlitchSwap
