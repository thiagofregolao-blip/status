import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Brand
        brand: {
          DEFAULT: '#1E40AF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#0B1B3F',
        },
        // WhatsApp / ação
        wa: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          soft: '#DCFCE7',
        },
        // Trilha técnica
        tech: {
          DEFAULT: '#15803D',
          soft: '#DCFCE7',
          ring: 'rgba(21,128,61,0.35)',
        },
        // Trilha IA
        ai: {
          DEFAULT: '#F97316',
          soft: '#FFEDD5',
          ring: 'rgba(249,115,22,0.35)',
        },
        // Atenção
        warn: {
          DEFAULT: '#F59E0B',
          soft: '#FEF3C7',
        },
        // Urgência
        urg: {
          DEFAULT: '#DC2626',
          soft: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 4vw + 0.5rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['clamp(1.75rem, 3vw + 0.5rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(15,23,42,0.08), 0 4px 16px -4px rgba(15,23,42,0.05)',
        'lifted': '0 8px 24px -8px rgba(15,23,42,0.12), 0 16px 40px -12px rgba(15,23,42,0.08)',
        'glow-tech': '0 0 0 1px rgba(21,128,61,0.15), 0 12px 32px -12px rgba(21,128,61,0.35)',
        'glow-ai': '0 0 0 1px rgba(249,115,22,0.2), 0 12px 32px -12px rgba(249,115,22,0.4)',
        'glow-wa': '0 0 0 3px rgba(22,163,74,0.2), 0 8px 28px -6px rgba(22,163,74,0.55)',
      },
      backgroundImage: {
        'grid-dark': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'hero-radial': 'radial-gradient(1200px 600px at 20% 10%, rgba(30,64,175,0.25), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(800px 500px at 60% 90%, rgba(21,128,61,0.18), transparent 60%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
