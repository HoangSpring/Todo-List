/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        'surface-lighter': '#262626',
        primary: '#8b5cf6', // Violet 500
        'primary-hover': '#7c3aed', // Violet 600
        text: '#f5f5f5',
        'text-muted': '#a3a3a3',
        border: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
