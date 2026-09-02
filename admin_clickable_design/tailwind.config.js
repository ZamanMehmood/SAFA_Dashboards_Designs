/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C89B4A',
          goldDark: '#A97C2F',
          goldLight: '#E8D3A5',
          maroon: '#5C1A3B',
          maroonDark: '#3D1027',
        },
        surface: '#FAF7F2',
        card: '#FFFFFF',
        border: '#E7E2DA',
        ink: {
          DEFAULT: '#2B2320',
          muted: '#8A8280',
          soft: '#B8B0AA',
        },
        success: {
          DEFAULT: '#1B8A63',
          bg: '#E4F5EE',
        },
        warning: {
          DEFAULT: '#B8843A',
          bg: '#FBF1DE',
        },
        danger: {
          DEFAULT: '#D64545',
          bg: '#FBE9E9',
        },
        info: {
          DEFAULT: '#3B6FA0',
          bg: '#E8F0F8',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(43, 35, 32, 0.06), 0 1px 6px -1px rgba(43, 35, 32, 0.05)',
        popover: '0 10px 30px -5px rgba(43, 35, 32, 0.18)',
      },
    },
  },
  plugins: [],
}
