# Calendar

A date picker component supporting single date selection and date range selection with a double-panel layout.

---

## Purpose

Calendar provides a visual interface for selecting a date or a range of dates. It renders a month grid with navigation controls, week headers, and a confirmation footer. It ships in two variants: **single** (one month panel) and **double** (two panels side by side for range picking).

---

## When to use

- Letting the user pick a delivery date, check-in/check-out window, or reporting period.
- Replacing a plain `<input type="date">` when the visual context of surrounding dates matters.
- Date ranges where start and end need to be chosen in one coherent interaction.

## When NOT to use

- When a free-text date entry is sufficient — prefer `TextField` with a date mask.
- When only a year or month needs to be picked (no day grid required).
- In contexts where screen real estate is very tight — consider a bottom sheet or modal wrapper instead.

---

## Anatomy

```
┌─────────────────────────────────┐
│  < │     Marzo 2025        │ >  │  ← Nav row
│  L    M    M    J    V    S  D  │  ← Week header
│  ·    ·    ·    ·    1    2  3  │
│  4    5    6    7    8    9  10 │  ← Week rows (day grid)
│  …                              │
│         [ Seleccionar ]         │  ← Footer
└─────────────────────────────────┘
```

| Part | CSS class | Role |
|---|---|---|
| Root | `.rds-calendar` | `application` |
| Inner wrapper (single) | `.rds-calendar__inner` | — |
| Panels row (double) | `.rds-calendar__panels` | — |
| Month panel | `.rds-calendar__panel` | `grid` |
| Navigation row | `.rds-calendar__nav` | `row` |
| Nav button | `.rds-calendar__nav-btn` | `button` |
| Month title | `.rds-calendar__month-title` | — |
| Week header | `.rds-calendar__week-header` | `row` |
| Header cell | `.rds-calendar__week-header-cell` | `columnheader` |
| Week row | `.rds-calendar__week` | `row` |
| Day cell | `.rds-calendar__day` | `gridcell` |
| Day inner (circle) | `.rds-calendar__day-inner` | — |
| Vertical divider | `.rds-calendar__divider-v` | — |
| Horizontal divider | `.rds-calendar__divider-h` | — |
| Footer | `.rds-calendar__footer` | — |
| Range text | `.rds-calendar__range-text` | — |

---

## Variants

### `single` (default)

One month panel. Clicking a day selects it. A "Seleccionar" button in the footer fires `onConfirm`.

```tsx
<Calendar variant="single" onConfirm={(date) => console.log(date)} />
```

### `double`

Two panels side by side, always showing consecutive months. Used for range selection. The footer shows the selected range as text plus "Cancelar" / "Seleccionar" buttons.

```tsx
<Calendar
  variant="double"
  onApply={(range) => console.log(range.start, range.end)}
  onCancel={() => resetRange()}
/>
```

---

## States

| State | `data-state` value | Description |
|---|---|---|
| Default | `default` | Normal selectable day |
| Today | `today` | Today's date — outlined circle |
| Selected | `selected` | Single-mode selected date, or range start with no end yet |
| Range start | `range-start` | Start of a confirmed range — filled circle, right half of cell gets the range background |
| Range end | `range-end` | End of a confirmed range — filled circle, left half of cell gets the range background |
| In range | `in-range` | Day between start and end — full cell gets range background |
| Range preview | `range-preview` | Hover preview of a potential range end |
| Disabled | `disabled` | Before `minDate` or after `maxDate` — not interactive |
| Outside month | `outside-month` | Day belonging to previous or next month — invisible, not interactive |

---

## Behavior

### Keyboard

| Key | Action |
|---|---|
| `Tab` | Move focus between interactive cells |
| `Enter` or `Space` | Select the focused day |

Disabled and outside-month cells have `tabIndex=-1` and do not respond to keyboard events.

### Pointer

- Hover over any non-disabled day shows a hover ring (`surface-pressed` background).
- In double mode, hovering over a day after selecting a start shows a live range preview.

### Range selection logic

1. First click — sets the start date; end is `null`.
2. Second click:
   - If the clicked date is **after or equal to** start — sets the end date.
   - If the clicked date is **before** start — restarts selection with a new start.
3. Clicking again (start + end both set) — restarts selection from scratch.

---

## Content

### Month names (Spanish)

Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre

### Month abbreviations (used in range text)

Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic

### Day headers (Monday-first)

L, M, M, J, V, S, D

### Range text format

`Ene 5 – Mar 2` (abbreviated month + day number, en dash separator). Renders `—` when no date is selected.

---

## Accessibility

