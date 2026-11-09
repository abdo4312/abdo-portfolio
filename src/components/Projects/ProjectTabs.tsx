import { projects } from '../../data/projects'
import { getCaseStudyBySlug } from '../../data/caseStudies'
import { useInView } from '../../hooks/useInView'
import SectionHeader from '../shared/SectionHeader'
import ProjectCard from './ProjectCard'

const getCaseStudyHref = (id: string) => {
  if (id === 'aroma') return '/work/aroma'
  if (id === 'bookstore') return '/work/bookstore'
  const cs = getCaseStudyBySlug(id)
  return cs ? `/work/${cs.slug}` : undefined
}

const ProjectTabs = () => {
  const { ref, visible } = useInView<HTMLElement>(0.1)

  return (
    <section
      id="work"
      ref={ref}
      className="relative px-4 py-16 lg:px-16 lg:py-36"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none max-lg:hidden" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none max-lg:hidden" />

      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out max-lg:duration-500 ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 max-lg:translate-y-3'
        }`}
      >
        <SectionHeader
          eyebrow="03 — FEATURED WORK"
          title="Selected work"
          meta={`${String(projects.length).padStart(2, '0')} PROJECTS`}
        />
        <div className="grid gap-4 max-lg:mx-auto max-lg:max-w-xl lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              caseStudyHref={getCaseStudyHref(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectTabs
