import { useState } from 'react'
import GalleryStation from './GalleryStation'
import GalleryCarousel from './GalleryCarousel'
import ImageLightbox from '../shared/ImageLightbox'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { CaseStudyStation } from '../../data/caseStudies'
import type { GalleryImage } from '../../data/projects'

interface CaseStudyGalleryProps {
  stations: CaseStudyStation[]
}

const CaseStudyGallery = ({ stations }: CaseStudyGalleryProps) => {
  const [enlarged, setEnlarged] = useState<GalleryImage | null>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      {desktop ? (
        <div className="grid grid-cols-2 gap-4">
          {stations.map((station) => (
            <GalleryStation
              key={station.id}
              station={station}
              onEnlarge={setEnlarged}
            />
          ))}
        </div>
      ) : (
        <GalleryCarousel stations={stations} onEnlarge={setEnlarged} />
      )}

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
