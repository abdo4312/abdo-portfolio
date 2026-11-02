import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import BlueprintBackground from '../components/Background/BlueprintBackground'
import CornerMarks from '../components/shared/CornerMarks'
import { useInView } from '../hooks/useInView'
import CaseStudyGallery from '../components/CaseStudy/CaseStudyGallery'
import CaseStudySpine from '../components/CaseStudy/CaseStudySpine'
import { getCaseStudyBySlug } from '../data/caseStudies'
import './case-study.css'

interface CaseStudySectionProps {
  id: string
  index: string
  name: string
  wide?: boolean
  children: ReactNode
}

const CaseStudySection = ({
  id,
  index,
  name,
  wide = false,
  children,
}: CaseStudySectionProps) => {
  const { ref, visible } = useInView<HTMLElement>(0, '0px 0px -20% 0px')
  return (
    <section id={id} ref={ref} className="relative z-10 px-8 lg:px-16 py-20 lg:py-28">
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div
        className={`mx-auto transition-all duration-700 ease-out ${
          wide ? 'max-w-5xl' : 'max-w-4xl'
        } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <h2
          data-spine-heading={id}
          className="inline-block font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-10"
        >
          {'//'} {index} — {name}
        </h2>
        {children}
      </div>
    </section>
  )
}

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const cs = getCaseStudyBySlug(slug)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!cs) {
    return (
      <>
        <BlueprintBackground />
        <Navbar />
        <main className="relative z-10 min-h-screen px-8 pt-44 pb-24 text-center">
          <p className="font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky">
            {'//'} CASE STUDY NOT FOUND
          </p>
          <h1 className="mt-6 font-display font-bold uppercase text-3xl lg:text-5xl text-text-primary">
            {slug}
          </h1>
          <p className="mt-6 font-sans text-text-secondary">
            No case study is published under this address yet.
          </p>
          <Link
            to="/"
            className="mt-10 inline-block px-8 py-4 border border-grid-line font-mono text-sm tracking-widest text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors duration-200"
          >
            ← BACK TO HOME
          </Link>
        </main>
      </>
    )
  }

  const titleWords = cs.title.split(' ')
  const titleTail = titleWords.pop() ?? ''
  const titleHead = titleWords.join(' ')

  return (
    <>
      <BlueprintBackground />
      <Navbar />
      <main className="relative z-10">
        <CaseStudySpine stations={cs.stations}>
          <header className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-40 pb-16 lg:pb-24">
            <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
            <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
            <div className="max-w-5xl mx-auto">
              <Link
                to="/#work"
                className="font-mono text-[11px] tracking-[0.2em] text-text-muted hover:text-blue-sky transition-colors duration-200"
              >
                ← BACK TO WORK
              </Link>
              <p className="mt-14 lg:mt-20 font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky">
                {'//'} CASE STUDY — {cs.slot}
              </p>
              <h1 className="mt-6 font-display font-bold uppercase text-5xl md:text-7xl leading-[0.95] text-text-primary">
                {titleHead && <>{titleHead} </>}
                <span className="text-blue-sky">{titleTail}</span>
              </h1>
              <p className="mt-8 max-w-2xl font-sans text-base lg:text-lg text-text-secondary leading-relaxed">
                {cs.summary}
              </p>
              <dl className="cs-meta" data-spine-meta>
                {cs.meta.map((item) => (
                  <div key={item.label} className="cs-meta-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </header>

          <CaseStudySection id="overview" index="01" name="OVERVIEW">
            <div className="space-y-6" data-spine-obstacle="overview">
              {cs.overview.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraph}
                  className={`font-sans text-base lg:text-lg leading-relaxed ${
                    paragraphIndex === 0 ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="role" index="02" name="MY ROLE & STACK">
            <div className="cs-spec" data-spine-obstacle="role">
              <CornerMarks />
              <dl className="cs-spec-grid">
                <div>
                  <dt>ROLE</dt>
                  <dd>{cs.role}</dd>
                </div>
                <div>
                  <dt>SCOPE</dt>
                  <dd>{cs.roleDetail}</dd>
                </div>
              </dl>
              <div className="cs-spec-stack">
                <p className="cs-spec-stack-label">STACK</p>
                <ul>
                  {cs.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection id="features" index="03" name="KEY FEATURES">
            <ol className="cs-features" data-spine-obstacle="features">
              {cs.features.map((feature, featureIndex) => (
                <li key={feature.label} className="cs-feature">
                  <span className="cs-feature-num">
                    {String(featureIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="cs-feature-label">{feature.label}</h3>
                    <p className="cs-feature-text">{feature.text}</p>
                    <p className="cs-evidence">{feature.evidence}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CaseStudySection>

          <CaseStudySection id="gallery" index="04" name="GALLERY" wide>
            <CaseStudyGallery stations={cs.stations} />
          </CaseStudySection>
        </CaseStudySpine>

        <CaseStudySection id="challenge" index="05" name="TECHNICAL CHALLENGE">
          <h3 className="cs-challenge-title">{cs.challenge.title}</h3>
          <p className="cs-challenge-intro">{cs.challenge.intro}</p>
          <div className="cs-pieces">
            {cs.challenge.pieces.map((piece) => (
              <article key={piece.index} className="cs-piece">
                <CornerMarks />
                <p className="cs-piece-index">MECHANISM {piece.index}</p>
                <h4 className="cs-piece-title">{piece.title}</h4>
                <p className="cs-piece-text">{piece.text}</p>
                <p className="cs-evidence">{piece.evidence}</p>
              </article>
            ))}
          </div>
          <div className="cs-modes">
            <p className="cs-modes-title">ADHAN PLAYBACK MODES</p>
            <table className="cs-modes-table">
              <thead>
                <tr>
                  <th scope="col">MODE</th>
                  <th scope="col">BEHAVIOR</th>
                </tr>
              </thead>
              <tbody>
                {cs.challenge.playbackModes.map((mode) => (
                  <tr key={mode.mode}>
                    <td>{mode.mode}</td>
                    <td>{mode.behavior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="cs-evidence">{cs.challenge.playbackModesNote}</p>
          </div>
        </CaseStudySection>

        <CaseStudySection id="results" index="06" name="RESULTS">
          <ul className="cs-results">
            {cs.results.map((result) => (
              <li key={result} className="cs-result">
                {result}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="next" index="07" name="NEXT PROJECT">
          <Link to={cs.nextProject.href} className="cs-next">
            <CornerMarks />
            <p className="cs-next-label">UP NEXT</p>
            <p className="cs-next-title">
              {cs.nextProject.title} <span aria-hidden="true">→</span>
            </p>
            <p className="cs-next-tagline">{cs.nextProject.tagline}</p>
            <p className="cs-next-note">{cs.nextProject.note}</p>
          </Link>
        </CaseStudySection>
      </main>
    </>
  )
}

export default CaseStudyPage
