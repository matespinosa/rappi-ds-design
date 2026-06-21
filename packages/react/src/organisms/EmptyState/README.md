# EmptyState

Full-surface empty or error state with an icon illustration, heading, description, and an optional call-to-action.

---

## Purpose

EmptyState communicates to users that a section or page has no content to show, or that an error has occurred. It provides a consistent recovery pattern — an icon, explanatory copy, and a retry or navigation action — across cards, sections, and full-page views.

---

## When to use

- A list, table, or data section returns zero results.
- A network error prevents content from loading.
- A feature or section is empty on first use (onboarding state).
- A full-page crash or error boundary fallback.

## When NOT to use

- Inline validation errors — use `TextField` error states or a `Notification` instead.
- Temporary loading states — use a skeleton loader instead.
- When partial content exists and only some items are missing — show the content you have.

---

## Anatomy

### `md` (compact, default)

```
        ┌─────────────────┐
        │   ○ [icon] ○   │   ← circle illustration
        └─────────────────┘
           Title
           Description
        [ Reintentar ]         ← action button
```

### `lg` (full-page)

```
        Title
        Description            ← text block ABOVE the circle

        ┌─────────────────┐
        │   ○ [icon] ○   │   ← larger circle (144px)
        └─────────────────┘
        [ Reintentar ]
```

| Part | CSS class | Notes |
|---|---|---|
| Root | `.rds-empty-state` | Receives `data-size`, `data-skeleton` |
| Text block | `.rds-empty-state__text` | Title + description group |
| Title | `.rds-empty-state__title` | Heading text |
| Title (lg) | `.rds-empty-state__title--lg` | Larger heading modifier |
| Description | `.rds-empty-state__description` | Supporting copy |
| Description (lg) | `.rds-empty-state__description--lg` | Larger description modifier |
| Circle | `.rds-empty-state__circle` | Illustration container; `aria-hidden` |
| Action | `.rds-empty-state__action` | Wrapper for the CTA |
| Skeleton title | `.rds-empty-state__skeleton-title` | Loading placeholder |
| Skeleton description | `.rds-empty-state__skeleton-desc` | Loading placeholder |
| Skeleton action | `.rds-empty-state__action-skeleton` | Loading placeholder for button |

---

## Variants

### `size`

| Value | Icon size | Circle size | Typography | Use case |
|---|---|---|---|---|
| `md` (default) | 24 px | 48 px | body-lg title, caption description | Cards, sections, list states |
| `lg` | 56 px | 144 px | h2 title, body description | Full-page errors |

In `lg`, the text block renders **above** the circle illustration. In `md`, it renders below.

### `skeleton`

Pass `skeleton={true}` to replace all content with loading placeholders. Useful while determining whether content exists (avoids flash of empty state on initial load).

---

## States

| State | `data-skeleton` | Description |
|---|---|---|
| Content | — | Real icon, title, description, action rendered |
| Skeleton | `data-skeleton` | All content replaced with grey placeholders |

---

## Behavior

### Pointer and touch

The default action button (`Reintentar`) fires `onAction`. Pass a custom `action` node if the CTA needs different behaviour (navigation, modal, etc.).

### Keyboard

Focus is managed by the child `Button` or the custom `action` element. EmptyState itself does not manage focus.

### Responsive

`md` is centered by default. `lg` fills the available height and centers vertically — apply this to page-level containers. Width adapts to the parent.

---

## Content

- **title**: defaults to `"Algo ocurrió"`. Use short, plain language — describe what's missing, not what went wrong technically.
- **description**: defaults to `"Se produjo un error, vuelve a intentarlo."`. One sentence. Explain what to do next.
- **actionLabel**: defaults to `"Reintentar"`. Use an action verb — "Reintentar", "Actualizar", "Volver al inicio".
- Avoid generic error messages. Where possible, name the specific content type that is missing.

---

## Accessibility

The circle illustration is `aria-hidden="true"` — it is decorative. Title and description are plain text elements readable by screen readers. The default action button inherits standard button semantics.

When using `skeleton={true}`, the placeholder elements are also `aria-hidden="true"` to prevent screen readers from announcing meaningless content.

---

## Composition

### Allowed

