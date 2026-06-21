# TextArea

## Purpose

Multi-line text input with label, helper or error text, and optional clear control. Mirrors the `TextField` field pattern.

## When to use

- Use for comments, descriptions, addresses, or any input that may span multiple lines.
- Use `onClear` when the user should reset the field without selecting all text.
- Use `visuallyHiddenLabel` only when an external visible label already names the control.

## When not to use

- Do not use for single-line search — use `Search` or `TextField`.
- Do not use for rich text (bold, lists) — use a rich-text editor.
- Do not use without a label (visible or visually hidden).

## Anatomy

- Label (with optional required asterisk).
- `<textarea>` control in a bordered wrapper.
- Optional clear button (`×`) when `onClear` is provided and the field has value.
- Helper or error text below the control.
- `TextAreaSkeleton` for loading placeholders.

## Variants and sizes

One visual treatment aligned with text fields (rounded control, semantic border/ink tokens).

## States

- **Default, focus, invalid, disabled, readOnly** — driven by props and native textarea attributes.
- **With clear** — clear button visible when value is non-empty and field is editable.

## Accessibility

- Label associated via `htmlFor` / `id`.
- `aria-invalid` set when `error` is present.
- Helper and error ids merged into `aria-describedby`.
- Clear button must not remove the accessible name — label remains on the textarea.

## Composition

```tsx
<TextArea
  label="Notas del pedido"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  onClear={() => setNotes('')}
  helperText="Máximo 500 caracteres"
  rows={4}
/>
```

## Do

- Set `rows` or min-height via layout for predictable growth.
- Handle validation and character limits in the parent.
- Clear the value in `onClear` when using controlled mode.

## Don't

- Do not use placeholder as the only label.
- Do not disable paste for arbitrary policy without user-facing explanation.
- Do not nest interactive elements inside the textarea wrapper.
