/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        runticketGrayText: "#707070",
        runticketBlue: "#006C9B",
        runticketGray: "#434343",
        runticketLightGray: "#848484",
        runticketRed: "#DB1812",
        adminBackColor: "#000000",
        buttonBlue: "#1D98F2",
        buttonGray: "#707070",
        buttonRed: "#F25F1D",
        indicatorGreen: "#01AD4A",
        indicatorOrange: "#DB8D00",
        indicatorRed: "#D11F00",
      },
    },
  },
  plugins: [],
  important: true,
}
