import type { ComponentMeta } from '../../metadata/meta.types'

export const tableCellMeta = {
  schemaVersion: '1.0',
  name: 'TableCell',
  category: 'composite',
  description:
    'Native td and th wrappers with logical alignment and composable leading, text, secondary title, and trailing slots.',
  import: "import { TableCell, TableHeaderCell } from '@rappi-ds/react'",
  status: 'beta',
  useWhen: [
    'Building semantic rows inside a native table.',
    'A cell needs an icon, control, secondary title, or trailing action.',
  ],
  doNotUseWhen: [
    'Content is outside a tr and table.',
    'A CSS grid or generic layout container is required.',
  ],
  props: {
    align: {
      type: 'start | center | end',
      required: false,
      default: 'start',
      description: 'Logical content alignment that supports RTL.',
    },
    leading: {
      type: 'ReactNode',
      required: false,
      description: 'Icon, checkbox, avatar, or other leading content.',
    },
    title: {
      type: 'ReactNode',
      required: false,
      description: 'Optional emphasized secondary line above the main value.',
    },
    trailing: {
      type: 'ReactNode',
      required: false,
      description: 'Status, action, icon, or other trailing content.',
    },
  },
  variants: [
    {
      name: 'element',
      values: ['TableCell', 'TableHeaderCell'],
      default: 'TableCell',
      guidance: 'Use TableHeaderCell for column or row labels and set the correct scope.',
    },
    {
      name: 'align',
      values: ['start', 'center', 'end'],
      default: 'start',
      guidance: 'Use end for comparable numeric values and center sparingly.',
    },
  ],
  invalidCombinations: [
    {
      when: { parent: 'not tr/table' },
      reason: 'td and th are invalid outside native table structure.',
      alternative: 'Use CardTable or another layout component outside tables.',
    },
    {
      when: { element: 'TableCell', semanticPurpose: 'header' },
      reason: 'A td does not expose header semantics.',
      alternative: 'Use TableHeaderCell with scope="col" or scope="row".',
    },
  ],
  anatomy: [
    'Native td or th',
    'Leading slot',
    'Text block',
    'Optional title',
    'Value',
    'Trailing slot',
  ],
  relationships: [
    {
      type: 'must-be-inside',
      component: 'tr → table',
      description: 'Native cell structure is mandatory.',
    },
    {
      type: 'composes',
      component: 'Checkbox | Tag | Toggle | Button | IconButton',
      description: 'Shared controls may be composed without changing cell semantics.',
    },
  ],
  accessibility: {
    semanticRole: 'Native td or th. TableHeaderCell defaults to scope="col".',
    keyboard: [
      'The cell itself is not focusable.',
      'Interactive slot content uses native keyboard behavior.',
    ],
    screenReader: [
      'Use headers on td when header association is not implicit.',
      'Use scope on every th.',
    ],
    focus: ['Focus belongs to interactive descendants, never the cell container.'],
  },
  tokens: [
    '--table-cell-surface',
    '--table-cell-header-surface',
    '--table-cell-border-color',
    '--table-cell-padding',
    '--table-cell-gap',
    '--table-cell-color',
    '--table-cell-title-color',
    '--table-cell-font-size',
    '--table-cell-line-height',
  ],
  composition: [
    'Keep controls explicit and accessible.',
    'Allow long content to wrap.',
    'Use logical start/end alignment instead of left/right.',
  ],
  examples: [
    {
      name: 'Amount cell',
      description: 'Right-aligned numeric value with native semantics.',
      code: `<TableCell align="end">$42.000</TableCell>`,
    },
  ],
  antiPatterns: [
    {
      id: 'cell-as-div',
      pattern: 'Replacing the native cell with a div for layout convenience.',
      reason: 'It removes table navigation and header relationships.',
      replacement: 'Use TableCell slots and CSS within the td.',
      severity: 'error',
    },
    {
      id: 'interactive-cell',
      pattern: 'Adding click or keyboard behavior to the entire cell.',
      reason: 'It conflicts with controls composed inside the cell.',
      replacement: 'Render a named Button, IconButton, Toggle, or link.',
      severity: 'warning',
    },
  ],
  figma: {
    fileKey: '4tTaChJfWCNyFvaMLydrFU',
    nodeId: '78037:20283',
  },
} satisfies ComponentMeta
