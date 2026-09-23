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
        // Urban Nocturne Palette
        nocturne: {
          DEFAULT: '#141414',
          bg: '#141414',
          dark: '#0e0e0e',
          card: '#1c1c1c',
          surface: '#242424',
          charcoal: '#444444',
          gray: '#979797',
          silver: '#D6D6D6',
          lime: '#E2E800',
        },
        obsidian: {
          DEFAULT: '#141414',
          surface: '#1c1c1c',
          card: 'rgba(28, 28, 28, 0.92)',
        },
        cyan: {
          DEFAULT: '#E2E800', // Electric Cyber Lime as the primary high-impact accent
          glow: 'rgba(226, 232, 0, 0.55)',
          muted: 'rgba(226, 232, 0, 0.15)',
          light: '#f7fab3'
        },
        lime: {
          DEFAULT: '#E2E800',
          glow: 'rgba(226, 232, 0, 0.55)',
          muted: 'rgba(226, 232, 0, 0.15)',
          light: '#f7fab3'
        },
        purple: {
          DEFAULT: '#D6D6D6',
          glow: 'rgba(214, 214, 214, 0.45)',
          light: '#ffffff'
        },
        silver: {
          DEFAULT: '#D6D6D6',
          chrome: '#D6D6D6',
          dark: '#979797',
          charcoal: '#444444'
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
          '50%': { opacity: '0.5', transform: 'scale(1.12)' },
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
