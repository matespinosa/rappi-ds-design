# Select

## Purpose

Custom single-select dropdown. Trigger stays focused while the listbox is open; options are navigated with the keyboard.

## When to use

- Use when the user must pick one option from a predefined list (country, category, status).
- Use built-in `label`, `helperText`, and `error` for standalone fields.
- Use `selectionIndicator` when the list should show check, radio, or checkbox affordances.

## When not to use

- Do not use for free-text entry — use `TextField` or `Search`.
- Do not use for multi-select — this component is single-value only.
- Do not use native `<select>` styling expectations; this is a custom combobox pattern.

## Anatomy

- Optional label, trigger button (selected label or placeholder, chevron), listbox popup, optional helper/error text.
- Options may include `startElement` and `endElement`.
- `SelectSkeleton` for loading states.

## Variants and sizes

Sizes: `md` (default), `sm`.

`selectionIndicator`: `check` (default), `radio`, `checkbox`.

Props: `invalid`, `disabled`, `readOnly`, `skeleton`.

## States

- **Closed / open** — `aria-expanded` on trigger; listbox mounted when open.
- **Invalid** — error message and error border token.
- **Disabled / readOnly** — no interaction; readOnly keeps visual selection.
- **Skeleton** — replaces entire control.

## Accessibility

- Trigger is `<button type="button">` with `aria-haspopup="listbox"`.
- Active option tracked via `aria-activedescendant` while focus remains on trigger.
- Arrow keys, Enter, Space, Escape supported when open.
- Associate helper/error via generated ids or `aria-describedby`.

## Composition

```tsx
<Select
  label="Ciudad"
  options={[
    { value: 'bog', label: 'Bogotá' },
    { value: 'med', label: 'Medellín' },
  ]}
  value={city}
  onChange={setCity}
  placeholder="Selecciona una opción"
  helperText="Ciudad de operación de la tienda"
/>
```

## Do

- Provide a visible `label` or `aria-label`.
- Mark individual options `disabled` when not selectable.
- Use `error` + `invalid` together for validation feedback.

## Don't

- Do not use for navigation menus — use links or a menu pattern.
- Do not omit placeholder when empty selection is valid.
- Do not embed business validation logic inside the component.
