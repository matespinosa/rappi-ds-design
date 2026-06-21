# BadgeNumber

## Purpose

Displays a compact numeric notification or an empty status dot.

## When to use

Use for unread counts, pending items, or a new-activity indicator attached to another control or label.

## When not to use

Do not use for semantic status labels such as success, warning, or error. Do not use it as an interactive control.

## Anatomy

A pill-shaped container with an optional text value.

## Variants and sizes

- Appearances: `accent`, `light`, `dark`.
- Sizes: `xs`, `sm`, `md`, `lg`, `xl`.
- `showValue={false}` creates the empty presentation without duplicating size variants.

## States

The component has numbered and empty presentations. It has no interaction states.

## Behavior

### Pointer and touch

Non-interactive. Place it inside or next to the control it describes.

### Keyboard

No keyboard behavior.

### Focus

Does not receive focus.

### Responsive

Uses a fixed minimum diameter per size and grows horizontally for multi-digit values.

## Content

Keep values short. Use compact forms such as `99+` when the exact number is not useful.

## Accessibility

If the information is not repeated in nearby visible text, provide an `aria-label` describing its meaning, for example `aria-label="7 unread orders"`. Avoid announcing both the badge and identical adjacent text.

## Composition

### Allowed

Compose with navigation items, icons, tabs, or labels.

### Not allowed

Do not place buttons, links, icons, or arbitrary children inside the badge.

## API

- `appearance?: 'accent' | 'light' | 'dark'`
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `value?: ReactNode`
- `showValue?: boolean`
- Native `<span>` attributes are supported.

## Tokens

Uses `--bg-accent`, `--surface-mild`, `--surface-inverse`, the corresponding semantic ink tokens, `--radius-full`, and the `--badge-number-*` size and typography tokens.

## Do

- Give standalone counts an accessible label.
- Use `showValue={false}` for a presence-only indicator.
- Keep values concise.

## Don't

- Do not make the badge clickable.
- Do not use it as a replacement for visible error or status text.
- Do not override its colors with product-specific values.

## Examples

```tsx
<BadgeNumber value={4} aria-label="4 unread orders" />
<BadgeNumber appearance="dark" size="lg" value="99+" aria-label="More than 99 alerts" />
<BadgeNumber showValue={false} aria-label="New activity" />
```

## Tests

Tests cover defaults, all appearances and sizes, zero and multi-digit values, empty presentation, native attributes, and ref forwarding.
