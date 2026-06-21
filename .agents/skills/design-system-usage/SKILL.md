---
name: design-system-usage
description: Guide for creating, editing, linting, and exporting the Rappi DESIGN.md design system file using the @google/design.md format. Use when the user wants to define or update design tokens (colors, typography, spacing, components), validate the design system, export tokens to Tailwind or DTCG, or compare versions of the design system.
disable-model-invocation: true
---

# Rappi Design System — DESIGN.md

This project uses `@google/design.md` to define the design system as a `DESIGN.md` file. The format combines YAML front matter (machine-readable tokens) with markdown prose (design rationale).

## File Structure

```md
---
name: Rappi
colors:
  primary: "#FF441A"
  ...
typography:
  body-md:
    fontFamily: ...
    fontSize: ...
...
---

## Overview
...

## Colors
...
```

The **YAML front matter** holds normative token values. The **markdown body** explains how and why to apply them.

## Token Schema

```yaml
version: "alpha"          # optional
name: <string>
description: <string>     # optional
colors:
  <token-name>: <Color>
typography:
  <token-name>:
    fontFamily: <string>
    fontSize: <Dimension>
    fontWeight: <number|string>   # optional
    lineHeight: <Dimension>       # optional
    letterSpacing: <Dimension>    # optional
rounded:
  sm | md | lg | full: <Dimension>
spacing:
  sm | md | lg | ...: <Dimension>
components:
  <component-name>:
    <property>: <value | token reference>
```

## Token Types

| Type | Format | Example |
|:-----|:-------|:--------|
| Color | `#` + 6-digit hex | `"#FF441A"` |
| Dimension | number + `px`, `em`, or `rem` | `"1rem"`, `"16px"` |
| Token Reference | `{section.token-name}` | `"{colors.primary}"` |
| Typography | object with `fontFamily`, `fontSize`, etc. | see schema above |

**Always quote hex colors and dimensions as strings in YAML.**

## Component Token Properties

Valid properties under `components.<name>`:

- `backgroundColor`
- `textColor`
- `typography` (token reference to a typography token)
- `rounded` (token reference or dimension)
- `padding` (dimension)
- `size`, `height`, `width` (dimensions)

Variants (hover, active, disabled) are separate entries with a related name:

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
```

## Section Order

Markdown sections use `##` headings. If present, they must appear in this order:

1. Overview *(or "Brand & Style")*
2. Colors
3. Typography
4. Layout *(or "Layout & Spacing")*
5. Elevation & Depth *(or "Elevation")*
6. Shapes
7. Components
8. Do's and Don'ts

Sections can be omitted. Duplicate headings are an error.

## CLI Commands

Run all commands from the project root.

### Validate

```bash
npx @google/design.md lint DESIGN.md
```

Returns JSON with `findings` (severity: `error` | `warning` | `info`) and `summary`. Exit code `1` on errors.

### Compare versions

```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

Reports added/removed/modified tokens. Exit code `1` if the "after" file is a regression.

### Export tokens

```bash
# Tailwind v3 (theme.extend JSON)
npx @google/design.md export --format json-tailwind DESIGN.md

# Tailwind v4 (@theme CSS block)
npx @google/design.md export --format css-tailwind DESIGN.md

# W3C DTCG tokens.json
npx @google/design.md export --format dtcg DESIGN.md
```

### View the full spec

```bash
npx @google/design.md spec
npx @google/design.md spec --rules          # includes linting rules table
```

## Linting Rules

| Rule | Severity | What it checks |
|:-----|:---------|:---------------|
| `broken-ref` | error | `{token.ref}` that doesn't resolve |
| `missing-primary` | warning | No `colors.primary` defined |
| `contrast-ratio` | warning | Component text/background pair below WCAG AA (4.5:1) |
| `orphaned-tokens` | warning | Color defined but never used in any component |
| `missing-typography` | warning | Colors defined but no typography tokens |
| `missing-sections` | info | Spacing or rounded absent when other tokens exist |
| `section-order` | warning | Sections out of canonical order |

Always lint after editing. Fix all `error` findings before considering the file valid.

## Workflow

1. Edit `DESIGN.md`
2. Run `npx @google/design.md lint DESIGN.md`
3. Fix any `error` findings; review `warning` findings
4. If exporting to Tailwind: `npx @google/design.md export --format css-tailwind DESIGN.md > theme.css`
