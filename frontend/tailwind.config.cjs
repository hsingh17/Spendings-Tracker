/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-brand-secondary": "#222831",
        "theme-brand": "#393E46",
        "theme-cta": "#00ADB5",
        "theme-neutral": "#EEEEEE",
      }
    },
  },
  plugins: [],
}
