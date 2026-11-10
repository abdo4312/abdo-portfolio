import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'
import AromaCaseStudyPage from './pages/AromaCaseStudyPage'
import BookstoreCaseStudyPage from './pages/BookstoreCaseStudyPage'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/aroma" element={<AromaCaseStudyPage />} />
        <Route path="/work/bookstore" element={<BookstoreCaseStudyPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
      </Routes>
    </>
  )
}

export default App
