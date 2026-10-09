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
        // Kage Design System Tokens (Electric Blue / Cyan Palette)
        kage: {
          ink: '#05070a',
          ink2: '#0a0e12',
          bone: '#dfe7e0',
          boneDim: '#aab4ad',
          muted: '#78837c',
          blue: '#0066FF',
          cyan: '#00E5FF',
          vermilion: '#0066FF', // mapped to Electric Blue
          ember: '#38BDF8',     // mapped to Sky/Cyan Blue
          gold: '#38BDF8',
        },
        cinematic: {
          950: '#05070A',
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
        'glow-blue': '0 0 25px -3px rgba(0, 102, 255, 0.55)',
        'glow-cyan': '0 0 30px -4px rgba(0, 229, 255, 0.5)',
        'glow-vermilion': '0 0 25px -3px rgba(0, 102, 255, 0.55)',
        'glow-ember': '0 0 30px -4px rgba(56, 189, 248, 0.5)',
        'glow-amber': '0 0 25px -3px rgba(56, 189, 248, 0.35)',
        'glow-rose': '0 0 25px -3px rgba(0, 102, 255, 0.4)',
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
