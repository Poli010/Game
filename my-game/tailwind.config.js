/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'choose_gameBG': "url('./assets/choose_gameBG.png')",
      },
      animation: {
        fade: "fade 1.5s ease-in-out infinite",
      },
      keyframes: {
        fade: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}