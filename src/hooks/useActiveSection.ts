import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'about', tab: 'about' },
  { id: 'work', tab: 'work' },
  { id: 'process', tab: 'process' },
  { id: 'tools', tab: 'process' },
  { id: 'decisions', tab: 'process' },
  { id: 'contact', tab: 'contact' },
]

const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState('top')

  useEffect(() => {
    if (!enabled) return
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      let next = 'top'
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= line) {
          next = section.tab
        }
      }
      setActive(atBottom ? 'contact' : next)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled])

  return active
}

export default useActiveSection