| Attribute | Element | Value |
|---|---|---|
| `role="application"` | Root `.rds-calendar` | Signals a widget with its own keyboard interaction model |
| `aria-label` | Root | `"Selector de fecha"` (single) / `"Selector de rango de fechas"` (double) |
| `role="grid"` | `.rds-calendar__panel` | Identifies the month grid |
| `aria-label` | Panel | `"Marzo 2025"` (month + year) |
| `role="row"` | Nav, week header, week rows | Grid structure |
| `role="columnheader"` | Week-header cells | Column labels |
| `aria-label` | Header cell | Full day name (e.g. "Lunes") |
| `role="gridcell"` | Day cells | Individual date cells |
| `aria-selected` | Day cells | `true` when selected/range-start/range-end |
| `aria-disabled` | Day cells | `true` when disabled |
| `tabIndex` | Day cells | `0` when interactive, `-1` when disabled/outside |
| `aria-live="polite"` | Month title, range text | Announces navigation and range changes |

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'single' \| 'double'` | `'single'` | Layout variant |
| `value` | `Date \| null` | — | Controlled selected date (single) |
| `defaultValue` | `Date \| null` | `null` | Uncontrolled initial date (single) |
| `onChange` | `(date: Date \| null) => void` | — | Called when a day is clicked (single) |
| `rangeValue` | `CalendarRange` | — | Controlled range value (double) |
| `defaultRangeValue` | `CalendarRange` | `{ start: null, end: null }` | Uncontrolled initial range (double) |
| `onRangeChange` | `(range: CalendarRange) => void` | — | Called when range changes (double) |
| `defaultMonth` | `Date` | Current month | Initial month to display |
| `minDate` | `Date` | — | Days before this are disabled |
| `maxDate` | `Date` | — | Days after this are disabled |
| `onConfirm` | `(date: Date \| null) => void` | — | Footer button callback (single) |
| `onApply` | `(range: CalendarRange) => void` | — | Apply button callback (double) |
| `onCancel` | `() => void` | — | Cancel button callback (double) |
| `confirmLabel` | `string` | `'Seleccionar'` | Single footer button label |
| `applyLabel` | `string` | `'Seleccionar'` | Double apply button label |
| `cancelLabel` | `string` | `'Cancelar'` | Double cancel button label |
| `className` | `string` | — | Extra class merged onto root |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to root `<div>` |
| `...HTMLAttributes` | — | — | All other div props forwarded |

### CalendarRange

```ts
interface CalendarRange {
  start: Date | null
  end: Date | null
}
```

---

## Tokens

All tokens live in `packages/tokens/src/themes/base.css` under the `/* ─── Calendar ─── */` section.

| Token | Default value | Description |
|---|---|---|
| `--calendar-radius` | `24px` | Border radius of the root card |
| `--calendar-border-width` | `1px` | Border width (and dividers) |
| `--calendar-padding` | `var(--spacing-16)` | Padding of panels and footer |
| `--calendar-panel-width` | `252px` | Width of one month panel |
| `--calendar-cell-size` | `36px` | Width and height of each day cell |
| `--calendar-cell-radius` | `var(--radius-full)` | Border radius of the day circle |
| `--calendar-header-height` | `28px` | Height of the week header row |
| `--calendar-nav-padding-block` | `var(--spacing-8)` | Vertical padding of the nav row |
| `--calendar-nav-padding-inline` | `var(--spacing-4)` | Horizontal padding of the nav row |
| `--calendar-month-gap` | `var(--spacing-4)` | Gap between nav / header / week rows |
| `--calendar-panel-gap` | `var(--spacing-16)` | Gap between panel and footer (single) |
| `--calendar-font-size-month` | `var(--font-size-label-lg)` | Month title font size |
| `--calendar-font-weight-month` | `var(--font-weight-label-lg)` | Month title font weight |
| `--calendar-line-height-month` | `var(--line-height-label-lg)` | Month title line height |
| `--calendar-font-size-header` | `var(--font-size-label-md)` | Week header font size |
| `--calendar-font-weight-header` | `var(--font-weight-label-md)` | Week header font weight |
| `--calendar-line-height-header` | `var(--line-height-label-md)` | Week header line height |
| `--calendar-font-size-day` | `var(--font-size-label-sm)` | Day number font size |
| `--calendar-font-weight-day` | `var(--font-weight-label-md)` | Day number font weight |
| `--calendar-line-height-day` | `var(--line-height-label-sm)` | Day number line height |
| `--calendar-nav-icon-size` | `24px` | Chevron icon size in nav buttons |
| `--calendar-footer-gap` | `var(--spacing-8)` | Gap between footer elements |

---

## Do / Don't

### Do

```tsx
// Provide defaultMonth to control which month opens first
<Calendar defaultMonth={new Date(2025, 0, 1)} />

// Use controlled value + onChange for forms
const [date, setDate] = useState<Date | null>(null)
<Calendar value={date} onChange={setDate} onConfirm={submitForm} />

// Use double for date ranges
<Calendar
  variant="double"
  rangeValue={range}
  onRangeChange={setRange}
  onApply={handleApply}
  onCancel={handleCancel}
/>
```

### Don't

```tsx
// Don't mix single props with double variant
<Calendar variant="double" value={date} onChange={setDate} />

// Don't set minDate after maxDate
<Calendar minDate={new Date(2025, 5, 1)} maxDate={new Date(2025, 4, 1)} />

// Don't use without a confirm/apply handler — the footer button will be a no-op
<Calendar /> // missing onConfirm
```
