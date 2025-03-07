/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#322625",
          grey: "#ebebeb",
          blue: "#c0e3e5",
          yellow: "#fdc936",
        },
      },
      fontFamily: {
        neutra: ["Neutra Text", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
