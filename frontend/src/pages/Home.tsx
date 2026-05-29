// import Banner from "../components/Banner"
import Benefits from "../components/Benefits"
import CTA from "../components/CTA"
import FAQ from "../components/FAQ"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Navbar />
      <Hero/>
      <Features />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home
