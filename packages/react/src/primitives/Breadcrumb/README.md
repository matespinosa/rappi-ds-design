# Breadcrumb

## Purpose

Navigation landmark that shows the user's location in a page hierarchy. The last item is always the current page.

## When to use

- Use on detail or settings screens with two or more hierarchy levels.
- Provide `href` on ancestors for real navigation; omit `href` on the last item.
- Use `onBack` on the chevron `IconButton` for mobile-style back navigation.

## When not to use

- Do not use as the primary app navigation — use a sidebar or top nav.
- Do not use with a single item unless it labels the root context (no back button appears).
- Do not use for step indicators in a wizard — use a stepper pattern.

## Anatomy

- Optional back `IconButton` (when `items.length >= 2`).
- Ordered list (`<ol>`) of steps: link, button, or current-page span.
- Chevron separators between ancestors (hidden from assistive technology).

## Variants and sizes

One visual treatment. Typography uses `label-md` / `caption` tokens.

## States

- **Ancestors** — underlined links/buttons (`--ink-disabled`, hover `--ink-standard`).
- **Current page** — non-interactive span with `aria-current="page"`, `--ink-strong`, no underline.
- **Back button** — secondary `IconButton` at `sm` size.

## Accessibility

- Root is `<nav aria-label="Breadcrumb">`.
- Current page uses `aria-current="page"` on a `<span>`, not a link.
- Separators are `aria-hidden`.
- Back button has `aria-label="Volver"`.

## Composition

```tsx
<Breadcrumb
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Tiendas', href: '/stores' },
    { label: 'Mi tienda' },
  ]}
  onBack={() => router.back()}
/>
```

## Do

- Keep labels concise; truncate long names at the layout level (`max-width` on wrapper).
- Wire `onBack` to the real navigation action.
- Put `href` on every ancestor that should be bookmarkable.

## Don't

- Do not make the current page a link or button.
- Do not rely on breadcrumb as the only way to navigate back on mobile — the back button helps but is not a substitute for clear IA.
- Do not pass `href` on the last item.
