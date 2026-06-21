import type { ComponentMeta } from '../../metadata/meta.types'

export const dataTableMeta = {
  schemaVersion: '1.0',
  name: 'DataTable',
  category: 'organism',
  description:
    'Responsive controlled data display that uses a native table from 768px and CardTable items below 768px.',
  import: "import { DataTable } from '@rappi-ds/react'",
  status: 'beta',
  useWhen: [
    'Users need to compare several records across shared columns.',
    'The same dataset needs a mobile card representation.',
    'Selection or controlled pagination is required.',
  ],
  doNotUseWhen: [
    'The content is a short static definition list.',
    'The dataset requires row virtualization in v1.',
    'The whole row must behave as one navigation target while also containing controls.',
  ],
  props: {
    rows: {
      type: 'readonly T[]',
      required: true,
      description: 'Rows for the current consumer-managed page.',
    },
    columns: {
      type: 'readonly DataTableColumn<T>[]',
      required: true,
      description: 'Single mapping for desktop cells and mobile card content.',
    },
    getRowId: {
      type: '(row: T) => string',
      required: true,
      description: 'Returns a stable ID used for keys and controlled selection.',
    },
    selectedRowIds: {
      type: 'readonly string[]',
      required: false,
      default: '[]',
      description: 'Controlled selection, including IDs from other pages.',
    },
    onSelectionChange: {
      type: '(ids: string[]) => void',
      required: false,
      description: 'Enables selection and receives the complete next ID set.',
    },
    isRowSelectable: {
      type: '(row: T) => boolean',
      required: false,
      default: '() => true',
      description: 'Excludes rows from individual and page selection.',
    },
    state: {
      type: 'ready | loading | empty | error',
      required: false,
      default: "{ status: 'ready' }",
      description: 'Discriminated render state; replaces conflicting state booleans.',
    },
    pagination: {
      type: '{ page; totalPages; onPageChange }',
      required: false,
      description: 'Controlled pagination. Data is never sliced internally.',
    },
    mobileLayout: {
      type: 'two-columns | stacked',
      required: false,
      default: 'two-columns',
      description: 'Layout used by derived CardTable rows.',
    },
    mobileDensity: {
      type: 'default | compact',
      required: false,
      default: 'default',
      description: 'Density used by derived CardTable rows.',
    },
  },
  variants: [
    {
      name: 'state',
      values: ['ready', 'loading', 'empty', 'error'],
      default: 'ready',
      guidance: 'Use one discriminated state; loading does not show pagination.',
    },
    {
      name: 'mobileLayout',
      values: ['two-columns', 'stacked'],
      default: 'two-columns',
      guidance: 'Use stacked when values are long, localized, or need the full card width.',
    },
    {
      name: 'mobileDensity',
      values: ['default', 'compact'],
      default: 'default',
      guidance: 'Use compact only for frequent scanning and short content.',
    },
  ],
  invalidCombinations: [
    {
      when: { selectedRowIds: 'provided', onSelectionChange: 'missing' },
      reason: 'Selection would appear controlled but could not change.',
      alternative: 'Provide onSelectionChange or omit selectedRowIds.',
    },
    {
      when: { state: 'loading', pagination: 'interactive' },
      reason: 'Changing page while the current page is unresolved creates ambiguous state.',
      alternative: 'DataTable hides pagination while loading.',
    },
    {
      when: { row: 'clickable', cellControls: 'present' },
      reason: 'Nested interaction creates conflicting pointer and keyboard targets.',
      alternative: 'Render explicit links, buttons, toggles, or icon buttons in cells.',
    },
  ],
  anatomy: [
    'Responsive container',
    'Native table frame',
    'Column headers',
    'Data rows and cells',
    'Mobile CardTable list',
    'Optional controlled pagination',
    'Typed loading, empty, and error regions',
  ],
  relationships: [
    {
      type: 'must-contain',
      component: 'TableCell',
      description: 'Desktop records are composed from semantic cells.',
    },
    {
      type: 'responsive-counterpart',
      component: 'CardTable',
      description: 'Columns map to CardTable slots below 768px.',
    },
    {
      type: 'composes',
      component: 'Checkbox',
      description: 'Selection and indeterminate page selection use the shared Checkbox.',
    },
    {
      type: 'composes',
      component: 'Pagination',
      description: 'Pagination remains controlled by the consumer.',
    },
  ],
  accessibility: {
    semanticRole: 'Native table with th, td, scope, headers, caption or aria-label.',
    keyboard: [
      'Uses native tab order for controls inside cells.',
      'Does not add keyboard behavior to rows or cards.',
      'Checkbox and Pagination preserve their native keyboard contracts.',
    ],
    screenReader: [
      'Each data cell references its column header.',
      'Select-all announces current-page scope.',
      'Loading uses aria-busy and a named status.',
      'Error uses an alert region.',
    ],
    focus: [
      'Rows and cards never receive focus.',
      'Every interactive child must have a visible focus indicator and accessible name.',
    ],
  },
  tokens: [
    '--table-surface',
    '--table-header-surface',
    '--table-border-color',
    '--table-border-width',
    '--table-radius',
    '--table-header-min-height',
    '--table-row-min-height',
    '--table-selection-column-width',
    '--table-state-min-height',
    '--table-state-padding',
    '--table-mobile-gap',
    '--table-skeleton-surface',
  ],
  composition: [
    'Use Tag for status; do not add commercial status variants.',
    'Mobile selection uses CardTable.selectionControl before the title.',
    'Use Button, IconButton, Toggle, or links as named explicit actions.',
    'Assign one title column and intentional mobile roles to every visible column.',
  ],
  examples: [
    {
      name: 'Controlled selection',
      description: 'Selection and pagination are owned by the product.',
      code: `<DataTable rows={rows} columns={columns} getRowId={(row) => row.id} selectedRowIds={selected} onSelectionChange={setSelected} pagination={{ page, totalPages, onPageChange: setPage }} />`,
    },
  ],
  antiPatterns: [
    {
      id: 'mobile-selection-as-action',
      pattern: 'Placing the mobile selection Checkbox in a column with mobileRole action.',
      reason: 'Selection becomes visually coupled to row operations and consumes an action slot.',
      replacement: 'Use the controlled DataTable selection API.',
      severity: 'error',
    },
    {
      id: 'div-table',
      pattern: 'Recreating rows and cells with div and ARIA roles.',
      reason: 'Native header association and navigation become fragile.',
      replacement: 'Use DataTable, TableCell, and TableHeaderCell.',
      severity: 'error',
    },
    {
      id: 'clickable-row-with-controls',
      pattern: 'Making a row clickable while it contains links, toggles, or buttons.',
      reason: 'Nested targets are ambiguous for keyboard and pointer users.',
      replacement: 'Use an explicit named action in its own cell.',
      severity: 'error',
    },
    {
      id: 'internal-data-management',
      pattern: 'Slicing, sorting, filtering, or fetching data inside DataTable.',
      reason: 'It breaks controlled server-side data flows.',
      replacement: 'Keep data management in the consumer.',
      severity: 'warning',
    },
  ],
  figma: {
    fileKey: '4tTaChJfWCNyFvaMLydrFU',
    nodeId: '79229:9913',
  },
} satisfies ComponentMeta
