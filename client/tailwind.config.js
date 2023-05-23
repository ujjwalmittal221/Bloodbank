/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#B73E3E',
      }
    },
  },
  plugins: [],
  corePlugins : {
    preflight : false,
  },
}

