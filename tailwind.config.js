module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'PingFang SC',
        'STHeitiSC-Light',
        'Helvetica-Light',
        'Arial',
        'Helvetica',
        'sans-serif',
        'Droid Sans Fallback'
      ]
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
