# Chip

## Purpose

Interactive pill used for filters, toggleable tags, and tab-like navigation. Renders as a `<button>` with `aria-pressed` so assistive technologies announce its pressed state.

## When to use

- **Filter chip**: let users toggle a single filter on/off, or pick one from a set.
- **Tab chip**: switch between views or categories in a horizontal row.
- **Input chip**: show an applied value with an optional remove icon (pass an X icon as `endIcon`).

## When not to use

Do not use Chip for non-interactive labels — use a Tag or Badge instead. Do not use it for primary actions in a form — use Button. Do not use it when the options are mutually exclusive and require radio semantics.

## Anatomy

A pill-shaped `<button>` containing an optional leading icon, a text label, an optional trailing icon, and an optional badge count.

```
[startIcon?] [label] [endIcon?] [badge?]
```

## Variants

| `variant`  | Unselected       | Selected                                |
|------------|------------------|-----------------------------------------|
| `filled`   | white fill, light border | black fill, white label (filter chip) |
| `outline`  | white fill, light border | white fill, strong border (tab chip)  |

## Sizes

| Size | Height | Use case |
|------|--------|----------|
| `xs` | 24 px  | Dense filter rows, compact tables |
| `sm` | 28 px  | Secondary filter bars |
| `md` | 32 px  | Default; most product contexts |
| `lg` | 36 px  | Prominent filter panels |
| `xl` | 40 px  | Hero or mobile-first contexts |

## States

Default, hover, active/pressed, focus-visible, selected (filled or outline), disabled.

## Behavior

### Pointer and touch

Click or tap toggles `onClick`. Active and hover states respond immediately.

### Keyboard

`Space` and `Enter` activate the chip. `Tab` focuses.

### Focus

`focus-visible` outline using `--border-focus` with 2 px offset, keyboard navigation only.

### Responsive

Chips are `inline-flex` and wrap naturally inside a flex container. Use `flex-wrap: wrap` on the container.

## Content

Keep labels short (1–3 words). Avoid truncation; chips should show their full label. If a chip label can grow long, consider a dropdown instead.

## Accessibility

- Renders as `<button>` — no extra ARIA role needed for filter/toggle usage.
- `aria-pressed` reflects the `selected` prop on every render.
- Decorative icons have `aria-hidden="true"`.
- Badge counts also have `aria-hidden="true"`; use `aria-label` on the chip itself if the count is meaningful (e.g. `aria-label="Filtros activos: 3"`).
- For a **tab group**, override with `role="tab"` and `aria-selected` at the callsite and wrap in a `role="tablist"` container.

## Composition

### Allowed

```tsx
{/* Filter group — single active at a time */}
<div style={{ display: 'flex', gap: 8 }}>
  {filters.map(f => (
    <Chip key={f.id} selected={active === f.id} onClick={() => setActive(f.id)}>
      {f.label}
    </Chip>
  ))}
</div>

{/* Multi-select filters */}
<Chip
  selected={selected.has('burgers')}
  onClick={() => toggle('burgers')}
  startIcon={<Flame size={16} />}
>
  Hamburguesas
</Chip>

{/* Tab group (semantic override) */}
<div role="tablist" style={{ display: 'flex', gap: 8 }}>
  {tabs.map(tab => (
    <Chip
      key={tab.id}
      role="tab"
      aria-selected={active === tab.id}
      aria-controls={`panel-${tab.id}`}
      variant="outline"
      selected={active === tab.id}
      onClick={() => setActive(tab.id)}
    >
      {tab.label}
    </Chip>
  ))}
</div>
```

### Not allowed

Do not nest interactive elements inside a Chip. Do not use Chip to display non-interactive status — use BadgeLive or BadgeNumber instead.

## API

- `children: ReactNode` — Required. The chip label.
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` — Default `'md'`.
- `variant?: 'filled' | 'outline'` — Default `'filled'`. Controls how the selected state looks.
- `selected?: boolean` — Default `false`. Sets `aria-pressed` and the `data-selected` CSS hook.
- `startIcon?: ReactNode` — Optional leading icon. Hidden from assistive technologies.
- `endIcon?: ReactNode` — Optional trailing icon. Useful for remove (X) or direction (chevron) affordances.
- `badge?: number | string` — Renders a `BadgeNumber` at the trailing edge with accent appearance.
- `shadow?: boolean` — Default `false`. Adds a subtle box-shadow for floating chip patterns.
- `disabled?: boolean` — Native disabled. Prevents interaction and applies disabled visual treatment.
- All native `<button>` attributes are forwarded (`onClick`, `aria-*`, `data-*`, `name`, etc.).

## Tokens

| Purpose | Token |
|---------|-------|
| Default fill | `--surface` |
| Default border | `--border-standard` |
| Default hover | `--surface-hover` |
| Default pressed | `--surface-pressed` |
| Selected filled bg | `--ink-strong` |
| Selected filled hover | `--surface-inverse-hover` |
| Selected filled pressed | `--surface-inverse-pressed` |
| Selected outline border | `--border-strong` |
| Disabled bg | `--surface-disabled` |
| Disabled color | `--ink-disabled` |
| Focus ring | `--border-focus` / `--button-focus-width` |
| Shadow | `--chip-shadow` |
| Heights | `--chip-height-{xs..xl}` |
| Padding inline | `--chip-padding-inline-{xs..xl}` |
| Icon size | `--chip-icon-size-{xs..xl}` |
| Gap | `--chip-gap-{xs..xl}` |

## Do

- Keep a group of chips in one `display: flex; flex-wrap: wrap; gap` container.
- Use `variant="filled"` for filter chips and `variant="outline"` for tab-style chips.
- Pass `aria-label` when the chip has only an icon or when the badge count is semantically important.
- Use `shadow` for chips that float over content (e.g., overlaid filter bars).

## Don't

- Do not pass both `startIcon` and `endIcon` with the same action — icons should add meaning, not decorate.
- Do not use `selected` without an `onClick` handler — a chip that looks toggled but doesn't respond is confusing.
- Do not add too many chips in a row without wrapping — prefer a dropdown for 8+ options.
- Do not override fill/text colors directly — use tokens.

## Examples

```tsx
{/* Basic filter chip */}
<Chip selected={isActive} onClick={toggle} variant="filled">
  Hamburguesas
</Chip>

{/* Tab-style chip */}
<Chip selected={tab === 'orders'} onClick={() => setTab('orders')} variant="outline">
  Pedidos
</Chip>

{/* With icons */}
<Chip startIcon={<Star size={16} />} endIcon={<X size={16} />} selected>
  Favoritos
</Chip>

{/* With badge count */}
<Chip badge={3} selected aria-label="Filtros activos: 3">
  Filtros
</Chip>

{/* Disabled */}
<Chip disabled>Sin categorías</Chip>
```

## Tests

Tests cover: button role, default attributes, all sizes via `data-size`, both variants via `data-variant`, `aria-pressed` reflection, `data-selected` lifecycle, `data-shadow`, `startIcon`/`endIcon` with `aria-hidden`, badge rendering and absence, click/Space/Enter activation, disabled prevention, className merging, ref forwarding, and native attribute pass-through.
