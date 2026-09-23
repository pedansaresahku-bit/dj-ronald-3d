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
        obsidian: '#060507',
        'obsidian-surface': '#0c0e18',
        'obsidian-card': 'rgba(15, 18, 32, 0.75)',
        cyan: {
          DEFAULT: '#00f0ff',
          glow: 'rgba(0, 240, 255, 0.45)',
          muted: 'rgba(0, 240, 255, 0.12)'
        },
        purple: {
          DEFAULT: '#a855f7',
          glow: 'rgba(168, 85, 247, 0.4)'
        },
        amber: {
          DEFAULT: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.35)'
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
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.15)' },
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
