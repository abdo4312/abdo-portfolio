import CornerMarks from '../shared/CornerMarks'
import { useInView } from '../../hooks/useInView'

const CONTACT_LINKS = [
  {
    label: 'EMAIL',
    value: 'abdorhamnk134@gmail.com',
    href: 'mailto:abdorhamnk134@gmail.com',
  },
  {
    label: 'GITHUB',
    value: 'github.com/abdo4312',
    href: 'https://github.com/abdo4312',
  },
]

const Contact = () => {
  const { ref, visible } = useInView<HTMLElement>(0.3)

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-8 lg:px-16 py-28 lg:py-36"
    >
      <div className="absolute left-6 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />
      <div className="absolute right-6 lg:right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-grid-line to-transparent pointer-events-none" />

      <div
        className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <h2 className="font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-10">
            {'//'} 04 — CONTACT
          </h2>
          <p className="font-sans text-lg lg:text-xl text-text-primary leading-relaxed">
            Open to full-time roles and freelance work. Reach out directly —
            no forms, no gatekeeping.
          </p>
        </div>

        <div className="relative flex flex-col gap-4 border border-grid-line bg-bg-secondary/30 p-6 lg:p-8">
          <CornerMarks />
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="px-6 py-4 border border-grid-line hover:border-blue-sky transition-colors duration-200 font-mono"
            >
              <span className="block text-[10px] tracking-[0.2em] text-text-muted mb-1">
                {link.label}
              </span>
              <span className="block text-sm text-text-primary break-all">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
