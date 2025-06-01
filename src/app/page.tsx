'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Calculator, TrendingUp, Target } from 'lucide-react'
import OnboardingFlow from '@/components/OnboardingFlow'

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Image 
              src="/ArchieLogo.png" 
              alt="Archie.Money Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-text-white">Archie.Money</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-text-secondary hover:text-text-white transition-colors">
              How it works
            </a>
            <a href="#about" className="text-text-secondary hover:text-text-white transition-colors">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold text-text-white mb-6">
              Retirement Projection
              <span className="block text-gradient">Made Simple</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Answer a few questions, get a clear roadmap for your retirement with Archie.Money. 
              See exactly how much you'll have and what you need to do to reach your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => setShowOnboarding(true)}
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <Calculator className="w-5 h-5" />
                <span>See Example</span>
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-primary-teal bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-primary-teal" />
                </div>
                <h3 className="text-lg font-semibold text-text-white mb-2">Smart Calculations</h3>
                <p className="text-text-secondary">
                  Uses the 4% rule and federal tax brackets to project your retirement income accurately.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-secondary-green bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-secondary-green" />
                </div>
                <h3 className="text-lg font-semibold text-text-white mb-2">Growth Tracking</h3>
                <p className="text-text-secondary">
                  See how your savings will compound over time with realistic 8% annual returns.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-secondary-orange bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-secondary-orange" />
                </div>
                <h3 className="text-lg font-semibold text-text-white mb-2">Personalized Goals</h3>
                <p className="text-text-secondary">
                  Get specific recommendations for 401(k), IRA, and brokerage account contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 sm:px-6 lg:px-8 border-t border-border-color">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image 
                src="/ArchieLogo.png" 
                alt="Archie.Money Logo" 
                width={24} 
                height={24}
                className="rounded"
              />
              <span className="text-text-secondary">© 2025 Archie.Money</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-text-secondary hover:text-text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-text-secondary hover:text-text-white transition-colors">
                Terms of Service
              </a>
              <a href="/disclaimer" className="text-text-secondary hover:text-text-white transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 