/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        instagram: ['Poppins', 'system-ui'],
      },

      aspectRatio: {
        '4/5': '4 / 5',
        '9/16': '9 / 16',
      },

      maxHeight: {
        400: '400px',
        450: '450px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        '90vh': '90vh',
      },

      animation: {
        fadeIn: 'fadeIn .3s ease-out',
        slideUp: 'slideUp .3s ease-out',
        slideInRight: 'slideInRight .3s ease-out',
        scaleIn: 'scaleIn .2s ease-out',
        heartBeat: 'heartBeat 1s ease-out',
      },
    },
  },
  plugins: [],
};
