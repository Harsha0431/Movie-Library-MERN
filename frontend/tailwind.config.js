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
  },
  plugins: [],
};
