import GalleryInsightBubble from './GalleryInsightBubble'
import { useInView } from '../../hooks/useInView'
import type { CaseStudyStation, StationDifficulty } from '../../data/caseStudies'
import type { GalleryImage } from '../../data/projects'
import './case-study-gallery.css'

interface GalleryStationProps {
  station: CaseStudyStation
  onEnlarge: (image: GalleryImage) => void
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

const GalleryStation = ({ station, onEnlarge }: GalleryStationProps) => {
  const { ref, visible } = useInView<HTMLElement>(0, '0px 0px -15% 0px')

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
