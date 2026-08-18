/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gilroy: [
          'Gilroy',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      fontWeight: {
        black: '1000'
      },
      container: {
        center: true,
        screens: {
          '3xl': '1173px',
        },
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      boxShadow: {
        gold: '0 5.67px 17px 0 rgba(243,198,80,.2)',
        'gold-hover': '0px 17px 40px 0px #ecc94b',
        redGlow: '0px 30px 80px 0px rgba(185,14,10,0.3)',
      },
      backgroundImage: {
        'sunset': 'radial-gradient(37.79% 119.49% at 48.26% 69.46%, #FFBA96 0%, #B10000 52.69%, #7D1900 100%)',
        'sunset2': 'radial-gradient(103.42% 67.68% at 50.13% 58.84%, #FFBA96 0%, #B10000 52.69%, #7D1900 100%)',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 4s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blinkOn: 'blinkSwap 1s linear infinite',
        blinkOff: 'blinkSwapReverse 1s linear infinite',
        rotateStar: 'rotateBackAndForth 1.5s ease-in-out infinite',
        'neon-flicker': 'flicker .8s ease-in-out infinite',
        'pulse-scale': 'pulseScale 3s ease-in-out infinite',
      },
      keyframes: {
        pulseScale: {
          '0%, 100%': {
            transform: 'scale(1)',
            background: 'white',
          },
          '33.33%': {
            transform: 'scale(1.15)',
            background: 'linear-gradient(135deg, #B90E0A 0%, #F3C650 100%)',
          },
          '66.66%': {
            transform: 'scale(1.15)',
            background: 'linear-gradient(135deg, #B90E0A 0%, #F3C650 100%)',
          },
        },
        flicker: {
          '0%, 100%': {
            color: 'var(--flicker-color, #F3C650)',
          },
          '50%': {
            color: 'var(--flicker-alt, #FFFFFF)',
            textShadow: 'var(--flicker-shadow, none)',
          },
        },
        'spin-reverse': {
          from: {
            transform: 'rotate(360deg)',
          },
          to: {
            transform: 'rotate(0deg)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        blinkSwap: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        blinkSwapReverse: {
          '0%, 49%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
        rotateBackAndForth: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
