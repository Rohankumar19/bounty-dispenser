import type { Config } from 'tailwindcss';

const svgToDataUri = require('mini-svg-data-uri');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        custom: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;',
      },
      colors: {
        'custom-orange': '#f95738',
        'card-background': '#F5F5F5',
        'card-text': '#2C2C2C',
        'card-border': '#B0B0B0',
        'main-background': '#D0D0D0',
        'login-page-color': '#15553d',
      },
    },
  },
  plugins: [],
};

export default config;
