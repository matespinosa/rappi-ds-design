import type { ComponentMeta } from '../../metadata/meta.types'

export const cardTableMeta = {
  schemaVersion: '1.0',
  name: 'CardTable',
  category: 'composite',
  description:
    'Presentational mobile data card with title, metadata, status, fields, and up to two explicit actions.',
  import: "import { CardTable } from '@rappi-ds/react'",
  status: 'beta',
  useWhen: [
    'Representing a table row on narrow screens.',
    'Displaying labeled record fields where horizontal comparison is not essential.',
  ],
  doNotUseWhen: [
    'Users must compare many records by column at once.',
    'The card needs domain props such as showPro or merchantStatus.',
    'The whole surface needs to be clickable while containing controls.',
  ],
  props: {
    selectionControl: {
      type: 'ReactNode',
      required: false,
      description:
        'Dedicated leading selection region before the title; does not consume an action slot.',
    },
    title: {
      type: 'ReactNode',
      required: true,
      description: 'Primary record identifier.',
    },
    titleAdornment: {
      type: 'ReactNode',
      required: false,
      description: 'Composed badge, icon, or program marker next to the title.',
    },
    meta: {
      type: 'ReactNode',
      required: false,
      description: 'Secondary record metadata.',
    },
    status: {
      type: 'ReactNode',
      required: false,
      description: 'Status slot, normally composed with Tag.',
    },
    fields: {
      type: 'readonly CardTableField[]',
      required: false,
      default: '[]',
      description: 'Labeled values rendered in the selected layout.',
    },
    actions: {
      type: 'readonly ReactNode[]',
      required: false,
      default: '[]',
      description: 'At most two explicit accessible actions.',
    },
    layout: {
      type: 'two-columns | stacked',
      required: false,
      default: 'two-columns',
      description: 'Field layout selected by content length.',
    },
    density: {
      type: 'default | compact',
      required: false,
      default: 'default',
      description: 'Vertical density selected by scan frequency.',
    },
  },
  variants: [
    {
      name: 'layout',
      values: ['two-columns', 'stacked'],
      default: 'two-columns',
      guidance: 'Use stacked when a value may wrap or needs full width.',
    },
    {
      name: 'density',
      values: ['default', 'compact'],
      default: 'default',
      guidance: 'Compact is valid only with concise content and adequately spaced controls.',
    },
  ],
  invalidCombinations: [
    {
      when: { layout: 'two-columns', content: 'long or unpredictable' },
      reason: 'Two narrow columns produce excessive wrapping and poor scanability.',
      alternative: 'Use layout="stacked".',
    },
    {
      when: { actions: 'more than two' },
      reason: 'The header action region is intentionally constrained.',
      alternative: 'Prioritize two actions or move secondary tasks into an explicit menu.',
    },
    {
      when: { card: 'clickable', actions: 'present' },
      reason: 'Nested interactive targets create ambiguous behavior.',
      alternative: 'Keep the card static and expose named controls.',
    },
  ],
  anatomy: [
    'Static article surface',
    'Optional leading selection control',
    'Title and optional adornment',
    'Optional metadata',
    'Optional status',
    'Field definition list',
    'Zero to two explicit actions',
  ],
  relationships: [
    {
      type: 'responsive-counterpart',
      component: 'DataTable',
      description: 'DataTable derives cards from column mobile roles below 768px.',
    },
    {
      type: 'composes',
      component: 'Tag | Button | IconButton | Toggle',
      description: 'Business status and actions are composed from shared primitives.',
    },
  ],
  accessibility: {
    semanticRole: 'Static article containing a native definition list for labeled fields.',
    keyboard: ['The card is not focusable.', 'Only explicit controls participate in tab order.'],
    screenReader: [
      'Field labels and values use dt and dd.',
      'Icon-only actions require accessible names.',
    ],
    focus: ['Never place focus on the card surface.', 'Preserve visible focus on action controls.'],
  },
  tokens: [
    '--card-table-surface',
    '--card-table-border-color',
    '--card-table-border-width',
    '--card-table-radius',
    '--card-table-padding-inline',
    '--card-table-padding-block-default',
    '--card-table-padding-block-compact',
    '--card-table-gap-default',
    '--card-table-gap-compact',
    '--card-table-title-size',
    '--card-table-label-size',
    '--card-table-value-size',
  ],
  composition: [
    'Place row selection in selectionControl, never in actions.',
    'Compose commercial status with Tag.',
    'Compose title programs or badges through titleAdornment.',
    'Use strong emphasis for a primary comparable value, not for status.',
  ],
  examples: [
    {
      name: 'Stacked long values',
      description: 'Full-width fields for addresses or localized content.',
      code: `<CardTable title="Tienda Centro" layout="stacked" status={<Tag>Activa</Tag>} fields={fields} actions={[<IconButton aria-label="Editar" />]} />`,
    },
  ],
  antiPatterns: [
    {
      id: 'selection-as-action',
      pattern: 'Passing a selection Checkbox through actions.',
      reason: 'Selection and row operations lose their stable visual and keyboard regions.',
      replacement: 'Pass the Checkbox through selectionControl.',
      severity: 'error',
    },
    {
      id: 'business-props',
      pattern: 'Adding showPro, merchantStatus, orderType, or similar product props.',
      reason: 'The design-system component becomes coupled to one domain.',
      replacement: 'Use titleAdornment, status, fields, and action slots.',
      severity: 'error',
    },
    {
      id: 'clickable-card-with-controls',
      pattern: 'Making the full card clickable while rendering nested controls.',
      reason: 'Keyboard, pointer, and screen-reader interaction becomes ambiguous.',
      replacement: 'Keep the card static and use explicit named actions.',
      severity: 'error',
    },
  ],
  figma: {
    fileKey: '4tTaChJfWCNyFvaMLydrFU',
    nodeId: '81786:9702',
  },
} satisfies ComponentMeta
