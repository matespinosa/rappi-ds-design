# CardAction

Selectable card for option lists, settings panels, and onboarding flows.

---

## Purpose

CardAction is an interactive card that represents a single selectable option. It renders a title, an optional description, and two composition slots — one on the left (for selection affordances like `Checkbox` or `Radio`) and one on the right (for trailing icons or metadata). Selection is communicated via the `selected` prop and a visual border change.

---

## When to use

- Lists of mutually exclusive or multi-selectable options (e.g. city picker, plan selector, payment method).
- Settings items where the user toggles or selects a state.
- Onboarding flows that guide users to pick from a set of choices.

## When NOT to use

- When the card only displays information — use `Card` instead.
- When the action is navigation (links to another page) — use a standard list item or anchor.
- When the option has complex interactive sub-controls that need independent focus — extract them into a separate component.

---

## Anatomy

```
┌────────────────────────────────────────────────────┐
│  [leftSlot]  Title                    [rightSlot]  │
│              Description                           │
└────────────────────────────────────────────────────┘
```

| Part | CSS class | Notes |
|---|---|---|
| Root | `.rds-card-action` | `<div>` with optional `role="button"` |
| Left group | `.rds-card-action__left` | Slot + text stacked horizontally |
| Left slot | `.rds-card-action__slot--left` | Optional container for left element |
| Text group | `.rds-card-action__text` | Title + description column |
| Title | `.rds-card-action__title` | Required text |
| Description | `.rds-card-action__description` | Optional secondary text |
| Right slot | `.rds-card-action__slot--right` | Optional trailing container |

---

## States

| State | `data-*` | Visual |
|---|---|---|
| Default | — | `--surface` background, `--border-non-opaque` border |
| Hover (interactive) | CSS only | `--surface-mild` background |
| Selected | `data-selected` | `--border-strong` border |

---

## Behavior

### Pointer and touch

- Clicking anywhere on the card fires `onClick`.
- Slot children should not be independently interactive — use `readOnly` and `tabIndex={-1}` to prevent double interaction.

### Keyboard

| Key | Action |
|---|---|
| `Enter` | Fires `onClick` |
| `Space` | Fires `onClick` |
| `Tab` | Moves focus to the next interactive element |

The root receives `role="button"` and `tabIndex={0}` only when `onClick` is provided.

### Focus

Visible focus ring follows `--border-focus`. Focus is placed on the root element, not on the slot children.

### Responsive

Full width by default. Width adapts to the container; title and description wrap naturally for long content.

---

## Content

- **Title**: required. Keep concise (1–5 words). Avoid truncation.
- **Description**: optional. One short sentence. Hidden when `showDescription={false}` or when not provided.
- **leftSlot / rightSlot**: accept any `ReactNode`. Use design-system primitives (`Checkbox`, `Radio`, icons) as decorative mirrors of the card's selected state — pass `readOnly` and `tabIndex={-1}` to prevent them from capturing keyboard focus independently.

---

## Accessibility

| Attribute | Element | Condition |
|---|---|---|
| `role="button"` | Root | When `onClick` is provided |
| `tabIndex={0}` | Root | When `onClick` is provided |
| `aria-pressed` | Root | `true` when `selected`, only when interactive |

Slot controls (`Checkbox`, `Radio`) placed inside `leftSlot` must be marked `aria-hidden` or `readOnly` to avoid confusing screen readers — the card itself exposes the interaction.

---

## Composition

### Allowed

```tsx
// Checkbox in leftSlot (decorative)
<CardAction
  title="Bogotá"
  description="Capital de Colombia"
  selected={selected}
  onClick={() => setSelected(!selected)}
  leftSlot={<Checkbox checked={selected} readOnly tabIndex={-1} aria-hidden />}
/>

// Radio in leftSlot
<CardAction
  title="Tarjeta de crédito"
  selected={isCredit}
  onClick={() => setMethod('credit')}
  leftSlot={<Radio checked={isCredit} readOnly tabIndex={-1} aria-hidden />}
/>

// Trailing icon in rightSlot
<CardAction
  title="Perfil completado"
  rightSlot={<CheckCircle size={20} aria-hidden />}
/>

// Static card (no onClick — no role="button")
<CardAction title="Plan actual" description="Profesional" />
```

