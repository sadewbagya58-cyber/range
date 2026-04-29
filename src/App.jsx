import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import TrustIndicators from './components/TrustIndicators'
import AboutUs from './components/AboutUs'
import InquiryForm from './components/InquiryForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-orange selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <Services />
        <AboutUs />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
