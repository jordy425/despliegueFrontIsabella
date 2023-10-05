/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {},
      screens: {
         'phone': {'max': '639px'},
         'tablet': '640px',
         'laptop': '1024px',
         'desktop': '1280px',
         'sidebarMD': { min: "640px" },
         ...defaultTheme.screens
      },
   },
   plugins: [],
}

