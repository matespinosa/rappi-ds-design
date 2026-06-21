# Uploader

File upload zone with two sizes and five controlled states covering the full upload lifecycle.

---

## Purpose

Uploader renders a visual affordance for selecting and uploading a file. It covers the complete lifecycle: idle prompt, drag-over feedback, upload progress, success confirmation, and error recovery. The component is fully controlled — the consumer drives state transitions via the `state` prop and handles actual file selection and upload logic externally.

---

## When to use

- Image or file upload fields in forms (profile photos, product images, documents).
- Drag-and-drop upload zones inside cards or panels.
- Upload flows where progress feedback is needed.

## When NOT to use

- When multiple simultaneous file uploads need individual progress tracking — build a list of Uploader instances.
- When the upload is triggered by a button press rather than a dedicated drop zone — use a `Button` with `<input type="file">` hidden behind it.
- When file type preview (PDF, video) is required beyond a thumbnail — build a custom preview component.

---

## Anatomy

### `sm` (compact)

```
┌────────────────────────────────────────────┐
│  [icon]   Title           [action icon]   │
│           Subtitle                        │
└────────────────────────────────────────────┘
```

### `lg` (large)

```
┌────────────────────────────────────────────┐
│                  [icon]                    │
│                  Title                     │
│                  Subtitle                  │
│  ┌──────────────────────────────────────┐  │  ← progress bar (loading only)
│  └──────────────────────────────────────┘  │
│         [ Selecciona un archivo ]          │  ← action button
└────────────────────────────────────────────┘
```

| Part | CSS class | Notes |
|---|---|---|
| Root | `.rds-uploader` | Receives `data-size`, `data-state` |
| Icon | `.rds-uploader__icon` | Decorative; `aria-hidden` |
| File row (lg uploaded) | `.rds-uploader__file-row` | Icon + optional thumbnail |
| Thumbnail | `.rds-uploader__thumbnail` | `<img>` with empty `alt` |
| Text group | `.rds-uploader__text` | Title + subtitle column |
| Title | `.rds-uploader__title` | `<p>` |
| Subtitle | `.rds-uploader__subtitle` | `<p>` |
| Progress bar | `.rds-uploader__progress` | `role="progressbar"`; lg + loading only |
| Progress fill | `.rds-uploader__progress-fill` | Width driven by `progress` prop |
| Action button | `.rds-uploader__button` | Tertiary `Button`; lg only |
| Action icon button | `.rds-uploader__action` | Icon `<button>`; sm only |
| Spin icon | `.rds-uploader__spin` | Animated `RotateCw`; sm loading |

---

## Variants

### `size`

| Value | Layout | Use case |
|---|---|---|
| `sm` (default) | Horizontal row, icon left + trailing icon right | Compact forms, inline upload fields |
| `lg` | Vertical stack, icon top | Dedicated upload zones, onboarding |

### `state`

| Value | `data-state` | `sm` trailing | `lg` action | Title source |
|---|---|---|---|---|
| `no-upload` | `no-upload` | `Upload` icon button | Tertiary button | `uploadTitle` |
| `drop` | `drop` | — | — | `dropTitle` |
| `loading` | `loading` | Spinning `RotateCw` | Progress bar | `"Subiendo {fileName}…"` |
| `uploaded` | `uploaded` | — | Tertiary "re-select" button | `"{fileName} Cargada"` |
| `error` | `error` | Retry `RotateCw` button | Tertiary button | `uploadTitle` |

---

## Behavior

### Pointer and touch

- In `no-upload` state, clicking the root (`sm` and `lg`) calls `onSelect`.
- In `lg`, the action `Button` also calls `onSelect` (with `stopPropagation` to avoid double firing).
- In `sm no-upload`, the trailing icon button calls `onSelect`.
- In `sm error`, the trailing retry icon button calls `onSelect`.
- States `drop`, `loading`, and `uploaded` (sm) do not trigger `onSelect` on the root.

