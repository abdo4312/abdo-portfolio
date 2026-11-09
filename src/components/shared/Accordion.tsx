import { useId, useState, type ReactNode } from 'react'

interface AccordionProps {
  title: ReactNode
  children: ReactNode
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [open, setOpen] = useState(false)
  const id = useId()
  const buttonId = id + '-button'
  const panelId = id + '-panel'

  return (
    <div className="border border-grid-line bg-bg-secondary/30 transition-colors duration-200 hover:border-text-secondary">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-2 text-start font-mono text-[11px] tracking-[0.2em] text-text-primary"
      >
        <span>{title}</span>
        <span aria-hidden="true" className="text-base text-blue-sky">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
