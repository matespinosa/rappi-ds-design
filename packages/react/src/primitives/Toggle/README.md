# Toggle

## Purpose

Use `Toggle` to let users switch a single setting immediately between two binary states (on / off). The change takes effect instantly — no submit step is needed.

## When to use

- Enabling or disabling a feature (notifications, dark mode, location sharing).
- Settings screens where each option is independent.

## When not to use

- Do not use Toggle for choices that require confirmation before taking effect; use a Checkbox inside a form instead.
- Do not use Toggle for mutually exclusive options within a group; use Radio.
- Do not use Toggle as a form field whose value is submitted later; use a native checkbox.

## Anatomy

```
┌────────────────────────────┐
│  [track]  [knob]           │
└────────────────────────────┘
```

- **Track** — the pill-shaped button, changes color based on state.
- **Knob** — the sliding circle, translates from start (off) to end (on).

## Variants and sizes

| `size` | Track width | Track height | Knob |
|--------|------------|--------------|------|
| `lg`   | 56 px      | 32 px        | 24 px |
| `md`   | 40 px      | 24 px        | 16 px |
| `sm`   | 28 px      | 16 px        | 12 px |

`lg` is the default. Use `sm` only in dense layouts where `lg` / `md` cannot fit; ensure adequate surrounding spacing to compensate for the smaller touch target.

## States

| State | Track color | Notes |
|-------|------------|-------|
| Off — default | `--surface-weak` | |
| Off — hover | `--surface-weak-hover` | |
| Off — pressed | `--surface-weak-pressed` | |
| Off — disabled | `--surface-mild` | |
| On — default | `--surface-inverse` | |
| On — hover | `--surface-inverse-hover` | |
| On — pressed | `--surface-inverse-pressed` | |
| On — disabled | `--surface-weak` | Matches Figma `background/weak` |
| Focus | `--border-focus` outline | Applied via `:focus-visible` |

## Behavior

### Pointer and touch

Clicking or tapping the track toggles the state. The knob slides with a CSS `transform` transition.

### Keyboard

| Key | Action |
|-----|--------|
| `Space` | Toggles the switch |
| `Enter` | Toggles the switch |
| `Tab` | Moves focus in/out |

### Focus

Focus ring applied with `outline` on `:focus-visible` — not shown for pointer interactions.

### Responsive

The component is `inline-flex` and does not stretch. Place it inside a `flex` or `grid` layout as needed.

## Accessibility

- Renders as `<button role="switch">` — native button keyboard behavior included.
- `aria-checked` reflects the `checked` prop.
- Requires an accessible name via `aria-label` or an associated `<label>`.
- The `sm` size meets the 24 px minimum touch target through a `::before` pseudo-element that expands the hit area by 4 px on each side vertically.

## Composition

### Allowed

```tsx
<label className="flex items-center gap-2">
  <Toggle checked={isOn} onClick={toggle} aria-label="Enable notifications" />
  <span>Enable notifications</span>
</label>
```

### Not allowed

- Do not nest Toggle inside another interactive element.
- Do not add icons or text inside the track.

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Controlled on/off state |
| `size` | `'lg' \| 'md' \| 'sm'` | `'lg'` | Visual size |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `className` | `string` | — | Extra classes merged with `rds-toggle` |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded to the button element |
| …rest | `ButtonHTMLAttributes` | — | Forwarded to the button (except `role`) |

## Tokens used

| Token | Usage |
|-------|-------|
| `--surface-weak` | Off track / on+disabled track |
| `--surface-weak-hover` | Off track on hover |
| `--surface-weak-pressed` | Off track on press |
| `--surface-mild` | Off+disabled track |
| `--surface-inverse` | On track |
| `--surface-inverse-hover` | On track on hover |
| `--surface-inverse-pressed` | On track on press |
| `--surface` | Knob background |
| `--border-focus` | Focus ring color |
| `--button-focus-width` | Focus ring width |
| `--button-motion-duration` | Transition duration |
| `--button-motion-easing` | Transition easing |
| `--radius-full` | Pill border radius |
| `--spacing-2` | Focus ring offset |

## Do

- Always provide an `aria-label` or a visible `<label>` element.
- Use `lg` or `md` as the default size; reserve `sm` for dense contexts.
- Control the state externally and handle the toggle in `onClick`.

## Don't

- Don't use Toggle for choices that are submitted later in a form — use a Checkbox.
- Don't expose hover, pressed, or focus as props.
- Don't hardcode colors or sizes outside the token system.

## Examples

```tsx
// Controlled toggle
const [isOn, setIsOn] = useState(false)

<label className="flex items-center gap-2">
  <Toggle checked={isOn} onClick={() => setIsOn(v => !v)} aria-label="Dark mode" />
  <span>Dark mode</span>
</label>

// Disabled
<Toggle checked aria-label="Feature locked" disabled />

// Small size
<Toggle size="sm" checked={isOn} onClick={toggle} aria-label="Compact option" />
```

## Tests

Covered in `Toggle.test.tsx`:

- Renders as `role="switch"` button.
- `aria-checked` reflects `checked` prop.
- `data-checked` present only when checked.
- `data-size` matches `size` prop; defaults to `lg`.
- `disabled` prevents click and sets `button.disabled`.
- `onClick` fires on click and Space key.
- `className` merges with `rds-toggle`.
- `ref` forwards to the `<button>` element.
- Arbitrary native attributes are forwarded.
