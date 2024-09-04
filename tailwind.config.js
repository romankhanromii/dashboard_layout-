/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonbackground: "rgba(30, 66, 159, 1)",   // Custom background color
        defaulttext: "rgba(255, 255, 255, 1)",      // Custom text color
        background: "rgba(243, 244, 246, 1)",       // Custom background color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [],
}
