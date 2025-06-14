'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, TrendingUp, DollarSign, Target, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { 
  calculateRetirementProjection, 
  calculateWhatIfScenario,
  formatCurrency,
  formatPercentage,
  getSavingsRateColor,
  getSavingsRateStatus
} from '@/utils/financial-calculations'
import { HYSA_ACCOUNTS, BROKERAGE_PLATFORMS, PFM_APPS, FINANCIAL_ASSUMPTIONS } from '@/data/financial-data'
import type { UserInputs } from '@/types'

interface DashboardProps {
  inputs: UserInputs
  onBack: () => void
}

// Constants for calculations
const INFLATION_RATE = 0.03

// Generate projection data for chart
function generateProjectionData(inputs: UserInputs) {
  const { currentAge, retirementAge, currentSavings, monthlyInvestments } = inputs
  const { annual_return } = FINANCIAL_ASSUMPTIONS
  const data = []
  
  let currentBalance = currentSavings
  
  for (let age = currentAge; age <= retirementAge; age++) {
    data.push({
      age,
      balance: Math.round(currentBalance)
    })
    
    if (age < retirementAge) {
      // Add monthly contributions for the year and apply annual growth
      const yearlyContributions = monthlyInvestments * 12
      currentBalance = (currentBalance + yearlyContributions) * (1 + annual_return)
    }
  }
  
  return data
}

// Calculate present value with inflation
function calculatePresentValue(futureValue: number, yearsInFuture: number): number {
  return futureValue / Math.pow(1 + INFLATION_RATE, yearsInFuture)
}

