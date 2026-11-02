import { useState } from 'react'
import { projects } from '../../data/projects'
import { useInView } from '../../hooks/useInView'
import ProjectSheet from './ProjectSheet'
import './projects.css'

const ProjectTabs = () => {
  const { ref, visible } = useInView<HTMLElement>(0.15)
  const [activeId, setActiveId] = useState(projects[0].id)

  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0]

  return (
    <section
      id="work"
      ref={ref}
      className="relative px-8 lg:px-16 py-28 lg:py-36"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />

      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-10">
          {'//'} 03 — FEATURED WORK
        </h2>

        <div className="project-tabs" role="tablist" aria-label="Featured projects">
          {projects.map((project) => (
            <button
              key={project.id}
              role="tab"
              aria-selected={activeId === project.id}
              onClick={() => setActiveId(project.id)}
              className={`project-tab ${activeId === project.id ? 'is-active' : ''}`}
            >
              {project.tabLabel}
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-label={activeProject.title}>
          <ProjectSheet key={activeProject.id} project={activeProject} />
        </div>
      </div>
    </section>
  )
}

export default ProjectTabs
