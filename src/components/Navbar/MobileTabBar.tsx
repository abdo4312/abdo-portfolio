import type { MouseEvent, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useActiveSection from '../../hooks/useActiveSection'
import scrollToHash from './scrollToHash'

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const TABS = [
  {
    id: 'top',
    label: 'HOME',
    accent: false,
    icon: (
      <Icon>
        <path d="M3 11 12 3l9 8" />
        <path d="M5 10v10h14V10" />
      </Icon>
    ),
  },
  {
    id: 'about',
    label: 'ABOUT',
    accent: false,
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </Icon>
    ),
  },
  {
    id: 'work',
    label: 'WORK',
    accent: false,
    icon: (
      <Icon>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </Icon>
    ),
  },
  {
    id: 'process',
    label: 'PROCESS',
    accent: false,
    icon: (
      <Icon>
        <path d="M4 6h10" />
        <path d="M4 12h16" />
        <path d="M4 18h7" />
      </Icon>
    ),
  },
  {
    id: 'contact',
    label: 'TALK',
    accent: true,
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" />
        <path d="m3 7 9 6 9-6" />
      </Icon>
    ),
  },
]

const MobileTabBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'
  const current = useActiveSection(onHome)
  const active = onHome ? current : 'work'

  const handleClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (onHome) scrollToHash('#' + id)
    void navigate('/#' + id, { replace: onHome })
  }

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 left-0 z-40 w-full bg-bg-primary border-t border-grid-line pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const isActive = tab.id === active
          return (
            <li key={tab.id}>
              <a
                href={'#' + tab.id}
                onClick={handleClick(tab.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 border-t-2 font-mono text-[11px] tracking-wider transition-colors duration-200 ${
                  isActive ? 'border-blue-sky' : 'border-transparent'
                } ${
                  isActive || tab.accent ? 'text-blue-sky' : 'text-text-secondary'
                }`}
              >
                {tab.icon}
                {tab.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MobileTabBar
