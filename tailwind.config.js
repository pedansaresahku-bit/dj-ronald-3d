/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Official Urban Nocturne Palette
        nocturne: {
          DEFAULT: '#141414',
          bg: '#141414',
          card: '#1e1e1e',
          surface: '#242424',
          charcoal: '#444444',
          gray: '#979797',
          silver: '#D6D6D6',
          lime: '#E2E800',
        },
        obsidian: {
          DEFAULT: '#141414',
          surface: '#1e1e1e',
          card: 'rgba(30, 30, 30, 0.95)',
        },
        lime: {
          DEFAULT: '#E2E800',
          hover: '#f2f716',
          glow: 'rgba(226, 232, 0, 0.6)',
          muted: 'rgba(226, 232, 0, 0.15)',
        },
        cyan: {
          DEFAULT: '#E2E800', // alias to lime
          glow: 'rgba(226, 232, 0, 0.6)',
          muted: 'rgba(226, 232, 0, 0.15)',
          light: '#f7fab3'
        },
        charcoal: {
          DEFAULT: '#444444',
          light: '#555555',
          dark: '#333333'
        },
        silver: {
          DEFAULT: '#D6D6D6',
          chrome: '#FFFFFF',
          dark: '#979797'
        }
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'floatAnim 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        floatAnim: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
