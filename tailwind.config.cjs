/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        palette: {
          background: '#F1F7F9',
          Won: '#0C6DFF4D',
          Exact: '#0C6DFF',
          Exist: '#68A512',
          NotExists: '#FF9502',
          letter: '#E4EEF1'
        }
      },
      textColor: {
        palette: {
          textColor: '#000',
          WonColor: '#0C56C7'
        },
      },
      animation: {
        place: '0.45s linear flip 0s forwards'
      }
    },
  },
  plugins: [],
}