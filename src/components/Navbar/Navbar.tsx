import '../../styles/glitch.css'
import { type MouseEvent, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LINKS = [
  { href: '#top', label: '[01. HOME]' },
  { href: '#about', label: '[02. ABOUT]' },
  { href: '#work', label: '[03. WORK]' },
  { href: '#contact', label: '[07. CONTACT]' },
]

const scrollToHash = (hash: string) => {
  const id = hash.slice(1)
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }
  const element = document.getElementById(id)
  if (!element) return
  const header = document.querySelector('header')
  const offset = header ? header.getBoundingClientRect().height : 0
  const top =
    element.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'auto' })
}

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
    <header className="fixed top-0 left-0 w-full z-40 bg-bg-primary/80 backdrop-blur-md border-b border-grid-line px-4 sm:px-8 lg:px-16 py-4 sm:py-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-mono text-sm lg:text-lg tracking-wider text-text-primary shrink-0">
        <span data-text="A·K·D" className="glitch-text text-blue-sky font-semibold">
          A·K·D
        </span>
        <span className="text-text-secondary ml-4 text-xs lg:text-sm tracking-normal hidden lg:inline">
          // FRONTEND_ARCHITECT
        </span>
      </div>

      <nav className="flex items-center gap-3 sm:gap-6 lg:gap-8 font-mono text-[10px] sm:text-sm tracking-wide sm:tracking-widest text-text-secondary">
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

      <div className="hidden sm:flex items-center gap-4 shrink-0">
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
          className="px-4 py-2 border border-grid-line text-text-muted font-mono text-sm tracking-wider cursor-not-allowed opacity-50"
        >
          EN / AR
        </button>
      </div>
    </header>
  )
}

export default Navbar
