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
        // Kage Design System Tokens
        kage: {
          ink: '#05070a',
          ink2: '#0a0e12',
          bone: '#dfe7e0',
          boneDim: '#aab4ad',
          muted: '#78837c',
          vermilion: '#e0231c',
          ember: '#ff5a3c',
          gold: '#c9a24a',
        },
        cinematic: {
          950: '#05070A', // Kage Deep Black
          900: '#0A0E12',
          850: '#11171D',
          800: '#1A232B',
          700: '#2A3742',
          600: '#4A5B69',
          500: '#78837C',
          400: '#AAB4AD',
          300: '#C2CDC5',
          200: '#DFE7E0',
          100: '#EDF3FC',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        jp: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        'glow-vermilion': '0 0 25px -3px rgba(224, 35, 28, 0.45)',
        'glow-ember': '0 0 30px -4px rgba(255, 90, 60, 0.5)',
        'glow-gold': '0 0 25px -3px rgba(201, 162, 74, 0.35)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 25px -3px rgba(6, 182, 212, 0.35)',
        'glow-rose': '0 0 25px -3px rgba(244, 63, 94, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'rec': 'rec-blink 1.2s infinite',
        'ember': 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rec-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        drift: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(8deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
      }
    },
  },
  plugins: [],
}
