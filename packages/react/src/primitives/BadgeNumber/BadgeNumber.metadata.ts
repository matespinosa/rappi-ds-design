export const BadgeNumberMetadata = {
  component: {
    name: 'BadgeNumber',
    category: 'atoms',
    description:
      'Compact numeric indicator for notifications, counts, or status. Renders as a filled pill with an optional numeric value or as an empty dot (status indicator) when value is hidden.',
    type: 'display',
    exports: ['BadgeNumber'],
  },

  usage: {
    useCases: [
      'notification-count',
      'cart-item-count',
      'unread-messages-count',
      'status-dot-indicator',
      'list-item-count',
    ],
    requiredProps: [],
    commonPatterns: [
      {
        name: 'notification-count',
        description: 'Shows a numeric count for unread notifications or messages',
        composition: `<BadgeNumber value={5} appearance="accent" size="xs" />`,
      },
      {
        name: 'cart-count-overlay',
        description: 'Overlaid on an icon to show cart item count',
        composition: `
<div style={{ position: 'relative', display: 'inline-flex' }}>
  <IconButton icon={<ShoppingCart size={20} />} aria-label="Carrito" appearance="secondary" />
  <BadgeNumber
    value={3}
    appearance="accent"
    size="xs"
    style={{ position: 'absolute', top: -4, right: -4 }}
    aria-label="3 productos en el carrito"
  />
</div>`,
      },
      {
        name: 'status-dot',
        description: 'Empty dot used as a visual status indicator when no count is needed',
        composition: `<BadgeNumber showValue={false} appearance="accent" size="xs" aria-label="Nuevo" />`,
      },
      {
        name: 'dark-badge',
        description: 'Dark badge on a light or image background',
        composition: `<BadgeNumber value={12} appearance="dark" size="sm" />`,
      },
      {
        name: 'large-count-display',
        description: 'Larger badge for prominent count display in a list header',
        composition: `<BadgeNumber value={99} appearance="light" size="md" />`,
      },
    ],
    antiPatterns: [
      {
        scenario: 'Using BadgeNumber for text labels or status text',
        reason: 'BadgeNumber is semantically a numeric count or dot — text labels have dedicated components',
        alternative: 'Use a Tag or Chip component for categorical labels',
      },
      {
        scenario: 'Omitting aria-label when the badge is the only notification indicator',
        reason: 'Screen readers need context; a number alone ("5") is meaningless without description',
        alternative: 'Add aria-label="5 notificaciones sin leer" or aria-label="Nuevo" for dot mode',
      },
      {
        scenario: 'Nesting interactive elements inside BadgeNumber',
        reason: 'BadgeNumber is a <span> display element; it has no interaction semantics',
        alternative: 'Place BadgeNumber as a sibling overlay, not a child of interactive elements',
      },
    ],
  },

  composition: {
    slots: {
      value: {
        required: false,
        type: 'ReactNode',
        default: 2,
        description: 'Numeric or text content to display inside the badge',
      },
    },
    nestedComponents: [],
    commonPartners: ['IconButton (overlay positioning)', 'Button (overlay on icon)', 'navigation icons'],
    parentConstraints: [
      'Parent must use position:relative when positioning as an overlay on another element',
    ],
  },

  variants: {
    appearance: {
      accent: 'Brand accent background — primary notifications, cart counts',
      light: 'Subtle surface background — secondary counts on light backgrounds',
      dark: 'Inverse surface — counts on dark or image backgrounds',
    },
    size: {
      xs: 'Smallest — icon overlays, tight spaces (default)',
      sm: 'Small — compact list counters',
      md: 'Medium — standard list/section counts',
      lg: 'Large — prominent display counts',
      xl: 'Extra large — hero count displays',
    },
    dotMode: {
      description: 'When showValue=false, renders as an empty pill (status dot) with no text',
    },
  },

  behavior: {
    states: ['default', 'dot (showValue=false)'],
    interactions: {},
    responsive: {
      note: 'Width is max-content; grows horizontally with value length. Minimum width equals height (circular for single digits).',
    },
  },

  accessibility: {
    role: 'img or status (via aria-label on the parent context)',
    keyboardSupport: 'None — display only',
    screenReader:
      'No implicit accessible name; always add aria-label when the badge is the sole indicator of a notification or count.',
    focusManagement: 'Not focusable',
    wcag: 'AA',
    notes:
      'The inner <span class="rds-badge-number__value"> is not aria-hidden, so value text is read by screen readers. Add aria-label to the BadgeNumber element for full context (e.g., "3 ítems en el carrito").',
  },

  aiHints: {
    priority: 'medium',
    keywords: [
      'badge',
      'count',
      'notification',
      'carrito',
      'mensajes',
      'unread',
      'dot',
      'indicator',
      'número',
      'cantidad',
    ],
    context:
      'Use BadgeNumber whenever you need to display a numeric count or a status dot overlaid on or adjacent to an icon, button, or navigation item. Pair with position:absolute on the parent for icon overlays.',
    selectionGuide: {
      'notification count on icon': 'appearance="accent" size="xs" + position:absolute',
      'cart count': 'appearance="accent" size="xs"',
      'status dot (no number)': 'showValue={false}',
      'count on dark background': 'appearance="dark"',
      'secondary count on card': 'appearance="light"',
    },
  },
} as const
