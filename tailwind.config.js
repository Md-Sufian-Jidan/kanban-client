/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        offside: ['"Offside"', 'cursive'],
      },
      colors: {
        primary: '#6366F1',  
        accent: '#06B6D4',
        background: '#F3F4F6',
        card: '#FFFFFF',
        text: '#111827',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
