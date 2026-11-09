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

export default scrollToHash
