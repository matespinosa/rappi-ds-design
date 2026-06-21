# Pagination

Controlled page navigation component with an ellipsis algorithm for large page counts.

---

## Purpose

Pagination renders a `<nav>` with previous/next chevron buttons and numbered page buttons. When the total page count exceeds seven, an ellipsis algorithm condenses the list to show only contextually relevant pages. The component is fully controlled — it reports page changes via `onPageChange` but does not store the current page internally.

---

## When to use

- Tables, lists, or grids that paginate data across multiple pages.
- Any context where the user needs to jump to a specific page rather than just scrolling.

## When NOT to use

- Infinite-scroll feeds — no page concept exists.
- Content with fewer than two pages — render nothing or a single summary label.
- Mobile contexts where progressive load ("Cargar más") is preferred over page jumps.

---

## Anatomy

```
  ←   1   2   3   ...   10   →
  │   └───────────────────┘  │
  │    page buttons + ellipsis  │
 prev                        next
```

| Part | CSS class | `data-type` | Element |
|---|---|---|---|
| Root | `.rds-pagination` | — | `<nav aria-label="Paginación">` |
| Prev button | `.rds-pagination__item` | `data-type="nav"` | `<button>` |
| Page button | `.rds-pagination__item` | — | `<button>` |
| Ellipsis | `.rds-pagination__item` | `data-type="ellipsis"` | `<span aria-hidden="true">` |
| Next button | `.rds-pagination__item` | `data-type="nav"` | `<button>` |

---

## Ellipsis algorithm

| Condition | Pages shown |
|---|---|
| `totalPages ≤ 7` | All pages, no ellipsis |
| `page ≤ 3` | `1 2 3 ... N` |
| `page ≥ N - 2` | `1 ... N-2 N-1 N` |
| Otherwise | `1 ... p-1 p p+1 ... N` |

This matches the three states defined in the Figma design:
- **Default** — all pages visible (small totals)
- **Intermediate** — trailing ellipsis (near start)
- **Last** — leading ellipsis (near end)

---

## States

| State | Visual | Description |
|---|---|---|
| Default | `--surface` bg | Normal page button |
| Active | `--surface-inverse` bg + `--ink-inverse` text | Current page — `aria-current="page"` |
| Hover | `--surface-mild` bg | Pointer over any enabled button |
| Disabled | `--ink-disabled` text | Prev button on page 1 / Next on last page |

---

## Behavior

### Pointer and touch

Clicking a page button calls `onPageChange(pageNumber)`. Clicking the active page is a no-op. Clicking prev/next calls `onPageChange(page ± 1)` — they are `disabled` at the boundaries.

### Keyboard

Pagination uses native `<button>` elements — keyboard interaction follows standard button behaviour:

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus between buttons |
| `Enter` / `Space` | Activate the focused button |

Ellipsis spans are `aria-hidden` and not focusable.

### Focus

Standard browser focus ring. No custom focus management required.

### Responsive

Items have fixed `32×32 px` size. For very narrow viewports, apply `overflow-x: auto` to the parent. The component does not collapse or change its layout.

---

## Content

- Page buttons display only the page number.
- Ellipsis is rendered as `...` text inside an `aria-hidden` span — assistive technologies skip it.
- Prev and next buttons are icon-only with `aria-label="Página anterior"` / `aria-label="Página siguiente"`.

---

## Accessibility

| Attribute | Element | Value |
|---|---|---|
| `aria-label="Paginación"` | `<nav>` | Landmark label |
| `aria-current="page"` | Active page button | Identifies the current page |
| `aria-label="Página N"` | Page buttons | Readable label for each page |
| `aria-label="Página anterior"` | Prev button | Accessible name for icon-only button |
| `aria-label="Página siguiente"` | Next button | Accessible name for icon-only button |
| `disabled` | Prev / Next buttons | Boundary state — native HTML attribute |
| `aria-hidden="true"` | Ellipsis span | Excluded from the accessibility tree |

---

## Composition

### Allowed

```tsx
// Wrap in a container for layout control
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <Pagination page={page} totalPages={total} onPageChange={setPage} />
</div>

// Inside a table footer
<tfoot>
  <tr>
    <td colSpan={columns.length}>
      <Pagination page={page} totalPages={total} onPageChange={setPage} />
    </td>
  </tr>
</tfoot>
```

### Not allowed

```tsx
// Don't nest Pagination inside another nav landmark
<nav aria-label="Navigation">
  <Pagination page={1} totalPages={5} /> {/* nested nav */}
</nav>
```

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | — | **Required.** Current page, 1-indexed |
| `totalPages` | `number` | — | **Required.** Total number of pages |
| `onPageChange` | `(page: number) => void` | — | Called when the user selects a different page |
| `className` | `string` | — | Extra class merged onto the `<nav>` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the root `<nav>` |
| `...HTMLAttributes` | — | — | All other HTML attributes forwarded (except `onChange`) |

---

## Tokens

All tokens live in `packages/tokens/src/themes/base.css` under `/* ─── Pagination ─── */`.

| Token | Default value | Description |
|---|---|---|
| `--pagination-gap` | `var(--spacing-8)` | Gap between items |
| `--pagination-item-size` | `32px` | Width and height of each button/ellipsis |
| `--pagination-item-radius` | `var(--radius-md)` | Border radius of buttons |
| `--pagination-font-size` | `var(--font-size-label-md)` | Button font size |
| `--pagination-font-weight` | `var(--font-weight-label-md)` | Button font weight |
| `--pagination-line-height` | `var(--line-height-label-md)` | Button line height |
| `--pagination-nav-icon-size` | `20px` | Chevron icon size in prev/next buttons |

---

## Do

```tsx
// Always keep page in parent state
const [page, setPage] = useState(1)
<Pagination page={page} totalPages={50} onPageChange={setPage} />

// Reset to page 1 when data changes
useEffect(() => setPage(1), [filters])

// Conditionally hide when only one page
{totalPages > 1 && (
  <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
)}
```

## Don't

```tsx
// Don't use 0-indexed pages — Pagination is 1-indexed
<Pagination page={0} totalPages={10} /> // page 0 disables prev and renders incorrectly

// Don't derive totalPages from client-side data alone if server has more
// Calculate from total item count and page size:
const totalPages = Math.ceil(totalItems / pageSize)

// Don't suppress onPageChange — the component is fully controlled
<Pagination page={page} totalPages={10} /> // onPageChange missing = no navigation
```

---

## Examples

```tsx
// Basic controlled pagination
const [page, setPage] = useState(1)

<Pagination page={page} totalPages={20} onPageChange={setPage} />

// With data fetch
const { data, isLoading } = useQuery(['items', page], () => fetchItems(page))
const totalPages = Math.ceil(data?.total / PAGE_SIZE) ?? 1

<>
  <ItemList items={data?.items} isLoading={isLoading} />
  <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
</>
```

---

## Tests

Test file: `Pagination.test.tsx`

| Area | Scenarios covered |
|---|---|
| Structure | Renders `<nav aria-label="Paginación">`, forwards ref, merges className, forwards HTML attributes |
| Page buttons | All pages shown when `totalPages ≤ 7`, `aria-current="page"` on active, none on others |
| Nav buttons | Prev and next present; prev `disabled` on page 1; next `disabled` on last page; enabled otherwise |
| Callbacks | `onPageChange(p)` on page click; `page - 1` on prev; `page + 1` on next; no call when clicking active page |
| Ellipsis algorithm | No ellipsis when `≤ 7`; trailing ellipsis near start; leading ellipsis near end; both when in middle |
