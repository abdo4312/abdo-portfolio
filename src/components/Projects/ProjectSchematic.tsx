import { useState } from 'react'
import ImageLightbox from '../shared/ImageLightbox'
import type { Project } from '../../data/projects'
import './projects.css'

interface ProjectSchematicProps {
  project: Project
}

const ProjectSchematic = ({ project }: ProjectSchematicProps) => {
  const [enlarged, setEnlarged] = useState(false)
  const alt = `${project.title} — real screenshot`

  return (
    <div className="schematic-col">
      <button
        type="button"
        className="schematic-frame"
        onClick={() => setEnlarged(true)}
        aria-label={`Enlarge ${project.title} screenshot`}
      >
        <img
          src={project.image}
          alt={alt}
          className={`schematic-image ${project.viewport === 'mobile' ? 'schematic-image--mobile' : ''}`}
          loading="lazy"
        />
        <span className="schematic-label">{project.viewport.toUpperCase()}</span>
        <span className="schematic-zoom" aria-hidden="true">⤢ ENLARGE</span>
      </button>

      <ImageLightbox
        src={project.image}
        alt={alt}
        caption={project.title}
        open={enlarged}
        onClose={() => setEnlarged(false)}
      />
    </div>
  )
}

export default ProjectSchematic
