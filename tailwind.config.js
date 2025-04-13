/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  important: true,
  theme: {
    textColor: {
      'primary-50': '#eff6ff',
      'primary-100': '#dbeafe',
      'primary-200': '#bfdbfe',
      'primary-300': '#93c5fd',
      'primary-400': '#60a5fa',
      'primary-500': '#3b82f6',
      'primary-600': '#2563eb',
      'primary-700': '#1d4ed8',
      'primary-800': '#1e40af',
      'primary-900': '#1e3a8a',

      'secondary-50': '#fafafa',
      'secondary-100': '#f4f4f5',
      'secondary-200': '#e4e4e7',
      'secondary-300': '#d4d4d8',
      'secondary-400': '#a1a1aa',
      'secondary-500': '#71717a',
      'secondary-600': '#52525b',
      'secondary-700': '#3f3f46',
      'secondary-800': '#27272a',
      'secondary-900': '#09090b',

      'zinc-50': '#fafafa',
      'zinc-100': '#71717a',
      'zinc-200': '#e4e4e7',
      'zinc-300': '#d4d4d8',
      'zinc-400': '#a1a1aa',
      'zinc-500': '#71717a',
      'zinc-600': '#52525b',
      'zinc-700': '#3f3f46',
      'zinc-800': '#27272a',
      'zinc-900': '#18181b',

      'danger-100': '#fee2e2',
      'danger-400': '#f87171',
      'danger-500': '#ef4444',
      'danger-600': '#dc2626',

      'neutrals-300': '#d1d5db',
      'neutrals-400': '#9ca3af',

      'success-300': '#93c5fd',
      'success-500': '#3b82f6',
      'success-600': '#2563eb',

      'again-100': '#fae88f',
      'again-200': '#fae373',
      'again-300': '#fde047',
      'again-400': '#fbbf24',
      'again-800': '#a0760d',

      white: '#ffffff',
      'error-400': '#fb923c',

      'scroll-50': '#f0f9ff',
      'scroll-300': '#7dd3fc',

      'menu-button': '#3f6212',

      'disabled-200': '#e5e7eb',
      'disabled-500': '#6b7280',
    },
    backgroundColor: {
      transparent: 'transparent',
      'primary-50': '#eff6ff',
      'primary-100': '#dbeafe',
      'primary-200': '#bfdbfe',
      'primary-300': '#93c5fd',
      'primary-400': '#60a5fa',
      'primary-500': '#3b82f6',
      'primary-600': '#2563eb',
      'primary-700': '#1d4ed8',
      'primary-800': '#1e40af',
      'primary-900': '#1e3a8a',
      'secondary-50': '#fafafa',
      'secondary-100': '#f4f4f5',
      'secondary-200': '#e4e4e7',
      'secondary-300': '#d4d4d8',
      'secondary-400': '#a1a1aa',
      'secondary-500': '#71717a',
      'secondary-600': '#52525b',
      'secondary-700': '#3f3f46',
      'secondary-800': '#27272a',
      'secondary-900': '#09090b',
      'zinc-50': '#fafafa',
      'zinc-100': '#71717a',
      'zinc-200': '#e4e4e7',
      'zinc-300': '#d4d4d8',
      'zinc-400': '#a1a1aa',
      'zinc-500': '#71717a',
      'zinc-600': '#52525b',
      'zinc-700': '#3f3f46',
      'zinc-800': '#27272a',
      'zinc-900': '#18181b',

      'danger-100': '#fee2e2',
      'danger-400': '#f87171',
      'danger-500': '#ef4444',
      'danger-600': '#dc2626',

      'neutrals-300': '#d1d5db',
      'neutrals-400': '#9ca3af',

      'success-300': '#93c5fd',
      'success-500': '#3b82f6',
      'success-600': '#2563eb',

      'again-100': '#fae88f',
      'again-200': '#fae373',
      'again-300': '#fde047',
      'again-400': '#fbbf24',
      'again-800': '#a0760d',

      white: '#ffffff',
      'error-400': '#fb923c',

      'scroll-50': '#f0f9ff',
      'scroll-300': '#7dd3fc',

      'menu-button': '#3f6212',

      'disabled-200': '#e5e7eb',
      'disabled-500': '#6b7280',
    },
    screens: {
      sm: '360px',
      md: '480px',
      lg: '1024px',
      '2xl': '1536px',
    },
    keyframes: {
      slide: {
        '0%': {
          transform: 'translateX(-360px)',
        },
        '100%': {
          transform: 'translateX(0px)',
        },
      },
    },
    animation: {
      slide: 'slide 0.3s ease',
    },
    extend: {},
  },
  plugins: [],
};
