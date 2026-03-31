/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#13162A',
        teal: '#1D9E75',
        cream: '#F5F0E8',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serifDisplay: ['"DM Serif Display"', 'serif'],
      },
      keyframes: {
        screenIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      animation: {
        screenIn: 'screenIn 260ms ease-out',
      },
    },
  },
  plugins: [],
}

