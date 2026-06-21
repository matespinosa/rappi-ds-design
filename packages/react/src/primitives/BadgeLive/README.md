# BadgeLive

## Purpose

Compact 16×16 dot indicator that communicates the current operating status of a store or location (active, inactive, closed, or suspended).

## When to use

Use it next to a store name, card header, or navigation item to surface real-time status at a glance. Use `animated` when the store is actively open and you want to draw attention to the live state.

## When not to use

Do not use it for numeric counts — use `BadgeNumber` instead. Do not use it as an interactive element. Do not use it for non-store contexts where the four statuses would not be understood.

## Anatomy

A 16×16 pill with a semantic background and a centered dot pseudo-element. No visible text.

## Variants

| `status`    | Color family | Meaning                            |
|-------------|--------------|-------------------------------------|
| `active`    | Green        | Store is open and accepting orders  |
| `inactive`  | Gray         | Store is paused or not configured   |
| `closed`    | Orange       | Store has closed for the day        |
| `suspended` | Red          | Store is suspended by Rappi         |

## States

- **Static** (`animated` not set): 8 px centered dot, no motion.
- **Animated** (`animated`): 12 px dot that pulses between full size and one-third size to signal a live, real-time state. Animation pauses under `prefers-reduced-motion`.

## Behavior

### Pointer and touch
Non-interactive.

### Keyboard
Does not receive focus.

### Focus
No focus indicator.

### Responsive
Fixed 16×16 px; does not reflow.

## Content

No visible text. Always provide context through `aria-label` or adjacent visible text.

## Accessibility

`role="img"` is set on the element. If nearby text does not already describe the status, add `aria-label`, for example `aria-label="Tienda activa"`. Avoid duplicating the label when adjacent text already conveys the same information.

The pulse animation respects `prefers-reduced-motion`: when reduced motion is enabled, the dot reverts to the static 8 px size.

## Composition

### Allowed
Place it next to text labels, inside card headers, or inline with navigation items.

### Not allowed
Do not nest interactive elements inside it. Do not stack multiple BadgeLive badges without a separator or label.

## API

- `status: 'active' | 'inactive' | 'closed' | 'suspended'` — Required. Determines color.
- `animated?: boolean` — Optional (default `false`). Enables the pulse animation.
- Native `<span>` attributes are forwarded, including `aria-label`, `className`, and `style`.

## Tokens

- Colors: `--positive`, `--positive-container`, `--warning`, `--warning-container`, `--error`, `--error-container`, `--ink-weak`, `--surface-weak`
- Size: `--badge-live-size`, `--badge-live-dot-size`, `--badge-live-dot-size-animated`
- Motion: `--badge-live-animation-duration`, `--badge-live-animation-easing`

## Do

- Provide `aria-label` when no adjacent text describes the status.
- Use `animated` only for the `active` status in live/real-time views.
- Keep it small and non-intrusive — it is a supporting indicator, not a primary UI element.

## Don't

- Do not make it clickable.
- Do not use `animated` for all statuses — motion should reinforce meaning, not decorate.
- Do not override status colors with custom values.

## Examples

```tsx
// Static indicators
<BadgeLive status="active"    aria-label="Tienda activa" />
<BadgeLive status="inactive"  aria-label="Tienda inactiva" />
<BadgeLive status="closed"    aria-label="Tienda cerrada" />
<BadgeLive status="suspended" aria-label="Tienda suspendida" />

// Animated live indicator
<BadgeLive status="active" animated aria-label="Tienda activa en vivo" />

// Inline with a store name (label provides context)
<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <BadgeLive status="active" aria-hidden="true" />
  <span>Rappi Burgers</span>
</span>
```

## Tests

Tests cover `role="img"` presence, all four statuses via `data-status`, animated/non-animated `data-animated` attribute, ref forwarding, native attribute pass-through, and additional `className` support.
