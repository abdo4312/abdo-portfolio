import { useRef, useState } from 'react'
import Curtain from '../components/Curtain/Curtain'
import Navbar from '../components/Navbar/Navbar'
import BlueprintBackground from '../components/Background/BlueprintBackground'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import ProjectTabs from '../components/Projects/ProjectTabs'
import Process from '../components/Process/Process'
import TechSpecs from '../components/TechSpecs/TechSpecs'
import EngineeringDecisions from '../components/Engineering/EngineeringDecisions'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

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
        <Process />
        <TechSpecs />
        <EngineeringDecisions />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
