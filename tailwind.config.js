/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playball: ["Playball", "cursive"],
      },
      backgroundImage: {
        "paper-bg": "url('src/assets/background.jpg')",
      },
    },
  },
  plugins: [],
};
