import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/sections/Hero'
import Marquee from '../components/sections/Marquee'
import About from '../components/sections/About'
import ConstructionSequence from '../components/sections/ConstructionSequence'
import TrustedBy from '../components/sections/TrustedBy'
import Sectors from '../components/sections/Sectors'
import Services from '../components/sections/Services'
import ParallaxQuote from '../components/sections/ParallaxQuote'
import Portfolio from '../components/sections/Portfolio'
import Process from '../components/sections/Process'
import ClientPortal from '../components/sections/ClientPortal'
import Testimonials from '../components/sections/Testimonials'
import CTABanner from '../components/sections/CTABanner'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <About />
        <ConstructionSequence />
        <TrustedBy />
        <Sectors />
        <Services />
        <ParallaxQuote />
        <Portfolio />
        <Process />
        <ClientPortal />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
