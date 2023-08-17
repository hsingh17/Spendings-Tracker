/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          "0%": { transform: "translate(-50%, -110%)" },
          "100%": { transform: "translate(-50%, 0)" }
        },
        slideout: {
          "0%": { transform: "translate(-50%, 0)" },
          "100%": { transform: "translate(-50%, -110%)" }
        }
      },
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
