// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path to your project structure
  ],
  theme: {
    extend: {
      colors: {
        orange: "orange",
        black: "black",
        'green': '#13ce66',
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%",
            color: "orange"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white",
            color: "orange"
          }
        }
      },
      animation: {
        typing: "typing 2s steps(30) , blink .7s infinite"
      }
    },
  },
  plugins: [],
}
