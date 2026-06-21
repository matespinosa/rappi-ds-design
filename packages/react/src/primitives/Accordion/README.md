# Accordion

## Purpose

Expandable panel for progressive disclosure of related content. One header trigger toggles a single body region.

## When to use

- Use for FAQs, settings groups, or filter sections where only one block needs to be visible at a time per item.
- Use `subtitle` when the header needs supporting context without opening the panel.
- Use `slotRight` for a secondary affordance (badge, tag) that must not toggle the panel.

## When not to use

- Do not use for primary navigation — use tabs or links.
- Do not nest accordions deeply; flatten the information architecture instead.
- Do not put required form fields only inside a collapsed panel without a visible summary.

## Anatomy

- Container with a header `<button>` (title, optional subtitle, optional left icon, optional `slotRight`, chevron pill).
- Body region (`role="region"`) linked via `aria-controls` / `aria-labelledby`.

## Variants and sizes

One visual treatment (Merchants default). No size variants.

Supports uncontrolled (`defaultOpen`) or controlled (`open` + `onOpenChange`) open state.

## States

- **Closed / open** — chevron rotates; body expands via CSS.
- **Disabled** — trigger is non-interactive; `data-disabled` on root.
- **Hover / focus-visible / active** — CSS-driven on the trigger.

## Accessibility

- Header is a native `<button type="button">` with `aria-expanded`.
- Panel is a `role="region"` labelled by the trigger id.
- Decorative icon and chevron are `aria-hidden`.
- Call `event.stopPropagation()` on interactive elements inside `slotRight`.

## Composition

```tsx
<Accordion title="¿Cómo funciona la entrega?" defaultOpen={false}>
  El mensajero recoge el pedido cuando el comercio lo acepta.
</Accordion>

<Accordion
  title="Promoción activa"
  slotRight={<Tag intent="success">Activa</Tag>}
  open={isOpen}
  onOpenChange={setIsOpen}
>
  Detalle de la promoción…
</Accordion>
```

## Do

- Keep titles short and scannable.
- Use controlled mode when open state must sync with URL or parent layout.
- Stop propagation on `slotRight` interactions.

## Don't

- Do not use the whole header click area for unrelated actions without `stopPropagation`.
- Do not hide critical errors only inside a closed accordion.
- Do not pass visual state props for hover or focus — they are CSS-only.
