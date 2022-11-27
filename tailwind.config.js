/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textGray: "#707070",
        runticketBlue: "#006C9B",
        runticketGray: "#434343",
        adminBackColor: "#000000",
      },
    },
  },
  plugins: [],
  important: true,
}
