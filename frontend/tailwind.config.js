/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0f1111",
        secondColor: "#008F5C",
        thirdColor: "#181a1b",
        fourthColor: "#141517",
      },
      screens: {
        xsm: "450px",
        xlg: '1370px'
      },
    },
  },
  plugins: [],
};
