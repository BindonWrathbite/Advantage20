/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'splash': "url('/splash.png')",
      },
    },
  },
  plugins: [import('tailwindcss-primeui')]
}
