# Flag

## Purpose

Displays one country flag from the markets defined in the Figma component set.

## When to use

Use inside international phone fields, country selectors, selected items, and compact market labels.

## When not to use

Do not use as a language selector or as a replacement for a visible country name when the distinction matters.

## Anatomy

A fixed square container and the country artwork exported from Figma.

## Variants and sizes

Countries: `COL`, `MEX`, `BRA`, `ARG`, `CL`, `EC`, `PE`, `CR`, `URG`, and `ESP`.

The component has one 32×32 px size, matching Figma. `URG` intentionally preserves the Figma variant name for Uruguay.

## States

Flags are non-interactive and have no hover, focus, selected, disabled, or loading states.

## Behavior

### Pointer and touch

Non-interactive. The parent input or item owns pointer behavior.

### Keyboard

No keyboard behavior.

### Focus

Does not receive focus.

### Responsive

Uses 32×32 px by default and does not shrink. A design-system slot such as the `TextFieldPhone` flag adornment may constrain it to the slot size.

## Content

Use the `country` prop instead of replacing the internal image.

## Accessibility

By default, the component exposes the country name as an image label. Set `decorative` when adjacent text or the parent control already announces the country.

## Composition

### Allowed

Compose as a leading visual in `TextFieldPhone`, select options, list items, or country summaries.

### Not allowed

Do not place interactive content inside the flag or make the flag the only clickable target.

## API

- `country?: 'COL' | 'MEX' | 'BRA' | 'ARG' | 'CL' | 'EC' | 'PE' | 'CR' | 'URG' | 'ESP'`
- `decorative?: boolean`
- Native `<span>` attributes are supported.

## Tokens

Uses `--flag-size` and `--flag-radius`. Country artwork preserves the exact colors exported from Figma rather than mapping national flag colors to semantic product tokens.

## Do

- Use `decorative` when a nearby label already names the country.
- Keep the flag paired with text in ambiguous selection contexts.

## Don't

- Do not use emoji flags when visual consistency with Figma is required.
- Do not stretch or recolor the artwork.

## Examples

```tsx
<Flag country="COL" />
<Flag country="MEX" decorative />

<TextFieldPhone
  label="Phone number"
  countries={[
    {
      code: 'CO',
      callingCode: '+57',
      name: 'Colombia',
      flag: <Flag country="COL" decorative />,
    },
  ]}
  countryCode="CO"
/>
```

## Tests

Tests cover the default country, every Figma country variant, decorative semantics, native attributes, and ref forwarding.
