/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B2E4B",      // deep navy
        secondary: "#C9A84C",    // warm gold
        accent: "#F5F0E8",       // cream white
        dark: "#0F1E30",         // darker navy
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};