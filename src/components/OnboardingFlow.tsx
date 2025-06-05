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
    title: 'How old are you?',
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
    title: 'What is your take home pay per month?',
    inputType: 'slider',
    min: 0,
    max: 20000,
    step: 100,
    prefix: '$',
    suffix: ' / month'
  },
  {
    id: 'monthlyExpenses',
    title: 'What is your average monthly spending?',
    tooltip: 'Include rent/mortgage, utilities, groceries, transportation, etc.',
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
    tooltip: 'For 401(k), IRA, brokerage, etc.',
    inputType: 'slider',
    min: 0,
    max: 10000,
    step: 100,
    prefix: '$',
    suffix: ' / month'
  },
  {
    id: 'currentSavings',
    title: 'Your total retirement savings to date?',
    tooltip: 'Include 401k balances, IRAs and brokerage accounts.',
    inputType: 'slider',
    min: 0,
    max: 2000000,
    step: 1000,
    prefix: '$'
  },
  {
    id: 'highInterestDebt',
    title: 'Do you have any high interest debt (6%+ APR)?',
    tooltip: 'Includes credit card, student loans, car loan, etc.',
    inputType: 'toggle'
  },
  {
    id: 'retirementState',
    title: 'Where do you plan to retire (which state)?',
    inputType: 'dropdown',
    options: Object.keys(STATE_EFFECTIVE_TAX_RATES)
  }
]

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<UserInputs>(DEFAULT_VALUES)
  const [showResults, setShowResults] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)

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
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const prevStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.max(0, prev - 1))
      setIsTransitioning(false)
    }, 150)
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
        
        {/* Dot Indicators */}
        <div className="flex space-x-2">
          {ONBOARDING_STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-primary-blue scale-125' 
                  : index < currentStep 
                    ? 'bg-primary-blue opacity-60' 
                    : 'bg-input-bg'
              }`}
            />
          ))}
        </div>

        {/* Spacer for balance */}
        <div className="w-10 h-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between p-4 min-h-0">
        <div className="flex-1 flex items-start justify-center pt-8">
          <div className="w-full max-w-2xl">
            <div className={`modern-card px-8 py-6 transition-all duration-300 ${isTransitioning ? 'step-exit' : 'step-enter'}`}>
              {/* Question */}
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-white mb-4">
                  {step.title}
                </h1>
                {step.subtitle && (
                  <p className="text-lg text-text-secondary mb-4">{step.subtitle}</p>
                )}
                {step.tooltip && (
                  <p className="text-sm text-text-muted">
                    {step.tooltip}
                  </p>
                )}
              </div>

              {/* Input */}
              <div className="mb-2">
                {step.inputType === 'slider' && (
                  <SliderInput
                    value={inputs[step.id] as number}
                    onChange={(value) => updateInput(step.id, value)}
                    min={step.min || 0}
                    max={step.max || 100}
                    step={step.step || 1}
                    prefix={step.prefix}
                    suffix={step.suffix}
                    stepIndex={currentStep}
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
                <div className="mt-4">
                  {errors.map((error, index) => (
                    <p key={index} className="text-error-red text-sm text-center">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation - Fixed at bottom */}
        <div className="flex justify-between max-w-2xl mx-auto w-full px-4 pb-8">
          {/* Back Button - only show after first step */}
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              disabled={isTransitioning}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
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
            disabled={isTransitioning}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <span>{isLastStep ? 'Results' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
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
  suffix = '',
  stepIndex
}: {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  stepIndex: number
}) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isFocused) {
      setInputValue(formatNumber(value))
    }
  }, [value, isFocused])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputStr = e.target.value
    setInputValue(inputStr)
    
    // Remove commas and convert to number
    const numericValue = Number(inputStr.replace(/,/g, ''))
    if (!isNaN(numericValue)) {
      onChange(numericValue)
    }
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    // Format the final value with commas
    setInputValue(formatNumber(value))
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    // Show raw number without formatting for easier editing
    setInputValue(value.toString())
  }

  // Apply different slider heights based on question group
  const sliderClass = stepIndex <= 2 ? 'slider-basic' : 'slider-detailed'

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
        className={`w-full ${sliderClass}`}
      />

      {/* Manual Input */}
      <div className="flex justify-center">
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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