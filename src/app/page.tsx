'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import OnboardingFlow from '@/components/OnboardingFlow'

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="px-6 py-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Image 
              src="/ArchieLogo.png" 
              alt="Archie.Money Logo" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-semibold text-text-white">Archie.Money</span>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean and Minimal */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl font-bold text-text-white mb-6 leading-tight">
              See if You're Saving Enough
              <span className="block gradient-text">for Tomorrow</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-text-secondary mb-12 font-light">
              No Guilt Attached
            </p>

            {/* Single CTA Button */}
            <button 
              onClick={() => setShowOnboarding(true)}
              className="btn-primary text-lg px-12 py-4 shadow-glow"
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6 ml-2 inline" />
            </button>

            {/* Simple subtitle */}
            <p className="text-sm text-text-muted mt-8 max-w-lg mx-auto">
              Answer 8 quick questions to see your projected retirement income and get personalized recommendations.
            </p>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-text-muted">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Image 
                src="/ArchieLogo.png" 
                alt="Archie.Money Logo" 
                width={20} 
                height={20}
                className="rounded opacity-60"
              />
              <span>© 2025 Archie.Money</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="/privacy" className="hover:text-text-secondary transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-text-secondary transition-colors">
                Terms
              </a>
              <a href="/disclaimer" className="hover:text-text-secondary transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 