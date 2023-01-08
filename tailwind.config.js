const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1312px",
    },
    colors: {
      red: {
        DEFAULT: "#ff4040",
        500: "#ff9f9f",
      },
      black: "#212121",
      purple: "#4040ff",
      gray: {
        800: "#666666",
        600: "#999999",
        400: "#bfbfbf",
        200: "#d9d9d9",
        100: "#eeeeee",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-pretendard)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
