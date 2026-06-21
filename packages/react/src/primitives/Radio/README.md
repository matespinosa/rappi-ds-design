# Radio

## Purpose

Allows one selection from a group of mutually exclusive choices using native radio semantics.

## When to use

Use when users must choose exactly one option from two or more visible alternatives, such as a delivery method or payment preference.

## When not to use

Do not use for independent choices; use Checkbox. Do not use for an immediate binary setting; use a Toggle/Switch. For a long or searchable list, use Select.

## Anatomy

- A native `<input type="radio">` occupying a 24 × 24 px interaction area.
- A decorative circular indicator matching the Figma component.
- An external visible `<label>`.
- A `RadioGroup` fieldset with a required legend.

## Variants and sizes

One fixed 24 × 24 px size and one visual treatment. Selection and disabled are native states, not public visual variants.

## States

| State               | Visual                              |
| ------------------- | ----------------------------------- |
| Unselected          | Dark circular outline               |
| Selected            | Dark outline with a dark center dot |
| Disabled unselected | Muted circular outline              |
| Disabled selected   | Muted outline and center dot        |
| Focus visible       | High-contrast focus outline         |

## Behavior

### Pointer and touch

Clicking the radio or its associated label selects it and clears the previous selection in the same named group.

### Keyboard

Tab enters the group. Arrow keys move selection between enabled options according to native browser behavior. Space selects the focused option.

### Focus

The decorative indicator receives a visible outline when its native input is keyboard-focused.

### Responsive

The control remains 24 × 24 px. Labels may wrap and should provide the larger touch target.

## Content

Use concise, parallel option labels. Add helper text outside the primitive when options need explanation.

## Accessibility

- Uses native radio inputs; do not override their role.
- Group related options with `RadioGroup`, which renders `<fieldset>` and `<legend>`.
- Every radio needs a visible `<label>` or `aria-label`.
- Use `aria-describedby` to associate helper or error text.
- Do not disable an option without explaining why.

## Composition

### Allowed

```tsx
<RadioGroup name="delivery" legend="Delivery method">
  <label>
    <Radio value="pickup" />
    Pickup
  </label>
  <label>
    <Radio value="delivery" />
    Delivery
  </label>
</RadioGroup>
```

### Not allowed

Do not use radios without a shared name, accessible group label, or individual option labels.

## API

### Radio

All native input attributes except `type` and `size`. `type` is always `"radio"`.

### RadioGroup

- `name: string` — Shared native name supplied to descendant Radio controls.
- `legend: ReactNode` — Accessible group label.
- `visuallyHiddenLegend?: boolean` — Hides the legend visually while keeping it available to assistive technology.
- All native fieldset attributes, including `disabled`, are forwarded.

## Tokens

- `--radio-size`
- `--radio-indicator-size`
- `--radio-dot-size`
- `--radio-border-width`
- `--ink-strong`
- `--ink-disabled`
- `--border-focus`
- `--button-focus-width`
- `--spacing-2`

## Do

- Use `RadioGroup` for every related option set.
- Provide visible labels that can be clicked.
- Set a default only when there is a safe, meaningful choice.

## Don't

- Do not use radio buttons for multiple selections.
- Do not deselect a chosen radio by clicking it again.
- Do not hide all option labels.
- Do not create checked or disabled visual props; use native attributes.

## Examples

```tsx
<RadioGroup name="payment" legend="Payment method">
  <label>
    <Radio value="cash" defaultChecked />
    Cash
  </label>
  <label>
    <Radio value="card" />
    Card
  </label>
</RadioGroup>
```

## Tests

Tests cover native semantics, controlled and uncontrolled selection, disabled behavior, native attributes, ref forwarding, accessible grouping, shared names, and mutual exclusivity.
