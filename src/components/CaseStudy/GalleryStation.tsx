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

const GalleryStation = ({ station, onEnlarge, compact = false }: GalleryStationProps) => {
  const { ref, visible } = useInView<HTMLElement>(0, '0px 0px -15% 0px')

  if (compact) {
    const single = station.images.length === 1
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
    <article ref={ref} className={`gallery-station ${visible ? 'is-visible' : ''}`}>
      <header className="gallery-station-header" data-station-plate={station.id}>
        <span className="gallery-station-slot">{station.slot}</span>
        <h3 className="gallery-station-title">{station.title}</h3>
        <span className={`gallery-station-difficulty ${difficultyClass(station.difficulty)}`}>
          {difficultyLabel(station.difficulty)}
        </span>
      </header>

      <div className="gallery-station-frames" data-station-frames={station.id}>
        {station.images.map((image) => (
          <button
            key={image.src}
            type="button"
            className="gallery-frame"
            onClick={() => onEnlarge(image)}
            aria-label={`Enlarge — ${image.caption}`}
          >
            <span className="gallery-frame-glitch-stage">
              <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                className="gallery-frame-img-base"
              />
              <img
                src={image.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="gallery-frame-img-glitch is-red-channel"
              />
              <img
                src={image.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="gallery-frame-img-glitch is-cyan-channel"
              />
              <span className="gallery-frame-static" aria-hidden="true" />
            </span>
            <span className="gallery-frame-zoom" aria-hidden="true">
              ⤢ ENLARGE
            </span>
          </button>
        ))}
      </div>

      <div className="gallery-station-insight-wrap" data-station-insight={station.id}>
        <GalleryInsightBubble text={station.insight} active={visible} />
      </div>
    </article>
  )
}

export default GalleryStation
