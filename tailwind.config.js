/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "menu-open": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "menu-links-open": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "menu-open": "menu-open .2s ease-in-out .05s forwards",
        "menu-links-open": "menu-links-open .2s ease-in-out .25s forwards",
      },
    },
    fontFamily: {
      pacifico: ["Pacifico", "cursive"],
    },
  },
  plugins: [],
};
