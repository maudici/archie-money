export interface UserInputs {
  currentAge: number;
  retirementAge: number;
  monthlyTakeHome: number;
  monthlyExpenses: number;
  monthlyInvestments: number;
  currentSavings: number;
  highInterestDebt: boolean;
  retirementState: string;
}

export interface FinancialProjection {
  yearsToRetirement: number;
  futureValueCurrentSavings: number;
  futureValueContributions: number;
  totalRetirementBalance: number;
  annualWithdrawalBeforeTax: number;
  annualWithdrawalAfterTax: number;
  monthlyWithdrawalAfterTax: number;
  currentSavingsRate: number;
  totalTaxRate: number;
  federalTaxRate: number;
  stateTaxRate: number;
}

export interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

export interface RecommendationItem {
  name: string;
  description?: string;
  features: string[];
  url: string;
  logo: string;
  apy?: number;
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  tooltip?: string;
  inputType: 'slider' | 'toggle' | 'dropdown';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | boolean | string;
  options?: string[];
  validationMessage?: string;
}

export interface ValidationError {
  field: string;
  message: string;
} 