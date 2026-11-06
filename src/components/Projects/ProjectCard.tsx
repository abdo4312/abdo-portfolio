import { useState } from 'react'
import { Link } from 'react-router-dom'
import CornerMarks from '../shared/CornerMarks'
import ImageLightbox from '../shared/ImageLightbox'
import type { Project } from '../../data/projects'
import './projects.css'

interface ProjectCardProps {
  project: Project
  index: number
  total: number
  caseStudyHref?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

const ProjectCard = ({ project, index, total, caseStudyHref }: ProjectCardProps) => {
  const [enlarged, setEnlarged] = useState(false)
  const alt = `${project.title} — real screenshot`
  const isMobile = project.viewport === 'mobile'

  return (
    <article className="relative flex flex-col border border-grid-line bg-bg-secondary/30">
      <CornerMarks />

      <div className="flex items-center justify-between border-b border-grid-line px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-text-muted">
        <span>
          PROJECT_REF: {pad(index + 1)}/{pad(total)}
        </span>
        <span>{project.viewport.toUpperCase()}</span>
      </div>

      <button
        type="button"
        onClick={() => setEnlarged(true)}
        aria-label={`Enlarge ${project.title} screenshot`}
        className="group relative block w-full aspect-[4/3] overflow-hidden border-b border-grid-line bg-bg-primary/50 cursor-zoom-in transition-colors duration-200 hover:border-blue-sky focus-visible:outline-none focus-visible:border-blue-sky"
      >
        <img
          src={project.image}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-contain ${isMobile ? 'p-4' : ''}`}
        />
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 border border-grid-line bg-bg-primary/70 px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] text-blue-sky opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          ⤢ ENLARGE
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="mb-2 font-mono text-[11px] tracking-[0.2em] text-blue-sky">
          {project.tabLabel}
        </p>
        <h3 className="mb-1 font-display text-xl font-bold text-text-primary">
          {project.title}
        </h3>
        <p className="mb-5 font-mono text-xs leading-relaxed text-text-secondary">
          {project.role}
        </p>

        <ul className="mb-5 space-y-2 key-points-list">
          {project.keyPoints.map((p) => (
            <li key={p.number} className="flex gap-2 font-sans text-sm text-text-secondary">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-blue-sky font-mono text-[9px] text-blue-sky">
                {p.number}
              </span>
              {p.text}
            </li>
          ))}
        </ul>

        <p className="mb-1 font-mono text-[10px] tracking-[0.15em] text-text-muted">STACK</p>
        <p className="mb-4 font-mono text-xs text-text-primary">{project.stack}</p>
        <p className="mb-6 font-mono text-xs text-blue-sky">{project.metric}</p>

        <div className="mt-auto">
          {caseStudyHref ? (
            <Link to={caseStudyHref} className="cta-stamp">
              OPEN CASE STUDY <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setEnlarged(true)}
              className="cta-stamp cursor-pointer"
            >
              ENLARGE SCREENSHOT <span aria-hidden="true">⤢</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-grid-line px-5 py-3 font-mono text-[10px] tracking-[0.1em] text-text-muted">
        <span>{project.titleBlock.dwg}</span>
        <span>{project.titleBlock.version}</span>
        <span className="text-accent-red">{project.titleBlock.status}</span>
      </div>

      <ImageLightbox
        src={project.image}
        alt={alt}
        caption={project.title}
        open={enlarged}
        onClose={() => setEnlarged(false)}
      />
    </article>
  )
}

export default ProjectCard
