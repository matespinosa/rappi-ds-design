# TextField

## Purpose

Collects a single line of typed user input with an accessible label, optional guidance, validation feedback, and composable adornments.

## When to use

Use for names, emails, phone numbers, search terms, short identifiers, quantities, and other single-line values.

## When not to use

Use Textarea for multi-line content, Select/Combobox for constrained option lists, and purpose-built controls for dates or file uploads.

## Anatomy

- Visible label associated with the input.
- Native `<input>`.
- Optional start and end adornments.
- Helper text or error text.
- Optional required indicator.

## Variants and sizes

- `sm`: 44px control height and 14px input text.
- `md`: 56px control height and 16px input text.

There is no public visual-state prop. Default, focused, filled, disabled, readonly, and invalid appearances derive from native state and component content.

## States

| State    | Cause                                  |
| -------- | -------------------------------------- |
| Default  | Empty, enabled input                   |
| Focus    | Native input focus                     |
| Filled   | Input contains a value                 |
| Disabled | Native `disabled` attribute            |
| Readonly | Native `readOnly` attribute            |
| Invalid  | `error` content or `aria-invalid`      |
| Skeleton | Separate `TextFieldSkeleton` component |

## Behavior

### Pointer and touch

Clicking the label or control focuses the native input. Interactive adornments must provide their own accessible name and keyboard behavior.

### Keyboard

Uses native input behavior. Tab focuses the input; text editing and submission behavior follow the selected native `type`.

### Focus

The border becomes strong when the input or an interactive adornment receives focus. Invalid styling remains visible.

### Responsive

The component fills its available width and has no fixed 375px width. Labels and messages wrap to support localization and zoom.

## Content

Labels must describe the expected value. Placeholder text is optional guidance and never replaces the label. Error messages explain what failed and how to fix it.

## Accessibility

- A visible label is required and associated through `htmlFor`/`id`.
- Helper or error text is connected through `aria-describedby`.
- Errors set `aria-invalid="true"`.
- `required`, `disabled`, `readOnly`, `type`, and autocomplete attributes remain native.
- The required asterisk is decorative because native required semantics are already exposed.
- Skeletons render no input role or focusable element.

## Composition

### Allowed

Use `startAdornment` for passive prefixes or icons. Use `endAdornment` for passive suffixes or accessible buttons such as password visibility or clear-value actions.

### Not allowed

Do not put validation logic, asynchronous requests, or business formatting rules inside the component. Do not use adornments as unlabeled buttons.

## API

- `label: ReactNode`
- `fieldSize?: 'sm' | 'md'`
- `helperText?: ReactNode`
- `error?: ReactNode`
- `startAdornment?: ReactNode`
- `endAdornment?: ReactNode`
- `containerClassName?: string`
- `visuallyHiddenLabel?: boolean`
- All native input attributes except `children` and the conflicting HTML `size` attribute.

`TextFieldSkeleton` supports `size`, `showLabel`, `showHelperText`, and `className`.

## Tokens

Uses `--text-field-*` component tokens plus semantic surface, ink, border, spacing, radius, typography, and skeleton tokens.

## Do

- Keep a visible label even when a placeholder exists.
- Use the correct input `type` and autocomplete token.
- Explain recovery in the error message.
- Use controlled or uncontrolled input patterns consistently.

## Don't

- Do not expose `focus`, `filled`, or `disabled` as visual variants.
- Do not color the user's value red; use the border and error message.
- Do not use placeholder text as the accessible name.
- Do not render a disabled input as a skeleton.

## Examples

```tsx
<TextField
  label="Store name"
  name="storeName"
  autoComplete="organization"
  helperText="This name is visible to customers"
/>

<TextField
  label="Email"
  type="email"
  required
  error="Enter a valid email address"
  aria-invalid
/>
```

## Tests

Tests cover labels, sizes, typing, controlled values, helper and error relationships, native states, adornments, refs, attributes, and non-interactive skeleton behavior.
