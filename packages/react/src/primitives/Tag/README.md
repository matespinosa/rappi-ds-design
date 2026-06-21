# Tag

## Purpose

Compact label for status, category, or metadata. Non-interactive by default (`<span>`).

## When to use

- Use to annotate list items, table cells, or cards (e.g. "Activo", "Turbo", "AI").
- Use `intent` for semantic color (`success`, `warning`, `error`, `info`, `suggestion`, `ai`).
- Use `variant="outline"` or `ghost` for lower emphasis on dense UIs.

## When not to use

- Do not use as a button or link — use `Chip` or `Button` for actions.
- Do not use for numeric counts — use `BadgeNumber`.
- Do not use for live store status — use `BadgeLive`.

## Anatomy

- Optional `startIcon` / `endIcon` (decorative, `aria-hidden`).
- Text label in `label-md` / `label-xs` depending on size.

## Variants and sizes

**Intent:** `standard`, `success`, `warning`, `error`, `info`, `suggestion`, `ai`.

**Variant:** `pastel` (default), `solid`, `outline`, `ghost`.

**Size:** `sm` (16px height), `md` (24px height).

## States

Non-interactive. Color comes from intent + variant tokens only.

If dismissal is needed, compose with a separate icon button — do not make the whole tag clickable without an explicit interactive pattern.

## Accessibility

- Renders as `<span>` — not focusable.
- Icons are decorative unless you add an interactive child with its own name.
- Do not rely on color alone; label text must convey meaning.

## Composition

```tsx
<Tag intent="success" variant="pastel">Entregado</Tag>

<Tag intent="ai" variant="solid" size="sm" startIcon={<Sparkles size={12} />}>
  Sugerido por IA
</Tag>
```

## Do

- Keep copy short (one or two words).
- Pick intent that matches semantic meaning, not brand decoration.
- Use `sm` in tables and `md` in headers or cards.

## Don't

- Do not use tags as the only error message — pair with explanatory text.
- Do not stack many tags without wrapping — allow flex wrap at the layout level.
- Do not override colors with inline styles — use intent and variant.
