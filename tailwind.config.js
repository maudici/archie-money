/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Blue-based theme like Copilot Money
        'primary-bg': '#0B1426',
        'secondary-bg': '#152238',
        'card-bg': '#1A2B47',
        'input-bg': '#243354',
        'border-color': '#2D4061',
        'primary-blue': '#3B82F6',
        'accent-blue': '#60A5FA',
        'light-blue': '#93C5FD',
        'secondary-orange': '#F59E0B',
        'secondary-green': '#10B981',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        'text-white': '#FFFFFF',
        'error-red': '#EF4444',
        'success-green': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.2s ease-out',
        'slide-out-left': 'slideOutLeft 0.2s ease-in',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 