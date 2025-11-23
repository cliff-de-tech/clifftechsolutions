/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00d1b2",
        secondary: "#7c5cff",
        dark: "#0b1120",
        darker: "#020617",
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}