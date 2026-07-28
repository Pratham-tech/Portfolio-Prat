/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian:        '#0F0C08',
        graphite:        '#181410',
        'graphite-light':'#201C17',
        amber:  { DEFAULT: '#D4A853', glow: 'rgba(212,168,83,0.15)' },
        gold:            '#E8C47C',
        vapor:           '#F0E8D8',
        muted:           '#8A8075',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      animation: {
        'blink':      'blink 1.1s step-end infinite',
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
        'shimmer':    'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        blink:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        fadeUp:  { '0%': { opacity:'0', transform:'translateY(20px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition:'-200% 0' }, '100%': { backgroundPosition:'200% 0' } },
      },
    },
  },
  plugins: [],
};
