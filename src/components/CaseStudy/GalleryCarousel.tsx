import { useRef, useState } from 'react'
import GalleryStation from './GalleryStation'
import type { CaseStudyStation } from '../../data/caseStudies'
import type { GalleryImage } from '../../data/projects'

interface GalleryCarouselProps {
  stations: CaseStudyStation[]
  onEnlarge: (image: GalleryImage) => void
}

const navButton =
  'flex h-11 w-11 items-center justify-center border border-grid-line font-mono text-sm text-text-primary transition-colors duration-200 hover:border-text-secondary disabled:opacity-40 disabled:hover:border-grid-line'

const GalleryCarousel = ({ stations, onEnlarge }: GalleryCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const last = stations.length - 1

  const handleScroll = () => {
    const el = trackRef.current
    if (!el || el.clientWidth === 0) return
    const next = Math.round(Math.abs(el.scrollLeft) / el.clientWidth)
    setIndex(Math.min(last, Math.max(0, next)))
  }

  const goTo = (target: number) => {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.min(last, Math.max(0, target))
    const sign = getComputedStyle(el).direction === 'rtl' ? -1 : 1
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({
      left: sign * clamped * el.clientWidth,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="App screens by station"
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue-sky [&::-webkit-scrollbar]:hidden"
      >
        {stations.map((station, i) => (
          <div
            key={station.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${stations.length}`}
            className="w-full shrink-0 snap-center snap-always"
          >
            <GalleryStation station={station} onEnlarge={onEnlarge} compact />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous station"
          className={navButton}
        >
          ←
        </button>
        <p
          aria-live="polite"
          className="font-mono text-xs tracking-[0.2em] text-text-secondary"
        >
          {index + 1} / {stations.length}
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === last}
          aria-label="Next station"
          className={navButton}
        >
          →
        </button>
      </div>
    </div>
  )
}

export default GalleryCarousel
