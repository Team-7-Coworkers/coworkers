import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      lg: '1024px',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        lg: '1248px',
      },
    },
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#34D399',
        tertiary: '#A3E635',
        purple: '#A855F7',
        blue: '#3B82F6',
        cyan: '#06B6D4',
        pink: '#EC4899',
        rose: '#F43F5E',
        orange: '#F97316',
        yellow: '#EAB308',
        'b-primary': '#0F172A',
        'b-secondary': '#1E293B',
        'b-tertiary': '#334155',
        'b-inverse': '#FFFFFF',
        'i-inactive': '#94A3B8',
        'i-hover': '#059669',
        'i-pressed': '#047857',
        'i-focus': '#10B981',
        'bd-primary': '#f8fafc80',
        't-primary': '#F8FAFC',
        't-secondary': '#CBD5E1',
        't-tertiary': '#E2E8F0',
        't-default': '#64748B',
        't-inverse': '#FFFFFF',
        't-disabled': '#94A3B8',
        danger: '#DC2626',
        'ic-primary': '#64748B',
        'ic-inverse': '#F8FAFC',
      },
      fontSize: {
        '4xl': ['40px', '48px'],
        '3xl': ['32px', '38px'],
        '2xl': ['24px', '28px'],
        xl: ['20px', '24px'],
        '2lg': ['18px', '21px'],
        lg: ['16px', '19px'],
        md: ['14px', '17px'],
        sm: ['13px', '16px'],
        xs: ['12px', '14px'],
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        gradientMove: 'gradientMove 5s linear infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': {
            backgroundPosition: '200% 0',
          },
          '100%': {
            backgroundPosition: '-200% 0',
          },
        },
      },
    },
  },
  safelist: [
    'border-purple',
    'border-blue',
    'border-cyan',
    'border-pink',
    'border-rose',
    'border-orange',
    'border-yellow',
  ],
  plugins: [],
} satisfies Config;
