/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    require('tailwind-scrollbar'),
  ],

  theme: {
    extend: {
      colors: {
        black: '#191624',
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
        hoveranimation: 'hoveranimation 0.5s forwards',
        pill: 'pill 0.5s forwards',
        spin: 'spin 10s linear infinite'
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        hoveranimation: {
          from: {borderBottom: "none"},
          to: {borderBottom: "2px solid black", transform: 'scale(1.1)'}
        },
        pill: {
          from: {boxShadow: 'none'},
          to: {boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px", transform: "scale(1.01)"}
        },
        spin: {
          to: {transform: "rotate(360deg)"}
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
  },
};
