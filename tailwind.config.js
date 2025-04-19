/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#FFD700', // Main amber/gold color
          500: '#D4AF37', // Darker amber
          600: '#996515', // Even darker
          700: '#654321', // Deepest amber
          900: '#2D1E10', // Nearly black amber
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
};