# Tooltip

## Purpose

Presentational tooltip bubble with optional icon, text, close control, and directional arrow. **Does not include trigger, positioning, or show/hide logic** — compose those in the parent (e.g. popover library or custom focus/hover wrapper).

## When to use

- Use to render the visible tooltip surface once the parent decides it should appear.
- Use `arrowPosition` when the bubble must point at a trigger (`top-*` = trigger above, `bottom-*` = trigger below).
- Use `onClose` for dismissible coaching tips that stay until closed.

## When not to use

- Do not use as the only place for critical information — content must be available elsewhere.
- Do not use on non-focusable elements without adding keyboard access in the parent.
- Do not expect hover behavior from this component alone — it is static markup.

## Anatomy

- Bubble container (`--surface-inverse`, `--ink-inverse`).
- Content row: optional left `icon`, text, optional close button.
- Optional CSS arrow via `data-arrow` from `arrowPosition`.

## Variants and sizes

One size. Arrow positions: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.

Omit `arrowPosition` for a bubble without a caret.

## States

- **With close** — × button when `onClose` is provided.
- **With icon** — 40×40px left slot, decorative.

Visibility and placement are parent concerns.

## Accessibility

- This component does not set `role="tooltip"` or manage `aria-describedby` — the parent must wire the trigger relationship per [tooltip pattern guidance](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).
- Ensure the trigger is focusable (`button`, `a`, or `tabIndex={0}` with keyboard support).
- Do not trap essential instructions in tooltips alone.
- Close button has `aria-label="Cerrar"`.

## Composition

```tsx
// Parent handles visibility and positions the bubble near the trigger.
{isOpen ? (
  <Tooltip arrowPosition="bottom-center" onClose={() => setIsOpen(false)}>
    Los pedidos turbo tienen prioridad en la cola.
  </Tooltip>
) : null}

<button
  type="button"
  aria-describedby={isOpen ? tooltipId : undefined}
  onFocus={() => setIsOpen(true)}
  onBlur={() => setIsOpen(false)}
>
  ¿Qué es turbo?
</button>
```

## Do

- Keep copy short (one or two lines).
- Dismiss on Escape or blur when implementing custom behavior.
- Position with CSS or a positioning library relative to the trigger.

## Don't

- Do not show tooltips on touch-only flows without an explicit tap-to-open pattern.
- Do not put required form labels in tooltips.
- Do not use for error messages — use inline field validation or `Notification`.
