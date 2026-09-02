/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#4a1220',
          dark: '#3a0e19',
        },
        gold: '#b78a4a',
        star: '#d9a441',
        ink: {
          DEFAULT: '#1a1a1a',
          secondary: '#767676',
          muted: '#9a9a9a',
        },
        line: '#e6e6e6',
        surface: {
          alt: '#f5f5f5',
        },
        pill: '#f0f0f0',
        placeholder: {
          a: '#ececeb',
          b: '#e0e0de',
          icon: '#a9a9a6',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
};
