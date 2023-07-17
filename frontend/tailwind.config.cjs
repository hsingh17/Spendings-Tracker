/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "oxford-blue": "#0B2447",
        "indigo": "#19376D",
        "blue-yonder": "#576CBC",
        "non-photo-blue": "#A5D7E8",
      }
    },
  },
  plugins: [],
}
