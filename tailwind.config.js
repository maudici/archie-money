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
        // Dark theme colors as specified in requirements
        'primary-bg': '#1B1F2B',
        'card-bg': '#242731',
        'input-bg': '#2A2E3A',
        'border-color': '#3A3E4A',
        'primary-teal': '#2CB67D',
        'secondary-orange': '#F59E0B',
        'secondary-green': '#34D399',
        'text-primary': '#E5E7EB',
        'text-secondary': '#A1A6B0',
        'text-white': '#FFFFFF',
        'error-red': '#F87171',
        'dark-red': '#8B1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.2s ease-out',
        'slide-out-left': 'slideOutLeft 0.2s ease-in',
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
      },
    },
  },
  plugins: [],
} 