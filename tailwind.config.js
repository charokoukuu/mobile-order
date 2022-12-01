/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        runticketGrayText: "#7070707",
        runticketBlue: "#006C9B",
        runticketGray: "#434343",
        runticketLightGray: "#848484",
        runticketRed: "#DB1812",
        adminBackColor: "#000000",
      },
    },
  },
  plugins: [],
  important: true,
}
