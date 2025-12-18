/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#2E7D32',
        primaryBlue: '#1565C0',
        dangerRed: '#C62828',
        practiceOrange: '#F57C00',
        backgroundWhite: '#FFFFFF',
        textPrimary: '#212121',
        textSecondary: '#616161',
        disabledGray: '#BDBDBD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        large: '24px',
        medium: '20px',
        small: '18px',
      },
      spacing: {
        touchTarget: '64px',
        buttonPaddingY: '20px',
        buttonPaddingX: '32px',
      },
    },
  },
  plugins: [],
}

