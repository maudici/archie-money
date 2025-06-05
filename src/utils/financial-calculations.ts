import {
  FINANCIAL_ASSUMPTIONS,
  FEDERAL_TAX_BRACKETS_2025,
  STATE_EFFECTIVE_TAX_RATES,
  SAVINGS_RATE_THRESHOLDS,
} from '@/data/financial-data';
import type { UserInputs, FinancialProjection, ValidationError } from '@/types';

export function calculateRetirementProjection(inputs: UserInputs): FinancialProjection {
  const { currentAge, retirementAge, monthlyTakeHome, monthlyInvestments, currentSavings, retirementState } = inputs;
  const { annual_return, withdrawal_rate } = FINANCIAL_ASSUMPTIONS;

  // Years until retirement
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  
  // Future value of current savings
  const futureValueCurrentSavings = currentSavings * Math.pow(1 + annual_return, yearsToRetirement);
  
  // Future value of recurring monthly investments
  const monthlyRate = annual_return / 12;
  const numPayments = yearsToRetirement * 12;
  let futureValueContributions = 0;
  
  if (monthlyInvestments > 0 && numPayments > 0) {
    futureValueContributions = monthlyInvestments * 
      (((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate) * (1 + monthlyRate));
  }
  
  // Total retirement balance
  const totalRetirementBalance = futureValueCurrentSavings + futureValueContributions;
  
  // 4% rule withdrawal (gross amount)
  const annualWithdrawalBeforeTax = totalRetirementBalance * withdrawal_rate;
  const monthlyWithdrawalBeforeTax = annualWithdrawalBeforeTax / 12;
  
  // Tax calculations
  const federalTaxRate = calculateFederalTaxRate(annualWithdrawalBeforeTax);
  const stateTaxRate = STATE_EFFECTIVE_TAX_RATES[retirementState as keyof typeof STATE_EFFECTIVE_TAX_RATES] || 0.05;
  const totalTaxRate = Math.min(federalTaxRate + stateTaxRate, 0.47); // Cap at 47%
  
  // After-tax withdrawal
  const annualWithdrawalAfterTax = annualWithdrawalBeforeTax * (1 - totalTaxRate);
  const monthlyWithdrawalAfterTax = annualWithdrawalAfterTax / 12;
  
  // Current savings rate
  const annualInvestments = monthlyInvestments * 12;
  const annualTakeHome = monthlyTakeHome * 12;
  const currentSavingsRate = annualTakeHome > 0 ? annualInvestments / annualTakeHome : 0;

  return {
    yearsToRetirement,
    futureValueCurrentSavings,
    futureValueContributions,
    totalRetirementBalance,
    annualWithdrawalBeforeTax,
    monthlyWithdrawalBeforeTax,
    annualWithdrawalAfterTax,
    monthlyWithdrawalAfterTax,
    currentSavingsRate,
    totalTaxRate,
    federalTaxRate,
    stateTaxRate,
  };
}

export function calculateFederalTaxRate(taxableIncome: number): number {
  let totalTax = 0;
  let remainingIncome = taxableIncome;
  
  for (const bracket of FEDERAL_TAX_BRACKETS_2025) {
    const taxableInThisBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1);
    if (taxableInThisBracket <= 0) break;
    
    totalTax += taxableInThisBracket * bracket.rate;
    remainingIncome -= taxableInThisBracket;
    
    if (remainingIncome <= 0) break;
  }
  
  return taxableIncome > 0 ? totalTax / taxableIncome : 0;
}

export function calculateWhatIfScenario(
  currentProjection: FinancialProjection,
  targetMonthlyIncome: number,
  inputs: UserInputs
): { requiredAdditionalMonthlyInvestment: number; requiredTotalBalance: number } {
  const { retirementState } = inputs;
  const { withdrawal_rate, annual_return } = FINANCIAL_ASSUMPTIONS;
  
  // Calculate required annual withdrawal before tax
  const stateTaxRate = STATE_EFFECTIVE_TAX_RATES[retirementState as keyof typeof STATE_EFFECTIVE_TAX_RATES] || 0.05;
  const targetAnnualIncome = targetMonthlyIncome * 12;
  const estimatedTotalTaxRate = 0.25; // Use estimated rate for reverse calculation
  const requiredAnnualWithdrawalBeforeTax = targetAnnualIncome / (1 - estimatedTotalTaxRate);
  
  // Calculate required balance at retirement
  const requiredTotalBalance = requiredAnnualWithdrawalBeforeTax / withdrawal_rate;
  
  // Calculate additional balance needed
  const additionalBalanceNeeded = Math.max(0, requiredTotalBalance - currentProjection.totalRetirementBalance);
  
  // Calculate required additional monthly investment
  const yearsToRetirement = currentProjection.yearsToRetirement;
  const monthlyRate = annual_return / 12;
  const numPayments = yearsToRetirement * 12;
  
  let requiredAdditionalMonthlyInvestment = 0;
  if (additionalBalanceNeeded > 0 && numPayments > 0) {
    // Solve for PMT in future value of annuity formula
    const denominator = ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate) * (1 + monthlyRate);
    requiredAdditionalMonthlyInvestment = additionalBalanceNeeded / denominator;
  }
  
  return {
    requiredAdditionalMonthlyInvestment,
    requiredTotalBalance,
  };
}

export function getSavingsRateColor(savingsRate: number): string {
  if (savingsRate < SAVINGS_RATE_THRESHOLDS.RED) return 'text-error-red';
  if (savingsRate < SAVINGS_RATE_THRESHOLDS.YELLOW) return 'text-secondary-orange';
  return 'text-secondary-green';
}

export function getSavingsRateStatus(savingsRate: number): string {
  if (savingsRate < SAVINGS_RATE_THRESHOLDS.RED) return 'Below recommended';
  if (savingsRate < SAVINGS_RATE_THRESHOLDS.YELLOW) return 'Getting there';
  return 'On track';
}

export function validateInputs(inputs: UserInputs): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (inputs.currentAge >= inputs.retirementAge) {
    errors.push({
      field: 'retirementAge',
      message: "Retirement age must be greater than current age"
    });
  }
  
  if (inputs.monthlyExpenses > inputs.monthlyTakeHome + inputs.monthlyInvestments) {
    errors.push({
      field: 'monthlyExpenses',
      message: "Your expenses exceed your income plus investments—consider reducing spending or increasing contributions"
    });
  }
  
  if (inputs.monthlyTakeHome <= 0) {
    errors.push({
      field: 'monthlyTakeHome',
      message: "Please enter a positive monthly income"
    });
  }
  
  if (inputs.currentAge < 16 || inputs.currentAge > 100) {
    errors.push({
      field: 'currentAge',
      message: "Please enter a valid age"
    });
  }
  
  return errors;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatPercentage(rate: number): string {
  return `${Math.round(rate * 100)}%`;
} 