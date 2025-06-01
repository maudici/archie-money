export const FINANCIAL_ASSUMPTIONS = {
  annual_return: 0.08,
  inflation_rate: 0.02,
  withdrawal_rate: 0.04,
} as const;

export const FEDERAL_TAX_BRACKETS_2025 = [
  { rate: 0.10, min: 0, max: 11925 },
  { rate: 0.12, min: 11926, max: 48475 },
  { rate: 0.22, min: 48476, max: 103350 },
  { rate: 0.24, min: 103351, max: 197300 },
  { rate: 0.32, min: 197301, max: 250525 },
  { rate: 0.35, min: 250526, max: 626350 },
  { rate: 0.37, min: 626351, max: Infinity },
] as const;

export const STATE_EFFECTIVE_TAX_RATES = {
  'Alabama': 0.045,
  'Alaska': 0.00,
  'Arizona': 0.045,
  'Arkansas': 0.048,
  'California': 0.093,
  'Colorado': 0.046,
  'Connecticut': 0.055,
  'Delaware': 0.057,
  'Florida': 0.00,
  'Georgia': 0.0575,
  'Hawaii': 0.082,
  'Idaho': 0.058,
  'Illinois': 0.0495,
  'Indiana': 0.0323,
  'Iowa': 0.067,
  'Kansas': 0.057,
  'Kentucky': 0.050,
  'Louisiana': 0.042,
  'Maine': 0.075,
  'Maryland': 0.0575,
  'Massachusetts': 0.050,
  'Michigan': 0.0425,
  'Minnesota': 0.098,
  'Mississippi': 0.050,
  'Missouri': 0.054,
  'Montana': 0.069,
  'Nebraska': 0.068,
  'Nevada': 0.00,
  'New Hampshire': 0.00,
  'New Jersey': 0.108,
  'New Mexico': 0.059,
  'New York': 0.108,
  'North Carolina': 0.0475,
  'North Dakota': 0.029,
  'Ohio': 0.0399,
  'Oklahoma': 0.050,
  'Oregon': 0.099,
  'Pennsylvania': 0.0307,
  'Rhode Island': 0.0599,
  'South Carolina': 0.070,
  'South Dakota': 0.00,
  'Tennessee': 0.00,
  'Texas': 0.00,
  'Utah': 0.0495,
  'Vermont': 0.088,
  'Virginia': 0.0575,
  'Washington': 0.00,
  'West Virginia': 0.065,
  'Wisconsin': 0.076,
  'Wyoming': 0.00,
  'Not Sure/Other': 0.05,
} as const;

export const SAVINGS_RATE_THRESHOLDS = {
  RED: 0.10,
  YELLOW: 0.20,
} as const;

export const DEFAULT_VALUES = {
  currentAge: 25,
  retirementAge: 65,
  monthlyTakeHome: 4000,
  monthlyExpenses: 3000,
  monthlyInvestments: 0,
  currentSavings: 0,
  highInterestDebt: false,
  retirementState: 'Not Sure/Other',
} as const;

export const HYSA_ACCOUNTS = [
  {
    name: 'Ally Bank Online Savings',
    apy: 4.15,
    features: ['No minimum balance', 'No fees', 'FDIC insured'],
    url: 'https://archie.money/affiliates/ally',
    logo: '/icons/ally.svg'
  },
  {
    name: 'Marcus by Goldman Sachs',
    apy: 4.30,
    features: ['No fees', 'Easy online access', 'FDIC insured'],
    url: 'https://archie.money/affiliates/marcus',
    logo: '/icons/marcus.svg'
  },
  {
    name: 'Capital One 360 Performance Savings',
    apy: 4.20,
    features: ['No fees', 'Mobile banking', 'FDIC insured'],
    url: 'https://archie.money/affiliates/capital-one',
    logo: '/icons/capital-one.svg'
  },
] as const;

export const BROKERAGE_PLATFORMS = [
  {
    name: 'Robinhood',
    description: 'Zero-commission trading, intuitive mobile UI',
    features: ['Commission-free trades', 'Fractional shares', 'Mobile-first'],
    url: 'https://archie.money/affiliates/robinhood',
    logo: '/icons/robinhood.svg'
  },
  {
    name: 'Fidelity',
    description: 'Zero-fee index funds, robust research tools',
    features: ['No expense ratio funds', 'Research tools', 'No minimums'],
    url: 'https://archie.money/affiliates/fidelity',
    logo: '/icons/fidelity.svg'
  },
  {
    name: 'Charles Schwab',
    description: 'Low costs, fractional shares, strong customer support',
    features: ['Low fees', 'Fractional shares', '24/7 support'],
    url: 'https://archie.money/affiliates/schwab',
    logo: '/icons/schwab.svg'
  },
] as const;

export const PFM_APPS = [
  {
    name: 'Copilot.Money',
    description: 'Modern, AI-driven PFM with net-worth tracking',
    features: ['AI insights', 'Net worth tracking', 'Beautiful UI'],
    url: 'https://archie.money/pfm/copilot',
    logo: '/icons/copilot.svg'
  },
  {
    name: 'Monarch Money',
    description: 'All-in-one budgeting + goal tracking',
    features: ['Goal tracking', 'Budgeting tools', 'Investment tracking'],
    url: 'https://archie.money/pfm/monarch',
    logo: '/icons/monarch.svg'
  },
  {
    name: 'You Need A Budget (YNAB)',
    description: 'Zero-based budgeting methodology',
    features: ['Zero-based budgeting', 'Educational resources', 'Goal setting'],
    url: 'https://archie.money/pfm/ynab',
    logo: '/icons/ynab.svg'
  },
] as const; 