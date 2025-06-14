'use client'

import { formatPercentage } from '@/utils/financial-calculations'

interface SavingsGaugeProps {
  savingsRate: number
}

export default function SavingsGauge({ savingsRate }: SavingsGaugeProps) {
  // Convert savings rate to percentage for display
  const percentage = Math.min(Math.max(savingsRate * 100, 0), 100)
  
  // Calculate the arc path for the gauge (bottom half circle)
  const radius = 80
  const strokeWidth = 12
  const centerX = radius + strokeWidth
  const centerY = radius + strokeWidth
  const circumference = Math.PI * radius // Half circle circumference
  const strokeDasharray = `${circumference} ${circumference}`
  // Start from 0% (left) and fill to percentage (right)
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Determine color based on savings rate thresholds
  const getColor = () => {
    if (savingsRate < 0.10) return '#EF4444' // Red
    if (savingsRate < 0.20) return '#F59E0B' // Orange  
    return '#10B981' // Green
  }

  const getStatus = () => {
    if (savingsRate < 0.10) return 'Below Recommended'
    if (savingsRate < 0.20) return 'Getting There'
    return 'On Track'
  }

  return (
    <div className="flex flex-col items-center">
      {/* Semi-circular gauge */}
      <div className="relative">
        <svg
          height={centerY + strokeWidth}
          width={(centerX) * 2}
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX * 2 - strokeWidth} ${centerY}`}
            fill="none"
            stroke="#243354"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX * 2 - strokeWidth} ${centerY}`}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold" style={{ color: '#3B82F6' }}>
            {formatPercentage(savingsRate)}
          </div>
          <div className="text-sm text-text-secondary mt-1">
            Savings Rate
          </div>
        </div>
      </div>
      
      {/* Status and benchmarks */}
      <div className="mt-6 text-center">
        <div className={`text-lg font-semibold mb-2`} style={{ color: getColor() }}>
          {getStatus()}
        </div>
        
        {/* Benchmark indicators */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error-red"></div>
            <span className="text-text-secondary">&lt; 10%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary-orange"></div>
            <span className="text-text-secondary">10-20%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success-green"></div>
            <span className="text-text-secondary">20%+</span>
          </div>
        </div>
      </div>
    </div>
  )
} 