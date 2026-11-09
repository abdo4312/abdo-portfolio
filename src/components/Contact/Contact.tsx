import { useState, type FormEvent } from 'react'
import SectionHeader from '../shared/SectionHeader'

const EMAIL = 'abdorhamnk134@gmail.com'
const GITHUB = 'https://github.com/abdo4312'

const FIELD =
  'w-full border border-grid-line bg-bg-primary px-4 py-3 font-sans text-base text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-blue-sky'

const LABEL =
  'mb-2 block font-mono text-xs tracking-[0.2em] text-text-secondary uppercase'

export default function Contact() {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = `Portfolio inquiry from ${name}`
    const body = `${message}\n\n— ${name}\nReply to: ${from}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  function copyEmail() {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => setCopied(false))
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20"
    >
      <SectionHeader
        eyebrow="07 — CONTACT"
        title="LET'S WORK TOGETHER"
        meta="OPEN TO FULL-TIME & FREELANCE"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="border border-grid-line bg-bg-secondary p-6 lg:p-8"
        >
          <div className="mb-6 flex items-center justify-between border-b border-grid-line pb-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="text-blue-sky">SEND A MESSAGE</span>
            <span className="text-text-muted">OPENS YOUR EMAIL APP</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={LABEL}>
                01 — Your name
              </label>
              <input
                id="c-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={FIELD}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="c-email" className={LABEL}>
                02 — Your email
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className={FIELD}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="c-message" className={LABEL}>
              03 — Message
            </label>
            <textarea
              id="c-message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${FIELD} resize-y`}
              placeholder="What are you building, and how can I help?"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="bg-blue-sky px-6 py-3 font-mono text-xs font-medium tracking-[0.15em] text-bg-primary uppercase transition-colors hover:bg-blue-glow"
            >
              Write to me →
            </button>
            <span className="font-mono text-xs tracking-wider text-text-muted">
              NO SERVER, NO TRACKING. YOUR EMAIL APP SENDS IT.
            </span>
          </div>
        </form>

        <div className="space-y-6">
          <div className="border border-grid-line bg-bg-secondary p-6">
            <div className="mb-4 border-b border-grid-line pb-3 font-mono text-xs tracking-[0.2em] text-blue-sky uppercase">
              DIRECT EMAIL
            </div>
            <div className="break-all font-mono text-base text-text-primary">
              {EMAIL}
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-4 border border-blue-sky px-4 py-2 font-mono text-xs tracking-[0.15em] text-blue-sky uppercase transition-colors hover:bg-blue-sky/10"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

          <div className="border border-grid-line bg-bg-secondary p-6">
            <div className="mb-4 border-b border-grid-line pb-3 font-mono text-xs tracking-[0.2em] text-blue-sky uppercase">
              ELSEWHERE
            </div>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-sm tracking-wider text-text-primary transition-colors hover:text-blue-sky"
            >
              <span>GITHUB / abdo4312</span>
              <span>↗</span>
            </a>
          </div>

          <div className="border border-grid-line bg-bg-secondary p-6 font-mono text-xs leading-relaxed tracking-wider text-text-secondary uppercase">
            <div>CAIRO, EGYPT</div>
            <div className="text-text-muted">30.0444°N / 31.2357°E</div>
            <div className="mt-3 text-blue-sky">
              OPEN TO WORK
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
