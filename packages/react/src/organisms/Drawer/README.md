# Drawer

## Purpose

Use `Drawer` for a focused task or supporting detail that must remain in context with the current page. It is a modal panel anchored to the right edge.

## When to use

- Editing or reviewing an entity without leaving the current page.
- Multi-field tasks that need more space than a dialog.
- Supporting details with a clear close action.

## When not to use

- Use `Dialog` for short confirmations.
- Use `BottomSheet` for touch-first tasks anchored to the bottom.
- Do not use it as permanent page navigation.

## Anatomy

Required title and close action, scrollable content, and an optional docked footer with primary and secondary actions.

## Variants and sizes

- `sm`: 380px.
- `md`: 480px.
- `lg`: 640px.

All sizes become full viewport width when the viewport is narrower than the selected width.

## States

Open and closed states use the drawer motion tokens. Button states are delegated to `Button`.

## Behavior

### Pointer and touch

The close button and optional scrim click close the drawer. Footer actions remain docked.

### Keyboard

Escape requests close. Tab and Shift+Tab remain inside the drawer.

### Focus

Focus moves to the first interactive element, stays trapped while open, and returns to the previously focused element after close.

### Responsive

The drawer uses `100dvh`; content scrolls independently. Width is capped by the selected Figma size.

## Content

Use a concise title and specific action labels. Content supports natural wrapping and vertical scrolling.

## Accessibility

The panel uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. The close action has a configurable accessible label.

## Composition

### Allowed

Forms, lists, detail views, and design-system controls.

### Not allowed

Nested modal drawers or permanent navigation.

## API

`open`, `title`, `size`, `onClose`, footer visibility, action labels and handlers, and `closeOnScrimClick`.

## Tokens

Uses semantic surface, ink, border, focus, spacing, elevation, typography, and drawer component tokens from `base.css`.

## Do

- Use one primary action.
- Keep critical actions in the docked footer.
- Provide localized labels.

## Don't

- Do not place essential actions only in scrolling content.
- Do not override widths with one-off values.
- Do not disable the close path without another clear exit.

## Examples

```tsx
<Drawer
  open={open}
  title="Order details"
  size="md"
  primaryLabel="Save changes"
  secondaryLabel="Cancel"
  onPrimary={save}
  onSecondary={close}
  onClose={close}
>
  <OrderForm />
</Drawer>
```

## Tests

Tests cover modal semantics, all sizes, actions, close paths, footer composition, custom labels, ref forwarding, and scroll locking.
