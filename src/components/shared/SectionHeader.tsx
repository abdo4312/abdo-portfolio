import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  meta?: string
}

const SectionHeader = ({ eyebrow, title, meta }: SectionHeaderProps) => (
  <div className="mb-12 lg:mb-16">
    <p className="font-mono text-xs lg:text-sm tracking-[0.3em] text-blue-sky mb-4">
      {'//'} {eyebrow}
    </p>
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-grid-line pb-4">
      <h2 className="font-display font-bold text-3xl lg:text-5xl text-text-primary">
        {title}
      </h2>
      {meta && (
        <p className="font-mono text-[11px] tracking-[0.2em] text-text-muted">
          {meta}
        </p>
      )}
    </div>
  </div>
)

export default SectionHeader
