# SegmentedControl

## Purpose

Single-select pill control for switching between a small set of views or filters (typically 2–4 options). Compound component: `SegmentedControl` + `SegmentedOption`.

## When to use

- Use for mutually exclusive filters on the same dataset (Hoy / Semana / Mes).
- Use when all options are visible at once and selection is immediate (no separate panel).
- Always pass a descriptive `aria-label` on the root.

## When not to use

- Do not use for unrelated page sections with distinct content panels — use `Tabs`.
- Do not use with more than ~4 options — consider a `Select` instead.
- Do not use for boolean on/off — use `Toggle`.

## Anatomy

- Root `role="radiogroup"` track containing `SegmentedOption` buttons (`role="radio"`).
- Selected option gets filled `--surface-strong` pill; unselected options are transparent on `--surface-weak` track.

## Variants and sizes

One visual treatment. Optional `startIcon` / `endIcon` per option. Per-option `disabled`.

## States

- **Selected / unselected** — `aria-checked`, roving `tabIndex` (0 on selected only).
- **Disabled** — option button non-interactive.
- **Hover / focus-visible** — CSS on options.

Arrow keys move focus and select; Home/End jump to first/last enabled option.

## Accessibility

- Implements [radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/): `radiogroup` + `radio` buttons.
- **`aria-label` is required** on `SegmentedControl`.
- Arrow Left/Right change selection and focus; decorative icons are `aria-hidden`.

## Composition

```tsx
const [view, setView] = useState('day')

<SegmentedControl value={view} onChange={setView} aria-label="Vista de pedidos">
  <SegmentedOption value="day">Hoy</SegmentedOption>
  <SegmentedOption value="week">Semana</SegmentedOption>
  <SegmentedOption value="month">Mes</SegmentedOption>
</SegmentedControl>
```

## Do

- Keep labels short and parallel in grammar.
- Sync `value` with data fetching or chart updates in the parent.
- Disable options that are not valid for the current context.

## Don't

- Do not nest `SegmentedOption` outside `SegmentedControl`.
- Do not omit `aria-label` — there is no visible group title prop.
- Do not use for navigation between routes — use tabs or nav links.
