// src/components/Projects/ProjectSheet.tsx
import { Link } from 'react-router-dom'
import DrawnFrame from '../DrawnFrame/DrawnFrame'
import ProjectSchematic from './ProjectSchematic'
import CornerMarks from '../shared/CornerMarks'
import { useGlitchPulse } from '../../hooks/useGlitchPulse'
import { getCaseStudyBySlug } from '../../data/caseStudies'
import type { Project } from '../../data/projects'
import '../../styles/glitch.css'
import './projects.css'

interface ProjectSheetProps {
  project: Project
}

const ProjectSheet = ({ project }: ProjectSheetProps) => {
  const glitching = useGlitchPulse(true)
  const caseStudy = getCaseStudyBySlug(project.id)

  const caseStudyHref =
    project.id === 'aroma'
      ? '/work/aroma'
      : caseStudy
        ? `/work/${caseStudy.slug}`
        : undefined

  return (
    <DrawnFrame className="bg-bg-elevated">
      <CornerMarks />

      <div className="sheet-body">
        <ProjectSchematic project={project} />

        <div className="spec-col">
          <h3 className="font-display text-xl text-text-primary mb-6">
            {project.title}
          </h3>

          <dl>
            <div className="mb-6">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-text-muted mb-1.5">
                ROLE
              </dt>
              <dd className="font-mono text-sm text-text-primary">
                {project.role}
              </dd>
            </div>

            <div className="mb-6">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-text-muted mb-1.5">
                STACK
              </dt>
              <dd className="font-mono text-sm text-text-primary">
                {project.stack}
              </dd>
            </div>

            <div className="mb-6">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-text-muted mb-2">
                KEY POINTS
              </dt>
              <dd className="key-points">
                {project.keyPoints.map((point) => (
                  <div key={point.number}>
                    <span className="num">{point.number}</span>
                    {point.text}
                  </div>
                ))}
              </dd>
            </div>

            <div className="mb-6">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-text-muted mb-1.5">
                METRIC
              </dt>
              <dd className="font-mono text-sm text-blue-sky">
                {project.metric}
              </dd>
            </div>
          </dl>

          {caseStudyHref && (
            <Link to={caseStudyHref} className="cta-stamp">
              OPEN CASE STUDY <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>

      <div className={`title-block title-stamp ${glitching ? 'is-glitching' : ''}`}>
        <span data-text={project.titleBlock.dwg}>
          {project.titleBlock.dwg}
        </span>
        <span data-text={project.titleBlock.version}>
          {project.titleBlock.version}
        </span>
        <span className="status" data-text={project.titleBlock.status}>
          {project.titleBlock.status}
        </span>
      </div>
    </DrawnFrame>
  )
}

export default ProjectSheet
