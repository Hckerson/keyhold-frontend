import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '.dark'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1d2e',
          dark: '#0f1117',
          light: '#2e3244',
        },
        accent: {
          DEFAULT: '#ff7a3d',
          dark: '#e66a2d',
          light: '#ffe6d5',
        },
        success: {
          DEFAULT: '#2da44e',
          light: '#d1f1e0',
        },
        warning: {
          DEFAULT: '#e0883e',
          light: '#f5e6d3',
        },
        error: {
          DEFAULT: '#d1242f',
          light: '#ffebee',
        },
        info: {
          DEFAULT: '#ff7a3d',
          light: '#ffe6d5',
        },
      },
      backgroundColor: {
        base: '#0a0e27',
        alt: '#1a1d2e',
        muted: '#242836',
      },
      textColor: {
        primary: '#f5f7f9',
        secondary: '#abadb7',
        muted: '#7a7d8a',
      },
      borderColor: {
        DEFAULT: '#3f4556',
        light: '#2e3244',
        dark: '#54596b',
      },
      fontSize: {
        h1: ['4.5rem', { lineHeight: '1.1', fontWeight: '300' }],
        h2: ['3.5rem', { lineHeight: '1.2', fontWeight: '300' }],
        h3: ['2.5rem', { lineHeight: '1.2', fontWeight: '400' }],
        h4: ['1.875rem', { lineHeight: '1.3', fontWeight: '400' }],
        h5: ['1.5rem', { lineHeight: '1.4', fontWeight: '400' }],
        h6: ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        lg: ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        base: ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
        sm: ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        xs: ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '1rem',
        4: '1.5rem',
        5: '2rem',
        6: '2.5rem',
        8: '3rem',
        10: '4rem',
        12: '5rem',
        16: '6rem',
        20: '7rem',
        24: '8rem',
        32: '10rem',
      },
      gap: {
        xs: '0.5rem',
        sm: '1.5rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '5rem',
      },
      padding: {
        xs: '0.5rem',
        sm: '1.5rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
      transitionDuration: {
        fast: '200ms',
        normal: '350ms',
        slow: '600ms',
        slower: '800ms',
      },
      transitionTimingFunction: {
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.2)',
        md: '0 4px 8px rgba(0, 0, 0, 0.15)',
        lg: '0 12px 16px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 32px rgba(0, 0, 0, 0.12)',
        '2xl': '0 30px 60px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      fontFamily: {
        display: ["'Merriweather'", "'Instrument Serif'", 'serif'],
        body: [
          "'Space Grotesk'",
          "'Inter'",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ["'JetBrains Mono'", "'Monaco'", 'monospace'],
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '1024px',
        lg: '1280px',
        xl: '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
