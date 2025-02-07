/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   'text-primary': ['Nunito Sans', 'sans-serif'],
    //   'titles': ['Lato', 'sans-serif'],
    // },
    colors: {
      "bgqueen-primary": "#781B14",
      "bgqueen-secondary": "#E4C485",
      "bgqueen-gray": "#D9D9D9",
      "bgqueen-cafe": "#A8755B",
      "bgqueen-red": "#FF0000",
      "bgqueen-green": "#00913f",
      "bgqueen-yellow": "#ffff00",
      "bgqueen-orange": "#f97316",
      "zinc": "#f4f4f5",
      "stone": "#e7e5e4",
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {
      backgroundImage: {
        'check-ready': "url('/src/assets/react.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}