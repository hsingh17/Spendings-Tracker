/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { "transform": "translate(-50%, -1000%)" },
          "100%": { "transform": "translate(-50%, 0)" }
        },
        "slide-out": {
          "0%": { "transform": "translate(-50%, 0)" },
          "100%": { "transform": "translate(-50%, -1000%)" }
        },
        "draw-stroke": {
          "0%": { "stroke-dashoffset": "-100000" },
          "100%": { "stroke-dashoffset": "0" },
        },
        "point-fade-in": {
          "0%": { "opacity": "0%" },
          "100%": { "opacity": "100%" }
        },
        "scale-in": {
          "100%": { "scale": "1" }
        },
        "rotate-to-zero": {
          "100%": { "rotate": "0deg" }
        },
        "scale-bar-up": {
          "100%": { "transform": "scale(1, 1)" }
        },
        "carousel-slide-out": {
          "100%": { "transform": "translate(-1000%, 0)", "opacity": "0%" }
        },
        "carousel-slide-in": {
          "0%": { "transform": "translate(1000%, 0)", "opacity": "0%" },
          "100%": { "transform": "translate(0, 0)", "opacity": "100%" }
        },
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
