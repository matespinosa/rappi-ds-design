export type ThemeName =
  | 'food'
  | 'grocery'
  | 'pharmacy'
  | 'turbo'
  | 'fintech'
  | 'user-app'
  | 'rt-app'
  | 'nitro'
  | 'consumer-cms'
  | 'aliados'
  | 'portal-partners'
  | 'brands'
  | 'mi-tienda'
  | 'nexus'
  | 'marketing-suite'
  | 'cargo'
  | 'pay'

export const themes: ThemeName[] = [
  'food',
  'grocery',
  'pharmacy',
  'turbo',
  'fintech',
  'user-app',
  'rt-app',
  'nitro',
  'consumer-cms',
  'aliados',
  'portal-partners',
  'brands',
  'mi-tienda',
  'nexus',
  'marketing-suite',
  'cargo',
  'pay',
]

/** Typed CSS custom property references for use in JS/TS contexts (inline styles, CSS-in-JS). */
export const tokens = {
  colors: {
    brandPrimary: 'var(--brand-primary)',
    brandPrimaryDark: 'var(--brand-primary-dark)',
    brandPrimaryLight: 'var(--brand-primary-light)',
    brandPrimaryContainer: 'var(--brand-primary-container)',
    brandSecondary: 'var(--brand-secondary)',
    brandSecondaryDark: 'var(--brand-secondary-dark)',

    surface: 'var(--surface)',
    surfaceMild: 'var(--surface-mild)',
    surfaceWeak: 'var(--surface-weak)',
    surfaceInverse: 'var(--surface-inverse)',
    surfaceInverseOn: 'var(--surface-inverse-on)',
    surfaceOverlay: 'var(--surface-overlay)',
    surfaceOverlayWeak: 'var(--surface-overlay-weak)',
    surfaceDisabled: 'var(--surface-disabled)',
    surfaceOnTop: 'var(--surface-on-top)',
    surfaceAccentWeak: 'var(--surface-accent-weak)',
    surfaceHover: 'var(--surface-hover)',
    surfacePressed: 'var(--surface-pressed)',
    surfaceMildHover: 'var(--surface-mild-hover)',
    surfaceMildPressed: 'var(--surface-mild-pressed)',
    surfaceWeakHover: 'var(--surface-weak-hover)',
    surfaceWeakPressed: 'var(--surface-weak-pressed)',
    surfaceInverseHover: 'var(--surface-inverse-hover)',
    surfaceInversePressed: 'var(--surface-inverse-pressed)',

    inkStrong: 'var(--ink-strong)',
    inkStrongOn: 'var(--ink-strong-on)',
    inkStandard: 'var(--ink-standard)',
    inkWeak: 'var(--ink-weak)',
    inkDisabled: 'var(--ink-disabled)',
    inkInverse: 'var(--ink-inverse)',
    inkInverseOn: 'var(--ink-inverse-on)',
    inkAccent: 'var(--ink-accent)',
    inkError: 'var(--ink-error)',
    inkWarning: 'var(--ink-warning)',
    inkPositive: 'var(--ink-positive)',
    inkRecommendation: 'var(--ink-recommendation)',

    bgAccent: 'var(--bg-accent)',
    bgAccentHover: 'var(--bg-accent-hover)',
    bgAccentPressed: 'var(--bg-accent-pressed)',

    borderAccent: 'var(--border-accent)',
    borderAccentFocus: 'var(--border-accent-focus)',
    borderFocus: 'var(--border-focus)',
    borderStandard: 'var(--border-standard)',
    borderStrong: 'var(--border-strong)',
    borderBlank: 'var(--border-blank)',
    borderBlock: 'var(--border-block)',
    borderNonOpaque: 'var(--border-non-opaque)',
    borderError: 'var(--border-error)',
    borderWarning: 'var(--border-warning)',
    borderPositive: 'var(--border-positive)',

    positive: 'var(--positive)',
    positiveContainer: 'var(--positive-container)',
    warning: 'var(--warning)',
    warningContainer: 'var(--warning-container)',
    error: 'var(--error)',
    errorContainer: 'var(--error-container)',
    info: 'var(--info)',
    infoContainer: 'var(--info-container)',
    offer: 'var(--offer)',
    offerContainer: 'var(--offer-container)',

    skeletonWeak: 'var(--skeleton-weak)',
    skeletonStandard: 'var(--skeleton-standard)',

    programsRappi: 'var(--programs-rappi)',
    programsTurbo: 'var(--programs-turbo)',

    chartBlue02: 'var(--chart-blue-02)',
    chartBlue04: 'var(--chart-blue-04)',
    chartGreen02: 'var(--chart-green-02)',
    chartGreen04: 'var(--chart-green-04)',
    chartRed02: 'var(--chart-red-02)',
    chartRed03: 'var(--chart-red-03)',
    chartRed04: 'var(--chart-red-04)',
    chartOrange02: 'var(--chart-orange-02)',
    chartOrange03: 'var(--chart-orange-03)',
    chartOrange04: 'var(--chart-orange-04)',
    chartYellow02: 'var(--chart-yellow-02)',
    chartTeal01: 'var(--chart-teal-01)',
    chartTeal02: 'var(--chart-teal-02)',
    chartTeal03: 'var(--chart-teal-03)',
    chartTeal04: 'var(--chart-teal-04)',
    chartPurple02: 'var(--chart-purple-02)',
    chartIndigo01: 'var(--chart-indigo-01)',
    chartIndigo02: 'var(--chart-indigo-02)',
    chartIndigo03: 'var(--chart-indigo-03)',
    chartIndigo04: 'var(--chart-indigo-04)',
    chartMagenta01: 'var(--chart-magenta-01)',
    chartMagenta02: 'var(--chart-magenta-02)',
    chartMagenta03: 'var(--chart-magenta-03)',
    chartMagenta04: 'var(--chart-magenta-04)',
  },
  spacing: {
    2: 'var(--spacing-2)',
    4: 'var(--spacing-4)',
    6: 'var(--spacing-6)',
    8: 'var(--spacing-8)',
    10: 'var(--spacing-10)',
    12: 'var(--spacing-12)',
    16: 'var(--spacing-16)',
    20: 'var(--spacing-20)',
    24: 'var(--spacing-24)',
    28: 'var(--spacing-28)',
    32: 'var(--spacing-32)',
    40: 'var(--spacing-40)',
    48: 'var(--spacing-48)',
    56: 'var(--spacing-56)',
    64: 'var(--spacing-64)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },
  elevation: {
    0: 'var(--elevation-0)',
    1: 'var(--elevation-1)',
    2: 'var(--elevation-2)',
    3: 'var(--elevation-3)',
  },
} as const
