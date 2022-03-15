/* eslint-env node */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color--primary-blue)',
          purple: 'var(--color--primary-purple)',
          orange: 'var(--color--primary-orange)',
          green: 'var(--color--primary-green)',
        },
        secondary: {
          DEFAULT: 'var(--color--secondary-blue)',
          purple: 'var(--color--secondary-purple)',
          yellow: 'var(--color--secondary-yellow)',
          green: 'var(--color--secondary-green)',
        },
        neutral: {
          1: 'var(--color--neutral-1)',
          2: 'var(--color--neutral-2)',
          3: 'var(--color--neutral-3)',
          4: 'var(--color--neutral-4)',
          5: 'var(--color--neutral-5)',
          6: 'var(--color--neutral-6)',
          7: 'var(--color--neutral-7)',
          8: 'var(--color--neutral-8)',
          9: 'var(--color--neutral-9)',
        },
        accent: {
          primary: {
            DEFAULT: 'var(--color--primary-blue-accent)',
          },
        },
      },
    },
    fontSize: {
      xs: ['12px', '1,8'],
      sm: ['0.875rem', '0.625rem'],
      md: ['1rem', '0.712rem'],
    },
  },
  plugins: [],
};
