import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BlueprintBackground from '../components/Background/BlueprintBackground'
import Navbar from '../components/Navbar/Navbar'
import { useInView } from '../hooks/useInView'
import './bookstore-case-study.css'
const REPO_URL = '' as string
const IMG_BASE = '../assets/images/projects/bookstore-case-study/'
const images = import.meta.glob<string>(
  '../assets/images/projects/bookstore-case-study/*.png',
  { eager: true, import: 'default' },
)
const ICON = {
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  view: 'M3 3h18v18H3z M3 9h18 M9 21V9',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  layers: 'M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  coins: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01l-3-3',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
}
const HERO_TAGS = ['[DESKTOP_ENGINEERING]', '[IN_PRODUCTION]', '[RELEASES_V1.3 → V2.4]']
const HERO_META = [
  { k: 'SYSTEM_TYPE', v: 'WINDOWS DESKTOP' },
  { k: 'CORE_STACK', v: 'ELECTRON / REACT / TS' },
  { k: 'ASSIGNMENT', v: 'SOLE DEV & RELEASE ENG' },
  { k: 'LIFECYCLE', v: 'V1.3.0 → V2.4.0', accent: true },
]
const METRICS = [
  {
    label: 'SEASONAL USE',
    value: '100 CUSTOMERS',
    desc: 'Seasonal school-book reservations handled for a real bookstore.',
    icon: ICON.users,
  },
  {
    label: 'INTERFACE',
    value: '7 VIEWS',
    desc: 'One Arabic-first interface for the whole reservation workflow.',
    icon: ICON.view,
  },
  {
    label: 'VERSIONED RELEASES',
    value: 'V1.3.0 → V2.4.0',
    desc: 'Shipped to the store through GitHub Releases.',
    icon: ICON.download,
  },
]
const SPEC_ROWS = [
  { k: 'CLIENT', v: 'A real bookstore' },
  { k: 'DOMAIN', v: 'Seasonal school-book reservations' },
  { k: 'PLATFORM', v: 'Windows desktop' },
  { k: 'STATUS', v: 'In production', accent: true },
  { k: 'INTERFACE', v: 'Arabic-first RTL' },
  { k: 'DATA', v: 'SQLite local-first + optional Supabase' },
  { k: 'SHIPPING', v: 'NSIS installer + GitHub Releases updates' },
  { k: 'GRADES', v: 'Primary and preparatory' },
]
const OVERVIEW = [
  "A real bookstore takes school-book reservations ahead of the school year. Each customer reserves a set of books, usually leaves a deposit (عربون), and comes back later to collect them.",
  "An order is rarely a single book. It is a list of parts that depend on grade and publisher, so the work is less about typing and more about keeping the whole reservation accurate and trackable, from the first deposit to the final status.",
  "Bookstore Order Manager is a Windows desktop app built for that workflow: Arabic-first, local-first, and shipped through versioned releases from v1.3.0 to v2.4.0. I built it end to end as the sole developer and release engineer, using an AI-assisted, human-directed process.",
]
const STAGES = [
  {
    code: 'PHASE_01',
    title: 'REQUIREMENTS',
    text: 'Gathered directly from the bookstore owner.',
    tag: '[SOURCE: STORE_OWNER]',
  },
  {
    code: 'PHASE_02',
    title: 'ARCHITECTURE',
    text: 'Local-first SQLite with Supabase behind a USE_CLOUD flag. Migrations run in the Electron main process.',
    tag: '[DUAL_BACKEND]',
  },
  {
    code: 'PHASE_03',
    title: 'IMPLEMENTATION',
    text: 'Electron and Node on the main side. React, TypeScript, Vite and Tailwind on the UI side.',
    tag: '[ELECTRON + REACT]',
  },
  {
    code: 'PHASE_04',
    title: 'TESTING',
    text: 'A full TypeScript type-check before every sign-off. Regressions are reverted explicitly.',
    tag: '[TYPE_CHECK]',
  },
  {
    code: 'PHASE_05',
    title: 'PACKAGING',
    text: 'The NSIS installer is built from a clean output.',
    tag: '[NSIS_INSTALLER]',
  },
  {
    code: 'PHASE_06',
    title: 'PUBLISHING',
    text: 'GitHub Releases acts as the update feed.',
    tag: '[GITHUB_RELEASES]',
  },
]
const PROBLEMS = [
  {
    code: 'PROB_01',
    title: 'Many parts per order',
    text: 'A single reservation is a list of parts, split by grade and publisher, and every part has to be recorded correctly.',
    foot: 'FRICTION: ORDER ACCURACY',
    icon: ICON.layers,
  },
  {
    code: 'PROB_02',
    title: 'Deposits (عربون)',
    text: 'Customers leave a deposit up front, so every order has to carry its payment state from the start.',
    foot: 'FRICTION: MONEY TRACKING',
    icon: ICON.coins,
  },
  {
    code: 'PROB_03',
    title: 'Status tracking',
    text: 'Each reservation moves through statuses, and staff need to see where every order stands at any moment.',
    foot: 'FRICTION: ORDER FOLLOW-UP',
    icon: ICON.check,
  },
  {
    code: 'PROB_04',
    title: 'Speed under pressure',
    text: 'In the busy season the counter is crowded, so entering and finding orders has to stay fast.',
    foot: 'FRICTION: COUNTER FLOW',
    icon: ICON.zap,
  },
]
const FLOW = [
  { n: '01 // INTAKE', v: 'Customer' },
  { n: '02 // DEPOSIT', v: 'Deposit (عربون)' },
  { n: '03 // RESERVATION', v: 'Reservation order (حجز)' },
  { n: '04 // ITEMS', v: 'Grade × Publisher' },
  { n: '05 // STATUS', v: 'Status' },
]
const CONSTRAINTS = [
  {
    title: '1. Arabic-first interface',
    text: 'The interface is right-to-left from the ground up, with Arabic as the primary language of every screen.',
  },
  {
    title: '2. Local-first data',
    text: 'Orders live in a local SQLite database on the machine. Supabase is an optional backend, selected at build time rather than at runtime.',
  },
  {
    title: '3. Reports match the screen',
    text: 'What an operator filters on screen is what the export contains, so exports do not need manual cleanup.',
  },
]
const MATRIX = [
  {
    need: 'Reservation date on reports',
    feature: 'receivedDate used in every report template',
    where: 'All report templates',
  },
  {
    need: 'Every release ships the latest code',
    feature: 'Two-step release protocol: clean build, then package and publish',
    where: 'Release pipeline',
  },
  {
    need: 'Exports that match the screen',
    feature: 'Export respects the active filter',
    where: 'Excel / PDF exports',
  },
  {
    need: 'No duplicate customers',
    feature: "Customer autocomplete, plus a prompt to add books to the customer's pending order",
    where: 'Order form',
  },
  {
    need: 'Caution with certain customers',
    feature: 'Customer blocking with a reason',
    where: 'Profile + exports',
  },
  {
    need: 'Customer history at a glance',
    feature: 'Customer Profile modal',
    where: 'Customer profile',
  },
]
const LAYERS = [
  {
    head: 'LAYER 4 // PRESENTATION RUNTIME',
    tag: 'REACT + TYPESCRIPT',
    text: 'Arabic-first RTL interface built with React, TypeScript and Tailwind CSS.',
  },
  {
    head: 'LAYER 3 // ELECTRON MAIN PROCESS & IPC',
    tag: 'DB + MIGRATIONS',
    text: 'The Electron main process owns the database and runs schema migrations, exposing data to the UI over IPC.',
  },
  {
    head: 'LAYER 2 // DATA & STORAGE',
    tag: 'SQLITE | SUPABASE',
    text: 'Local SQLite through better-sqlite3, or Supabase, chosen by the USE_CLOUD flag at build time, not at runtime.',
  },
  {
    head: 'LAYER 1 // PACKAGING & UPDATES',
    tag: 'ELECTRON-BUILDER + NSIS',
    text: 'electron-builder produces the NSIS installer, and electron-updater pulls updates from GitHub Releases.',
  },
]
const REPORTS = [
  'Excel through xlsx-js-style, with colored headers and rows.',
  'Salesman Manifest on two sheets: a summary and a per-customer detail, with per-grade colour coding and custom grade sorting.',
  'Customer export that colors active and blocked customers differently.',
  'PDF per order and per batch, plus a thermal receipt.',
]
const STACK = [
  'Electron',
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'SQLite',
  'better-sqlite3',
  'Supabase',
  'xlsx-js-style',
  'electron-builder',
  'electron-updater',
]
const CHALLENGES = [
  {
    n: '01',
    key: 'REPORT_DATES',
    area: 'REPORTING',
    problem:
      'Printed reports needed to show the date a reservation was received (تاريخ الحجز), but not every report template used that date.',
    solution:
      'Every report template now reads the receivedDate field, so the reservation date is consistent across all output.',
    cause: 'Report templates did not share a single source for the reservation date.',
    tag: 'RECEIVED_DATE_EVERYWHERE',
  },
  {
    n: '02',
    key: 'STALE_BUILDS',
    area: 'RELEASE PIPELINE',
    problem: 'An installer could ship with the code of an earlier release instead of the latest changes.',
    solution: 'A two-step release protocol: build clean first, then package and publish from that result.',
    cause: 'Packaging could pick up output left over from a previous build.',
    tag: 'CLEAN_BUILD_THEN_PACKAGE',
  },
  {
    n: '03',
    key: 'EXPORTS_THAT_MATCH_THE_SCREEN',
    area: 'EXPORTS',
    problem: 'An operator would filter orders on screen, but the exported file did not reflect that filter.',
    solution: 'Exports respect the active filter, so the file contains exactly what the screen shows.',
    cause: 'The export step did not receive the filter the operator had applied.',
    tag: 'FILTER_AWARE_EXPORT',
  },
  {
    n: '04',
    key: 'DUPLICATE_CUSTOMERS',
    area: 'CUSTOMER DATA',
    problem: 'The same customer could be entered more than once, splitting their reservations across records.',
    solution:
      "Customer autocomplete while typing, plus a prompt to add new books to the customer's existing pending order.",
    cause: 'Nothing at entry time showed that the customer already existed.',
    tag: 'AUTOCOMPLETE_AND_PROMPT',
  },
  {
    n: '05',
    key: 'CUSTOMER_BLOCKING',
    area: 'CUSTOMER DATA',
    problem:
      'Staff needed a way to flag customers to be careful with, and to see that flag wherever the customer appears.',
    solution:
      'A blocked flag with a reason, added through a database migration (is_blocked, block_reason). It shows in the customer profile and colors exports: red for blocked, green for active.',
    cause: 'Customer records had no field for caution status.',
    tag: 'IS_BLOCKED + BLOCK_REASON',
  },
  {
    n: '06',
    key: 'CUSTOMER_PROFILE',
    area: 'CUSTOMER HISTORY',
    problem: "A customer's history was scattered across orders, with no single place to see it.",
    solution: "A Customer Profile modal with the customer's phone, blocked status and all of their orders.",
    cause: 'Order history was only reachable order by order.',
    tag: 'PROFILE_MODAL',
  },
]
const STEPS = [
  {
    code: 'STEP 01',
    title: 'Analysis',
    text: 'An external AI strategist analyzes the problem and the current code before anything changes.',
  },
  {
    code: 'STEP 02',
    title: 'Approved Plan',
    text: 'A plan is written and approved with a SCOPE LOCK that lists exactly which files may change.',
  },
  {
    code: 'STEP 03',
    title: 'Implementation',
    text: 'An IDE agent implements the approved plan, and only the plan.',
  },
  {
    code: 'STEP 04',
    title: 'Review',
    text: 'The raw modified code is dumped back for review before anything is accepted.',
  },
  {
    code: 'STEP 05',
    title: 'Pass / Fail',
    text: 'Each change ends in an explicit PASS or FAIL before I sign off.',
  },
]
const PROJECT_MAP = `{
  "verified_files": ["<path/to/file>"],
  "completed_tasks": [
    { "id": "<task-id>", "rollback_ref": "<ref>" }
  ],
  "evidence_log": { "type_check": "<output>" },
  "build_state": "PASS",
  "pending_actions": []
}`
const CHECKLIST = [
  'Plan approved before implementation.',
  'Full TypeScript type-check before every sign-off.',
  'Regressions reverted explicitly.',
]
const IMPACT = [
  {
    label: 'RES_01 // UPDATES',
    value: 'AUTO-UPDATE',
    desc: 'Clients receive new versions automatically from GitHub Releases.',
  },
  {
    label: 'RES_02 // DATA SAFETY',
    value: 'SAFE MIGRATIONS',
    desc: 'Migrations check the old schema first, so existing data keeps working across upgrades.',
  },
  {
    label: 'RES_03 // SPEED',
    value: 'FASTER ENTRY',
    desc: 'Autocomplete and the pending-order prompt cut repeat typing at the counter.',
  },
  {
    label: 'RES_04 // REPORTING',
    value: 'ON DEMAND',
    desc: 'Excel, PDF and thermal reports generated from the app when needed.',
  },
  {
    label: 'RES_05 // STATUS',
    value: 'IN PRODUCTION',
    desc: 'A real bookstore, 100 customers, seasonal use.',
  },
]
const PILLARS = [
  {
    code: 'PILLAR 01',
    title: 'Organizational memory',
    text: 'Software for a shop should remember what the staff would otherwise have to: which customers to be careful with, what a customer ordered before, and what was paid.',
    principle: 'PRINCIPLE: SOFTWARE_REMEMBERS',
  },
  {
    code: 'PILLAR 02',
    title: 'The release pipeline is a product',
    text: 'A clean build, a two-step release protocol and versioned updates mean every installer carries the latest code, the same way every time.',
    principle: 'PRINCIPLE: REPEATABLE_RELEASES',
  },
  {
    code: 'PILLAR 03',
    title: 'Local-first, cloud optional',
    text: 'Data lives on the machine first. Supabase stays available as an option, selected at build time rather than at runtime.',
    principle: 'PRINCIPLE: LOCAL_FIRST',
  },
]
const FOOTER_INDEX = [
  { label: '01 // HOME', href: '/' },
  { label: '02 // ABOUT', href: '/#about' },
  { label: '03 // WORK', href: '/#work' },
  { label: '04 // CONTACT', href: '/#contact' },
]
const FOOTER_LINKS = [
  { label: 'GITHUB', href: 'https://github.com/abdo4312' },
  { label: 'EMAIL', href: 'mailto:abdorhamnk134@gmail.com' },
]
  const isInternalLink = (href: string) =>
    href.startsWith('/') || href.startsWith('#')

  const SECTION_CLASS = 'mx-auto max-w-7xl scroll-mt-24 px-6 py-14 lg:px-12 lg:py-20'
