import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        navy: {
          600: '#1e3a5f',
          700: '#172e4b',
          800: '#102237',
          900: '#0a1524',
          950: '#060c15',
        },
        gold: {
          300: '#ead28a',
          400: '#dfbc5c',
          500: '#ce9f35', 
          600: '#af8026',
        },
        paper: '#fcfdfd',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'watercolor-gradient': 'radial-gradient(circle at top right, rgba(30, 58, 95, 0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(30, 58, 95, 0.1), transparent 40%)',
        'gold-shimmer': 'linear-gradient(135deg, #dfbc5c 0%, #ce9f35 50%, #af8026 100%)',
        'luxury-floral': 'url("/images/luxury-floral.png")',
        'gold-texture': 'url("/images/gold-texture.png")',
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;
