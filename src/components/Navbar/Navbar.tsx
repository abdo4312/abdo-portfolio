import '../../styles/glitch.css'
import { type MouseEvent, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MobileTabBar from './MobileTabBar'
import scrollToHash from './scrollToHash'

const LINKS = [
  { href: '#top', label: '[01. HOME]' },
  { href: '#about', label: '[02. ABOUT]' },
  { href: '#work', label: '[03. WORK]' },
  { href: '#contact', label: '[07. CONTACT]' },
]

const navigateToHash = (
  navigate: ReturnType<typeof useNavigate>,
  location: ReturnType<typeof useLocation>,
  href: string
) => {
  const target =
    location.pathname === '/' ? location.pathname + href : '/' + href
  void navigate(target)
}

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (location.hash) scrollToHash(location.hash)
  }, [location.hash])

  const handleLinkClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigateToHash(navigate, location, href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-bg-primary/80 backdrop-blur-md border-b border-grid-line px-4 h-14 lg:h-auto lg:px-16 lg:py-6 flex items-center justify-between gap-2 lg:gap-4">
        <div className="flex items-center gap-2 font-mono text-sm lg:text-lg tracking-wider text-text-primary shrink-0">
          <span data-text="A·K·D" className="glitch-text text-blue-sky font-semibold">
            A·K·D
          </span>
          <span className="lg:hidden max-[360px]:hidden text-[11px] tracking-widest text-text-primary">
            ABDELRHMAN
          </span>
          <span className="text-text-secondary ml-4 text-xs lg:text-sm tracking-normal hidden lg:inline">
            // FRONTEND_ARCHITECT
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-3 sm:gap-6 lg:gap-8 font-mono text-[10px] sm:text-sm tracking-wide sm:tracking-widest text-text-secondary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleLinkClick(l.href)}
              data-text={l.label}
              className="glitch-hover hover:text-blue-sky transition-colors duration-200 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <span className="lg:hidden flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-text-secondary">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-sky" />
            OPEN TO WORK
          </span>
          <a
            href="#contact"
            onClick={handleLinkClick('#contact')}
            className="hidden lg:inline-flex px-5 py-2 bg-blue-sky text-bg-primary font-mono text-sm font-medium tracking-wider hover:bg-blue-glow transition-colors duration-200"
          >
            GET IN TOUCH
          </a>
          <button
            disabled
            aria-label="Language switch — coming soon"
            className="px-2.5 py-1.5 text-[11px] lg:px-4 lg:py-2 lg:text-sm border border-grid-line text-text-muted font-mono tracking-wider cursor-not-allowed opacity-50"
          >
            EN / AR
          </button>
        </div>
      </header>
      <MobileTabBar />
    </>
  )
}

export default Navbar
