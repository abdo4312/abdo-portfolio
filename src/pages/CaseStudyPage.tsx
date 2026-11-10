import { useLayoutEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import BlueprintBackground from '../components/Background/BlueprintBackground'
import CornerMarks from '../components/shared/CornerMarks'
import Accordion from '../components/shared/Accordion'
import ImageLightbox from '../components/shared/ImageLightbox'
import { useInView } from '../hooks/useInView'
import { useMediaQuery } from '../hooks/useMediaQuery'
import CaseStudyGallery from '../components/CaseStudy/CaseStudyGallery'
import { getCaseStudyBySlug, type CaseStudyContent } from '../data/caseStudies'
import type { GalleryImage } from '../data/projects'
import './case-study.css'

const BODY_CLASS = 'font-mono text-[13px] leading-relaxed text-text-secondary'
const SUBHEAD_CLASS = 'mb-3 font-mono text-[11px] tracking-[0.18em] text-blue-sky uppercase'
const CARD =
  'border border-grid-line bg-bg-secondary transition-colors duration-[180ms] ease-in-out hover:border-blue-sky/60'
const LAST_ODD = 'lg:[&:last-child:nth-child(odd)]:col-span-2'
const PRIMARY_BTN =
  'inline-flex items-center gap-2 bg-blue-sky px-5 py-3 font-mono text-xs font-medium tracking-[0.14em] text-bg-primary uppercase transition-colors duration-[180ms] ease-in-out hover:bg-blue-glow'

interface CaseStudySectionProps {
  id: string
  index: string
  name: string
  children: ReactNode
}

const CaseStudySection = ({ id, index, name, children }: CaseStudySectionProps) => {
  const { ref, visible } = useInView<HTMLElement>(0, '0px 0px -20% 0px')

  return (
    <section id={id} ref={ref} className="relative z-10 px-4 py-14">
      <div
        className={`mx-auto max-w-xl transition-all duration-500 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <h2 className="mb-8 inline-block font-mono text-xs tracking-[0.3em] text-blue-sky">
          {'//'} {index} — {name}
        </h2>
        {children}
      </div>
    </section>
  )
}

interface DesktopSectionProps {
  id: string
  num: string
  refCode: string
  title: string
  meta?: string
  children: ReactNode
}

const DesktopSection = ({ id, num, refCode, title, meta, children }: DesktopSectionProps) => {
  const { ref, visible } = useInView<HTMLElement>(0, '0px 0px -10% 0px')

  return (
    <section id={id} ref={ref} className="mx-auto max-w-7xl scroll-mt-24 px-12 py-20">
      <div
        className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <div className="mb-8 flex items-baseline justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs tracking-[0.14em] whitespace-nowrap text-blue-sky uppercase">
              {`SECTION ${num} // REF.${num}-${refCode}`}
            </span>
            <h2 className="font-display text-2xl font-bold tracking-wide text-text-primary uppercase">
              {title}
            </h2>
          </div>
          {meta ? (
            <span className="font-mono text-[11px] tracking-[0.14em] text-text-muted uppercase">
              {meta}
            </span>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}

const DimensionLine = ({ label, center }: { label: string; center: string }) => (
  <div className="border-y border-grid-line/60 bg-bg-secondary/40">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-12 py-2 font-mono text-[10px] tracking-[0.18em] text-text-muted uppercase">
      <span>{`|← DIMENSION_LINE: ${label}`}</span>
      <span>{center}</span>
      <span>{`DIMENSION_LINE: ${label} →|`}</span>
    </div>
  </div>
)

const splitTitle = (title: string) => {
  const words = title.split(' ')
  const tail = words.pop() ?? ''
  return { head: words.join(' '), tail }
}

const toToken = (value: string) => value.toUpperCase().replace(/[\s-]+/g, '_')

const DesktopCaseStudy = ({ cs }: { cs: CaseStudyContent }) => {
  const [enlarged, setEnlarged] = useState<GalleryImage | null>(null)
  const { ref: heroRef, visible: heroVisible } = useInView<HTMLElement>(
    0,
    '0px 0px -10% 0px',
  )
  const { head, tail } = splitTitle(cs.title)
  const heroImage = cs.stations[0]?.images[0]

  return (
    <main className="relative z-10 pt-20">
      <div className="border-b border-grid-line/60 bg-bg-secondary/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-12 py-2 font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-sky" />
            <span>SYS_STATUS: OPEN TO WORK</span>
          </span>
          <span>LOC: CAIRO, EGYPT</span>
        </div>
      </div>

      <div className="border-b border-grid-line/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-12 py-3 font-mono text-[11px] tracking-[0.16em] uppercase">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-sky" />
            <span className="text-blue-sky">{`SELECTED WORK // ${cs.slot}`}</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">{`ARCH_SPEC: ${toToken(cs.slug)}`}</span>
          </span>
          <span className="flex items-center gap-4 text-text-muted">
            <Link
              to="/work/bookstore"
              className="transition-colors duration-[180ms] hover:text-blue-sky"
            >
              ← PREV_PROJECT [BOOKSTORE]
            </Link>
            <span>|</span>
            <Link
              to={cs.nextProject.href}
              className="transition-colors duration-[180ms] hover:text-blue-sky"
            >
              {`NEXT_PROJECT [${toToken(cs.nextProject.title)}] →`}
            </Link>
          </span>
        </div>
      </div>

      <section ref={heroRef} className="mx-auto max-w-7xl px-12 py-16">
        <div
          className={`grid grid-cols-[1.25fr_1fr] items-start gap-10 transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <div>
            <Link
              to="/#work"
              className="font-mono text-[11px] tracking-[0.2em] text-text-muted transition-colors duration-[180ms] hover:text-blue-sky"
            >
              ← BACK TO WORK
            </Link>
            <p className="mt-8 font-mono text-sm tracking-[0.3em] text-blue-sky">
              {'//'} CASE STUDY — {cs.slot}
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[1.02] font-bold tracking-tight text-text-primary uppercase">
              {head && <>{head} </>}
              <span className="text-blue-glow">{tail}</span>
            </h1>
            <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-text-secondary">
              {cs.summary}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border border-grid-line bg-bg-secondary p-4">
              {cs.meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-mono text-xs tracking-wide text-text-primary uppercase">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <a href="#results" className={PRIMARY_BTN}>
                JUMP TO RESULTS [↓]
              </a>
            </div>
          </div>

          {heroImage ? (
            <figure className="mx-auto w-full max-w-xs border border-grid-line bg-bg-secondary">
              <figcaption className="flex items-center justify-between gap-3 border-b border-grid-line px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase">
                <span className="text-text-primary">{heroImage.caption}</span>
                <span className="text-blue-sky">FIG_01</span>
              </figcaption>
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => setEnlarged(heroImage)}
                  aria-label={`Enlarge — ${heroImage.caption}`}
                  className="relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-sky"
                >
                  <img
                    src={heroImage.src}
                    alt={heroImage.caption}
                    className="block h-auto w-full"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center border border-grid-line bg-bg-primary/90 text-base text-blue-sky"
                  >
                    ⤢
                  </span>
                </button>
              </div>
            </figure>
          ) : null}
        </div>
      </section>

      <DimensionLine label="SPAN_OVERVIEW" center="OVERVIEW" />

      <DesktopSection id="overview" num="01" refCode="OVR" title="Overview">
        <div className="max-w-4xl space-y-5">
          {cs.overview.map((paragraph, paragraphIndex) => (
            <p
              key={paragraph}
              className={`${BODY_CLASS} ${paragraphIndex === 0 ? '!text-text-primary' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </DesktopSection>

      <DimensionLine label="SPAN_ROLE_STACK" center="MY ROLE & STACK" />

      <DesktopSection id="role" num="02" refCode="ROLE" title="My role & stack">
        <div className="grid grid-cols-5 gap-4">
          <div className={`col-span-2 p-5 ${CARD}`}>
            <p className={SUBHEAD_CLASS}>ROLE</p>
            <p className="font-mono text-xs leading-relaxed text-text-primary">{cs.role}</p>
          </div>
          <div className={`col-span-3 p-5 ${CARD}`}>
            <p className={SUBHEAD_CLASS}>SCOPE</p>
            <p className="font-mono text-xs leading-relaxed text-text-primary">{cs.roleDetail}</p>
          </div>
          <div className="col-span-5 border border-grid-line bg-bg-secondary p-5">
            <p className={SUBHEAD_CLASS}>STACK</p>
            <ul className="flex flex-wrap gap-2">
              {cs.stack.map((item) => (
                <li
                  key={item}
                  className="border border-grid-line bg-bg-elevated px-2 py-1 font-mono text-[11px] text-blue-sky"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DesktopSection>

      <DesktopSection
        id="features"
        num="03"
        refCode="FTR"
        title="Key features"
        meta={`${cs.features.length} FEATURES`}
      >
        <ol className="grid grid-cols-2 gap-4">
          {cs.features.map((feature, featureIndex) => (
            <li key={feature.label} className={`flex flex-col p-5 ${CARD} ${LAST_ODD}`}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-sky">
                {String(featureIndex + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold text-text-primary uppercase">
                {feature.label}
              </h3>
              <p className={`${BODY_CLASS} mt-3`}>{feature.text}</p>
              <p className="cs-evidence">{feature.evidence}</p>
            </li>
          ))}
        </ol>
      </DesktopSection>

      <DesktopSection
        id="gallery"
        num="04"
        refCode="GAL"
        title="Gallery"
        meta={`${cs.stations.length} STATIONS`}
      >
        <CaseStudyGallery stations={cs.stations} />
      </DesktopSection>

      <DimensionLine label="SPAN_TECHNICAL_CHALLENGE" center="TECHNICAL CHALLENGE" />

      <DesktopSection
        id="challenge"
        num="05"
        refCode="CHL"
        title="Technical challenge"
        meta={`${cs.challenge.pieces.length} MECHANISMS`}
      >
        <h3 className="font-display text-2xl font-bold tracking-wide text-text-primary uppercase">
          {cs.challenge.title}
        </h3>
        <p className={`${BODY_CLASS} mt-4 max-w-3xl`}>{cs.challenge.intro}</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          {cs.challenge.pieces.map((piece) => (
            <article key={piece.index} className={`flex flex-col p-6 ${CARD} ${LAST_ODD}`}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-blue-sky uppercase">
                MECHANISM {piece.index}
              </p>
              <h4 className="mt-3 font-display text-lg font-bold text-text-primary">
                {piece.title}
              </h4>
              <p className={`${BODY_CLASS} mt-3`}>{piece.text}</p>
              <p className="cs-evidence">{piece.evidence}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <p className={SUBHEAD_CLASS}>ADHAN PLAYBACK MODES</p>
          <div className="border border-grid-line bg-bg-secondary">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-bg-elevated">
                  <th
                    scope="col"
                    className="px-4 py-2 font-mono text-[10px] font-normal tracking-[0.16em] text-text-secondary uppercase"
                  >
                    MODE
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 font-mono text-[10px] font-normal tracking-[0.16em] text-text-secondary uppercase"
                  >
                    BEHAVIOR
                  </th>
                </tr>
              </thead>
              <tbody>
                {cs.challenge.playbackModes.map((mode) => (
                  <tr key={mode.mode} className="border-t border-grid-line/60">
                    <td className="px-4 py-3 align-top font-mono text-xs tracking-[0.12em] whitespace-nowrap text-blue-sky">
                      {mode.mode}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs leading-relaxed text-text-secondary">
                      {mode.behavior}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cs-evidence">{cs.challenge.playbackModesNote}</p>
        </div>
      </DesktopSection>

      <DesktopSection
        id="results"
        num="06"
        refCode="RES"
        title="Results"
        meta={`${cs.results.length} RESULTS`}
      >
        <ul className="grid grid-cols-2 gap-4">
          {cs.results.map((result, resultIndex) => (
            <li key={result} className={`p-5 ${CARD} ${LAST_ODD}`}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-text-muted uppercase">
                {`RES_${String(resultIndex + 1).padStart(2, '0')}`}
              </p>
              <p className={`${BODY_CLASS} mt-3`}>{result}</p>
            </li>
          ))}
        </ul>
      </DesktopSection>

      <DesktopSection id="next" num="07" refCode="NXT" title="Next project">
        <Link
          to={cs.nextProject.href}
          className="block border border-grid-line bg-bg-secondary p-10 text-center transition-colors duration-[180ms] ease-in-out hover:border-blue-sky/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-sky"
        >
          <p className="font-mono text-[11px] tracking-[0.18em] text-text-muted uppercase">
            UP NEXT
          </p>
          <p className="mt-3 font-display text-4xl font-bold tracking-wide text-text-primary uppercase">
            {cs.nextProject.title} <span aria-hidden="true">→</span>
          </p>
          <p className="mt-3 font-mono text-xs text-text-secondary">{cs.nextProject.tagline}</p>
          <p className="mt-6 inline-block border border-grid-line px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-text-muted">
            {cs.nextProject.note}
          </p>
        </Link>
      </DesktopSection>

      {enlarged && (
        <ImageLightbox
          src={enlarged.src}
          alt={enlarged.caption}
          caption={enlarged.caption}
          open
          onClose={() => setEnlarged(null)}
        />
      )}
    </main>
  )
}

const MobileCaseStudy = ({ cs }: { cs: CaseStudyContent }) => {
  const { head, tail } = splitTitle(cs.title)

  return (
    <main className="relative z-10">
      <header className="relative z-10 px-4 pt-24 pb-12">
        <div className="mx-auto max-w-xl">
          <Link
            to="/#work"
            className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.2em] text-text-secondary transition-colors duration-200 hover:text-blue-sky"
          >
            ← BACK TO WORK
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.3em] text-blue-sky">
            {'//'} CASE STUDY — {cs.slot}
          </p>
          <h1 className="mt-6 font-display text-[2.5rem] leading-[0.95] font-bold text-text-primary uppercase sm:text-5xl md:text-7xl">
            {head && <>{head} </>}
            <span className="text-blue-sky">{tail}</span>
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
            {cs.summary}
          </p>
          <dl className="cs-meta">
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
        <div className="space-y-5">
          {cs.overview.map((paragraph, paragraphIndex) => (
            <p
              key={paragraph}
              className={`font-sans text-[15px] leading-relaxed ${
                paragraphIndex === 0 ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection id="role" index="02" name="MY ROLE & STACK">
        <div className="cs-spec">
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
        <div className="space-y-3">
          {cs.features.map((feature, featureIndex) => (
            <Accordion
              key={feature.label}
              title={
                <span className="flex items-baseline gap-3">
                  <span className="text-blue-sky">
                    {String(featureIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-text-primary uppercase">{feature.label}</span>
                </span>
              }
            >
              <p className="cs-feature-text">{feature.text}</p>
              <p className="cs-evidence">{feature.evidence}</p>
            </Accordion>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection id="gallery" index="04" name="GALLERY">
        <CaseStudyGallery stations={cs.stations} />
      </CaseStudySection>

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
  )
}

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const cs = getCaseStudyBySlug(slug)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!cs) {
    return (
      <>
        <BlueprintBackground />
        <Navbar />
        <main className="relative z-10 min-h-screen px-8 pt-44 pb-24 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-blue-sky lg:text-sm">
            {'//'} CASE STUDY NOT FOUND
          </p>
          <h1 className="mt-6 font-display text-3xl font-bold text-text-primary uppercase lg:text-5xl">
            {slug}
          </h1>
          <p className="mt-6 font-sans text-text-secondary">
            No case study is published under this address yet.
          </p>
          <Link
            to="/"
            className="mt-10 inline-block border border-grid-line px-8 py-4 font-mono text-sm tracking-widest text-text-secondary transition-colors duration-200 hover:border-text-secondary hover:text-text-primary"
          >
            ← BACK TO HOME
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <BlueprintBackground />
      <Navbar />
      {desktop ? <DesktopCaseStudy cs={cs} /> : <MobileCaseStudy cs={cs} />}
    </>
  )
}

export default CaseStudyPage
