# Notification

## Purpose

Inline banner or compact toast for semantic feedback (success, warning, error, info, AI). Supports dismiss and optional inline action.

## When to use

- Use **inline** in page layout for persistent context (e.g. account verification banner).
- Use **toast style** by wrapping in a fixed-position container with `size="sm"`.
- Use `intent="error"` for failures that need immediate attention (`role="alert"` by default).

## When not to use

- Do not use for brief post-action feedback that should auto-dismiss — prefer `Snackbar`.
- Do not use for tooltip-style hints on hover — use `Tooltip` (positioned by the parent).
- Do not use `default` intent when semantic color is required — pick a specific intent.

## Anatomy

- Left slot: `image` > custom `icon` > default intent icon.
- Message text.
- Optional inline `action` button with arrow.
- Optional dismiss button when `onClose` is provided.

## Variants and sizes

**Intent:** `default`, `success`, `warning`, `error`, `info`, `ai`.

**Variant:** `solid` (default), `pastel`. Ignored for `default` intent (neutral surface).

**Size:** `lg` (full-width banner, default), `sm` (compact toast).

## States

- **Solid / pastel** — background and ink from intent tokens.
- **Dismissible** — close button when `onClose` is set.
- **With action** — trailing text action separate from close.

## Accessibility

- Default `role`: `alert` for `error`, `status` for others. Pass `role="none"` to opt out of live regions.
- `aria-live="polite"` when role is `status`; `aria-atomic="true"`.
- Close button uses `closeLabel` (default "Cerrar").
- Decorative icons and images are `aria-hidden`.

## Composition

```tsx
<Notification intent="success" message="Cambios guardados" onClose={dismiss} />

<Notification
  intent="warning"
  variant="pastel"
  message="Tu sesión expira pronto"
  action="Renovar"
  onAction={renew}
/>

<div style={{ position: 'fixed', bottom: 16, insetInline: 16 }}>
  <Notification intent="error" size="sm" message="Sin conexión" onClose={dismiss} />
</div>
```

## Do

- Match intent to message severity.
- Use `pastel` on light backgrounds when solid feels too heavy.
- Provide `onClose` when the user should dismiss the message.

## Don't

- Do not rely on color alone — message text must explain the situation.
- Do not nest interactive forms inside the notification body.
- Do not confuse inline banners with global toast stacking — manage z-index and focus in the parent.
