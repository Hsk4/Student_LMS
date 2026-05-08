/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#6366f1',
        'accent-light': '#e0e7ff',
        'accent-border': '#818cf8',
        'ink-900': '#1a202c',
        'ink-400': '#a0aec0',
        'ink-45': '#f7fafc',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
