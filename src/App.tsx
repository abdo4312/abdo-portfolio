import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'
import AromaCaseStudyPage from './pages/AromaCaseStudyPage'
import BookstoreCaseStudyPage from './pages/BookstoreCaseStudyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work/aroma" element={<AromaCaseStudyPage />} />
      <Route path="/work/bookstore" element={<BookstoreCaseStudyPage />} />
      <Route path="/work/:slug" element={<CaseStudyPage />} />
    </Routes>
  )
}

export default App
