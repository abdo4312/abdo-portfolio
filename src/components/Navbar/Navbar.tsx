import '../../styles/glitch.css'

const Navbar = () => {
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

      <nav className="flex items-center gap-3 sm:gap-6 lg:gap-10 font-mono text-[10px] sm:text-sm tracking-wide sm:tracking-widest text-text-secondary">
        <a
          href="#about"
          data-text="[02. ABOUT]"
          className="glitch-hover hover:text-blue-sky transition-colors duration-200 whitespace-nowrap"
        >
          [02. ABOUT]
        </a>
        <a
          href="#work"
          data-text="[03. WORK]"
          className="glitch-hover hover:text-blue-sky transition-colors duration-200 whitespace-nowrap"
        >
          [03. WORK]
        </a>
        <a
          href="#contact"
          data-text="[04. CONTACT]"
          className="glitch-hover hover:text-blue-sky transition-colors duration-200 whitespace-nowrap"
        >
          [04. CONTACT]
        </a>
      </nav>

      <div className="hidden sm:flex items-center gap-4 shrink-0">
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
