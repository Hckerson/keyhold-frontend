/* Design Tokens — TypeScript Exports */
/* Use in code where CSS variables aren't available (e.g., motion config) */

export const tokens = {
  colors: {
    primary: '#1a1d2e',
    primaryDark: '#0f1117',
    primaryLight: '#2e3244',

    accent: '#ff7a3d',
    accentDark: '#e66a2d',
    accentLight: '#ffe6d5',

    success: '#2da44e',
    successLight: '#d1f1e0',
    warning: '#e0883e',
    warningLight: '#f5e6d3',
    error: '#d1242f',
    errorLight: '#ffebee',
    info: '#ff7a3d',
    infoLight: '#ffe6d5',

    background: '#0a0e27',
    backgroundAlt: '#1a1d2e',
    backgroundMuted: '#242836',

    text: '#f5f7f9',
    textSecondary: '#abadb7',
    textMuted: '#7a7d8a',
    textInverse: '#0a0e27',

    border: '#3f4556',
    borderLight: '#2e3244',
    borderDark: '#54596b',

    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  typography: {
    displayFont: "'Merriweather', 'Instrument Serif', serif",
    bodyFont:
      "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    monoFont: "'JetBrains Mono', 'Monaco', monospace",

    weights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    scales: {
      h1: {
        size: '4.5rem',
        lineHeight: 1.1,
        weight: 300,
      },
      h2: {
        size: '3.5rem',
        lineHeight: 1.2,
        weight: 300,
      },
      h3: {
        size: '2.5rem',
        lineHeight: 1.2,
        weight: 400,
      },
      h4: {
        size: '1.875rem',
        lineHeight: 1.3,
        weight: 400,
      },
      h5: {
        size: '1.5rem',
        lineHeight: 1.4,
        weight: 400,
      },
      h6: {
        size: '1.25rem',
        lineHeight: 1.5,
        weight: 500,
      },
      lg: {
        size: '1.125rem',
        lineHeight: 1.75,
        weight: 400,
      },
      base: {
        size: '1rem',
        lineHeight: 1.75,
        weight: 400,
      },
      sm: {
        size: '0.875rem',
        lineHeight: 1.6,
        weight: 400,
      },
      xs: {
        size: '0.75rem',
        lineHeight: 1.5,
        weight: 400,
      },
    },

    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.75,
      spacious: 2,
    },
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

  gaps: {
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

  motion: {
    fast: '200ms',
    normal: '350ms',
    slow: '600ms',
    slower: '800ms',

    easing: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.2)',
    md: '0 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 12px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 32px rgba(0, 0, 0, 0.12)',
    '2xl': '0 30px 60px rgba(0, 0, 0, 0.15)',
  },

  radius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px',
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },

  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '1024px',
    lg: '1280px',
    xl: '1536px',
  },
} as const;

export type Tokens = typeof tokens;
