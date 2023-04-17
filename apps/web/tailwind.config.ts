import type { Config } from 'tailwindcss';

import baseConfig from '@greg/tailwind-config';

const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.tsx'],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
} satisfies Config;
