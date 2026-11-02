import { useEffect, useState } from 'react'

const randomDelay = (min: number, max: number) => min + Math.random() * (max - min)

export const useGlitchPulse = (
  trigger: boolean,
  minMs = 3000,
  maxMs = 8000,
  burstMs = 500
) => {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (!trigger) return

    let delayId: number
    let endId: number

    const schedule = () => {
      delayId = window.setTimeout(() => {
        setGlitching(true)
        endId = window.setTimeout(() => setGlitching(false), burstMs)
        schedule()
      }, randomDelay(minMs, maxMs))
    }

    schedule()

    return () => {
      window.clearTimeout(delayId)
      window.clearTimeout(endId)
    }
  }, [trigger, minMs, maxMs, burstMs])

  return glitching
}
