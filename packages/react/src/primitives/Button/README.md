# Button and IconButton

## Purpose

Use `Button` to trigger an action with a visible text label. Use `IconButton` for a compact, familiar icon-only action.

This implementation is based on the Merchants Library Button component in Figma, but intentionally exposes a smaller API than its variant matrix.

## When to use

- Use `primary` for the dominant action in a decision region.
- Use `secondary` for a supporting action.
- Use `tertiary` for the lowest-emphasis action.
- Use `IconButton` only when the icon is familiar and an accessible label can describe the action.

## When not to use

- Do not use Button for navigation; use a link.
- Do not use compact sizes as the primary touch action in a mobile flow.
- Do not use IconButton for ambiguous or destructive actions without additional context.
- Do not use Button as a skeleton placeholder.

## Anatomy

`Button` contains one required text label and may contain either a start icon or an end icon. It does not support both icon positions simultaneously.

`IconButton` contains one required icon and requires `aria-label`.

## Variants and sizes

Appearances: `primary`, `secondary`, `tertiary`.

Sizes: `xs`, `sm`, `md`, `lg`, `xl`.

`xs`, `sm`, and `md` are compact. Prefer `lg` or `xl` for touch-first primary actions.

## States

Hover, active, and focus-visible are controlled by CSS. Use the native `disabled` attribute and the `loading` prop for application-controlled states.

Loading preserves the button's dimensions and accessible name, sets `aria-busy`, and prevents repeated activation.

## Accessibility

- Buttons render as native `<button>` elements.
- The default `type` is `button` to prevent accidental form submission.
- `IconButton` requires an explicit accessible name.
- Decorative icons are hidden from assistive technology.
- Focus uses a visible semantic focus token.
- The Merchants primary color intentionally retains the approved Figma treatment. Its white-on-orange text contrast is a documented v1 exception in `DESIGN.md`.

## Composition

```tsx
<Button appearance="primary" size="lg">
  Save changes
</Button>

<Button startIcon={<AddIcon />}>Add item</Button>

<IconButton icon={<AddIcon />} aria-label="Add item" />
```

## Do

- Use a specific action label.
- Keep one primary action per decision region.
- Use `loading` for asynchronous actions.
- Import `@rappi-ds/react/styles.css` once in the consuming application.

## Don't

- Do not pass visual interaction states as props.
- Do not show both start and end icons.
- Do not remove the accessible name while loading.
- Do not use `xs`, `sm`, or `md` as an isolated primary touch target.
