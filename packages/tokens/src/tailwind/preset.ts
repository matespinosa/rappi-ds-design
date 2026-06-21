/**
 * Tailwind v3 preset for @rappi-ds/tokens.
 * Maps all design token CSS custom properties to Tailwind theme values.
 * Usage in tailwind.config.ts:
 *   import preset from '@rappi-ds/tokens/tailwind'
 *   export default { presets: [preset] }
 *
 * For Tailwind v4, add @import "@rappi-ds/tokens/base.css" in your CSS
 * and configure @theme to alias the CSS vars as needed.
 */
const preset = {
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-dark': 'var(--brand-primary-dark)',
        'brand-primary-light': 'var(--brand-primary-light)',
        'brand-primary-container': 'var(--brand-primary-container)',
        'brand-secondary': 'var(--brand-secondary)',
        surface: 'var(--surface)',
        'surface-mild': 'var(--surface-mild)',
        'surface-weak': 'var(--surface-weak)',
        'surface-inverse': 'var(--surface-inverse)',
        'ink-strong': 'var(--ink-strong)',
        'ink-standard': 'var(--ink-standard)',
        'ink-weak': 'var(--ink-weak)',
        'ink-disabled': 'var(--ink-disabled)',
        'ink-inverse': 'var(--ink-inverse)',
        'ink-accent': 'var(--ink-accent)',
        'bg-accent': 'var(--bg-accent)',
        positive: 'var(--positive)',
        'positive-container': 'var(--positive-container)',
        warning: 'var(--warning)',
        'warning-container': 'var(--warning-container)',
        error: 'var(--error)',
        'error-container': 'var(--error-container)',
        info: 'var(--info)',
        'info-container': 'var(--info-container)',
        offer: 'var(--offer)',
        'offer-container': 'var(--offer-container)',
        'border-standard': 'var(--border-standard)',
        'border-strong': 'var(--border-strong)',
        'border-accent': 'var(--border-accent)',
      },
      spacing: {
        '2': 'var(--spacing-2)',
        '4': 'var(--spacing-4)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '28': 'var(--spacing-28)',
        '32': 'var(--spacing-32)',
        '40': 'var(--spacing-40)',
        '48': 'var(--spacing-48)',
        '56': 'var(--spacing-56)',
        '64': 'var(--spacing-64)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        0: 'var(--elevation-0)',
        1: 'var(--elevation-1)',
        2: 'var(--elevation-2)',
        3: 'var(--elevation-3)',
      },
    },
  },
} as const

export default preset
