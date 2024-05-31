/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        exo: ["Exo 2", "sans-serif"],
      },
    },
    screens: {
      xxl: "1200px",
      xl: "992px",
      lg: "840px",
      md: "768px",
      sm: "640px",
      ssm: "576px",
      vsm: "400px",
      vvsm: "330px",
    },
  },
  plugins: [],
};
