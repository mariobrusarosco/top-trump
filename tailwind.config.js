/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "primary-base": "#DB504A",
      "neutral-white": "#FFFFFF",
      "secondary-base": "#254441",
      "base-light": "#FF6F59",
    },
    extend: {},
  },
  plugins: [],
}

