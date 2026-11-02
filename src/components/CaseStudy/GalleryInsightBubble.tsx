import { Fragment, useState } from 'react'
import CornerMarks from '../shared/CornerMarks'
import { useGlitchPulse } from '../../hooks/useGlitchPulse'
import './gallery-insight-bubble.css'

interface GalleryInsightBubbleProps {
  text: string
  active?: boolean
}

const GalleryInsightBubble = ({ text, active = true }: GalleryInsightBubbleProps) => {
  const words = text.split(' ')
  // Initializer form: the target word is chosen exactly once per mount and
  // never re-rolls on re-render, without any useEffect involvement.
  const [glitchIndex] = useState(() => Math.floor(Math.random() * words.length))
  const glitching = useGlitchPulse(active)

  return (
    <div className="gallery-insight">
      <CornerMarks />
      <p className="gallery-insight-label">UNDER THE HOOD</p>
      <p className="gallery-insight-text">
        {words.map((word, i) => (
          <Fragment key={i}>
            {i === glitchIndex ? (
              <span
                className={`gallery-insight-glitch${glitching ? ' is-glitching' : ''}`}
                data-text={word}
              >
                {word}
              </span>
            ) : (
              word
            )}
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </p>
    </div>
  )
}

export default GalleryInsightBubble
