const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "960px",
      lg: "1312px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#212121",
      red: {
        DEFAULT: "#ff4040",
        500: "#ff9f9f",
      },
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
      aspectRatio: {
        "4/3": "4 / 3",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", ...fontFamily.sans],
      },
      width: {
        lg: "1232px",
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          width: "100%",
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "@screen sm": {},
          "@screen md": {
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
          },
          "@screen lg": {
            maxWidth: theme("screens.lg"),
          },
        },
        ".bleed": {
          "@media (min-width: 0px) and (max-width: 960px)": {
            marginLeft: "-1rem",
            marginRight: "-1rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          },
          "@media (min-width: 960px) and (max-width: 1312px)": {
            marginLeft: "-2.5rem",
            marginRight: "-2.5rem",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
          },
        },
        ".bleed-right": {
          "@media (min-width: 0px) and (max-width: 960px)": {
            marginRight: "-1rem",
          },
          "@media (min-width: 960px) and (max-width: 1312px)": {
            marginRight: "-2.5rem",
          },
        },
      });
    },
  ],
};
