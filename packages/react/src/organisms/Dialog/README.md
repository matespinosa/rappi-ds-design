# Dialog & BottomSheet

Present content requiring user attention or action without navigating away from the current page.

---

## When to use

- **Confirmations** — destructive or irreversible actions (delete, submit, reset)
- **Forms** — short input flows that do not warrant a full page
- **Detail views** — quick-look panels for an item without full navigation
- **Secondary flows** — supporting steps in a larger process

## When NOT to use

| Avoid | Use instead |
|---|---|
| Complex multi-step flows | Page navigation |
| Simple non-blocking notifications | Snackbar / Toast |
| Informational hints | Tooltip / Popover |

---

## Variants

| Variant | Use case |
|---|---|
| **Dialog** | Desktop-first; centered overlay, white card, rounded corners |
| **BottomSheet** | Mobile-first; anchored to the bottom of the viewport, slides up |

---

## Anatomy

### Dialog

```
┌──────────────────────────────────────┐
│  Title                           [X] │  ← header (title + close button)
│  Description paragraph               │  ← description (optional)
│  ─────────────────────────────────── │
│  [children / content slot]           │  ← content (optional)
│  ─────────────────────────────────── │
│              [Secondary]  [Primary]  │  ← footer (optional)
└──────────────────────────────────────┘
```

### BottomSheet

```
┌──────────────────────────────────────┐
│             ────                     │  ← grabber (optional, default true)
│  Title                           [X] │  ← header
│  ─────────────────────────────────── │
│  [children / content slot]           │  ← scrollable content
│  ─────────────────────────────────── │
│  [Secondary]              [Primary]  │  ← footer (optional, default true)
└──────────────────────────────────────┘
```

---

## BottomSheet Sizes

| Size | Height behavior |
|---|---|
| `hug` (default) | Content-driven; `max-height: 90dvh` |
| `half` | Fixed at `60dvh` |
| `full` | `calc(100dvh - 64px)` |

---

## States

| State | Description |
|---|---|
| `open=true` | Panel slides/fades in, overlay/scrim appears |
| `open=false` | Panel slides/fades out, unmounts after animation |

Animations respect `prefers-reduced-motion: reduce`.

---

## Behavior

- **Escape key** — closes the component by calling `onClose`
- **Overlay / scrim click** — calls `onClose`
- **Focus trap** — keyboard focus is locked inside the panel while open
- **Scroll lock** — `document.body` scroll is disabled while open
- **Focus restoration** — focus returns to the trigger element on close
- **Portal** — renders into `document.body` via `createPortal`

---

## Accessibility

| Attribute | Value |
|---|---|
| `role` | `"dialog"` |
| `aria-modal` | `"true"` |
| `aria-labelledby` | Points to the `<h2>` title element |
| `aria-describedby` | Points to the description paragraph (when provided) |
| Close button | `aria-label="Cerrar"` |

---

## Dialog API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls visibility |
| `title` | `string` | — | Title displayed in the header (required) |
| `description` | `string` | — | Optional description paragraph below the title |
| `children` | `ReactNode` | — | Optional content slot |
| `onClose` | `() => void` | — | Called when the X button, overlay, or Escape is triggered |
| `showFooter` | `boolean` | `true` | Show or hide the footer action buttons |
| `primaryLabel` | `string` | `'Primary'` | Label for the primary button |
| `secondaryLabel` | `string` | `'Secondary'` | Label for the secondary button |
| `onPrimary` | `() => void` | — | Called when the primary button is clicked |
| `onSecondary` | `() => void` | — | Called when the secondary button is clicked |
| `elevation` | `boolean` | `false` | Add `box-shadow` to the panel |
| `className` | `string` | — | Additional class names applied to the panel element |

---

## BottomSheet API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls visibility |
| `title` | `string` | — | Title displayed in the header (required) |
| `children` | `ReactNode` | — | Optional scrollable content slot |
| `size` | `'hug' \| 'half' \| 'full'` | `'hug'` | Height behavior of the panel |
| `grabber` | `boolean` | `true` | Show the drag handle at the top of the panel |
| `showFooter` | `boolean` | `true` | Show or hide the footer action buttons |
| `onClose` | `() => void` | — | Called when the X button, scrim, or Escape is triggered |
| `primaryLabel` | `string` | `'Confirmar'` | Label for the primary button |
| `secondaryLabel` | `string` | `'Cancelar'` | Label for the secondary button |
| `onPrimary` | `() => void` | — | Called when the primary button is clicked |
| `onSecondary` | `() => void` | — | Called when the secondary button is clicked |
| `className` | `string` | — | Additional class names applied to the panel element |

---

## Design Tokens

### Dialog tokens

| Token | Value |
|---|---|
| `--dialog-radius` | `20px` |
| `--dialog-border-width` | `1px` |
| `--dialog-padding` | `var(--spacing-24)` |
| `--dialog-gap` | `20px` |
| `--dialog-header-gap` | `var(--spacing-8)` |
| `--dialog-body-gap` | `10px` |
| `--dialog-footer-gap` | `var(--spacing-12)` |
| `--dialog-max-width` | `463px` |
| `--dialog-shadow` | `0 5px 10px rgba(33, 34, 36, 0.04)` |
| `--dialog-close-size` | `32px` |
| `--dialog-font-size-title` | `var(--font-size-h3)` |
| `--dialog-font-weight-title` | `var(--font-weight-label-lg)` |
| `--dialog-line-height-title` | `var(--line-height-h3)` |
| `--dialog-font-size-description` | `var(--font-size-body-md)` |
| `--dialog-font-weight-description` | `var(--font-weight-body-md)` |
| `--dialog-line-height-description` | `var(--line-height-body-md)` |
| `--dialog-motion-duration` | `200ms` |

### Bottom Sheet tokens

| Token | Value |
|---|---|
| `--sheet-radius` | `28px` |
| `--sheet-padding-x` | `var(--spacing-24)` |
| `--sheet-header-pt` | `var(--spacing-24)` |
| `--sheet-header-pb` | `var(--spacing-16)` |
| `--sheet-footer-pt` | `var(--spacing-16)` |
| `--sheet-footer-pb` | `var(--spacing-24)` |
| `--sheet-footer-gap` | `var(--spacing-8)` |
| `--sheet-grabber-height` | `4px` |
| `--sheet-grabber-width` | `36px` |
| `--sheet-grabber-radius` | `3px` |
| `--sheet-grabber-py` | `var(--spacing-8)` |
| `--sheet-shadow` | `0 -6px 14px rgba(0, 0, 0, 0.08)` |
| `--sheet-scrim-bg` | `rgba(0, 0, 0, 0.4)` |
| `--sheet-scrim-blur` | `20px` |
| `--sheet-font-size-title` | `var(--font-size-h3)` |
| `--sheet-font-weight-title` | `var(--font-weight-label-lg)` |
| `--sheet-line-height-title` | `var(--line-height-h3)` |
| `--sheet-motion-duration` | `300ms` |
| `--sheet-motion-easing` | `cubic-bezier(0.32, 0.72, 0, 1)` |
