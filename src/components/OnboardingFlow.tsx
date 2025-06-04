'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { DEFAULT_VALUES, STATE_EFFECTIVE_TAX_RATES } from '@/data/financial-data'
import { validateInputs } from '@/utils/financial-calculations'
import type { UserInputs } from '@/types'
import Dashboard from './Dashboard'

interface OnboardingFlowProps {
  onComplete: () => void
}

interface OnboardingStep {
  id: keyof UserInputs
  title: string
  subtitle?: string
  tooltip?: string
  inputType: 'slider' | 'toggle' | 'dropdown'
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  options?: string[]
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'currentAge',
    title: 'What is your current age?',
    inputType: 'slider',
    min: 20,
    max: 75,
    step: 1,
    suffix: ' years old'
  },
  {
    id: 'retirementAge',
    title: 'When do you want to retire?',
    inputType: 'slider',
    min: 45,
    max: 75,
    step: 1,
    suffix: ' years old'
  },
  {
    id: 'monthlyTakeHome',
    title: 'How much do you take home per month after taxes?',
    tooltip: 'Enter your net pay (after federal, state, and payroll taxes). Taxes will be estimated later.',
    inputType: 'slider',
    min: 0,
    max: 20000,
    step: 100,
    prefix: '$',
    suffix: ' / month'
  },
  {
    id: 'monthlyExpenses',
    title: 'Roughly how much do you spend each month?',
    tooltip: 'Include rent/mortgage, utilities, groceries, transportation, subscriptions, entertainment, etc.',
    inputType: 'slider',
    min: 0,
    max: 20000,
    step: 100,
    prefix: '$',
    suffix: ' / month'
  },
  {
    id: 'monthlyInvestments',
    title: 'How much do you invest per month?',
    tooltip: 'Include any recurring transfers to brokerage or retirement accounts (pre-tax 401(k), Roth IRA, etc.).',
    inputType: 'slider',
    min: 0,
    max: 10000,
    step: 100,
    prefix: '$',
    suffix: ' / month'
  },
  {
    id: 'currentSavings',
    title: 'How much do you already have invested toward retirement?',
    tooltip: 'e.g., balances in 401(k), Roth IRA, traditional IRAs, and taxable accounts you earmark for retirement.',
    inputType: 'slider',
    min: 0,
    max: 2000000,
    step: 1000,
    prefix: '$'
  },
  {
    id: 'highInterestDebt',
    title: 'Do you currently have any debt with an interest rate above 6% APR?',
    tooltip: 'Includes credit card, student loans, car loan, etc.',
    inputType: 'toggle'
  },
  {
    id: 'retirementState',
    title: 'Which state do you expect to retire in?',
    inputType: 'dropdown',
    options: Object.keys(STATE_EFFECTIVE_TAX_RATES)
  }
]

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<UserInputs>(DEFAULT_VALUES)
  const [showResults, setShowResults] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const step = ONBOARDING_STEPS[currentStep]
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1

  const updateInput = (field: keyof UserInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    setErrors([])
  }

  const nextStep = () => {
    // Validate current step
    const validationErrors = validateInputs(inputs)
    const stepErrors = validationErrors
      .filter(error => error.field === step.id)
      .map(error => error.message)
    
    if (stepErrors.length > 0) {
      setErrors(stepErrors)
      return
    }

    if (isLastStep) {
      setShowResults(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
    setErrors([])
  }

  if (showResults) {
    return <Dashboard inputs={inputs} onBack={() => setShowResults(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary-bg">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-input-bg">
        <div 
          className="h-full bg-primary-blue transition-all duration-300"
          style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={currentStep === 0 ? onComplete : prevStep}
          className="p-2 rounded-lg hover:bg-input-bg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-text-secondary hover:text-text-white" />
        </button>
        
        <span className="text-sm text-text-secondary">
          Step {currentStep + 1} of {ONBOARDING_STEPS.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="card p-8 slide-in-right backdrop-blur-glass">
            {/* Question */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-white mb-4">
                {step.title}
              </h1>
              {step.subtitle && (
                <p className="text-lg text-text-secondary mb-4">{step.subtitle}</p>
              )}
              {step.tooltip && (
                <div className="flex items-center justify-center space-x-2 text-text-muted">
                  <Info className="w-4 h-4" />
                  <p className="text-sm">{step.tooltip}</p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="mb-8">
              {step.inputType === 'slider' && (
                <SliderInput
                  value={inputs[step.id] as number}
                  onChange={(value) => updateInput(step.id, value)}
                  min={step.min || 0}
                  max={step.max || 100}
                  step={step.step || 1}
                  prefix={step.prefix}
                  suffix={step.suffix}
                />
              )}
              
              {step.inputType === 'toggle' && (
                <ToggleInput
                  value={inputs[step.id] as boolean}
                  onChange={(value) => updateInput(step.id, value)}
                />
              )}
              
              {step.inputType === 'dropdown' && (
                <DropdownInput
                  value={inputs[step.id] as string}
                  onChange={(value) => updateInput(step.id, value)}
                  options={step.options || []}
                />
              )}
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="mb-6">
                {errors.map((error, index) => (
                  <p key={index} className="text-error-red text-sm text-center">
                    {error}
                  </p>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              {/* Back Button - only show after first step */}
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              )}
              
              {/* Spacer when no back button */}
              {currentStep === 0 && <div />}
              
              {/* Next Button */}
              <button
                onClick={nextStep}
                className="btn-primary flex items-center space-x-2"
              >
                <span>{isLastStep ? 'See Results' : 'Next'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Input Components
function SliderInput({ 
  value, 
  onChange, 
  min, 
  max, 
  step, 
  prefix = '', 
  suffix = '' 
}: {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Value Display */}
      <div className="text-center">
        <span className="text-4xl font-bold text-text-white">
          {prefix}{formatNumber(value)}{suffix}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />

      {/* Manual Input */}
      <div className="flex justify-center">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="input-field w-48 text-center text-lg"
          placeholder="Enter amount"
        />
      </div>
    </div>
  )
}

function ToggleInput({ 
  value, 
  onChange 
}: {
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => onChange(false)}
        className={`px-8 py-4 rounded-lg font-semibold transition-all ${
          !value 
            ? 'bg-primary-blue text-white shadow-lg' 
            : 'bg-input-bg text-text-secondary hover:text-text-white border border-border-color'
        }`}
      >
        No
      </button>
      <button
        onClick={() => onChange(true)}
        className={`px-8 py-4 rounded-lg font-semibold transition-all ${
          value 
            ? 'bg-primary-blue text-white shadow-lg' 
            : 'bg-input-bg text-text-secondary hover:text-text-white border border-border-color'
        }`}
      >
        Yes
      </button>
    </div>
  )
}

function DropdownInput({ 
  value, 
  onChange, 
  options 
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <div className="flex justify-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field w-64 text-center text-lg"
      >
        {options.map(option => (
          <option key={option} value={option} className="bg-input-bg">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
} 