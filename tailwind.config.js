/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(79, 70, 229, 0.08), 0 4px 6px -2px rgba(79, 70, 229, 0.04)',
        card: '0 4px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(18deg)' },
          '75%': { transform: 'rotate(-12deg)' },
        },
      },
      animation: {
        wave: 'wave 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
