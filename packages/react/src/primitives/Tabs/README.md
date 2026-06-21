# Tabs

## Purpose

Switch between related views within the same page context. Compound component: `Tabs`, `TabList`, `Tab`, `TabPanel`.

## When to use

- Use when content shares the same page shell but differs by section (e.g. Resumen / Pedidos / Configuración).
- Use controlled `value` + `onChange` so selection syncs with routing or data fetching.
- Add `aria-label` or `aria-labelledby` on `TabList` when no visible heading names the tab group.

## When not to use

- Do not use for sequential wizard steps — use a stepper.
- Do not use for two mutually exclusive filters with 2–4 pill options — prefer `SegmentedControl`.
- Do not use tabs to navigate between unrelated top-level products.

## Anatomy

- `Tabs` — context provider and layout wrapper.
- `TabList` — horizontal `role="tablist"` with arrow-key navigation.
- `Tab` — `role="tab"` button with optional start/end icons and bottom indicator when selected.
- `TabPanel` — `role="tabpanel"` content; hidden via `hidden` when inactive.

## Variants and sizes

One visual size. Selected tab: `label-md` weight 500, `--ink-strong`, 2px indicator. Unselected: weight 400, `--ink-weak`.

Optional `startIcon` / `endIcon` per tab. `disabled` on individual tabs.

## States

- **Selected / not selected** — `aria-selected`, `tabIndex` 0 on active tab only.
- **Hover / focus-visible** — CSS on unselected tabs.
- **Disabled** — `disabled` on tab button.

## Accessibility

- Implements the [tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): `tablist`, `tab`, `tabpanel` ids linked.
- Arrow Left/Right, Home, End move focus between enabled tabs.
- Inactive panels stay in the DOM (`hidden`) for crawlability.
- Decorative icons are `aria-hidden`.

## Composition

```tsx
const [tab, setTab] = useState('overview')

<Tabs value={tab} onChange={setTab}>
  <TabList aria-label="Secciones">
    <Tab value="overview">Resumen</Tab>
    <Tab value="orders">Pedidos</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="orders">…</TabPanel>
</Tabs>
```

## Do

- Keep tab labels short (one or two words).
- Mount one `TabPanel` per tab value.
- Lazy-load heavy panel content in the parent when switching tabs.

## Don't

- Do not use `Tab` outside `TabList`.
- Do not omit labelling on `TabList` when context is unclear.
- Do not use tabs for actions — tabs switch views, they do not submit forms.
