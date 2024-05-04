/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "vid-player-bg": "#1E1E1E",
        "vid-player-controls-bg": "#0B0B0B",
        "page-bg": "#1A1A1A",
      },
      fontFamily:{
        "roboto": ["Roboto", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}

