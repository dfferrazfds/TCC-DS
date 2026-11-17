import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07130f',
        forest: '#0d2018',
        moss: '#153627',
        lime: '#c9f24d',
        mint: '#7de0a8',
        amber: '#f4b942',
        clay: '#e07a5f',
        paper: '#f3f5ec',
        muted: '#9db3a5',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(201,242,77,0.18), 0 24px 70px -30px rgba(201,242,77,0.35)',
        panel: '0 30px 80px -50px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(201,242,77,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,242,77,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ring: {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        ring: 'ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
