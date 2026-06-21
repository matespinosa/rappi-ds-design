# DataTable

`DataTable<T>` is the responsive public API for tabular records. It renders a native table at
`768px` and above, and derives `CardTable` records below `768px` from the same columns and data.

## Column mapping

Every column declares its desktop cell renderer and its mobile role:

```tsx
const columns: DataTableColumn<Merchant>[] = [
  {
    id: 'name',
    header: 'Comercio',
    renderCell: (merchant) => merchant.name,
    mobileRole: 'title',
  },
  {
    id: 'status',
    header: 'Estado',
    renderCell: (merchant) => <Tag>{merchant.status}</Tag>,
    mobileRole: 'status',
  },
  {
    id: 'sales',
    header: 'Ventas',
    renderCell: (merchant) => formatCurrency(merchant.sales),
    align: 'end',
    mobileRole: 'field',
    mobileValueEmphasis: 'strong',
  },
]
```

Use one `title`. Use `field` for labeled values, `meta` for supporting identifiers, `status` for
composed Tag content, `action` for explicit controls, and `hidden` only when the information is
redundant on mobile.

## Controlled behavior

DataTable never fetches, filters, sorts, slices, or paginates rows internally. Selection and
pagination are controlled:

```tsx
<DataTable
  rows={pageRows}
  columns={columns}
  getRowId={(row) => row.id}
  selectedRowIds={selected}
  onSelectionChange={setSelected}
  isRowSelectable={(row) => row.permissions.canSelect}
  pagination={{ page, totalPages, onPageChange: setPage }}
/>
```

Select-all only changes selectable IDs in `rows`; IDs selected on other pages are preserved.
On mobile, every selectable-table card reserves a dedicated leading selection region before the
title. Non-selectable rows render a disabled Checkbox in that region; selection is never counted
as one of the card's two actions.

## Composition rules

- Keep rows and cards static. Put navigation and mutations in named links, buttons, toggles, or
  icon buttons.
- Keep selection in `selectionControl`; use `actions` only for row operations.
- Compose `Tag` for business status. Do not add domain-specific table or card variants.
- Choose `two-columns` for short values and `stacked` for long/localized content.
- Use `compact` only for concise, frequently scanned records.
- TableCell and TableHeaderCell must remain inside native `tr` and `table` elements.
- Critical content wraps. Validate 30% text expansion and 200% browser zoom.
- DataTable pagination is aligned to the right at every breakpoint.

See `DataTable.meta.ts`, `TableCell.meta.ts`, and `CardTable.meta.ts` for machine-readable usage,
relationships, accessibility, tokens, invalid combinations, and anti-patterns.
