import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CaseStudyStation } from '../../data/caseStudies'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import './gallery-spine.css'

gsap.registerPlugin(ScrollTrigger)

interface CaseStudySpineProps {
  stations: CaseStudyStation[]
  children: ReactNode
}

const PRE_SECTIONS = ['overview', 'role', 'features'] as const
const STATION_SEGS = [
  'in',
  'frames-left',
  'frames-right',
  'mid',
  'insight-left',
  'insight-right',
] as const

const ELBOW = 14
const SIDE_PAD = 44
const TOP_CLEARANCE = 32
const BOTTOM_CLEARANCE = 34
const BOX_CLEARANCE = 24
const EDGE_MARGIN = 14

interface DrawTrack {
  startTime: number
  endTime: number
  leftPath: SVGPathElement
  leftLen: number
  rightPath?: SVGPathElement
  rightLen?: number
  isCritical?: boolean
}

interface NodeDef {
  id: string
  isJunction?: boolean
}

interface LayoutBox {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

const getLayoutBox = (el: HTMLElement, root: HTMLElement): LayoutBox => {
  let top = 0
  let left = 0
  let curr: HTMLElement | null = el
  while (curr && curr !== root) {
    top += curr.offsetTop
    left += curr.offsetLeft
    curr = curr.offsetParent as HTMLElement | null
  }
  const width = el.offsetWidth
  const height = el.offsetHeight
  return {
    top,
    bottom: top + height,
    left,
    right: left + width,
    width,
    height,
  }
}

const CaseStudySpine = ({ stations, children }: CaseStudySpineProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const tipPrimaryRef = useRef<SVGGElement>(null)
  const tipSecondaryRef = useRef<SVGGElement>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    const root = rootRef.current
    if (!root || !desktop) return

    const timeouts = new Set<number>()
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id)
        fn()
      }, ms)
      timeouts.add(id)
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | undefined
    let ambientInterval: number | undefined
    let rafId = 0
    let disposed = false

    const setup = () => {
      ctx = gsap.context(() => {
        const rootWidth = root.offsetWidth
        if (rootWidth === 0) return
        const cx = rootWidth / 2

        const pathMap = new Map<string, SVGPathElement>()
        root.querySelectorAll<SVGPathElement>('[data-spine-path]').forEach((el) => {
          const key = el.getAttribute('data-spine-path')
          if (key) pathMap.set(key, el)
        })

        const nodeMap = new Map<string, SVGGElement>()
        root.querySelectorAll<SVGGElement>('[data-spine-node]').forEach((el) => {
          const key = el.getAttribute('data-spine-node')
          if (key) nodeMap.set(key, el)
        })

        const clampX = (x: number) =>
          Math.max(EDGE_MARGIN, Math.min(rootWidth - EDGE_MARGIN, x))

        const rel = (el: HTMLElement) => getLayoutBox(el, root)

        const relGroup = (container: HTMLElement, childSelector: string): LayoutBox => {
          const children = Array.from(
            container.querySelectorAll<HTMLElement>(childSelector),
          )
          if (children.length === 0) return rel(container)
          const boxes = children.map((c) => rel(c))
          const top = Math.min(...boxes.map((b) => b.top))
          const bottom = Math.max(...boxes.map((b) => b.bottom))
          const left = Math.min(...boxes.map((b) => b.left))
          const right = Math.max(...boxes.map((b) => b.right))
          return {
            top,
            bottom,
            left,
            right,
            width: right - left,
            height: bottom - top,
          }
        }

        const getPath = (key: string) => pathMap.get(key)
        const positionNode = (key: string, x: number, y: number) => {
          const node = nodeMap.get(key)
          if (node) {
            node.setAttribute('transform', `translate(${x}, ${y})`)
            node.style.opacity = '1'
          }
        }

        const makeSplitPaths = (
          topY: number,
          bottomY: number,
          leftX: number,
          rightX: number,
        ) => {
          const vSpan = Math.max(bottomY - topY, 28)
          const lSpan = Math.max(cx - leftX, 18)
          const rSpan = Math.max(rightX - cx, 18)
          const r = Math.min(ELBOW, vSpan / 3, lSpan / 3, rSpan / 3)

          const dLeft = [
            `M ${cx} ${topY}`,
            `L ${leftX + r} ${topY}`,
            `Q ${leftX} ${topY} ${leftX} ${topY + r}`,
            `L ${leftX} ${bottomY - r}`,
            `Q ${leftX} ${bottomY} ${leftX + r} ${bottomY}`,
            `L ${cx} ${bottomY}`,
          ].join(' ')

          const dRight = [
            `M ${cx} ${topY}`,
            `L ${rightX - r} ${topY}`,
            `Q ${rightX} ${topY} ${rightX} ${topY + r}`,
            `L ${rightX} ${bottomY - r}`,
            `Q ${rightX} ${bottomY} ${rightX - r} ${bottomY}`,
            `L ${cx} ${bottomY}`,
          ].join(' ')

          return { dLeft, dRight }
        }

        const draw = (el: SVGPathElement, d: string) => {
          el.setAttribute('d', d)
          const len = el.getTotalLength()
          el.style.strokeDasharray = `${len}`
          el.style.strokeDashoffset = prefersReduced ? '0' : `${len}`
          return len
        }

        const tl = prefersReduced ? undefined : gsap.timeline()
        const tracks: DrawTrack[] = []
        const allActivePaths: SVGPathElement[] = []
        const criticalFramesEls: HTMLElement[] = []

        const addSingleToTimeline = (
          pEl: SVGPathElement,
          len: number,
          verticalSpan: number,
        ) => {
          allActivePaths.push(pEl)
          if (!tl) return
          const duration = Math.max(verticalSpan, 8)
          const startTime = tl.duration()
          tl.to(pEl, { strokeDashoffset: 0, duration, ease: 'none' }, '>')
          tracks.push({
            startTime,
            endTime: startTime + duration,
            leftPath: pEl,
            leftLen: len,
          })
        }

        const addSplitToTimeline = (
          pLeft: SVGPathElement,
          leftLen: number,
          pRight: SVGPathElement,
          rightLen: number,
          verticalSpan: number,
          isCritical = false,
        ) => {
          allActivePaths.push(pLeft, pRight)
          if (!tl) return
          const duration = Math.max(verticalSpan, 12)
          const startTime = tl.duration()
          tl.to(pLeft, { strokeDashoffset: 0, duration, ease: 'none' }, '>')
          tl.to(pRight, { strokeDashoffset: 0, duration, ease: 'none' }, '<')
          tracks.push({
            startTime,
            endTime: startTime + duration,
            leftPath: pLeft,
            leftLen,
            rightPath: pRight,
            rightLen,
            isCritical,
          })
        }

        const pulsePaths = (els: (SVGPathElement | undefined)[], ms = 480) => {
          els.forEach((el) => el?.classList.add('is-bursting'))
          later(() => {
            els.forEach((el) => el?.classList.remove('is-bursting'))
          }, ms)
        }

        const pulseNode = (key: string, ms = 600) => {
          const node = nodeMap.get(key)
          if (!node) return
          node.classList.add('is-bursting')
          later(() => node.classList.remove('is-bursting'), ms)
        }

        const pulseFramesStatic = (framesEl: HTMLElement, ms = 780) => {
          framesEl.classList.add('is-glitching')
          later(() => framesEl.classList.remove('is-glitching'), ms)
        }

        // 1. ORIGIN: .cs-meta dual lines -> central junction
        const metaEl = root.querySelector<HTMLElement>('[data-spine-meta]')
        const pMetaLeft = getPath('meta:left')
        const pMetaRight = getPath('meta:right')

        let cursorY = 0
        if (metaEl && pMetaLeft && pMetaRight) {
          const metaRect = rel(metaEl)
          const inset = Math.min(48, metaRect.width * 0.14)
          const mLeftX = clampX(metaRect.left + inset)
          const mRightX = clampX(metaRect.right - inset)
          const mBottom = metaRect.bottom
          const junctionY = mBottom + 48
          const r = ELBOW

          const dMetaLeft = `M ${mLeftX} ${mBottom} L ${mLeftX} ${junctionY - r} Q ${mLeftX} ${junctionY} ${mLeftX + r} ${junctionY} L ${cx} ${junctionY}`
          const dMetaRight = `M ${mRightX} ${mBottom} L ${mRightX} ${junctionY - r} Q ${mRightX} ${junctionY} ${mRightX - r} ${junctionY} L ${cx} ${junctionY}`

          const lLen = draw(pMetaLeft, dMetaLeft)
          const rLen = draw(pMetaRight, dMetaRight)
          addSplitToTimeline(pMetaLeft, lLen, pMetaRight, rLen, junctionY - mBottom)

          positionNode('meta:junction', cx, junctionY)
          cursorY = junctionY

          if (!prefersReduced) {
            ScrollTrigger.create({
              trigger: metaEl,
              start: 'bottom 80%',
              onEnter: () => {
                pulsePaths([pMetaLeft, pMetaRight], 550)
                pulseNode('meta:junction', 700)
              },
              onEnterBack: () => pulseNode('meta:junction', 600),
            })
          }
        }

        // 2. PRE-GALLERY SECTIONS: 01 OVERVIEW, 02 ROLE, 03 FEATURES
        PRE_SECTIONS.forEach((secId) => {
          const obsEl = root.querySelector<HTMLElement>(`[data-spine-obstacle="${secId}"]`)
          const headingEl = root.querySelector<HTMLElement>(`[data-spine-heading="${secId}"]`)
          const pIn = getPath(`sec:${secId}:in`)
          const pLeft = getPath(`sec:${secId}:left`)
          const pRight = getPath(`sec:${secId}:right`)
          if (!obsEl || !pIn || !pLeft || !pRight) return

          const obsRect = rel(obsEl)
          const headRect = headingEl ? rel(headingEl) : obsRect

          const blockTop = Math.min(headRect.top, obsRect.top)
          const blockLeft = Math.min(headRect.left, obsRect.left)
          const blockRight = Math.max(headRect.right, obsRect.right)

          const splitTop = Math.max(cursorY + 18, blockTop - TOP_CLEARANCE)
          const splitBottom = obsRect.bottom + BOTTOM_CLEARANCE
          const leftX = clampX(blockLeft - SIDE_PAD)
          const rightX = clampX(blockRight + SIDE_PAD)

          const dIn = `M ${cx} ${cursorY} L ${cx} ${splitTop}`
          const { dLeft, dRight } = makeSplitPaths(splitTop, splitBottom, leftX, rightX)

          const inLen = draw(pIn, dIn)
          const leftLen = draw(pLeft, dLeft)
          const rightLen = draw(pRight, dRight)

          addSingleToTimeline(pIn, inLen, splitTop - cursorY)
          addSplitToTimeline(pLeft, leftLen, pRight, rightLen, splitBottom - splitTop)

          positionNode(`sec:${secId}:split`, cx, splitTop)
          positionNode(`sec:${secId}:merge`, cx, splitBottom)
          cursorY = splitBottom

          if (!prefersReduced) {
            ScrollTrigger.create({
              trigger: obsEl,
              start: 'top 74%',
              onEnter: () => {
                pulsePaths([pLeft, pRight], 520)
                pulseNode(`sec:${secId}:split`, 550)
              },
              onEnterBack: () => {
                pulsePaths([pLeft, pRight], 450)
                pulseNode(`sec:${secId}:merge`, 550)
              },
            })
          }
        })

        // 3. SECTION 04 — GALLERY STATIONS (Frames Split + Insight Bubble Split)
        stations.forEach((station) => {
          const plate = root.querySelector<HTMLElement>(
            `[data-station-plate="${station.id}"]`,
          )
          const frames = root.querySelector<HTMLElement>(
            `[data-station-frames="${station.id}"]`,
          )
          const insightWrap = root.querySelector<HTMLElement>(
            `[data-station-insight="${station.id}"]`,
          )
          const insightBox =
            insightWrap?.querySelector<HTMLElement>('.gallery-insight') ?? insightWrap

          const pIn = getPath(`st:${station.id}:in`)
          const pFLeft = getPath(`st:${station.id}:frames-left`)
          const pFRight = getPath(`st:${station.id}:frames-right`)
          const pMid = getPath(`st:${station.id}:mid`)
          const pILeft = getPath(`st:${station.id}:insight-left`)
          const pIRight = getPath(`st:${station.id}:insight-right`)

          if (
            !plate ||
            !frames ||
            !insightBox ||
            !pIn ||
            !pFLeft ||
            !pFRight ||
            !pMid ||
            !pILeft ||
            !pIRight
          ) {
            return
          }

          const plateRect = rel(plate)
          const framesRect = relGroup(frames, '.gallery-frame')
          const insightRect = rel(insightBox)

          const plateTop = Math.max(cursorY + 10, plateRect.top)
          const dIn = `M ${cx} ${cursorY} L ${cx} ${plateTop}`

          const fSplitTop = Math.min(plateRect.bottom + 6, framesRect.top - BOX_CLEARANCE)
          const fSplitBottom = framesRect.bottom + BOX_CLEARANCE
          const fLeftX = clampX(framesRect.left - SIDE_PAD)
          const fRightX = clampX(framesRect.right + SIDE_PAD)
          const { dLeft: dFLeft, dRight: dFRight } = makeSplitPaths(
            fSplitTop,
            fSplitBottom,
            fLeftX,
            fRightX,
          )

          const iSplitTop = Math.max(fSplitBottom + 14, insightRect.top - BOX_CLEARANCE)
          const dMid = `M ${cx} ${fSplitBottom} L ${cx} ${iSplitTop}`

          const iSplitBottom = insightRect.bottom + BOX_CLEARANCE
          const iLeftX = clampX(insightRect.left - SIDE_PAD)
          const iRightX = clampX(insightRect.right + SIDE_PAD)
          const { dLeft: dILeft, dRight: dIRight } = makeSplitPaths(
            iSplitTop,
            iSplitBottom,
            iLeftX,
            iRightX,
          )

          const inLen = draw(pIn, dIn)
          const fLeftLen = draw(pFLeft, dFLeft)
          const fRightLen = draw(pFRight, dFRight)
          const midLen = draw(pMid, dMid)
          const iLeftLen = draw(pILeft, dILeft)
          const iRightLen = draw(pIRight, dIRight)

          const isCritical =
            station.difficulty === 'medium' || station.difficulty === 'complex'

          if (isCritical) {
            criticalFramesEls.push(frames)
          }

          addSingleToTimeline(pIn, inLen, plateTop - cursorY)
          addSplitToTimeline(
            pFLeft,
            fLeftLen,
            pFRight,
            fRightLen,
            fSplitBottom - fSplitTop,
            isCritical,
          )
          addSingleToTimeline(pMid, midLen, iSplitTop - fSplitBottom)
          addSplitToTimeline(
            pILeft,
            iLeftLen,
            pIRight,
            iRightLen,
            iSplitBottom - iSplitTop,
            isCritical,
          )

          positionNode(`st:${station.id}:mid`, cx, fSplitBottom)
          positionNode(`st:${station.id}:merge`, cx, iSplitBottom)
          cursorY = iSplitBottom

          if (prefersReduced) return

          const clearRed = () => {
            pFLeft.classList.remove('is-red')
            pFRight.classList.remove('is-red')
            pILeft.classList.remove('is-red')
            pIRight.classList.remove('is-red')
          }

          const triggerStationGlitch = () => {
            pulsePaths([pFLeft, pFRight, pILeft, pIRight], 520)
            pulseNode(`st:${station.id}:mid`, 600)
            pulseNode(`st:${station.id}:merge`, 650)

            if (station.difficulty === 'medium') {
              pulseFramesStatic(frames, 650)
              pFLeft.classList.add('is-red')
              pILeft.classList.add('is-red')
              later(() => {
                pFLeft.classList.remove('is-red')
                pILeft.classList.remove('is-red')
              }, 680)
            } else if (station.difficulty === 'complex') {
              pulseFramesStatic(frames, 850)
              pFLeft.classList.add('is-red')
              pFRight.classList.add('is-red')
              pILeft.classList.add('is-red')
              pIRight.classList.add('is-red')
              later(() => {
                pFRight.classList.remove('is-red')
                pIRight.classList.remove('is-red')
              }, 720)
            }
          }

          ScrollTrigger.create({
            trigger: frames,
            start: 'top 68%',
            onEnter: triggerStationGlitch,
            onEnterBack:
              station.difficulty === 'complex'
                ? () => {
                    pFLeft.classList.add('is-red')
                    pILeft.classList.add('is-red')
                    pulseFramesStatic(frames, 700)
                  }
                : () => pulsePaths([pFLeft, pFRight], 420),
            onLeaveBack: clearRed,
          })
        })

        // 4. FINAL TERMINAL STEM
        const endEl = root.querySelector<HTMLElement>('[data-spine-end]')
        const pEnd = getPath('spine:end')
        if (endEl && pEnd) {
          const endY = rel(endEl).top + 4
          const dEnd = `M ${cx} ${cursorY} L ${cx} ${endY}`
          const endLen = draw(pEnd, dEnd)
          addSingleToTimeline(pEnd, endLen, endY - cursorY)

          if (!prefersReduced) {
            const endBurst = () => {
              endEl.classList.add('is-bursting')
              pEnd.classList.add('is-bursting')
              later(() => {
                endEl.classList.remove('is-bursting')
                pEnd.classList.remove('is-bursting')
              }, 750)
            }
            ScrollTrigger.create({
              trigger: endEl,
              start: 'top 85%',
              onEnter: endBurst,
              onEnterBack: endBurst,
            })
          }
        }

        // 5. MASTER SCRUB + LIVING SPLIT TIPS
        const tip1 = tipPrimaryRef.current
        const tip2 = tipSecondaryRef.current

        const updateLivingTips = (time: number, isMoving: boolean) => {
          if (!tip1 || !tip2 || tracks.length === 0) return

          const totalDur = tl?.duration() ?? 0
          if (time <= 0.001 || time >= totalDur - 0.001) {
            tip1.style.opacity = '0'
            tip2.style.opacity = '0'
            return
          }

          const track =
            tracks.find((t) => time >= t.startTime && time <= t.endTime) ??
            tracks[tracks.length - 1]
          const span = Math.max(track.endTime - track.startTime, 0.0001)
          const localP = Math.max(0, Math.min(1, (time - track.startTime) / span))

          const pt1 = track.leftPath.getPointAtLength(localP * track.leftLen)
          tip1.setAttribute('transform', `translate(${pt1.x}, ${pt1.y})`)
          tip1.style.opacity = '1'
          tip1.classList.toggle('is-moving', isMoving)
          tip1.classList.toggle('is-red', Boolean(track.isCritical))

          if (track.rightPath && track.rightLen) {
            const pt2 = track.rightPath.getPointAtLength(localP * track.rightLen)
            tip2.setAttribute('transform', `translate(${pt2.x}, ${pt2.y})`)
            tip2.style.opacity = '1'
            tip2.classList.toggle('is-moving', isMoving)
            tip2.classList.toggle('is-red', Boolean(track.isCritical))
          } else {
            tip2.style.opacity = '0'
          }
        }

        if (tl && tracks.length > 0 && metaEl && endEl) {
          ScrollTrigger.create({
            animation: tl,
            trigger: metaEl,
            start: 'bottom 64%',
            endTrigger: endEl,
            end: 'top 64%',
            scrub: 0.2,
            onUpdate: (self) => {
              const moving = Math.abs(self.getVelocity()) > 15
              updateLivingTips(tl.time(), moving)
            },
          })
        }

        // 6. AMBIENT LIVING GLITCH (Line + visible critical station static)
        if (!prefersReduced && allActivePaths.length > 0) {
          ambientInterval = window.setInterval(() => {
            if (document.hidden) return
            const drawn = allActivePaths.filter((p) => {
              const offset = parseFloat(p.style.strokeDashoffset || '1')
              const total = parseFloat(p.style.strokeDasharray || '1')
              return offset < total * 0.85
            })
            if (drawn.length > 0) {
              const pick = drawn[Math.floor(Math.random() * drawn.length)]
              pick.classList.add('is-bursting')
              later(() => pick.classList.remove('is-bursting'), 380)
            }

            // Also pulse red/blue static on any critical station currently in viewport
            const inViewCritical = criticalFramesEls.filter((el) => {
              const r = el.getBoundingClientRect()
              return r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2
            })
            if (inViewCritical.length > 0) {
              const target =
                inViewCritical[Math.floor(Math.random() * inViewCritical.length)]
              pulseFramesStatic(target, 520)
            }
          }, 2800)
        }
      }, root)
    }

    setup()

    const rebuild = () => {
      if (disposed) return
      if (ambientInterval) window.clearInterval(ambientInterval)
      ctx?.revert()
      setup()
      ScrollTrigger.refresh()
    }

    const scheduleRebuild = () => {
      if (disposed || rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        timeouts.forEach((id) => window.clearTimeout(id))
        timeouts.clear()
        rebuild()
      })
    }

    const ro = new ResizeObserver(() => scheduleRebuild())
    root
      .querySelectorAll<HTMLElement>(
        '[data-spine-meta], [data-spine-obstacle], [data-station-frames], [data-station-insight]',
      )
      .forEach((el) => ro.observe(el))

    const onImageLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        scheduleRebuild()
      }
    }
    root.addEventListener('load', onImageLoad, true)

    let lastWidth = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      scheduleRebuild()
    }

    window.addEventListener('resize', onResize)
    void document.fonts.ready.then(() => scheduleRebuild())

    return () => {
      disposed = true
      if (rafId) window.cancelAnimationFrame(rafId)
      ro.disconnect()
      root.removeEventListener('load', onImageLoad, true)
      window.removeEventListener('resize', onResize)
      if (ambientInterval) window.clearInterval(ambientInterval)
      timeouts.forEach((id) => window.clearTimeout(id))
      timeouts.clear()
      ctx?.revert()
    }
  }, [stations, desktop])

  const nodeDefs: NodeDef[] = [
    { id: 'meta:junction', isJunction: true },
    ...PRE_SECTIONS.flatMap((secId) => [
      { id: `sec:${secId}:split` },
      { id: `sec:${secId}:merge` },
    ]),
    ...stations.flatMap((st) => [
      { id: `st:${st.id}:mid` },
      { id: `st:${st.id}:merge` },
    ]),
  ]

  return (
    <div ref={rootRef} className="cs-spine-zone gallery-spine">
      <svg className="gallery-spine-svg max-lg:hidden" aria-hidden="true">
        <defs>
          {/* Pure #ff0033 Red Channel Matrix for image static slices */}
          <filter id="cs-channel-red" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.95 0.25 0.15 0 0.05
                      0    0    0    0 0
                      0.18 0.05 0.05 0 0.02
                      0    0    0    1 0"
            />
          </filter>
          {/* Pure #00f0ff Sky-Blue/Cyan Channel Matrix for image static slices */}
          <filter id="cs-channel-cyan" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0    0    0    0 0
                      0.15 0.78 0.22 0 0.04
                      0.20 0.30 0.85 0 0.08
                      0    0    0    1 0"
            />
          </filter>
        </defs>

        <path data-spine-path="meta:left" className="gallery-spine-path" />
        <path data-spine-path="meta:right" className="gallery-spine-path" />

        {PRE_SECTIONS.map((secId) => (
          <g key={secId}>
            <path data-spine-path={`sec:${secId}:in`} className="gallery-spine-path" />
            <path data-spine-path={`sec:${secId}:left`} className="gallery-spine-path" />
            <path data-spine-path={`sec:${secId}:right`} className="gallery-spine-path" />
          </g>
        ))}

        {stations.map((station) =>
          STATION_SEGS.map((seg) => (
            <path
              key={`${station.id}-${seg}`}
              data-spine-path={`st:${station.id}:${seg}`}
              data-station={station.id}
              data-seg={seg}
              className="gallery-spine-path"
            />
          )),
        )}

        <path
          data-spine-path="spine:end"
          className="gallery-spine-path gallery-spine-end-path"
        />

        {nodeDefs.map((node) => (
          <g
            key={node.id}
            data-spine-node={node.id}
            className={`cs-spine-node${node.isJunction ? ' is-junction' : ''}`}
            style={{ opacity: 0 }}
          >
            <rect
              x={node.isJunction ? -5 : -3}
              y={node.isJunction ? -5 : -3}
              width={node.isJunction ? 10 : 6}
              height={node.isJunction ? 10 : 6}
              transform="rotate(45)"
              className="cs-spine-node-core"
            />
            <line x1="-12" y1="-2" x2="12" y2="-2" className="cs-spine-shard is-cyan" />
            <line x1="-10" y1="3" x2="10" y2="3" className="cs-spine-shard is-red" />
          </g>
        ))}

        <g ref={tipPrimaryRef} className="cs-spine-tip" style={{ opacity: 0 }}>
          <rect
            x="-4"
            y="-4"
            width="8"
            height="8"
            transform="rotate(45)"
            className="cs-spine-tip-core"
          />
          <line x1="-11" y1="-3" x2="9" y2="-3" className="cs-spine-tip-shard is-cyan" />
          <line x1="-8" y1="3" x2="11" y2="3" className="cs-spine-tip-shard is-red" />
        </g>

        <g ref={tipSecondaryRef} className="cs-spine-tip" style={{ opacity: 0 }}>
          <rect
            x="-4"
            y="-4"
            width="8"
            height="8"
            transform="rotate(45)"
            className="cs-spine-tip-core"
          />
          <line x1="-11" y1="-3" x2="9" y2="-3" className="cs-spine-tip-shard is-cyan" />
          <line x1="-8" y1="3" x2="11" y2="3" className="cs-spine-tip-shard is-red" />
        </g>
      </svg>

      {children}
    </div>
  )
}

export default CaseStudySpine
