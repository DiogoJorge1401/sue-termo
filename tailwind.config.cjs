/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        rose: {
          myRose: '#811234'
        },
        statusColor: {
          exact: '#128160',
          exist: '#816012',
        }
      }
    },
  },
  plugins: [],
}