```tsx
// Default section-level empty state
<EmptyState title="No hay pedidos" onAction={refetch} />

// Full-page error
<EmptyState size="lg" title="Algo ocurrió" onAction={retry} />

// Custom icon
<EmptyState icon={<ShoppingCart size={24} strokeWidth={1.5} />} title="Tu carrito está vacío" />

// Custom action element
<EmptyState
  title="Sin conexión"
  showAction={false}
  action={<Button appearance="primary" onClick={goHome}>Ir al inicio</Button>}
/>

// No action
<EmptyState title="Sin resultados" showAction={false} />

// Skeleton during load
<EmptyState skeleton />
```

### Not allowed

```tsx
// Don't nest EmptyState inside itself
<EmptyState action={<EmptyState />} />

// Don't use EmptyState for inline validation
<EmptyState title="El campo es requerido" /> // Use TextField error prop
```

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | `'Algo ocurrió'` | Main heading text |
| `description` | `ReactNode` | `'Se produjo un error, vuelve a intentarlo.'` | Supporting description |
| `size` | `'md' \| 'lg'` | `'md'` | Layout and typography scale |
| `skeleton` | `boolean` | `false` | Renders loading placeholders instead of content |
| `icon` | `ReactNode` | `<Unplug />` | Icon inside the circle. Pass `null` for no icon |
| `showAction` | `boolean` | `true` | Whether to render the action area |
| `action` | `ReactNode` | — | Custom action element. Overrides the default button |
| `actionLabel` | `string` | `'Reintentar'` | Label for the default action button |
| `onAction` | `() => void` | — | Click handler for the default action button |
| `className` | `string` | — | Extra class merged onto root |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to root `<div>` |

---

## Tokens

EmptyState reuses existing semantic and component tokens. Key values from `base.css`:

| Token | Used for |
|---|---|
| `--ink-strong` | Title text |
| `--ink-standard` | Description text |
| `--surface-mild` | Circle background |
| `--skeleton-standard` | Skeleton placeholder background |
| `--skeleton-weak` | Skeleton placeholder shimmer |

---

## Do

```tsx
// Use size="lg" only for full-page / route-level errors
<EmptyState size="lg" title="Algo ocurrió" onAction={reload} />

// Name the missing content type in the title
<EmptyState title="No tienes reportes todavía" description="Crea tu primer reporte para verlo aquí." />

// Use skeleton during the initial data fetch
{isLoading ? <EmptyState skeleton /> : <DataList items={items} />}

// Provide a relevant onAction
<EmptyState title="Sin conexión" actionLabel="Reintentar" onAction={refetch} />
```

## Don't

```tsx
// Don't use technical language in title/description
<EmptyState title="Error 500: Internal Server Error" />

// Don't render EmptyState with showAction={true} and no onAction or action
<EmptyState showAction title="Sin datos" /> // Button is a no-op

// Don't use md for full-page views — the icon is too small
<EmptyState size="md" /> // when it's a route-level error
```

---

## Examples

```tsx
// Section error with retry
<Card>
  <EmptyState
    title="No pudimos cargar los pedidos"
    description="Verifica tu conexión e intenta de nuevo."
    onAction={fetchOrders}
    actionLabel="Reintentar"
  />
</Card>

// Full-page crash
<EmptyState
  size="lg"
  title="Algo ocurrió"
  description="Se produjo un error inesperado. Regresa al inicio o intenta de nuevo."
  action={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button appearance="secondary" onClick={retry}>Reintentar</Button>
      <Button appearance="primary" onClick={() => navigate('/')}>Ir al inicio</Button>
    </div>
  }
/>

// Custom icon for zero state
<EmptyState
  icon={<ShoppingCart size={24} strokeWidth={1.5} />}
  title="Tu carrito está vacío"
  description="Agrega productos para continuar."
  actionLabel="Explorar tiendas"
  onAction={() => navigate('/stores')}
/>
```

---

## Tests

Test file: `EmptyState.test.tsx`

| Area | Scenarios covered |
|---|---|
| Rendering | Default title, description, icon, action button |
| Size | `data-size` reflects prop; `lg` renders text above circle |
| Skeleton | `data-skeleton`, placeholders rendered; real content hidden |
| Custom icon | `icon` prop replaces the default `Unplug` |
| showAction | Action area hidden when `false` |
| Custom action | `action` prop replaces the default button |
| actionLabel | Default button shows the custom label |
| onAction | Default button fires `onAction` on click |
| Ref | Forwarded to root `<div>` |
| className | Extra class merged onto root |
