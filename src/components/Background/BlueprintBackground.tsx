import type { CSSProperties } from 'react'
import './blueprint-background.css'

// مواقع ثابتة (seeded) عشان الشكل يفضل زي ما هو في كل تحميل
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}
const rand = seeded(42)

const STARS = Array.from({ length: 36 }, (_, id) => ({
  id,
  top: rand() * 100,
  left: rand() * 100,
  size: rand() > 0.75 ? 2 : 1,
  duration: 5 + rand() * 4, // 5–9 ثواني
  delay: -rand() * 9,
  peak: 0.15 + rand() * 0.15, // أقصى شفافية 0.3
}))

const BlueprintBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-primary"
    >
      <div className="absolute inset-0 blueprint-grid" />
      {STARS.map((s) => (
        <span
          key={s.id}
          className="bp-star"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              '--star-duration': `${s.duration}s`,
              '--star-delay': `${s.delay}s`,
              '--star-peak': s.peak,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default BlueprintBackground
