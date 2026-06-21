# ComboBox

Text input that filters a list of options and supports multi-selection via an inline dropdown.

---

## Purpose

ComboBox combines a text input with a listbox dropdown. As the user types, options are filtered in real time. The user can select multiple values independently of the search query. It differs from `Select` in that the trigger is an editable `<input>`, not a button — options surface as the user types rather than on explicit open.

---

## When to use

- Searching and selecting from large lists (cities, products, categories) where typing to narrow results is essential.
- Multi-select scenarios where chosen values need to remain visible separately from the search field.
- Server-side / async search — pass `inputValue` and `onInputChange` to control filtering externally.

## When NOT to use

- Short, fixed lists (fewer than ~8 options) — use `Select` for a simpler picker without free-text entry.
- Single-selection with no search need — `Select` is cleaner.
- When all selected values must be rendered as chips inside the trigger — this component does not render inline chips.

---

## Anatomy

```
┌────────────────────────────────────────────┐
│ Label *                                    │
│ ┌────────────────────────────────────────┐ │
│ │ [leftIcon]  Search…          [×]  [∨] │ │  ← field
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │  ☐  Option A                           │ │
│ │  ☑  Option B                           │ │  ← dropdown (listbox)
│ │  ☐  Option C (disabled)                │ │
│ └────────────────────────────────────────┘ │
│ Helper text / error                        │
└────────────────────────────────────────────┘
```

| Part | CSS class | Notes |
|---|---|---|
| Root | `.rds-combobox` | Receives `data-size`, `data-invalid`, `data-disabled`, `data-open` |
| Label | `.rds-combobox__label` | `<label>` — hidden when no `label` prop |
| Required marker | `.rds-combobox__required` | `*` suffix, `aria-hidden` |
| Field wrapper | `.rds-combobox__field` | Receives `data-open` |
| Left icon | `.rds-combobox__left-icon` | Optional; decorative |
| Input | `.rds-combobox__input` | `<input role="combobox">` |
| Clear button | `.rds-combobox__clear` | `×` — shown when `clearable` and query is non-empty |
| Chevron | `.rds-combobox__chevron` | Decorative `∨` |
| Dropdown | `.rds-combobox__dropdown` | `<ul role="listbox">` |
| Option | `.rds-combobox__option` | `<li role="option">` — receives `data-active`, `data-disabled` |
| Option check | `.rds-combobox__option-check` | Visual checkbox indicator |
| Option icon | `.rds-combobox__option-icon` | Optional decorative icon |
| Option label | `.rds-combobox__option-label` | Text |
| Empty state | `.rds-combobox__empty` | "Sin resultados" shown when filtered list is empty |
| Message | `.rds-combobox__message` | Helper or error text; `data-error` on error |

---

## Variants

### Size

| Value | Height | Font | Use case |
|---|---|---|---|
| `lg` (default) | 56 px | `body-lg` (16 px) | Desktop, primary forms |
| `sm` | 44 px | `body-md` (14 px) | Compact or mobile layouts |

### Skeleton

Pass `skeleton={true}` to render loading placeholders. All other props are ignored while in skeleton mode.

---

## States

| State | `data-*` | Description |
|---|---|---|
| Default | — | Idle, no query, closed dropdown |
| Open | `data-open` (root + field) | Dropdown visible |
| Invalid | `data-invalid` | Red border; set by `error` string or `invalid={true}` |
| Disabled | `data-disabled` | Input not interactive; all actions blocked |
| Active option | `data-active` (option) | Keyboard-highlighted option |
| Disabled option | `data-disabled` (option) | Non-interactive option in the list |

---

## Behavior

### Filtering

- **Uncontrolled** (default): ComboBox filters `options` internally by matching `option.label` (case-insensitive) against the current query.
- **Controlled** (`inputValue` provided): Consumer controls the query; ComboBox shows all `options` as-is. Use this for async / server-side search.

### Open / close

- Dropdown opens on input `focus` and on `ArrowDown` when closed.
- Dropdown closes on `Escape`, `Tab`, and when focus leaves the field (blur detection skips mousedown on listbox items to allow click selection).