const SUBHEAD_CLASS = 'mb-3 font-mono text-[11px] tracking-[0.18em] text-blue-sky uppercase'
const BODY_CLASS = 'font-mono text-xs leading-relaxed text-text-secondary sm:text-[13px]'
const CARD =
  'border border-grid-line bg-bg-secondary transition-colors duration-[180ms] ease-in-out hover:border-blue-sky/60'
const stagger = (i: number): CSSProperties => ({ '--i': i }) as CSSProperties
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useInView<HTMLDivElement>(0, '0px 0px -8% 0px')
  return (
    <div ref={ref} className={`bk-reveal${visible ? ' is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
function Glyph({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
function DimensionLine({ label, center }: { label: string; center: string }) {
  return (
    <div className="border-y border-grid-line/60 bg-bg-secondary/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 font-mono text-[10px] tracking-[0.18em] text-text-muted uppercase lg:px-12">
        <span>{`|← DIMENSION_LINE: ${label}`}</span>
        <span className="hidden md:inline">{center}</span>
        <span className="hidden sm:inline">{`DIMENSION_LINE: ${label} →|`}</span>
      </div>
    </div>
  )
}
function SectionHead({
  num,
  refCode,
  title,
  meta,
}: {
  num: string
  refCode: string
  title: string
  meta: string
}) {
  return (
    <div className="mb-8 flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="font-mono text-xs tracking-[0.14em] whitespace-nowrap text-blue-sky uppercase">
          {`SECTION ${num} // REF.${num}-${refCode}`}
        </span>
        <h2 className="font-display text-xl font-bold tracking-wide text-text-primary uppercase sm:text-2xl">
          {title}
        </h2>
      </div>
      <span className="font-mono text-[11px] tracking-[0.14em] text-text-muted uppercase">{meta}</span>
    </div>
  )
}
function Figure({
  code,
  label,
  file,
  overlay,
  footer,
  className = '',
  style,
}: {
  code: string
  label: string
  file: string
  overlay?: string
  footer?: string
  className?: string
  style?: CSSProperties
}) {
  const src = images[`${IMG_BASE}${file}`]
  return (
    <figure className={`border border-grid-line bg-bg-secondary ${className}`} style={style}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-grid-line px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase">
        <span className="text-text-primary">{label}</span>
        <span className="text-blue-sky">{code}</span>
      </figcaption>
      <div className="relative p-2">
        {src ? (
          <img src={src} alt={label} loading="lazy" className="block h-auto w-full" />
        ) : (
          <div className="flex aspect-video items-center justify-center border border-dashed border-grid-line font-mono text-xs tracking-[0.2em] text-text-muted uppercase">
            SCREENSHOT PENDING
          </div>
        )}
        {overlay ? (
          <span className="absolute right-4 bottom-4 border border-grid-line bg-bg-primary/90 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-blue-sky uppercase">
            {overlay}
          </span>
        ) : null}
      </div>
      {footer ? (
        <div className="border-t border-grid-line px-4 py-2 text-right font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">
          {footer}
        </div>
      ) : null}
    </figure>
  )
}
function FlowDiagram() {
  const { ref, visible } = useInView<HTMLDivElement>(0.35)
  return (
    <div
      ref={ref}
      className={`bk-flow mt-6 border border-grid-line bg-bg-secondary p-5${visible ? ' is-visible' : ''}`}
    >
      <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-blue-sky uppercase">
        {`DOMAIN FLOW DIAGRAM // RESERVATION LIFECYCLE`}
      </p>
      <div className="grid items-stretch gap-3 md:grid-cols-5">
        {FLOW.map((f, i) => (
          <div key={f.n} className="flex items-center" style={stagger(i)}>
            <div className="bk-flow-node flex-1 border border-grid-line bg-bg-elevated px-3 py-3">
              <p className="font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase">{f.n}</p>
              <p className="mt-1 font-mono text-xs text-text-primary">{f.v}</p>
            </div>
            {i < FLOW.length - 1 ? (
              <span className="bk-flow-link hidden text-blue-sky md:block" aria-hidden="true">
                <span className="bk-flow-line" />
                <span className="bk-flow-head" />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
export default function BookstoreCaseStudyPage() {
  const primaryBtn =
    'inline-flex items-center gap-2 bg-blue-sky px-5 py-3 font-mono text-xs font-medium tracking-[0.14em] text-bg-primary uppercase transition-colors duration-[180ms] ease-in-out hover:bg-blue-glow'
  const ghostBtn =
    'inline-flex items-center gap-2 border border-grid-line px-5 py-3 font-mono text-xs tracking-[0.14em] text-text-primary uppercase transition-colors duration-[180ms] ease-in-out hover:border-blue-sky/60 hover:text-blue-sky'
  const location = useLocation()
  const navigate = useNavigate()

  const handleFooterLinkClick = (href: string) => (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()
    const target =
      location.pathname === '/' ? location.pathname + href : '/' + href
    void navigate(target)
  }
  return (
    <div className="relative min-h-screen text-text-primary">
      <BlueprintBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        <div className="border-b border-grid-line/60 bg-bg-secondary/50">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase lg:px-12">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-sky" />
              <span>SYS_STATUS: OPEN TO WORK · POLAND & EASTERN EUROPE</span>
            </span>
            <span className="hidden sm:inline">{`LOC: CAIRO, EGYPT  |  RELEASE: V2.4.0`}</span>
          </div>
        </div>
        <div className="border-b border-grid-line/60">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase lg:px-12">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-sky" />
              <span className="text-blue-sky">{`SELECTED WORK // PROJECT_REF 01`}</span>
              <span className="text-text-muted">/</span>
              <span className="text-text-secondary">ARCH_SPEC: BOOKSTORE_ORDER_MGR</span>
            </span>
            <span className="flex items-center gap-4 text-text-muted">
              <Link to="/work/aroma" className="transition-colors duration-[180ms] hover:text-blue-sky">
                ← PREV_PROJECT [AROMA]
              </Link>
              <span>|</span>
              <Link to="/work/road-to-islam" className="transition-colors duration-[180ms] hover:text-blue-sky">
                NEXT_PROJECT [ROAD_TO_ISLAM] →
              </Link>
            </span>
          </div>
        </div>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
          <Reveal>
            <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <div className="bk-item flex flex-wrap gap-2" style={stagger(0)}>
                  {HERO_TAGS.map((t) => (
                    <span
                      key={t}
                      className="border border-grid-line bg-bg-secondary px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-blue-sky uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h1
                  className="bk-item mt-6 font-display text-4xl leading-[1.02] font-bold tracking-tight uppercase sm:text-5xl lg:text-6xl"
                  style={stagger(1)}
                >
                  Bookstore <span className="text-blue-glow">Order Manager</span>
                </h1>
                <p
                  className="bk-item mt-6 max-w-xl font-mono text-sm leading-relaxed text-text-secondary"
                  style={stagger(2)}
                >
                  A Windows desktop app that runs a real bookstore&apos;s seasonal school-book reservations.
                  Arabic-first, local-first, and shipped through versioned releases.
                </p>
                <div
                  className="bk-item mt-8 grid grid-cols-2 gap-4 border border-grid-line bg-bg-secondary p-4 sm:grid-cols-4"
                  style={stagger(3)}
                >
                  {HERO_META.map((m) => (
                    <div key={m.k}>
                      <p className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">{m.k}</p>
                      <p
                        className={`mt-1 font-mono text-xs tracking-wide uppercase ${
                          m.accent ? 'text-blue-sky' : 'text-text-primary'
                        }`}
                      >
                        {m.v}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bk-item mt-8 flex flex-wrap gap-3" style={stagger(4)}>
                  {REPO_URL ? (
                    <a href={REPO_URL} target="_blank" rel="noreferrer" className={primaryBtn}>
                      VIEW SOURCE [GITHUB]
                    </a>
                  ) : null}
                  <a href="#impact" className={REPO_URL ? ghostBtn : primaryBtn}>
                    JUMP TO RESULTS [↓]
                  </a>
                </div>
              </div>
              <Figure
                className="bk-item"
                style={stagger(5)}
                code="CAD_FIG: 01.1"
                label="ISO_VIEW: ORDER_MANAGER_MAIN_SCREEN"
                file="01-bookstore-main.png"
                overlay="LANG: AR_EG [RTL_ACTIVE]"
                footer="PLATFORM: WINDOWS (x64 NSIS)"
              />
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {METRICS.map((m, i) => (
                <div key={m.label} className={`bk-item ${CARD} p-5`} style={stagger(6 + i)}>
                  <div className="flex items-start justify-between">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">{m.label}</p>
                    <span className="text-blue-sky">
                      <Glyph d={m.icon} />
                    </span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold text-blue-glow lg:text-3xl">{m.value}</p>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-text-secondary">{m.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <DimensionLine label="SPAN_OVERVIEW_SPEC" center="OVERVIEW // CONTEXT" />
        <section id="overview" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="01"
              refCode="OVR"
              title="Overview & Operational Context"
              meta="KEY: CLIENT_SECTOR / EDUCATIONAL RETAIL"
            />
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-5">
                {OVERVIEW.map((p) => (
                  <p key={p} className={BODY_CLASS}>
                    {p}
                  </p>
                ))}
                <div className="border border-grid-line bg-bg-secondary p-4">
                  <p className={BODY_CLASS}>
                    <span className="text-blue-sky">PROJECT BRIEF: </span>
                    Build a dependable Windows app a bookstore can run through its busiest season: fast to use at
                    the counter, safe to update, and able to produce clear reports.
                  </p>
                </div>
              </div>
              <div className="self-start border border-grid-line bg-bg-secondary p-5">
                <p className={SUBHEAD_CLASS}>PROJECT SPECIFICATION SUMMARY</p>
                <dl>
                  {SPEC_ROWS.map((r) => (
                    <div
                      key={r.k}
                      className="flex items-start justify-between gap-4 border-t border-grid-line/60 py-2.5 first:border-t-0"
                    >
                      <dt className="font-mono text-[11px] tracking-[0.14em] text-text-muted uppercase">{r.k}</dt>
                      <dd
                        className={`text-right font-mono text-xs ${r.accent ? 'text-blue-sky' : 'text-text-primary'}`}
                      >
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </section>
        <DimensionLine label="SPAN_ROLE_PIPELINE" center="PHASE_01 → PHASE_06 (END_TO_END_DELIVERY)" />
        <section id="role" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="02"
              refCode="ROLE"
              title="End-to-End Execution Pipeline"
              meta="ROLE: SOLE DEVELOPER & RELEASE ENGINEER"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {STAGES.map((s, i) => (
                <div key={s.code} className={`bk-item flex flex-col ${CARD} p-4`} style={stagger(i)}>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-sky uppercase">{s.code}</p>
                  <h3 className="mt-2 font-display text-base font-bold text-text-primary uppercase">{s.title}</h3>
                  <p className="mt-3 flex-1 font-mono text-[11px] leading-relaxed text-text-secondary">{s.text}</p>
                  <p className="mt-4 font-mono text-[10px] tracking-[0.12em] text-blue-sky uppercase">{s.tag}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 border border-grid-line bg-bg-secondary px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-text-primary uppercase">
                <span className="text-blue-sky">
                  <Glyph d={ICON.users} />
                </span>
                Sole developer & release engineer — end-to-end delivery from requirements to a packaged, published
                release.
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-blue-sky uppercase">
                OWNER: ABDELRHMAN
              </span>
            </div>
          </Reveal>
        </section>
        <DimensionLine label="DOMAIN_PROBLEM_DECOMPOSITION" center="COUNTER_FRICTION // LATENCY_POINTS" />
        <section id="problem" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="03"
              refCode="PRB"
              title="Domain Friction & High-Pressure Bottlenecks"
              meta="DIAGNOSTIC: MANUAL RESERVATION WORKFLOW"
            />
            <p className={`${BODY_CLASS} mb-8 max-w-4xl`}>
              Reservation season puts a lot on a single counter: many parts per order, deposits to track, and
              statuses to follow, all while customers wait. These are the four pressure points the app was built
              around.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROBLEMS.map((p, i) => (
                <div key={p.code} className={`bk-item flex flex-col ${CARD} p-5`} style={stagger(i)}>
                  <div className="flex items-start justify-between">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">{p.code}</p>
                    <span className="text-blue-sky">
                      <Glyph d={p.icon} />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-text-primary">{p.title}</h3>
                  <p className="mt-3 flex-1 font-mono text-xs leading-relaxed text-text-secondary">{p.text}</p>
                  <p className="mt-5 border border-accent-red/30 bg-accent-red/10 px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-accent-red uppercase">
                    {p.foot}
                  </p>
                </div>
              ))}
            </div>
            <FlowDiagram />
            <div className="mt-6 max-w-4xl">
              <Figure code="FIG_01" label="ORDER_EDIT_DIALOG" file="02-bookstore-edit-order.png" />
            </div>
          </Reveal>
        </section>
        <section id="research" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="04"
              refCode="RSC"
              title="Counter Observations & Specification Matrix"
              meta="NEED → FEATURE"
            />
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <p className={SUBHEAD_CLASS}>DESIGN CONSTRAINTS</p>
                <div className="space-y-3">
                  {CONSTRAINTS.map((c, i) => (
                    <div key={c.title} className={`bk-item ${CARD} p-4`} style={stagger(i)}>
                      <p className="font-mono text-xs font-medium text-text-primary">{c.title}</p>
                      <p className="mt-2 font-mono text-[11px] leading-relaxed text-text-secondary">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <p className={SUBHEAD_CLASS}>ENGINEERING REQUIREMENTS CONVERSION</p>
                <div className="overflow-x-auto border border-grid-line bg-bg-secondary">
                  <div className="min-w-[560px]">
                    <div className="grid grid-cols-[1fr_1.6fr_1fr] gap-4 bg-bg-elevated px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-text-secondary uppercase">
                      <span>OPERATIONAL FRICTION</span>
                      <span>ENGINEERED SYSTEM CAPABILITY</span>
                      <span className="text-right">VERIFIED IN</span>
                    </div>
                    {MATRIX.map((r) => (
                      <div
                        key={r.need}
                        className="grid grid-cols-[1fr_1.6fr_1fr] gap-4 border-t border-grid-line/60 px-4 py-3 font-mono text-xs"
                      >
                        <span className="text-blue-sky">{r.need}</span>
                        <span className="text-text-secondary">{r.feature}</span>
                        <span className="text-right text-blue-sky">{r.where}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="architecture" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="05"
              refCode="ARC"
              title="System Topology & Component Deconstruction"
              meta="FOUR TIERS + REPORTING ENGINE"
            />
            <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
              <div>
                <p className={SUBHEAD_CLASS}>FOUR-TIER PLATFORM TOPOLOGY</p>
                <div className="space-y-3">
                  {LAYERS.map((l, i) => (
                    <div key={l.head} className={`bk-item ${CARD} p-4`} style={stagger(i)}>
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.14em] uppercase">
                        <span className="text-blue-sky">{l.head}</span>
                        <span className="text-text-muted">{l.tag}</span>
                      </div>
                      <p className="mt-3 font-mono text-xs leading-relaxed text-text-secondary">{l.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-grid-line bg-bg-secondary p-5">
                  <p className={SUBHEAD_CLASS}>HIGH-PRECISION REPORTING ENGINE</p>
                  <h3 className="font-display text-xl font-bold text-text-primary">Excel, PDF and thermal reports</h3>
                  <p className={`${BODY_CLASS} mt-3`}>
                    Reports are generated from the same data the operator sees on screen.
                  </p>
                  <ol className="mt-4 space-y-3">
                    {REPORTS.map((r, i) => (
                      <li key={r} className="flex gap-3 font-mono text-xs leading-relaxed text-text-secondary">
                        <span className="text-blue-sky">{`0${i + 1}.`}</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 border border-grid-line bg-bg-primary/60 p-3">
                    <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">STACK</p>
                    <div className="flex flex-wrap gap-2">
                      {STACK.map((s) => (
                        <span
                          key={s}
                          className="border border-grid-line bg-bg-elevated px-2 py-1 font-mono text-[11px] text-blue-sky"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Figure code="FIG_02" label="ORDER_REPORT_PDF" file="04-bookstore-order-report.png" />
              </div>
            </div>
          </Reveal>
        </section>
        <section id="challenges" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="06"
              refCode="CHL"
              title="Engineering Hurdles & Architectural Mitigations"
              meta="6 CHALLENGES // ALL RESOLVED"
            />
          </Reveal>
          <div className="space-y-6">
            {CHALLENGES.map((c) => (
              <Reveal key={c.n}>
                <article className="border border-grid-line bg-bg-secondary p-5 lg:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs tracking-[0.16em] uppercase">
                    <span className="text-blue-sky">{`CHALLENGE_${c.n} // ${c.key}`}</span>
                    <span className="text-text-muted">{`AREA: ${c.area}`}</span>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="bk-item border border-grid-line/60 bg-bg-primary/60 p-4" style={stagger(0)}>
                      <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-accent-red uppercase">PROBLEM</p>
                      <p className={BODY_CLASS}>{c.problem}</p>
                    </div>
                    <div className="bk-item border border-grid-line/60 bg-bg-primary/60 p-4" style={stagger(1)}>
                      <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-blue-sky uppercase">SOLUTION</p>
                      <p className={BODY_CLASS}>{c.solution}</p>
                    </div>
                  </div>
                  {c.n === '06' ? (
                    <div className="mt-4 max-w-3xl">
                      <Figure
                        code="FIG_03"
                        label="CUSTOMER_PROFILE_MODAL"
                        file="03-bookstore-customer-profile.png"
                      />
                    </div>
                  ) : null}
                  <div
                    className="bk-item mt-4 flex flex-col gap-1 border border-grid-line/60 bg-bg-primary/60 px-4 py-2 font-mono text-[11px] tracking-[0.06em] sm:flex-row sm:items-center sm:justify-between"
                    style={stagger(2)}
                  >
                    <span className="text-text-muted">{`ROOT CAUSE: ${c.cause}`}</span>
                    <span className="text-blue-sky">{`STATUS: RESOLVED [${c.tag}]`}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="workflow" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="07"
              refCode="WFK"
              title="Verified Dual-Agent Synthesis & Audit Protocol"
              meta="AI-ASSISTED, HUMAN-DIRECTED"
            />
            <p className={`${BODY_CLASS} mb-6 max-w-4xl`}>
              An external AI strategist plans, an IDE agent implements, and I direct every step and sign off on the
              result.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((s, i) => (
                <div key={s.code} className={`bk-item ${CARD} p-4`} style={stagger(i)}>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-sky uppercase">{s.code}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-text-primary">{s.title}</h3>
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-text-secondary">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="border border-grid-line bg-bg-secondary p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                  <span className="text-blue-sky">{`SAMPLE PROJECT_MAP.json // STATE MANIFEST`}</span>
                  <span className="text-text-muted">ILLUSTRATIVE STRUCTURE</span>
                </div>
                <pre className="overflow-x-auto bg-bg-primary p-4 font-mono text-xs leading-relaxed text-text-secondary">
                  {PROJECT_MAP}
                </pre>
              </div>
              <div className="space-y-4">
                <div className="border border-blue-sky bg-bg-secondary p-6 text-center">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-text-secondary uppercase">SIGN-OFF GATE</p>
                  <p className="mt-2 font-display text-2xl font-bold text-blue-glow">PASS</p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-blue-sky uppercase">
                    [CHANGE ACCEPTED]
                  </p>
                </div>
                <div className="border border-grid-line bg-bg-secondary p-5">
                  <p className={SUBHEAD_CLASS}>PRE-FLIGHT COMPLIANCE CHECKLIST</p>
                  <ul className="space-y-2">
                    {CHECKLIST.map((c) => (
                      <li key={c} className="flex gap-2 font-mono text-xs leading-relaxed text-text-secondary">
                        <span className="text-blue-sky">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="impact" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="08"
              refCode="IMP"
              title="Operational Metrics & Verifiable Outcomes"
              meta="IN PRODUCTION · 100 CUSTOMERS · SEASONAL USE"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {IMPACT.map((i, idx) => (
                <div key={i.label} className={`bk-item ${CARD} p-4`} style={stagger(idx)}>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">{i.label}</p>
                  <p className="mt-3 font-display text-xl font-bold text-blue-glow">{i.value}</p>
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-text-secondary">{i.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 border border-grid-line bg-bg-secondary p-4 md:grid-cols-2">
              <div className="border-l-2 border-accent-red bg-bg-primary/60 p-4">
                <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-accent-red uppercase">
                  BEFORE SYSTEM ADOPTION
                </p>
                <p className={BODY_CLASS}>
                  Reservations with many parts, deposits and statuses had to be tracked while the counter was busy.
                </p>
              </div>
              <div className="border-l-2 border-blue-sky bg-bg-primary/60 p-4">
                <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-blue-sky uppercase">
                  AFTER ARCHITECTURAL DEPLOYMENT
                </p>
                <p className={BODY_CLASS}>
                  One Arabic-first app holds orders, deposits and statuses locally, prints reports on demand, and
                  updates itself through versioned releases.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="learned" className={SECTION_CLASS}>
          <Reveal>
            <SectionHead
              num="09"
              refCode="LRN"
              title="Engineering Principles Forged in Production"
              meta="3 PILLARS"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {PILLARS.map((p, i) => (
                <div key={p.code} className={`bk-item flex flex-col ${CARD} p-6`} style={stagger(i)}>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-text-muted uppercase">{p.code}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-text-primary">{p.title}</h3>
                  <p className={`${BODY_CLASS} mt-4 flex-1`}>{p.text}</p>
                  <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-blue-sky uppercase">{p.principle}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="relative z-10 border-t border-grid-line bg-bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:px-12">
          <div className="border-l-2 border-blue-sky pl-4">
            <p className="font-display text-lg font-bold tracking-wide text-text-primary uppercase">
              ABDELRHMAN // FRONTEND_ARCHITECT
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-text-muted uppercase">
              Frontend engineering · React & TypeScript
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-blue-sky uppercase">
              LOC: CAIRO, EGYPT
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-text-muted uppercase">INDEX_REG</p>
            <ul className="space-y-2 font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">
              {FOOTER_INDEX.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={isInternalLink(l.href)
                      ? handleFooterLinkClick(l.href)
                      : undefined}
                    className="transition-colors duration-[180ms] hover:text-blue-sky"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-blue-sky uppercase">LINKS</p>
            <ul className="space-y-2 font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={isInternalLink(l.href)
                      ? handleFooterLinkClick(l.href)
                      : undefined}
                    className="transition-colors duration-[180ms] hover:text-blue-sky"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-dashed border-blue-sky/60 p-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-text-muted uppercase">SPECIFICATION STAMP</p>
            <p className="mt-2 font-display text-lg font-bold text-text-primary uppercase">OPEN TO WORK</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">
              POLAND & EASTERN EUROPE
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-blue-sky uppercase">
              FULL-TIME · FREELANCE
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