### Not allowed

```tsx
// Don't embed independently focusable controls without making them inert
<CardAction
  leftSlot={<Checkbox onChange={handleCheck} />}  // captures its own click → double firing
  onClick={handleCardClick}
/>

// Don't use for navigation
<CardAction title="Ir a reportes" onClick={() => router.push('/reports')} />
// Use a link or a nav list item instead
```

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | — | **Required.** Main label |
| `description` | `ReactNode` | — | Secondary text below title |
| `showDescription` | `boolean` | `true` | Toggle description visibility |
| `selected` | `boolean` | `false` | Selected state — strong border + `aria-pressed` |
| `leftSlot` | `ReactNode` | — | Element rendered on the left of the text. Pass `null` for nothing |
| `rightSlot` | `ReactNode` | — | Element rendered on the trailing side. Pass `null` for nothing |
| `onClick` | `() => void` | — | Click handler. When provided, adds `role="button"` and keyboard support |
| `className` | `string` | — | Extra class merged onto root |
| `style` | `CSSProperties` | — | Inline styles on root |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to root `<div>` |

---

## Tokens

CardAction reuses the semantic tokens from `base.css`. No dedicated token block — visual values come from:

| Token | Used for |
|---|---|
| `--surface` | Default background |
| `--surface-mild` | Hover background |
| `--border-non-opaque` | Default border |
| `--border-strong` | Selected border |
| `--ink-strong` | Title text |
| `--ink-standard` | Description text |

---

## Do

```tsx
// Sync slot state with the card's selected prop
<CardAction
  selected={checked}
  onClick={() => setChecked(!checked)}
  leftSlot={<Checkbox checked={checked} readOnly tabIndex={-1} aria-hidden />}
/>

// Hide description when context makes it redundant
<CardAction title="Efectivo" showDescription={false} selected={isCash} onClick={…} />
```

## Don't

```tsx
// Don't use selected without onClick — the visual state is misleading without interaction
<CardAction title="Opción" selected={true} />

// Don't put a real Button or interactive link inside a slot
<CardAction
  rightSlot={<Button onClick={deleteItem}>Eliminar</Button>}
  onClick={selectItem}
/>
```

---

## Examples

```tsx
// Multi-select option list
const [cities, setCities] = useState<string[]>([])

const toggle = (city: string) =>
  setCities((prev) =>
    prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
  )

{['Bogotá', 'Medellín', 'Cali'].map((city) => (
  <CardAction
    key={city}
    title={city}
    selected={cities.includes(city)}
    onClick={() => toggle(city)}
    leftSlot={
      <Checkbox checked={cities.includes(city)} readOnly tabIndex={-1} aria-hidden />
    }
  />
))}

// Single-select with Radio
const [plan, setPlan] = useState('basic')

{['basic', 'pro', 'enterprise'].map((p) => (
  <CardAction
    key={p}
    title={p}
    selected={plan === p}
    onClick={() => setPlan(p)}
    leftSlot={<Radio checked={plan === p} readOnly tabIndex={-1} aria-hidden />}
  />
))}
```

---

## Tests

Test file: `CardAction.test.tsx`

| Area | Scenarios covered |
|---|---|
| Rendering | Mounts, shows title and description, renders slots |
| Selected state | `data-selected` present, `aria-pressed` reflects `selected` prop |
| Interactivity | `onClick` fires on click, Enter, Space; absent when no `onClick` |
| Role | `role="button"` only when `onClick` provided |
| showDescription | Description hidden when `false` or when `description` is not provided |
| Slots | `leftSlot` / `rightSlot` render their content |
| Ref | `ref.current` points to root `<div>` |
