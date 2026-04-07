/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0C0F14',
          card: '#151921',
          border: '#1E2430',
          gold: '#C9A96E',
          goldLight: '#E2CFA5',
          muted: '#7A8194',
          text: '#C8CDD8',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
