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
  const [targetMonthlyIncome, setTargetMonthlyIncome] = useState(3000)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const projection = calculateRetirementProjection(inputs)
  const whatIfScenario = calculateWhatIfScenario(projection, targetMonthlyIncome, inputs)

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
          
          <h1 className="text-2xl font-bold text-text-white">Your Financial Dashboard</h1>
          
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text-secondary">Projected Nest-Egg</h3>
              <TrendingUp className="w-5 h-5 text-primary-teal" />
            </div>
            <p className="text-3xl font-bold text-text-white mb-1">
              {formatCurrency(projection.totalRetirementBalance)}
            </p>
            <p className="text-xs text-text-secondary">At age {inputs.retirementAge}</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text-secondary">Monthly (Post-Tax)</h3>
              <DollarSign className="w-5 h-5 text-secondary-green" />
            </div>
            <p className="text-3xl font-bold text-text-white mb-1">
              {formatCurrency(projection.monthlyWithdrawalAfterTax)}
            </p>
            <p className="text-xs text-text-secondary">(4% Rule)</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text-secondary">Savings Rate</h3>
              <Target className="w-5 h-5 text-secondary-orange" />
            </div>
            <p className={`text-3xl font-bold mb-1 ${getSavingsRateColor(projection.currentSavingsRate)}`}>
              {formatPercentage(projection.currentSavingsRate)}
            </p>
            <p className="text-xs text-text-secondary">{getSavingsRateStatus(projection.currentSavingsRate)}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
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
                  <span className="text-primary-teal font-bold text-lg">
                    {formatCurrency(projection.totalRetirementBalance)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - What-If & Recommendations */}
          <div className="space-y-6">
            {/* What-If Scenario */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text-white mb-6">What-If Goal</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Desired Monthly Income (After Tax)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                    <input
                      type="number"
                      value={targetMonthlyIncome}
                      onChange={(e) => setTargetMonthlyIncome(Number(e.target.value))}
                      className="input-field w-full pl-8"
                      placeholder="3000"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">/mo</span>
                  </div>
                </div>

                <div className="p-4 bg-input-bg rounded-lg">
                  <p className="text-text-white font-semibold mb-2">
                    To reach {formatCurrency(targetMonthlyIncome)}/month:
                  </p>
                  <p className="text-text-primary text-sm">
                    You need to invest {formatCurrency(whatIfScenario.requiredAdditionalMonthlyInvestment)} more per month starting today.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Recommendations */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text-white mb-6">Priority Actions</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-teal rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-text-white">401(k) Employer Match</h3>
                    <p className="text-sm text-text-secondary">Contribute at least enough to get your company match—it's free money.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary-green rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-text-white">Roth IRA</h3>
                    <p className="text-sm text-text-secondary">If eligible, fund a Roth IRA for tax-free growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary-orange rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-text-white">High-Yield Savings</h3>
                    <p className="text-sm text-text-secondary">Keep emergency fund in a high-yield savings account.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-white">Recommended Accounts & Tools</h2>
          
          {/* High-Yield Savings Accounts */}
          <div>
            <h3 className="text-xl font-semibold text-text-white mb-4">High-Yield Savings Accounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HYSA_ACCOUNTS.map((account) => (
                <div key={account.name} className="card p-4">
                  <h4 className="font-semibold text-text-white mb-2">{account.name}</h4>
                  <p className="text-2xl font-bold text-primary-teal mb-2">{account.apy}% APY</p>
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

          {/* Brokerage Platforms */}
          <div>
            <h3 className="text-xl font-semibold text-text-white mb-4">Brokerage Platforms</h3>
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

          {/* PFM Apps */}
          <div>
            <h3 className="text-xl font-semibold text-text-white mb-4">Personal Finance Apps</h3>
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
        </div>

        {/* Educational Accordions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text-white">Learn More</h2>
          
          {[
            {
              id: 'four-percent-rule',
              title: 'What Is the 4% Rule?',
              content: 'The 4% rule suggests you can withdraw 4% of your portfolio in the first year of retirement, then adjust for inflation each subsequent year. It\'s based on historical market simulations (stocks vs. bonds) and aims to make your money last 30+ years in retirement.'
            },
            {
              id: 'tax-estimation',
              title: 'How We Estimate Taxes',
              content: 'We estimate taxes by applying 2025 federal tax brackets (single-filer) to your annual withdrawal and adding a state effective rate based on your chosen retirement state. Actual tax liability may vary in retirement due to changes in tax law, marital status, and other deductions.'
            },
            {
              id: 'annual-return',
              title: 'Why Assume 8% Annual Return?',
              content: 'An 8% annual return assumption is based on historical stock market performance. The S&P 500 has averaged approximately 10% nominal returns (about 8% real after inflation) over long periods. This compounds significantly over decades—small differences in return assumptions can dramatically change your final nest-egg.'
            }
          ].map((item) => (
            <div key={item.id} className="card overflow-hidden">
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-input-bg transition-colors"
              >
                <h3 className="text-lg font-semibold text-text-white">{item.title}</h3>
                {expandedAccordion === item.id ? (
                  <ChevronUp className="w-5 h-5 text-text-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                )}
              </button>
              
              {expandedAccordion === item.id && (
                <div className="px-6 pb-6 bg-input-bg">
                  <p className="text-text-primary">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 