/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Tiro Bangla"', "serif"],
        body: ['"Hind Siliguri"', "sans-serif"],
      },
      colors: {
        cocoa: {
          950: "#2B1810",
          800: "#4A2A18",
          600: "#6B4028",
          400: "#9C6B45",
        },
        gold: {
          600: "#A97A1F",
          500: "#C1932B",
          300: "#E3C171",
        },
        maroon: {
          600: "#7A2A2A",
        },
        cream: {
          50: "#FBF4E9",
          100: "#F6ECDD",
        },
      },
    },
  },
  plugins: [],
};
