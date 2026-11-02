import { useRef, useState } from 'react'
import Curtain from '../components/Curtain/Curtain'
import Navbar from '../components/Navbar/Navbar'
import BlueprintBackground from '../components/Background/BlueprintBackground'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import ProjectTabs from '../components/Projects/ProjectTabs'
import Contact from '../components/Contact/Contact'

function HomePage() {
  const siteRef = useRef<HTMLDivElement>(null)
  const [showCurtain, setShowCurtain] = useState(
    () => sessionStorage.getItem('hasEntered') !== 'true'
  )

  return (
    <>
      {showCurtain && (
        <Curtain siteRef={siteRef} onComplete={() => setShowCurtain(false)} />
      )}
      <BlueprintBackground />
      <Navbar />
      <div ref={siteRef} className="relative z-10">
        <Hero entered={!showCurtain} />
        <About />
        <ProjectTabs />
        <Contact />
      </div>
    </>
  )
}

export default HomePage
