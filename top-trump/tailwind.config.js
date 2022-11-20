/** @type {import('tailwindcss').Config} */

let plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("variant-test", '&:first-of-type')
    })
  ],
};
