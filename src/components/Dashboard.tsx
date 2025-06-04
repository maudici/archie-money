'use client'

import { useState } from 'react'
import { ArrowLeft, TrendingUp, DollarSign, Target, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { 
  calculateRetirementProjection, 
  calculateWhatIfScenario,
  formatCurrency,
  formatPercentage,
  getSavingsRateColor,
  getSavingsRateStatus
} from '@/utils/financial-calculations'
import { HYSA_ACCOUNTS, BROKERAGE_PLATFORMS, PFM_APPS } from '@/data/financial-data'
import type { UserInputs } from '@/types'
import SavingsGauge from './charts/SavingsGauge'

interface DashboardProps {
  inputs: UserInputs
  onBack: () => void
}

export default function Dashboard({ inputs, onBack }: DashboardProps) {
  // Use $100 as default additional investment
  const [additionalInvestment, setAdditionalInvestment] = useState(100)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const projection = calculateRetirementProjection(inputs)
  
  // Calculate what happens with additional investment
  const enhancedInputs = {
    ...inputs,
    monthlyInvestments: inputs.monthlyInvestments + additionalInvestment
  }
  const enhancedProjection = calculateRetirementProjection(enhancedInputs)
  const additionalMonthlyIncome = enhancedProjection.monthlyWithdrawalAfterTax - projection.monthlyWithdrawalAfterTax

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="px-4 py-6 border-b border-border-color">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to questions</span>
          </button>
          
          <h1 className="text-2xl font-bold text-text-white">Archie's analysis</h1>
          
          <div className="w-24" /> {/* Spacer for center alignment */}
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* High-Interest Debt Banner */}
        {inputs.highInterestDebt && (
          <div className="card bg-dark-red p-4 border border-error-red">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-error-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">High-Interest Debt Detected</h3>
                <p className="text-sm text-text-primary">
                  You have debt &gt; 6% APR. Pay it off before investing. See recommended steps below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text-secondary">Projected Nest-Egg</h3>
              <TrendingUp className="w-5 h-5 text-primary-blue" />
            </div>
            <p className="text-3xl font-bold text-text-white mb-1">
              {formatCurrency(projection.totalRetirementBalance)}
            </p>
            <p className="text-xs text-text-secondary">At age {inputs.retirementAge}</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text-secondary">Retirement Income</h3>
              <TrendingUp className="w-5 h-5 text-primary-blue" />
            </div>
            <p className="text-3xl font-bold text-text-white mb-1">
              {formatCurrency(projection.monthlyWithdrawalAfterTax)}<span className="text-base text-text-secondary">/month</span>
            </p>
            <p className="text-xs text-text-secondary">(4% Rule)</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Column - Charts and Analysis */}
          <div className="xl:col-span-2 space-y-6">
            {/* Savings Rate Gauge */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text-white mb-6">Current Savings Analysis</h2>
              <SavingsGauge savingsRate={projection.currentSavingsRate} />
              
              <div className="mt-6 p-4 bg-input-bg rounded-lg">
                <p className="text-text-primary text-sm">
                  You currently save {formatPercentage(projection.currentSavingsRate)} of your take-home pay. 
                  Financial advisers often recommend saving ≥ 15% – 20% if you want to retire comfortably.
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text-white mb-6">Retirement Projection Breakdown</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border-color">
                  <span className="text-text-secondary">Current savings growth</span>
                  <span className="text-text-white font-semibold">
                    {formatCurrency(projection.futureValueCurrentSavings)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-color">
                  <span className="text-text-secondary">Future contributions</span>
                  <span className="text-text-white font-semibold">
                    {formatCurrency(projection.futureValueContributions)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-color">
                  <span className="text-text-secondary">Total tax rate</span>
                  <span className="text-text-white font-semibold">
                    {formatPercentage(projection.totalTaxRate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-white font-semibold">Total nest-egg</span>
                  <span className="text-primary-blue font-bold text-lg">
                    {formatCurrency(projection.totalRetirementBalance)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - What-If & Quick Actions */}
          <div className="space-y-6">
            {/* What-If Scenario */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text-white mb-6">Investment Boost Impact</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Additional Monthly Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={additionalInvestment}
                      onChange={(e) => setAdditionalInvestment(Number(e.target.value))}
                      className="input-field w-full pl-8"
                      placeholder="100"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">/mo</span>
                  </div>
                </div>

                <div className="p-4 bg-input-bg rounded-lg">
                  <p className="text-text-white font-semibold mb-2">
                    Extra retirement income:
                  </p>
                  <p className="text-2xl font-bold text-primary-blue mb-1">
                    +{formatCurrency(additionalMonthlyIncome)}/month
                  </p>
                  <p className="text-text-secondary text-sm">
                    By investing {formatCurrency(additionalInvestment)} more monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action-Oriented Expandable Sections */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text-white">Want to learn more about how to act on your finances?</h2>
          
          {/* Retirement Account Setup Strategy */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleAccordion('retirement-setup')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-input-bg transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-white">Recommended account set up strategy for retirement</h3>
              {expandedAccordion === 'retirement-setup' ? (
                <ChevronUp className="w-5 h-5 text-text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary" />
              )}
            </button>
            
            {expandedAccordion === 'retirement-setup' && (
              <div className="px-6 pb-6 bg-input-bg">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-text-white">401(k) Employer Match</h4>
                      <p className="text-sm text-text-secondary">Contribute at least enough to get your company match—it's free money. This should be your first priority.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success-green rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-text-white">Roth IRA</h4>
                      <p className="text-sm text-text-secondary">If eligible, fund a Roth IRA for tax-free growth. Great for younger investors and those expecting higher income in retirement.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-secondary-orange rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-text-white">Max Out 401(k)</h4>
                      <p className="text-sm text-text-secondary">After getting the match and funding your Roth IRA, consider maxing out your 401(k) for additional tax advantages.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Fund */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleAccordion('emergency-fund')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-input-bg transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-white">Want to build your emergency fund?</h3>
              {expandedAccordion === 'emergency-fund' ? (
                <ChevronUp className="w-5 h-5 text-text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary" />
              )}
            </button>
            
            {expandedAccordion === 'emergency-fund' && (
              <div className="px-6 pb-6 bg-input-bg">
                <p className="text-text-primary mb-4">
                  Keep 3-6 months of expenses in a high-yield savings account for emergencies. These accounts offer much better rates than traditional banks:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {HYSA_ACCOUNTS.map((account) => (
                    <div key={account.name} className="card p-4">
                      <h4 className="font-semibold text-text-white mb-2">{account.name}</h4>
                      <p className="text-2xl font-bold text-primary-blue mb-2">{account.apy}% APY</p>
                      <ul className="text-sm text-text-secondary mb-4 space-y-1">
                        {account.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                      <a
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                        onClick={() => {
                          // GA4 tracking
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'click_affiliate', {
                              provider: account.name
                            })
                          }
                        }}
                      >
                        <span>Open Account</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Investing Platforms */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleAccordion('investing-platforms')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-input-bg transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-white">Want to learn where to invest?</h3>
              {expandedAccordion === 'investing-platforms' ? (
                <ChevronUp className="w-5 h-5 text-text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary" />
              )}
            </button>
            
            {expandedAccordion === 'investing-platforms' && (
              <div className="px-6 pb-6 bg-input-bg">
                <p className="text-text-primary mb-4">
                  Choose a low-cost brokerage platform for your investment accounts. These platforms offer commission-free trading and low fees:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BROKERAGE_PLATFORMS.map((platform) => (
                    <div key={platform.name} className="card p-4">
                      <h4 className="font-semibold text-text-white mb-2">{platform.name}</h4>
                      <p className="text-sm text-text-secondary mb-3">{platform.description}</p>
                      <ul className="text-sm text-text-secondary mb-4 space-y-1">
                        {platform.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                        onClick={() => {
                          // GA4 tracking
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'click_affiliate', {
                              provider: platform.name
                            })
                          }
                        }}
                      >
                        <span>Learn More</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Budget Management */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleAccordion('budget-management')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-input-bg transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-white">Want to manage your budget?</h3>
              {expandedAccordion === 'budget-management' ? (
                <ChevronUp className="w-5 h-5 text-text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary" />
              )}
            </button>
            
            {expandedAccordion === 'budget-management' && (
              <div className="px-6 pb-6 bg-input-bg">
                <p className="text-text-primary mb-4">
                  Track your spending and manage your budget with these popular personal finance apps:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PFM_APPS.map((app) => (
                    <div key={app.name} className="card p-4">
                      <h4 className="font-semibold text-text-white mb-2">{app.name}</h4>
                      <p className="text-sm text-text-secondary mb-3">{app.description}</p>
                      <ul className="text-sm text-text-secondary mb-4 space-y-1">
                        {app.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                        onClick={() => {
                          // GA4 tracking
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'click_affiliate', {
                              provider: app.name
                            })
                          }
                        }}
                      >
                        <span>Try App</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 