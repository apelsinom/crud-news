import lineClamp from '@tailwindcss/line-clamp'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // White theme
        'light-bg': '#ffffff',
        'light-text': '#000000',

        // Dark theme
        'dark-bg': '#1a1a1a',
        'dark-text': '#ffffff',
      },
    },
  },
  safelist: ['opacity-0', 'opacity-100', 'transition-opacity', 'duration-300'],
  plugins: [lineClamp],
}
