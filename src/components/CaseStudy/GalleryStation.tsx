import GalleryInsightBubble from './GalleryInsightBubble'
import { useInView } from '../../hooks/useInView'
import type { CaseStudyStation, StationDifficulty } from '../../data/caseStudies'
import type { GalleryImage } from '../../data/projects'
import './case-study-gallery.css'

interface GalleryStationProps {
  station: CaseStudyStation
  onEnlarge: (image: GalleryImage) => void
  compact?: boolean
}

const difficultyLabel = (difficulty: StationDifficulty): string => {
  if (difficulty === 'complex') return 'COMPLEXITY: CRITICAL'
  if (difficulty === 'medium') return 'COMPLEXITY: HIGH'
  return 'COMPLEXITY: STANDARD'
}

const difficultyClass = (difficulty: StationDifficulty): string => {
  if (difficulty === 'complex') return 'is-critical'
  if (difficulty === 'medium') return 'is-high'
  return ''
}

const difficultyTone = (difficulty: StationDifficulty): string => {
  if (difficulty === 'complex') return 'border-accent-red/40 bg-accent-red/10 text-accent-red'
  if (difficulty === 'medium') return 'border-blue-sky/40 bg-blue-sky/10 text-blue-sky'
  return 'border-grid-line text-text-secondary'
}

const GalleryStation = ({ station, onEnlarge, compact = false }: GalleryStationProps) => {
  const { ref, visible } = useInView<HTMLElement>(0, '0px 0px -15% 0px')
  const single = station.images.length === 1

  if (compact) {
    return (
      <article ref={ref} className="flex flex-col items-center">
        <header className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
          <span className="gallery-station-slot">{station.slot}</span>
          <h3 className="gallery-station-title">{station.title}</h3>
          <span className={`gallery-station-difficulty ${difficultyClass(station.difficulty)}`}>
            {difficultyLabel(station.difficulty)}
          </span>
        </header>

        <div className="mt-5 flex w-full justify-center gap-3">
          {station.images.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onEnlarge(image)}
              aria-label={`Enlarge — ${image.caption}`}
              className={`relative block aspect-[9/20] max-w-56 overflow-hidden border border-grid-line bg-bg-primary/50 transition-colors duration-200 hover:border-blue-sky focus-visible:border-blue-sky focus-visible:outline-none ${
                single ? 'w-3/5' : 'w-[calc(50%-6px)]'
              }`}
            >
              <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center border border-grid-line bg-bg-primary/70 font-mono text-sm text-blue-sky"
              >
                ⤢
              </span>
            </button>
          ))}
        </div>

        <div className="w-full">
          <GalleryInsightBubble text={station.insight} active={visible} />
        </div>
      </article>
    )
  }

  return (
    <article
      ref={ref}
      className="flex h-full flex-col border border-grid-line bg-bg-secondary transition-colors duration-[180ms] ease-in-out hover:border-blue-sky/60"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-grid-line px-4 py-3 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span className="flex items-baseline gap-3">
          <span className="text-blue-sky">{station.slot}</span>
          <h3 className="text-text-primary">{station.title}</h3>
        </span>
        <span className={`border px-2 py-0.5 text-[10px] ${difficultyTone(station.difficulty)}`}>
          {difficultyLabel(station.difficulty)}
        </span>
      </header>

      <div className="grid grid-cols-2 gap-3 p-4">
        {station.images.map((image) => (
          <figure key={image.src} className={single ? 'col-span-2 mx-auto w-[calc(50%-6px)]' : ''}>
            <button
              type="button"
              onClick={() => onEnlarge(image)}
              aria-label={`Enlarge — ${image.caption}`}
              className="relative block aspect-[3/5] w-full cursor-zoom-in overflow-hidden border border-grid-line bg-bg-primary/60 transition-colors duration-[180ms] hover:border-blue-sky/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-sky"
            >
              <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center border border-grid-line bg-bg-primary/90 text-base text-blue-sky"
              >
                ⤢
              </span>
            </button>
            <figcaption className="mt-2 font-mono text-[11px] leading-relaxed text-text-secondary">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-auto px-4 pb-4">
        <GalleryInsightBubble text={station.insight} active={visible} />
      </div>
    </article>
  )
}

export default GalleryStation
