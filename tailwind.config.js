/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hanken Grotesk Variable', 'Hanken Grotesk', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        hairline: 'var(--hairline)',
        chip: 'var(--chip)',
        accent: 'var(--accent)',
        'accent-tint': 'var(--accent-tint)',
        'accent-strong': 'var(--accent-strong)',
      },
      maxWidth: {
        content: '64rem',
      },
      borderRadius: {
        card: '12px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