Drag-and-drop: Uploader does not implement drag events internally. The consumer should listen for `dragover`, `dragleave`, and `drop` on the root and update `state` to `'drop'` or `'no-upload'` accordingly.

### Keyboard

- In `sm`: the trailing icon button receives focus and is activated with `Enter`/`Space`.
- In `lg`: the action `Button` receives focus and is activated with `Enter`/`Space`.
- In loading state (`sm`), the trailing element is a `<span>` (not a button) — it is not focusable.

### Responsive

`sm` fills the container width horizontally. `lg` is a centered vertical stack — constrain its width via the parent container.

---

## Content

All text labels have i18n override props:

| Prop | Default | State |
|---|---|---|
| `uploadTitle` | `"Upload your image"` | `no-upload`, `error` title |
| `uploadSubtitle` | `"JPG, PNG, WEBP • Max 5 MB"` | `no-upload`, `loading`, `uploaded` subtitle |
| `dropTitle` | `"Suéltalo aquí"` | `drop` title |
| `selectLabel` | `"Selecciona un archivo"` | `lg` button in `no-upload`/`error` |
| `reSelectLabel` | `"Seleccionar otro archivo"` | `lg` button in `uploaded` |

Dynamic text (not overridable via prop):
- `loading` title: `"Subiendo {fileName}…"` or `"Subiendo…"` when `fileName` is not set.
- `uploaded` title: `"{fileName} Cargada"` or `"Archivo cargado"` when `fileName` is not set.
- `error` subtitle: `errorMessage` prop, or falls back to `uploadSubtitle`.

---

## Accessibility

| Attribute | Element | Notes |
|---|---|---|
| `role="progressbar"` | Progress bar | lg + loading state |
| `aria-valuenow` | Progress bar | Current `progress` value (0–100, clamped) |
| `aria-valuemin` / `aria-valuemax` | Progress bar | `0` / `100` |
| `aria-label="Seleccionar archivo"` | sm upload icon button | Icon-only button label |
| `aria-label="Reintentar"` | sm retry icon button | Icon-only button label |
| `aria-hidden="true"` | Icon, thumbnail `alt=""` | Decorative content excluded from tree |

---

## Composition

### Allowed

```tsx
// Manage state in parent; call onSelect to open file picker
const [state, setState] = useState<UploaderState>('no-upload')
const [progress, setProgress] = useState(0)
const inputRef = useRef<HTMLInputElement>(null)

const handleSelect = () => inputRef.current?.click()

const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
  setState('loading')
  await uploadFile(file, (p) => setProgress(p))
  setState('uploaded')
}

<>
  <input ref={inputRef} type="file" hidden accept="image/*" onChange={handleFile} />
  <Uploader
    size="lg"
    state={state}
    progress={progress}
    fileName="perfil.jpg"
    onSelect={handleSelect}
  />
</>
```

### Not allowed

```tsx
// Don't put interactive elements inside Uploader
<Uploader>
  <Button>Adjuntar</Button>
</Uploader>

// Don't render Uploader without an onSelect handler in interactive states
<Uploader state="no-upload" /> // clicking root/button is a no-op
```

