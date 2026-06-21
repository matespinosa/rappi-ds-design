# Card

Generic surface container used to group related content and actions with configurable elevation.

---

## Purpose

Card provides a bounded, elevated surface for grouping content, metrics, actions, or other components. It does not impose a specific layout — children fill the card freely. Elevation communicates visual hierarchy relative to the background surface.

---

## When to use

- Wrapping a self-contained section of content that needs visual separation from the page background.
- Presenting a list of similar items where each item occupies its own bounded region.
- Elevating interactive regions such as filters, settings panels, or summary widgets.

## When NOT to use

- When the content already sits on a distinctly coloured surface — the card's border/shadow adds noise without benefit.
- For simple inline content groups — prefer spacing and dividers instead.
- For selectable option cards — use `CardAction` instead.

---

## Anatomy

```
┌─────────────────────────────────────┐
│                                     │  ← Root div (.rds-card)
│   [ children ]                      │
│                                     │
└─────────────────────────────────────┘
```

| Part | CSS class | Notes |
|---|---|---|
| Root | `.rds-card` | `<div>` forwarded ref; receives `data-elevation` |

---

## Variants

### `elevation`

Controls the drop-shadow level applied to the card surface.

| Value | Visual | Use case |
|---|---|---|
| `flat` (default) | Border only, no shadow | Cards resting on `--surface` |
| `raised` | Subtle shadow (`0 5px 10px rgba(…0.04)`) | Cards floating slightly above the background |
| `floating` | Stronger shadow (`0 6px 14px rgba(…0.08)`) | Cards that appear to hover above other content |

---

## States

Card itself is stateless — it does not have hover, active, or selected visual states. Interactive states belong to the content inside it.

---

## Behavior

### Pointer and touch

Card is a passive container. Pointer events pass through to child elements.

### Keyboard

No inherent keyboard behaviour. Keyboard-interactive children manage their own focus.

### Responsive

Card uses block layout by default. Width adapts to its container. Apply responsive layout to children via CSS grid or flex as needed.

---

## Content

- Padding is set via `--card-padding` (`24px` by default). Apply it to inner layout elements, not overriding the card root.
- Avoid placing more than one primary action directly inside a Card — prefer a `CardAction` list or a dedicated organism.

---

## Accessibility

Card is a `<div>` with no implicit ARIA role. If the card represents a landmark or interactive region, add `role` and `aria-label` props directly:

```tsx
<Card role="region" aria-label="Resumen de pedido" />
```

---

## Composition

### Allowed

```tsx
// Any content — metrics, text, lists, other primitives
<Card elevation="raised">
  <h2>Ventas del mes</h2>
  <p>$12,000</p>
</Card>

// Nested cards for sub-surfaces
<Card elevation="flat">
  <Card elevation="raised">…</Card>
</Card>
```

### Not allowed

```tsx
// Do not use Card as a selectable option
<Card onClick={…} /> // Use CardAction instead
```

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `elevation` | `'flat' \| 'raised' \| 'floating'` | `'flat'` | Drop-shadow level |
| `className` | `string` | — | Extra class merged onto root |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to root `<div>` |
| `...HTMLAttributes` | — | — | All other div props forwarded |

---

## Tokens

| Token | Default value | Description |
|---|---|---|
| `--card-radius` | `20px` | Border radius |
| `--card-border-width` | `1px` | Border width |
| `--card-padding` | `var(--spacing-24)` | Inner padding (apply to children) |
| `--card-shadow-raised` | `0 5px 10px rgba(33,34,36,0.04)` | Shadow for `raised` elevation |
| `--card-shadow-floating` | `0 6px 14px rgba(33,34,36,0.08)` | Shadow for `floating` elevation |

---

## Do

```tsx
// Use elevation to signal hierarchy
<Card elevation="raised">
  <MetricWidget />
</Card>

// Compose with other primitives freely
<Card>
  <Tabs>…</Tabs>
</Card>

// Forward ref for measurement / animation
const ref = useRef<HTMLDivElement>(null)
<Card ref={ref} elevation="floating" />
```

## Don't

```tsx
// Don't override card padding via inline style — use children layout
<Card style={{ padding: 0 }} /> // may break token-driven spacing

// Don't embed multiple primary actions at card root level
<Card>
  <Button>Guardar</Button>
  <Button>Eliminar</Button>  {/* Group inside an action bar child instead */}
</Card>

// Don't use Card for selectable options
<Card onClick={select} data-selected={selected} /> // Use CardAction
```

---

## Examples

```tsx
// Flat card (default)
<Card>
  <p>Contenido de la tarjeta</p>
</Card>

// Raised card with custom content
<Card elevation="raised" className="my-summary">
  <h3>Resumen</h3>
  <DataWidget />
</Card>

// Floating card — highest visual prominence
<Card elevation="floating">
  <QuickActions />
</Card>
```

---

## Tests

Test file: `Card.test.tsx`

| Area | Scenarios covered |
|---|---|
| Rendering | Mounts with `rds-card` class, default `data-elevation="flat"` |
| Elevation | `data-elevation` reflects the `elevation` prop for all three values |
| Ref | `ref.current` points to the root `<div>` |
| className | Extra class is merged onto the root |
| HTML props | Arbitrary HTML attributes (`data-testid`, `aria-label`) are forwarded |
| Children | Children render inside the root |
