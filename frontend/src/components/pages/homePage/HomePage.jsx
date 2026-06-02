import React from 'react'
import HeroSection from './HeroSection.jsx'
import HighlightsGrid from './HighlightsGrid.jsx'
import HowItWorks from './HowItWorks.jsx'
import QuickStartBanner from './QuickStartBanner.jsx'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <HeroSection />
        <HighlightsGrid />
        <HowItWorks />
        <QuickStartBanner />
      </div>
    </main>
  )
}

export default HomePage