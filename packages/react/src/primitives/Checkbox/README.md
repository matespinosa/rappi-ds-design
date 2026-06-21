# Checkbox

## Purpose

Native checkbox control with support for checked, unchecked, and indeterminate (mixed-selection) states. It is a primitive — compose it with a `<label>`, helper text, and error text at the callsite.

## When to use

Use for binary choices (on/off, agree/disagree) or multi-selection lists where items can be individually selected. Use the indeterminate state for a "select all" control when some but not all children are selected.

## When not to use

Do not use as a replacement for a radio group when options are mutually exclusive. Do not use when the action takes effect immediately — prefer a Toggle/Switch. Do not embed business logic or layout inside this primitive; use a field wrapper instead.

## Anatomy

A single `<input type="checkbox">` with `appearance: none`, styled with tokens for border, fill, and icon. The checkmark and dash are rendered via CSS `background-image` (URL-encoded SVG) to avoid extra DOM nodes.

## Variants and sizes

One visual treatment (Merchants default). No size variants — the control is 24 × 24 px. Add a size variant only when a validated product need arises.

## States

| State                     | Visual                                   |
|---------------------------|------------------------------------------|
| Unchecked                 | White fill, dark border                  |
| Unchecked hover           | Light surface tint, dark border          |
| Unchecked active          | Slightly darker tint, dark border        |
| Checked                   | Black fill, white checkmark              |
| Checked hover             | Dark-hover fill, white checkmark         |
| Checked active            | Dark-pressed fill, white checkmark       |
| Indeterminate             | Black fill, white dash                   |
| Indeterminate hover/press | Same as checked hover/press              |
| Disabled unchecked        | Disabled surface, muted border           |
| Disabled checked          | Disabled ink fill, white checkmark       |
| Disabled indeterminate    | Disabled ink fill, white dash            |

## Behavior

### Pointer and touch

Click or tap toggles the checked state. Active and hover states respond to pointer events.

### Keyboard

`Space` toggles; `Tab` moves focus. All interactions rely on native browser behavior.

### Focus

`focus-visible` outline using `--border-focus` with 2 px offset. The outline appears only for keyboard navigation.

### Responsive

Fixed 24 × 24 px; does not reflow. Pair with a label to expand the touch target.

## Content

No visible text inside the control. Use `aria-label` when there is no adjacent `<label>`, or link a `<label>` via `htmlFor`/`id`.

## Accessibility

- Native `<input type="checkbox">` semantics; no ARIA role override needed.
- `Space` key supported natively.
- `aria-label` or `<label>` required for an accessible name.
- `aria-describedby` can be added by the callsite to reference helper or error text.
- `indeterminate` state is communicated to assistive technologies via the native `.indeterminate` DOM property (browsers announce it as "mixed").
- Focus ring meets WCAG 2.2 AA 3:1 contrast ratio.

## Composition

### Allowed

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
  <Checkbox checked={checked} onChange={handleChange} />
  <span>I agree to the terms</span>
</label>
```

```tsx
{/* With error */}
<div>
  <label>
    <Checkbox aria-describedby="terms-error" checked={checked} onChange={handleChange} />
    <span>I agree</span>
  </label>
  {error && <span id="terms-error" role="alert">{error}</span>}
</div>
```

### Not allowed

Do not place interactive elements inside the checkbox. Do not add visible children — it has no children slot.

## API

- `indeterminate?: boolean` — Optional. Triggers the mixed-selection visual and sets the DOM `.indeterminate` property. Default `false`.
- All native `<input>` attributes are forwarded: `checked`, `defaultChecked`, `disabled`, `onChange`, `name`, `value`, `aria-*`, `data-*`, etc.
- `type` is locked to `"checkbox"` and cannot be overridden.
- `size` (the HTML attribute) is omitted to avoid conflicts; visual size is fixed.

## Tokens

| Purpose              | Token                        |
|----------------------|------------------------------|
| Unchecked fill       | `--surface`                  |
| Unchecked border     | `--border-strong`            |
| Unchecked hover      | `--surface-hover`            |
| Unchecked pressed    | `--surface-pressed`          |
| Checked/indet. fill  | `--ink-strong`               |
| Checked hover fill   | `--surface-inverse-hover`    |
| Checked pressed fill | `--surface-inverse-pressed`  |
| Disabled fill        | `--surface-disabled`         |
| Disabled border      | `--ink-disabled`             |
| Disabled fill (on)   | `--ink-disabled`             |
| Focus ring color     | `--border-focus`             |
| Focus ring width     | `--button-focus-width`       |
| Focus ring offset    | `--spacing-2`                |
| Border radius        | `--radius-sm`                |
| Motion duration      | `--button-motion-duration`   |
| Motion easing        | `--button-motion-easing`     |
| Control size         | `--checkbox-size`            |
| Border width         | `--checkbox-border-width`    |

## Do

- Always provide an accessible name via `<label>` or `aria-label`.
- Use `indeterminate` for "select all" controls when the selection is partial.
- Use `onChange` to keep state controlled; avoid mixing controlled and uncontrolled patterns.
- Pair with a `<label>` to expand the click/touch target beyond 24 × 24 px.

## Don't

- Do not use `disabled` to silently hide requirements — show helper text explaining what is needed.
- Do not override fill colors with custom values; use semantic tokens.
- Do not use for mutually exclusive options — use a radio group.
- Do not trigger immediate side-effects on check — use a Toggle/Switch for that pattern.

## Examples

```tsx
{/* Uncontrolled */}
<label style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
  <Checkbox name="newsletter" defaultChecked />
  <span>Subscribe to newsletter</span>
</label>

{/* Controlled */}
<label style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
  <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
  <span>I agree to the terms</span>
</label>

{/* Select all with indeterminate */}
<label style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
  <Checkbox
    checked={allSelected}
    indeterminate={someSelected && !allSelected}
    onChange={handleSelectAll}
    aria-label="Select all orders"
  />
  <span>Select all</span>
</label>

{/* Disabled */}
<label style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
  <Checkbox disabled defaultChecked />
  <span style={{ color: 'var(--ink-disabled)' }}>Already enrolled</span>
</label>
```

## Tests

Tests cover: native checkbox role, class application, `data-indeterminate` attribute lifecycle, DOM `.indeterminate` property sync, keyboard activation, disabled state prevention, controlled `checked` rendering, ref forwarding, and native attribute pass-through.