### Selection

Multi-select: clicking an option toggles it in/out. `onChange` receives the full updated `string[]` of selected values.

### Keyboard

| Key | Action |
|---|---|
| `ArrowDown` | Open dropdown or move active index down (skips disabled) |
| `ArrowUp` | Move active index up (skips disabled) |
| `Enter` / `Space` | Open dropdown or toggle the active option |
| `Escape` | Close dropdown |
| `Tab` | Close dropdown and move focus forward |

### Clear button

Shown when `clearable={true}` (default), the query is non-empty, and the field is not disabled. Clicking it clears the query and returns focus to the input.

---

## Content

- **Placeholder**: defaults to `"Buscar…"`.
- **Empty state**: renders `"Sin resultados"` as a non-selectable list item when filtered options is empty.
- **Label**: use sentence case. Mark required fields with `required={true}`.
- **Helper text / error**: short, outcome-oriented. Error overrides helper text visually.

---

## Accessibility

| Attribute | Element | Value |
|---|---|---|
| `role="combobox"` | `<input>` | Identifies the widget type |
| `aria-haspopup="listbox"` | `<input>` | Signals the popup type |
| `aria-expanded` | `<input>` | `true` when dropdown open |
| `aria-controls` | `<input>` | Points to the listbox `id` |
| `aria-activedescendant` | `<input>` | `id` of the keyboard-active option |
| `aria-autocomplete="list"` | `<input>` | Filtering mode |
| `aria-multiselectable={true}` | `<input>` | Multi-select combobox |
| `aria-invalid` | `<input>` | `true` when invalid |
| `aria-required` | `<input>` | `true` when `required` |
| `aria-describedby` | `<input>` | Points to error or helper text id |
| `role="listbox"` | Dropdown `<ul>` | Option container |
| `aria-multiselectable="true"` | Listbox | Multi-select list |
| `role="option"` | Option `<li>` | Each selectable item |
| `aria-selected` | Option | `true` when selected |
| `aria-disabled` | Option | `true` when disabled |

---

## Composition

### Allowed

```tsx
// Basic usage
<ComboBox label="Ciudad" options={cities} value={selected} onChange={setSelected} />

// Async / server-side search
<ComboBox
  label="Producto"
  options={results}
  inputValue={query}
  onInputChange={setQuery}
  value={selected}
  onChange={setSelected}
/>

// With left icon
<ComboBox
  label="Categoría"
  leftIcon={<Tag size={20} />}
  options={categories}
  value={selected}
  onChange={setSelected}
/>

// Skeleton loading state
<ComboBox skeleton size="lg" />
```

### Not allowed

```tsx
// Don't put ComboBox inside another ComboBox dropdown
// Don't use ComboBox for single-select — use Select instead when multi-select isn't needed
```

---

## API

### ComboBox

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `ComboBoxOption[]` | `[]` | All available options |
| `value` | `string[]` | `[]` | Controlled selected values |
| `onChange` | `(values: string[]) => void` | — | Selection change callback |
| `inputValue` | `string` | — | Controlled search query (enables async mode) |
| `onInputChange` | `(value: string) => void` | — | Called when the query changes |
| `label` | `string` | — | Field label |
| `placeholder` | `string` | `'Buscar…'` | Input placeholder |
| `helperText` | `string` | — | Helper message below the field |
| `error` | `string` | — | Error message; overrides `helperText`, sets invalid state |
| `disabled` | `boolean` | `false` | Disables the entire field |
| `invalid` | `boolean` | `false` | Visual invalid state without error text |
| `leftIcon` | `ReactNode` | — | Icon rendered on the left of the input (24×24) |
| `size` | `'lg' \| 'sm'` | `'lg'` | Size variant |
| `required` | `boolean` | `false` | Adds `*` to label and `aria-required` |
| `clearable` | `boolean` | `true` | Shows `×` button when query is non-empty |
| `onClear` | `() => void` | — | Called when clear button is clicked |
| `skeleton` | `boolean` | `false` | Renders skeleton loading state |
| `id` | `string` | — | Overrides the auto-generated field id |
| `className` | `string` | — | Extra class on root |
| `aria-label` | `string` | — | Accessible label when no visible `label` |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded to the `<input>` element |

