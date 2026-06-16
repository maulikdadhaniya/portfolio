/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["*"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1140px',
          '2xl': '1280px',
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'float-y': 'float-y 6s ease-in-out infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      }
    },
  },
  plugins: [],
}

