import { useState } from 'react'
import GalleryStation from './GalleryStation'
import ImageLightbox from '../shared/ImageLightbox'
import type { CaseStudyStation } from '../../data/caseStudies'
import type { GalleryImage } from '../../data/projects'

interface CaseStudyGalleryProps {
  stations: CaseStudyStation[]
}

const CaseStudyGallery = ({ stations }: CaseStudyGalleryProps) => {
  const [enlarged, setEnlarged] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="gallery-spine-list">
        {stations.map((station) => (
          <GalleryStation key={station.id} station={station} onEnlarge={setEnlarged} />
        ))}
      </div>
      <div data-spine-end className="gallery-spine-end" aria-hidden="true" />

      {enlarged && (
        <ImageLightbox
          src={enlarged.src}
          alt={enlarged.caption}
          caption={enlarged.caption}
          open
          onClose={() => setEnlarged(null)}
        />
      )}
    </>
  )
}

export default CaseStudyGallery