### ComboBoxOption

| Field | Type | Description |
|---|---|---|
| `value` | `string` | Unique identifier |
| `label` | `string` | Display text (used for filtering) |
| `icon` | `ReactNode` | Optional decorative icon (24×24) |
| `disabled` | `boolean` | Makes the option non-interactive |

### ComboBoxSkeleton

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'lg' \| 'sm'` | `'lg'` | Matches the field size |
| `showLabel` | `boolean` | `true` | Renders a label placeholder |
| `showHelper` | `boolean` | `false` | Renders a helper text placeholder |
| `className` | `string` | — | Extra class on root |

---

## Tokens

ComboBox uses shared form-field tokens. No dedicated token block — key values from `base.css`:

| Token | Used for |
|---|---|
| `--ink-strong` | Label text |
| `--ink-standard` | Input and option text |
| `--ink-weak` | Helper text |
| `--ink-error` | Error text |
| `--border-standard` | Default field border |
| `--border-accent-focus` | Focus ring |
| `--border-error` | Error border |
| `--surface` | Field background |
| `--surface-mild` | Option hover / active background |
| `--surface-hover` | Field hover background |

---

## Do

```tsx
// Provide both value and onChange for controlled usage
<ComboBox value={selected} onChange={setSelected} options={options} />

// Use inputValue + onInputChange for server search
<ComboBox
  inputValue={query}
  onInputChange={fetchOptions}
  options={serverResults}
  value={selected}
  onChange={setSelected}
/>

// Show error from validation
<ComboBox error="Selecciona al menos una ciudad" />
```

## Don't

```tsx
// Don't use ComboBox when only one value can be selected
<ComboBox value={[single]} onChange={([v]) => setSingle(v)} />
// Use Select instead

// Don't disable options without explaining why
<ComboBox options={[{ value: 'x', label: 'Opción', disabled: true }]} />
// Add a tooltip or helper text explaining the restriction

// Don't set inputValue without onInputChange — the field becomes read-only
<ComboBox inputValue="fixed" />
```

---

## Examples

```tsx
// Multi-city picker
const [cities, setCities] = useState<string[]>([])

<ComboBox
  label="Ciudades de cobertura"
  placeholder="Buscar ciudad…"
  options={[
    { value: 'bog', label: 'Bogotá' },
    { value: 'med', label: 'Medellín' },
    { value: 'cal', label: 'Cali' },
  ]}
  value={cities}
  onChange={setCities}
  helperText="Puedes seleccionar varias ciudades"
/>

// Async search
const [query, setQuery] = useState('')
const [results, setResults] = useState<ComboBoxOption[]>([])
const [selected, setSelected] = useState<string[]>([])

useEffect(() => {
  fetchProducts(query).then(setResults)
}, [query])

<ComboBox
  label="Producto"
  inputValue={query}
  onInputChange={setQuery}
  options={results}
  value={selected}
  onChange={setSelected}
/>
```

---

## Tests

Test file: `ComboBox.test.tsx`

| Area | Scenarios covered |
|---|---|
| Rendering | Label, placeholder, helper, error, left icon, required marker |
| Open/close | Opens on focus, closes on Escape/Tab/blur |
| Filtering | Matches by label (case-insensitive); passes all when inputValue controlled |
| Selection | Toggle via click; onChange receives updated array |
| Keyboard | ArrowDown/Up navigation, Enter/Space to toggle, skips disabled options |
| Clear | Button appears/disappears; fires onInputChange('') and onClear |
| Disabled | Field and options are non-interactive |
| Invalid | Red border from `error` prop or `invalid={true}` |
| Skeleton | Renders skeleton; hides real content |
| ARIA | combobox role, aria-expanded, aria-activedescendant, aria-selected |
| Ref | Forwarded to `<input>` element |
