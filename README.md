# Archie.Money

A modern retirement planning calculator that helps users project their retirement income and get personalized investment recommendations.

## Features

- **Single-Question Onboarding**: 8-step interactive flow to collect user financial data
- **Smart Calculations**: Uses the 4% rule and 2025 tax brackets for accurate projections  
- **Mobile-First Design**: Dark theme with responsive UI optimized for all devices
- **What-If Scenarios**: Interactive calculator to see how different contributions affect retirement income
- **Personalized Recommendations**: Curated list of high-yield savings accounts, brokerages, and PFM apps
- **Educational Content**: Built-in explanations of financial concepts and strategies

## Tech Stack

- **Next.js 15.3.3** with App Router and static export
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Client-side only** architecture (no backend required)

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# The app will be exported to the `out/` directory
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with GA4
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── OnboardingFlow.tsx  # 8-step onboarding
│   ├── Dashboard.tsx       # Results dashboard
│   └── charts/
│       └── SavingsGauge.tsx # Savings rate visualization
├── data/
│   └── financial-data.ts   # Tax brackets, rates, recommendations
├── types/
│   └── index.ts           # TypeScript interfaces
└── utils/
    └── financial-calculations.ts # All financial formulas
```

## Key Features

### Financial Calculations
- Future value projections using 8% annual return assumption
- Federal tax calculations using 2025 single-filer brackets
- State tax estimation for all 50 states
- 4% withdrawal rule for retirement income estimation

### User Experience
- Progressive onboarding with real-time validation
- Interactive sliders and inputs with immediate feedback
- Mobile-optimized design with smooth animations
- Comprehensive error handling and edge case management

### Recommendations
- High-yield savings accounts with current APY rates
- Major brokerage platforms with feature comparisons
- Personal finance management apps with descriptions
- Prioritized action items based on user situation

## Deployment

This app is configured for static export and optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure build settings
3. The app will be deployed from the `out/` directory

## Environment Variables

For Google Analytics tracking, set:
- `NEXT_PUBLIC_GA_ID` - Your Google Analytics 4 Measurement ID

## License

© 2025 Archie.Money - All rights reserved 