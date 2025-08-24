/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f131d",
        secondary: "#101725",
        "light-blue": "#68d2ff",
        "baby-yellow": "#ebd065",
      },
    },
  },
  plugins: [],
}