// Custom tooltip for chart
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-bg border border-border-color rounded-lg p-3 shadow-lg">
        <p className="text-text-white font-semibold">
          Age {label}: {formatCurrency(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export default function Dashboard({ inputs, onBack }: DashboardProps) {
  // Calculate default additional investment based on available income
  const availableIncome = inputs.monthlyTakeHome - inputs.monthlyExpenses
  const defaultAdditionalInvestment = availableIncome > 400 ? Math.round(availableIncome * 0.25) : 100
  
  const [additionalInvestment, setAdditionalInvestment] = useState(defaultAdditionalInvestment)
  const [expandedAccordions, setExpandedAccordions] = useState<Set<string>>(new Set())
  const [showEducationalContent, setShowEducationalContent] = useState(false)
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false)
  
  // For handling comma-formatted input
  const [investmentInputValue, setInvestmentInputValue] = useState('')
  const [isInvestmentFocused, setIsInvestmentFocused] = useState(false)

  useEffect(() => {
    if (!isInvestmentFocused) {
      setInvestmentInputValue(formatNumber(additionalInvestment))
    }
  }, [additionalInvestment, isInvestmentFocused])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const handleInvestmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputStr = e.target.value
    setInvestmentInputValue(inputStr)
    
    // Remove commas and convert to number
    const numericValue = Number(inputStr.replace(/,/g, ''))
    if (!isNaN(numericValue)) {
      setAdditionalInvestment(numericValue)
    }
  }

  const handleInvestmentInputBlur = () => {
    setIsInvestmentFocused(false)
    // Format the final value with commas
    setInvestmentInputValue(formatNumber(additionalInvestment))
  }

  const handleInvestmentInputFocus = () => {
    setIsInvestmentFocused(true)
    // Show raw number without formatting for easier editing
    setInvestmentInputValue(additionalInvestment.toString())
  }

  const projection = calculateRetirementProjection(inputs)
  const projectionData = generateProjectionData(inputs)
  
  // Calculate inflation-adjusted values
  const yearsUntilRetirement = inputs.retirementAge - inputs.currentAge
  const presentValueNestEgg = calculatePresentValue(projection.totalRetirementBalance, yearsUntilRetirement)
  const presentValueMonthlyIncome = calculatePresentValue(projection.monthlyWithdrawalAfterTax, yearsUntilRetirement)
  
  // Calculate what happens with additional investment
  const enhancedInputs = {
    ...inputs,
    monthlyInvestments: inputs.monthlyInvestments + additionalInvestment
  }
  const enhancedProjection = calculateRetirementProjection(enhancedInputs)
  const additionalMonthlyIncome = enhancedProjection.monthlyWithdrawalAfterTax - projection.monthlyWithdrawalAfterTax
  const additionalNestEgg = enhancedProjection.totalRetirementBalance - projection.totalRetirementBalance

  const toggleAccordion = (id: string) => {
    setExpandedAccordions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="px-4 py-6 border-b border-border-color relative">
        <button
          onClick={onBack}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-input-bg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-text-secondary hover:text-text-white" />
        </button>
        
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Image 
              src="/ArchieLogo.png" 
              alt="Archie.Money Logo" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <h1 className="text-2xl font-bold text-text-white">Archie's analysis</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* High-Interest Debt Banner */}
        {inputs.highInterestDebt && (
          <div className="modern-card bg-dark-red p-4 border border-error-red">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-error-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">High-Interest Debt Detected</h3>
                <p className="text-sm text-text-primary">
                  It looks like you're carrying debt with an APR above 6%. It's generally wiser to pay down that high-interest debt before directing extra money into investments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="modern-card p-4">
            <h2 className="text-xl font-semibold text-text-white mb-1">Projected Nest-Egg</h2>
            <p className="text-xs text-text-secondary mb-3">At age {inputs.retirementAge}</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#3B82F6' }}>
              {formatCurrency(projection.totalRetirementBalance)}
            </p>
            {yearsUntilRetirement > 0 && (
              <p className="text-sm text-gray-400 italic">
                ≈ {formatCurrency(presentValueNestEgg)} in today's dollars
              </p>
            )}
          </div>

          <div className="modern-card p-4">
            <h2 className="text-xl font-semibold text-text-white mb-1">Retirement Income</h2>
            <p className="text-xs text-text-secondary mb-3">4% Rule, Pre-Tax</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#3B82F6' }}>
              {formatCurrency(projection.monthlyWithdrawalBeforeTax)}<span className="text-base text-text-secondary">/month</span>
            </p>
            {yearsUntilRetirement > 0 && (
              <p className="text-sm text-gray-400 italic">
                ≈ {formatCurrency(calculatePresentValue(projection.monthlyWithdrawalBeforeTax, yearsUntilRetirement))}/month in today's dollars
              </p>
            )}
          </div>
        </div>

        {/* Projection Chart */}
        {inputs.currentAge < inputs.retirementAge && (
          <div className="modern-card p-4">
            <h2 className="text-xl font-semibold text-text-white mb-4">Savings Trajectory</h2>
            
            <div className="h-64 flex justify-center">
              <div className="w-full max-w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="age" 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={{ stroke: '#374151' }}
                    interval="preserveStartEnd"
                    domain={['dataMin', 'dataMax']}
                    type="number"
                    scale="linear"
                    tickFormatter={(value) => {
                      // Show labels at 5-year intervals
                      if (value % 5 === 0 || value === inputs.currentAge || value === inputs.retirementAge) {
                        return value.toString()
                      }
                      return ''
                    }}
                  />
                  <YAxis 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={{ stroke: '#374151' }}
                    tickFormatter={(value) => {
                      if (value >= 1000000) {
                        return `$${(value / 1000000).toFixed(1)}M`
                      } else if (value >= 1000) {
                        return `$${(value / 1000).toFixed(0)}K`
                      }
                      return `$${value}`
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#3B82F6' }}
                  />
                                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Main Column - Analysis */}
          <div className="xl:col-span-2 space-y-4">
            {/* Contribution Growth Breakdown */}
            <div className="modern-card p-4">
              <h2 className="text-xl font-semibold text-text-white mb-4">Contribution Growth Breakdown</h2>
              
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
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-white font-semibold">Total nest-egg</span>
                  <span className="text-primary-blue font-bold text-lg">
                    {formatCurrency(projection.totalRetirementBalance)}
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly Withdrawal Breakdown */}
            <div className="modern-card p-4">
              <h2 className="text-xl font-semibold text-text-white mb-4">Monthly Withdrawal Breakdown</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border-color">
                  <span className="text-text-secondary">Gross monthly (4% rule)</span>
                  <span className="text-text-white font-semibold">
                    {formatCurrency(projection.monthlyWithdrawalBeforeTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-color">
                  <span className="text-text-secondary">Total tax rate</span>
                  <span className="text-text-white font-semibold">
                    {formatPercentage(projection.totalTaxRate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-white font-semibold">Net monthly (post-tax)</span>
                  <span className="text-primary-blue font-bold text-lg">
                    {formatCurrency(projection.monthlyWithdrawalAfterTax)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - What-If & Quick Actions */}
          <div className="space-y-4">
            {/* What-If Scenario */}
            <div className="modern-card p-4">
              <h2 className="text-xl font-semibold text-text-white mb-4">What if you invested more?</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Additional Monthly Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={investmentInputValue}
                      onChange={handleInvestmentInputChange}
                      onFocus={handleInvestmentInputFocus}
                      onBlur={handleInvestmentInputBlur}
                      className="input-field w-full pl-8"
                      placeholder={formatNumber(defaultAdditionalInvestment)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">/mo</span>
                  </div>
                </div>

                <div className="p-4 bg-input-bg rounded-lg">
                  <p className="text-text-white font-semibold mb-2">
                    Extra nest egg:
                  </p>
                  <p className="text-2xl font-bold text-primary-blue mb-1">
                    +{formatCurrency(additionalNestEgg)}
                  </p>
                  <p className="text-text-secondary text-sm">
                    By investing {formatCurrency(additionalInvestment)} more monthly
                  </p>
                </div>

                <button
                  onClick={() => setShowInvestmentDetails(!showInvestmentDetails)}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>See how it grows</span>
                  {showInvestmentDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showInvestmentDetails && (
                  <div className="space-y-4 pt-4 border-t border-border-color">
                    <div className="p-4 bg-input-bg rounded-lg">
                      <p className="text-text-white font-semibold mb-2">
                        New Total Nest Egg:
                      </p>
                      <p className="text-2xl font-bold text-primary-blue mb-1">
                        {formatCurrency(enhancedProjection.totalRetirementBalance)}
                      </p>
                      <p className="text-text-secondary text-sm">
                        +{formatCurrency(additionalNestEgg)} more than your current plan
                      </p>
                    </div>

                    <div className="p-4 bg-input-bg rounded-lg">
                      <p className="text-text-white font-semibold mb-2">
                        New Gross Monthly Withdrawal:
                      </p>
                      <p className="text-2xl font-bold text-primary-blue mb-1">
                        {formatCurrency(enhancedProjection.monthlyWithdrawalBeforeTax)}/month
                      </p>
                      <p className="text-text-secondary text-sm">
                        +{formatCurrency(enhancedProjection.monthlyWithdrawalBeforeTax - projection.monthlyWithdrawalBeforeTax)}/m more than your current plan
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action-Oriented Expandable Sections */}
        <div className="space-y-3">
          <div className="modern-card overflow-hidden">
            <button
              onClick={() => setShowEducationalContent(!showEducationalContent)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-input-bg transition-colors"
            >
              <h3 className="text-lg font-semibold text-text-white">Learn more about your finances</h3>
              {showEducationalContent ? (
                <ChevronUp className="w-5 h-5 text-text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary" />
              )}
            </button>
            
            {showEducationalContent && (
              <div className="px-6 pb-6 space-y-4">
                {/* Emergency Fund */}
                <button
                  onClick={() => toggleAccordion('emergency-fund')}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>Build emergency fund</span>
                  {expandedAccordions.has('emergency-fund') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                  
                {expandedAccordions.has('emergency-fund') && (
                  <div className="space-y-4 pt-4">
                    <p className="text-text-primary mb-4">
                      Keep 3-6 months of expenses in a high-yield savings account for emergencies. These accounts offer much better rates than traditional banks:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {HYSA_ACCOUNTS.map((account) => (
                        <div key={account.name} className="modern-card p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Image 
                              src={account.logo} 
                              alt={`${account.name} logo`} 
                              width={32} 
                              height={32}
                              className="rounded-lg"
                            />
                            <h5 className="font-semibold text-text-white">{account.name}</h5>
                          </div>
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
                            <span>
                              {account.name.includes('Ally') ? 'Ally Bank' :
                               account.name.includes('Marcus') ? 'Marcus' :
                               account.name.includes('Capital One') ? 'Capital One' :
                               account.name}
                            </span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investing Platforms */}
                <button
                  onClick={() => toggleAccordion('investing-platforms')}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>Learn where to invest</span>
                  {expandedAccordions.has('investing-platforms') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                {expandedAccordions.has('investing-platforms') && (
                  <div className="space-y-4 pt-4">
                    <p className="text-text-primary mb-4">
                      Choose a low-cost brokerage platform for your investment accounts. These platforms offer commission-free trading and low fees:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {BROKERAGE_PLATFORMS.map((platform) => (
                        <div key={platform.name} className="modern-card p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Image 
                              src={platform.logo} 
                              alt={`${platform.name} logo`} 
                              width={32} 
                              height={32}
                              className="rounded-lg"
                            />
                            <h5 className="font-semibold text-text-white">{platform.name}</h5>
                          </div>
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
                            <span>{platform.name}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget Management */}
                <button
                  onClick={() => toggleAccordion('budget-management')}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>Manage your budget</span>
                  {expandedAccordions.has('budget-management') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                {expandedAccordions.has('budget-management') && (
                  <div className="space-y-4 pt-4">
                    <p className="text-text-primary mb-4">
                      Track your spending and manage your budget with these popular personal finance apps:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {PFM_APPS.map((app) => (
                        <div key={app.name} className="modern-card p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Image 
                              src={app.logo} 
                              alt={`${app.name} logo`} 
                              width={32} 
                              height={32}
                              className="rounded-lg"
                            />
                            <h5 className="font-semibold text-text-white">{app.name}</h5>
                          </div>
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
                            <span>
                              {app.name === 'You Need A Budget (YNAB)' ? 'YNAB' : app.name}
                            </span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 