---

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'lg'` | `'sm'` | Layout variant |
| `state` | `'no-upload' \| 'drop' \| 'loading' \| 'uploaded' \| 'error'` | `'no-upload'` | Controlled upload state |
| `fileName` | `string` | — | File name shown in loading/uploaded titles |
| `fileInfo` | `string` | — | Type + size shown in subtitle (e.g. `"JPG 5 MB"`) |
| `progress` | `number` | `0` | Upload progress 0–100; drives the lg progress bar |
| `thumbnail` | `string` | — | Image src shown in lg `uploaded` state |
| `icon` | `ReactNode` | `<ImageIcon />` | Custom left/top icon |
| `onSelect` | `() => void` | — | Called when the user triggers file selection or retry |
| `errorMessage` | `string` | — | Subtitle in `error` state |
| `uploadTitle` | `string` | `'Upload your image'` | Title override for `no-upload`/`error` |
| `uploadSubtitle` | `string` | `'JPG, PNG, WEBP • Max 5 MB'` | Subtitle override for `no-upload`/`loading`/`uploaded` |
| `dropTitle` | `string` | `'Suéltalo aquí'` | Title override for `drop` state |
| `selectLabel` | `string` | `'Selecciona un archivo'` | Button label for lg `no-upload`/`error` |
| `reSelectLabel` | `string` | `'Seleccionar otro archivo'` | Button label for lg `uploaded` |
| `className` | `string` | — | Extra class merged onto root |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to root `<div>` |
| `...HTMLAttributes` | — | — | All other div props forwarded |

---

## Tokens

Uploader uses shared semantic tokens plus the `--button-*` tokens for the internal `Button`. No dedicated `--uploader-*` token block exists in `base.css`.

| Token | Used for |
|---|---|
| `--surface-mild` | Drop state background |
| `--border-standard` | Default border |
| `--border-accent` | Drop state accent border |
| `--ink-standard` | Title text |
| `--ink-weak` | Subtitle text |
| `--bg-accent` | Progress bar fill |
| `--ink-error` | Error subtitle text |

---

## Do

```tsx
// Drive state from upload lifecycle
setState('loading')
uploadFile(file, (p) => setProgress(p))
  .then(() => setState('uploaded'))
  .catch(() => setState('error'))

// Provide errorMessage in error state
<Uploader state="error" errorMessage="El archivo supera los 5 MB" onSelect={retry} />

// Use size="lg" for primary upload zones
<Uploader size="lg" uploadTitle="Sube tu foto de perfil" onSelect={open} />

// Implement drag-and-drop externally
<div
  onDragOver={() => setState('drop')}
  onDragLeave={() => setState('no-upload')}
  onDrop={handleDrop}
>
  <Uploader state={state} onSelect={open} />
</div>
```

## Don't

```tsx
// Don't leave state as 'loading' indefinitely without progress feedback
<Uploader state="loading" progress={0} /> // provide actual progress updates

// Don't rely on the root onClick for non-no-upload states in sm
// The root only calls onSelect in no-upload state

// Don't use 'drop' state without drag event listeners
<Uploader state="drop" /> // misleading if the user isn't actually dragging
```

---

## Examples

```tsx
// sm — compact upload field
const [state, setState] = useState<UploaderState>('no-upload')

<Uploader
  size="sm"
  state={state}
  onSelect={() => openFilePicker()}
/>

// lg — full upload zone with progress
const [state, setState] = useState<UploaderState>('no-upload')
const [progress, setProgress] = useState(0)
const [fileName, setFileName] = useState('')

const handleFile = async (file: File) => {
  setFileName(file.name.replace(/\.[^.]+$/, ''))
  setState('loading')
  try {
    await upload(file, setProgress)
    setState('uploaded')
  } catch {
    setState('error')
  }
}

<Uploader
  size="lg"
  state={state}
  progress={progress}
  fileName={fileName}
  uploadTitle="Sube la imagen del producto"
  onSelect={openPicker}
  errorMessage="Formato no soportado. Usa JPG, PNG o WEBP."
/>
```

---

## Tests

Test file: `Uploader.test.tsx`

| Area | Scenarios covered |
|---|---|
| Rendering | `data-size` and `data-state` attributes; title and subtitle text |
| States | All 5 states render correct text, icons, and action elements |
| Size | `sm` shows trailing icon button; `lg` shows action button and progress bar |
| Progress | `aria-valuenow` reflects `progress` prop; fill width matches |
| onSelect | Called from sm icon button, lg button, and root in `no-upload` |
| Labels | `uploadTitle`, `dropTitle`, `selectLabel`, `reSelectLabel`, `errorMessage` overrides |
| Custom icon | `icon` prop replaces the default `ImageIcon` |
| Ref | Forwarded to root `<div>` |
| className | Extra class merged onto root |
