# Search

## Purpose

Single-line search input with search icon, optional back control, clear affordance, and focus styling.

## When to use

- Use for filtering lists, finding stores, or querying catalog content.
- Use `showBackButton` + `onBack` on nested search screens (e.g. full-screen search overlay).
- Use controlled `value` + `onClear` when the parent owns query state.

## When not to use

- Do not use for generic single-line forms — use `TextField`.
- Do not use for multi-field filter panels — use dedicated filter components.
- Do not use without an accessible name (`aria-label` or visible context).

## Anatomy

- Pill-shaped wrapper with optional back pill, search icon, native `<input type="text">`, optional clear button.
- Sizes change height and typography tokens.

## Variants and sizes

Sizes: `lg` (default), `sm`.

Optional `showBackButton` replaces the leading search icon with a back chevron pill.

## States

- **Empty / filled** — clear button appears when there is text.
- **Focused** — border/focus treatment via `data-focused` on wrapper.
- **Disabled** — native `disabled` on input.

Clear via button click or Escape when the field has value (calls `onClear` in controlled mode).

## Accessibility

- Provide `aria-label` when no visible label exists (e.g. `"Buscar productos"`).
- Back and clear controls are native buttons with labels.
- Search icon is decorative when input has an accessible name.

## Composition

```tsx
<Search
  placeholder="Buscar tiendas"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
  aria-label="Buscar tiendas"
/>

<Search
  size="sm"
  showBackButton
  onBack={() => setScreen('list')}
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

## Do

- Debounce search requests in the parent, not inside the component.
- Reset `value` in `onClear` when controlled.
- Use `lg` for primary search bars and `sm` for compact toolbars.

## Don't

- Do not submit forms on every keystroke without debouncing.
- Do not hide the clear button while stale results remain visible without explanation.
- Do not use as a password or OTP field.
