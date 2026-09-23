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
        obsidian: '#070a14',
        'obsidian-surface': '#0e162b',
        'obsidian-card': 'rgba(14, 22, 43, 0.88)',
        cyan: {
          DEFAULT: '#00f0ff',
          glow: 'rgba(0, 240, 255, 0.55)',
          muted: 'rgba(0, 240, 255, 0.15)',
          light: '#e0fcff'
        },
        purple: {
          DEFAULT: '#a855f7',
          glow: 'rgba(168, 85, 247, 0.45)',
          light: '#f3e8ff'
        },
        silver: {
          DEFAULT: '#f8fafc',
          chrome: '#e2e8f0',
          dark: '#94a3b8'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'floatAnim 6s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.12)' },
        },
        floatAnim: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      }
    },
  },
  plugins: [],
};
