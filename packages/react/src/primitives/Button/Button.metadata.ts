export const ButtonMetadata = {
  component: {
    name: 'Button',
    category: 'atoms',
    description:
      'Triggers an action or event. Supports optional leading/trailing icons and an async loading state. Browser interaction states are CSS-driven.',
    type: 'interactive',
    exports: ['Button', 'IconButton'],
  },

  usage: {
    useCases: [
      'form-submit',
      'cta-primary-action',
      'secondary-action',
      'ghost-action',
      'async-action-with-loading',
      'icon-only-action',
    ],
    requiredProps: ['children (Button)', 'icon + aria-label (IconButton)'],
    commonPatterns: [
      {
        name: 'primary-cta',
        description: 'Main call-to-action in a form or dialog',
        composition: `<Button appearance="primary" size="md">Confirmar pedido</Button>`,
      },
      {
        name: 'secondary-action',
        description: 'Alternative action paired with a primary button',
        composition: `<Button appearance="secondary" size="md">Cancelar</Button>`,
      },
      {
        name: 'tertiary-outlined',
        description: 'Low-emphasis action, bordered outline style',
        composition: `<Button appearance="tertiary" size="md">Ver detalles</Button>`,
      },
      {
        name: 'with-start-icon',
        description: 'Button with a leading icon for visual context',
        composition: `<Button appearance="primary" startIcon={<Plus size={16} />}>Agregar</Button>`,
      },
      {
        name: 'with-end-icon',
        description: 'Button with a trailing icon, e.g. directional arrow',
        composition: `<Button appearance="primary" endIcon={<ChevronRight size={16} />}>Continuar</Button>`,
      },
      {
        name: 'async-loading',
        description: 'Use loading=true while an async action is in progress',
        composition: `<Button appearance="primary" loading={isSaving}>Guardar</Button>`,
      },
      {
        name: 'icon-button',
        description: 'Icon-only action; aria-label is mandatory',
        composition: `<IconButton icon={<Trash2 size={16} />} aria-label="Eliminar elemento" appearance="secondary" />`,
      },
      {
        name: 'primary-action-pair',
        description: 'Standard primary + secondary button pair for dialogs',
        composition: `
<div style={{ display: 'flex', gap: 8 }}>
  <Button appearance="secondary" size="md">Cancelar</Button>
  <Button appearance="primary" size="md">Confirmar</Button>
</div>`,
      },
    ],
    antiPatterns: [
      {
        scenario: 'Using both startIcon and endIcon simultaneously',
        reason: 'The type system enforces mutual exclusivity; only one icon slot is allowed',
        alternative: 'Choose either startIcon (leading context) or endIcon (trailing direction)',
      },
      {
        scenario: 'Using loading on a non-async action',
        reason: 'loading disables the button and shows a spinner — it is meant only for async operations',
        alternative: 'Use disabled for synchronous unavailability',
      },
      {
        scenario: 'IconButton without aria-label',
        reason: 'Screen readers have no visible label to announce; TypeScript enforces aria-label as required',
        alternative: 'Always provide a descriptive aria-label on IconButton',
      },
      {
        scenario: 'Using an <a> tag styled as a button',
        reason: 'Breaks keyboard/screen-reader semantics',
        alternative: 'Use Button with an onClick handler; navigation links should use an <a> or Link component',
      },
    ],
  },

  composition: {
    slots: {
      children: { required: true, component: 'Button only', description: 'Button label text' },
      startIcon: { required: false, component: 'ReactNode', description: 'Icon rendered before the label' },
      endIcon: { required: false, component: 'ReactNode', description: 'Icon rendered after the label; mutually exclusive with startIcon' },
      icon: { required: true, component: 'IconButton only', description: 'Single icon rendered in the compact icon-only button' },
    },
    nestedComponents: ['lucide-react icons', 'custom SVG icons'],
    commonPartners: ['BadgeNumber (notification overlay)', 'Lucide icons'],
    parentConstraints: [],
  },

  variants: {
    appearance: {
      primary: 'Brand accent background, inverse ink — highest emphasis',
      secondary: 'Subtle surface background, strong ink — medium emphasis',
      tertiary: 'Standard surface with border, strong ink — lowest emphasis',
    },
    size: {
      xs: 'Compact inline actions',
      sm: 'Small secondary actions',
      md: 'Default; most use cases',
      lg: 'Prominent CTAs',
      xl: 'Hero or full-width CTAs',
    },
  },

  behavior: {
    states: ['default', 'hover', 'active/pressed', 'focus-visible', 'disabled', 'loading'],
    interactions: {
      hover: 'Background shifts to hover token; CSS-driven',
      active: 'Pressed overlay applied; CSS-driven',
      focusVisible: 'Outline using --border-focus with 2px offset',
      disabled: 'cursor:not-allowed, disabled ink/surface tokens applied',
      loading: 'aria-busy="true", cursor:wait, content hidden, spinner visible; button disabled',
    },
    responsive: {
      note: 'Width is intrinsic (inline-flex); wrap in a flex/grid container to stretch full-width if needed',
    },
  },

  accessibility: {
    role: 'button (native)',
    keyboardSupport: 'Enter and Space activate; Tab focuses; all native button keyboard behavior',
    screenReader: 'Announces label or aria-label; aria-busy="true" signals loading to assistive tech',
    focusManagement: 'focus-visible ring; no custom focus trap',
    wcag: 'AA',
    notes: 'Icons inside ButtonContent have aria-hidden="true". IconButton requires explicit aria-label.',
  },

  aiHints: {
    priority: 'high',
    keywords: ['button', 'cta', 'action', 'submit', 'icon-button', 'loading', 'confirmar', 'guardar', 'cancelar'],
    context:
      'Use Button as the primary interactive element for any user-triggered action. Prefer appearance="primary" for the most important action on a page, appearance="secondary" for alternatives, and appearance="tertiary" for low-emphasis or destructive confirmations. Use IconButton when the action is understood by icon alone and space is constrained.',
    selectionGuide: {
      'high emphasis / main action': 'appearance="primary"',
      'medium emphasis / alternative': 'appearance="secondary"',
      'low emphasis / outlined': 'appearance="tertiary"',
      'icon-only compact': 'IconButton',
      'async submit': 'Button with loading prop',
    },
  },
} as const
