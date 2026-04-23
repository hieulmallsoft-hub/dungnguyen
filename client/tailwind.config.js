/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cv-red': '#c41e3a',
        'cv-gold': '#d4af37',
        ember: {
          50: '#fff5f4',
          100: '#ffe5e2',
          200: '#ffcfc8',
          300: '#ffaca1',
          400: '#ff7b67',
          500: '#f24d36',
          600: '#dd341d',
          700: '#b82714',
          800: '#982317',
          900: '#7e251a'
        },
        ink: {
          950: '#161617',
          900: '#1e2024',
          800: '#2b3038',
          700: '#404753'
        },
        sand: {
          50: '#f8f6f2',
          100: '#f1ece2',
          200: '#e4dac7'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        panel: '0 20px 50px rgba(20, 24, 33, 0.10)',
        glow: '0 18px 40px rgba(212, 175, 55, 0.22)'
      },
      backgroundImage: {
        'admin-grid':
          'linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
