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
          "0%": { transform: "translate(-50%, -1000%)" },
          "100%": { transform: "translate(-50%, 0)" }
        },
        slideout: {
          "0%": { transform: "translate(-50%, 0)" },
          "100%": { transform: "translate(-50%, -1000%)" }
        },
        drawstroke: {
          "100%": { "stroke-dashoffset": "0"}
        },
        pointfadein: {
          "0%": { "opacity": "0%"},
          "100%": { "opacity": "100%"}
        },
        scalein: {
          "100%": { "scale": "1" }
        },
        rotatetozero: {
          "100%": { "rotate": "0deg" }
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
