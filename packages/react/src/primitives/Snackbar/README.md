# Snackbar

## Purpose

Compact, elevated feedback surface for transient messages. Typically shown as a bottom toast after an action completes.

## When to use

- Use for short confirmation or progress feedback that auto-dismisses or offers one secondary action.
- Use `loading` for in-flight operations tied to the same message slot.
- Use `actionLabel` + `onAction` for a single text action (e.g. "Deshacer").

## When not to use

- Do not use for persistent page-level alerts — use `Notification` inline in the layout.
- Do not use for critical errors that must stay until acknowledged — use `Notification` with `intent="error"`.
- Do not stack many snackbars; queue or replace in the parent.

## Anatomy

- Left slot (priority: `loading` spinner > `avatar` > `icon`).
- Message text.
- Right slot (priority: `actionLabel` > `onNavigate` chevron > `onClose` ×).

## Variants and sizes

One visual treatment (dark `--surface-inverse` pill, `--ink-inverse` text).

Right affordance is mutually exclusive by prop priority — only one renders.

## States

- **Default** — `role="status"`, `aria-live="polite"` (overridable).
- **Loading** — spinner with `role="progressbar"`, `aria-label="Cargando"`.
- **With action / navigate / close** — trailing button per prop precedence.

## Accessibility

- Defaults to polite live region; override `role` / `aria-live` only with care.
- Icon and avatar slots are decorative (`aria-hidden`).
- Action and icon buttons have visible text or `aria-label` ("Ver más", "Cerrar").

## Composition

```tsx
<Snackbar message="Pedido enviado" onClose={dismiss} />

<Snackbar
  message="Guardando cambios…"
  loading
/>

<Snackbar
  message="Producto eliminado"
  actionLabel="Deshacer"
  onAction={undo}
/>
```

## Do

- Keep messages to one line when possible.
- Position and animate the snackbar in a portal or fixed container in the app shell.
- Pick one right affordance that matches the user task.

## Don't

- Do not pass both `actionLabel` and `onClose` expecting both to show — only `actionLabel` wins.
- Do not put essential instructions only in a snackbar.
- Do not use snackbars for form field validation — use inline field errors.
