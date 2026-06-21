---
name: Rappi Design System
description: >
  Multi-vertical design system for Rappi's super-app ecosystem.
  Merchants is the default mode (base.css :root). Each additional mode
  overrides brand and semantic tokens via [data-theme="mode-name"].
  Font: PP Object Sans (fonts.base). Primary brand color: #FF441F.

colors:
  # Brand / accent — overridden per mode (default: Merchants)
  primary: '#FF441F'
  primary-dark: '#FF441F'
  primary-light: '#FFE3E3'
  primary-container: '#FFE3E3'
  secondary: '#FBDC25'
  secondary-dark: '#FBDC25'

  # Surfaces (background/*)
  surface: '#FFFFFF'
  surface-mild: '#F7F8F9'
  surface-weak: '#D6D9DF'
  surface-inverse: '#000000'
  surface-inverse-on: '#000000'
  surface-overlay: 'rgba(0,0,0,0.8)'
  surface-overlay-weak: 'rgba(255,255,255,0.8)'
  surface-disabled: '#F7F8F9'
  surface-on-top: '#FFFFFF'

  # Ink (text / icons)
  ink-strong: '#000000'
  ink-strong-on: '#000000'
  ink-standard: '#464D59'
  ink-weak: '#919AAA'
  ink-disabled: 'rgba(145,154,170,0.7)'
  ink-inverse: '#FFFFFF'
  ink-inverse-on: '#FFFFFF'
  ink-accent: '#FF441F'
  ink-error: '#FF4242'
  ink-warning: '#DA7400'
  ink-positive: '#00A86C'
  ink-recommendation: '#007AFF'

  # Feedback — ink
  positive: '#00A86C'
  positive-container: '#DFF9ED'
  warning: '#DA7400'
  warning-container: '#FCF0DF'
  error: '#FF4242'
  error-container: '#FFE3E3'
  info: '#007AFF'
  info-container: '#EFF6FE'

  # Offer / promotions
  offer: '#FBDC25'
  offer-container: '#FDFAE3'

  # Borders (line/*)
  border-standard: '#ECEFF3'
  border-strong: '#171A1E'
  border-blank: '#FFFFFF'
  border-block: '#F7F8F9'
  border-non-opaque: 'rgba(145,154,170,0.2)'
  border-error: '#FF4242'
  border-warning: '#DA7400'
  border-positive: '#00A86C'

  # Skeleton
  skeleton-weak: '#F7F8F9'
  skeleton-standard: '#ECEFF3'

  # Programs
  programs-rappi: '#FF441F'
  programs-turbo: '#083410'

  # Chart palette (Merchants — steps not covered by semantic tokens)
  chart-blue-02: '#8DBBF9'
  chart-blue-04: '#133469'
  chart-green-02: '#A0EEC8'
  chart-green-04: '#177749'
  chart-red-02: '#FF9797'
  chart-red-03: '#C43333'
  chart-red-04: '#8C2424'
  chart-orange-02: '#FFBB6D'
  chart-orange-03: '#FE8F10'
  chart-orange-04: '#7A4100'
  chart-yellow-02: '#F9EB8F'
  chart-teal-01: '#DFF4F3'
  chart-teal-02: '#89D5D1'
  chart-teal-03: '#28B2AB'
  chart-teal-04: '#16625E'
  chart-purple-02: '#AA95EF'
  chart-indigo-01: '#D0D2F5'
  chart-indigo-02: '#A8ACEB'
  chart-indigo-03: '#4B50A9'
  chart-indigo-04: '#272A58'
  chart-magenta-01: '#FFE5F0'
  chart-magenta-02: '#FFA0C8'
  chart-magenta-03: '#FF529A'
  chart-magenta-04: '#8C2D55'

fonts:
  base: 'PP Object Sans'

typography:
  h1:
    fontFamily: '{fonts.base}'
    fontSize: '40px'
    fontWeight: 700
    lineHeight: '48px'
  h2:
    fontFamily: '{fonts.base}'
    fontSize: '32px'
    fontWeight: 700
    lineHeight: '40px'
  h3:
    fontFamily: '{fonts.base}'
    fontSize: '24px'
    fontWeight: 700
    lineHeight: '32px'
  h4:
    fontFamily: '{fonts.base}'
    fontSize: '20px'
    fontWeight: 700
    lineHeight: '26px'
  headline:
    fontFamily: '{fonts.base}'
    fontSize: '20px'
    fontWeight: 500
    lineHeight: '24px'
  body-lg:
    fontFamily: '{fonts.base}'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: '24px'
  body-md:
    fontFamily: '{fonts.base}'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: '20px'
  body-sm:
    fontFamily: '{fonts.base}'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: '18px'
  label-lg:
    fontFamily: '{fonts.base}'
    fontSize: '16px'
    fontWeight: 500
    lineHeight: '24px'
  label-md:
    fontFamily: '{fonts.base}'
    fontSize: '14px'
    fontWeight: 500
    lineHeight: '20px'
  label-sm:
    fontFamily: '{fonts.base}'
    fontSize: '12px'
    fontWeight: 500
    lineHeight: '18px'
  label-xs:
    fontFamily: '{fonts.base}'
    fontSize: '10px'
    fontWeight: 500
    lineHeight: '14px'
  caption:
    fontFamily: '{fonts.base}'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: '18px'
  caption-1:
    fontFamily: '{fonts.base}'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: '16px'
  caption-2:
    fontFamily: '{fonts.base}'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: '16px'

spacing:
  '2': '2px'
  '4': '4px'
  '6': '6px'
  '8': '8px'
  '10': '10px'
  '12': '12px'
  '16': '16px'
  '20': '20px'
  '24': '24px'
  '28': '28px'
  '32': '32px'
  '40': '40px'
  '48': '48px'
  '56': '56px'
  '64': '64px'

rounded:
  sm: '6px'
  md: '8px'
  lg: '10px'
  xl: '14px'
  card-table: '16px'
  data-table: '20px'
  full: '9999px'

components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink-inverse}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: '10px 16px'
  button-secondary:
    backgroundColor: '{colors.surface-weak}'
    textColor: '{colors.ink-strong}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: '10px 16px'
  button-tertiary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink-strong}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: '10px 16px'
  input-default:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink-strong}'
    rounded: '{rounded.md}'
    padding: '12px 16px'
  input-error:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.error}'
    rounded: '{rounded.md}'
    padding: '12px 16px'
  badge-default:
    backgroundColor: '{colors.surface-weak}'
    textColor: '{colors.ink-standard}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: '2px 8px'
  badge-accent:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.primary}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: '2px 8px'
  badge-positive:
    backgroundColor: '{colors.positive-container}'
    textColor: '{colors.positive}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: '2px 8px'
  badge-error:
    backgroundColor: '{colors.error-container}'
    textColor: '{colors.error}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: '2px 8px'
  badge-warning:
    backgroundColor: '{colors.warning-container}'
    textColor: '{colors.warning}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: '2px 8px'
  drawer:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink-strong}'
    typography: '{typography.headline}'
    padding: '24px'
  data-table:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink-standard}'
    typography: '{typography.caption-1}'
    rounded: '{rounded.data-table}'
    padding: '0'
  table-header:
    backgroundColor: '{colors.surface-mild}'
    textColor: '{colors.ink-strong}'
    typography: '{typography.caption-1}'
    padding: '16px'
  table-cell:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink-standard}'
    typography: '{typography.caption-1}'
    padding: '16px'
  card-table:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink-standard}'
    typography: '{typography.caption-1}'
    rounded: '{rounded.card-table}'
    padding: '12px 16px'
---

## Overview

Rappi is a Latin American super-app with multiple business verticals: food delivery, grocery (Rappi Mercado), pharmacy, express delivery (Turbo), and financial services (RappiPay). The design system is multi-vertical: every component works across all verticals through CSS custom property theming.

The base mode is **Merchants** (`:root` in `base.css`). Every other mode overrides only the tokens that differ — semantic tokens not listed in a theme file inherit the Merchants default automatically.

`@rappi-ds/tokens` is the single source of truth and the only package that distributes themes. All theme files live in `packages/tokens/src/themes` and are consumed through the package export `@rappi-ds/tokens/themes/<theme-name>.css`.

Consumers must import `@rappi-ds/tokens/base.css` before importing a theme. That file loads the PP Object Sans `@font-face` rules and sets `--font-family-base` from `fonts.base` in this document. A theme file contains overrides only; it is not a standalone token bundle.

## Colors

The palette has four layers:

1. **Brand primitives** — `primary`, `primary-dark`, `primary-light`, `secondary`. Override these per vertical in CSS theme files.
2. **Semantic surface/ink** — describe roles, not values. Always use these in components, never brand primitives directly.
3. **Feedback** — `positive`, `warning`, `error`, `info`. Consistent across all verticals.
4. **Neutral borders** — `border-standard`, `border-strong`.

**Accent colors por modo Figma (background/accent = ink/accent):**

| Modo                 | `--brand-primary`                 | Archivo CSS           |
| :------------------- | :-------------------------------- | :-------------------- |
| **Merchants** (base) | `#FF441F`                         | `:root` en `base.css` |
| User App             | `#34C85A`                         | `user-app.css`        |
| RT App               | `#16625E`                         | `rt-app.css`          |
| Nitro                | `#165526` (aprox.)                | `nitro.css`           |
| Consumer CMS         | `#16625E`                         | `consumer-cms.css`    |
| Aliados              | `#258E3F` (aprox.)                | `aliados.css`         |
| Portal Partners      | `#007AFF`                         | `portal-partners.css` |
| Brands               | `#4589FF`                         | `brands.css`          |
| Mi Tienda            | `#007AFF`                         | `mi-tienda.css`       |
| Nexus                | `#1D7232`                         | `nexus.css`           |
| Marketing Suite      | `#2EC4B6`                         | `marketing-suite.css` |
| Cargo                | `#FF441F`                         | `cargo.css`           |
| Pay                  | `#6168DB`                         | `pay.css`             |
| Food                 | Inherits Merchants until approved | `food.css`            |
| Grocery              | Inherits Merchants until approved | `grocery.css`         |
| Pharmacy             | Inherits Merchants until approved | `pharmacy.css`        |
| Turbo                | Inherits Merchants until approved | `turbo.css`           |
| Fintech              | Inherits Merchants until approved | `fintech.css`         |

Valid theme names are:

`food`, `grocery`, `pharmacy`, `turbo`, `fintech`, `user-app`, `rt-app`, `nitro`, `consumer-cms`, `aliados`, `portal-partners`, `brands`, `mi-tienda`, `nexus`, `marketing-suite`, `cargo`, and `pay`.

The Food, Grocery, Pharmacy, Turbo, and Fintech files intentionally contain no token overrides until their values are approved. They inherit from `base.css` rather than publishing placeholder colors.

### Chart palette

Merchants exports 36 `chart.*` tokens from Figma. Twelve steps already map to semantic tokens and are **not** duplicated in CSS:

| Figma step               | Semantic token                                                  |
| :----------------------- | :-------------------------------------------------------------- |
| `chart.blue.blue-01`     | `info-container`                                                |
| `chart.blue.blue-03`     | `info`, `ink-recommendation`                                    |
| `chart.green.green-01`   | `positive-container`                                            |
| `chart.green.green-03`   | `positive`, `ink-positive`, `border-positive`                   |
| `chart.red.red-01`       | `error-container`, `brand-primary-light`, `surface-accent-weak` |
| `chart.orange.orange-01` | `warning-container`                                             |
| `chart.yellow.yellow-01` | `offer-container`, `tag-suggestion-pastel`                      |
| `chart.yellow.yellow-03` | `tag-suggestion-solid`                                          |
| `chart.yellow.yellow-04` | `tag-suggestion-text`                                           |
| `chart.purple.purple-01` | `tag-ai-pastel`                                                 |
| `chart.purple.purple-03` | `tag-ai-solid`                                                  |
| `chart.purple.purple-04` | `tag-ai-text`                                                   |

The remaining 24 steps are published as `--chart-{family}-{step}` in `base.css` (e.g. `--chart-teal-04`). Use them for data visualization, tags, and decorative UI — not as replacements for semantic ink/surface tokens.

## Typography

Single typeface family: **PP Object Sans** (`fonts.base`). Three self-hosted weights in `packages/tokens/src/fonts/`:

| Token weight | File                         | Usage                |
| :----------- | :--------------------------- | :------------------- |
| 400          | `PPObjectSans-Regular.woff2` | `body-*`, `caption*` |
| 500          | `PPObjectSans-Medium.woff2`  | `label-*`            |
| 700          | `PPObjectSans-Bold.woff2`    | `h1`–`h4`            |

`@font-face` declarations live in `@rappi-ds/tokens/fonts/pp-object-sans.css`, imported automatically by `base.css`. Consumers do not need a separate font import when they load `base.css`.

CSS custom property: `--font-family-base: 'PP Object Sans', sans-serif`.

Scale:

- `h1`–`h4` — page titles, section headers
- `body-lg`, `body-md`, `body-sm` — content text
- `label-lg`, `label-md`, `label-sm`, `label-xs` — interactive elements, form fields, badges
- `caption` — legacy metadata and secondary information at 12/18
- `caption-1` — compact table and card values at 14/16
- `caption-2` — compact metadata and field labels at 12/16

Minimum interactive target: **24×24px**. Prefer at least **44×44px** for touch-first controls and primary actions. Compact controls below 44px require adequate spacing and must not be the primary touch target of a flow.

## Layout

Three breakpoints:

- **Mobile**: `< 1024px` (base, mobile-first)
- **Tablet**: `1024px – 1279px`
- **Desktop**: `>= 1280px`

Content max-width: `1280px`. Page padding: `16px` mobile / `24px` tablet / `32px` desktop.

DataTable has a component-specific presentation breakpoint: it renders native table markup from
`768px` and CardTable items below `768px`. This exception preserves dense data comparison on
larger viewports without changing the global page-layout breakpoints.

## Elevation

| Level | Usage                                      |
| :---- | :----------------------------------------- |
| 0     | Flat — cards on white                      |
| 1     | Slightly raised — cards on gray, dropdowns |
| 2     | Modals, bottom sheets, sidebars            |
| 3     | Toasts, tooltips (topmost layer)           |

## Shapes

Border radius by component density:

- `sm` (6px) — chips, compact badges
- `md` (8px) — inputs, buttons, standard cards
- `lg` (10px) — large cards
- `xl` (14px) — modals, bottom sheets
- `full` — pill buttons, avatars

## Components

All component tokens reference semantic color tokens, never hex values. Hover, active, focus, disabled, and loading are interaction states implemented by the component rather than public visual variants.

Button exposes `primary`, `secondary`, and `tertiary` appearances. Button and IconButton share five sizes:

| Size | Button height | IconButton size | Typography | Inline padding | Icon / gap  |
| :--- | ------------: | --------------: | :--------- | -------------: | :---------- |
| `xs` |          26px |            24px | `label-sm` |            8px | 16px / 4px  |
| `sm` |          32px |            32px | `label-md` |           16px | 16px / 8px  |
| `md` |          40px |            40px | `label-md` |           16px | 20px / 8px  |
| `lg` |          48px |            48px | `label-lg` |           24px | 24px / 12px |
| `xl` |          56px |            56px | `label-lg` |           28px | 24px / 12px |

The tertiary appearance uses `border-standard`; the `@google/design.md` component schema cannot express border color, so that binding remains normative in the React implementation.

The Merchants primary appearance intentionally preserves white text on `#FF441F` to match the approved Figma library. Its 3.44:1 contrast ratio does not meet WCAG AA for normal text. This is a documented design exception for v1 and must remain visible in lint output until the brand color treatment is revised.

`xs`, `sm`, and `md` are compact sizes. Do not use them as the primary touch action in mobile flows. `lg` and `xl` are the preferred touch-first sizes.

BadgeNumber exposes `accent`, `light`, and `dark` appearances and five sizes matching the
approved Figma component: `xs` (16px), `sm` (20px), `md` (24px), `lg` (32px), and `xl`
(40px). Its value is editable and can be hidden without creating a second variant axis.
BadgeNumber is informational and non-interactive; provide an accessible label when its meaning
is not repeated by adjacent text.

Radio is a fixed 24px native control for mutually exclusive choices. Its selected and disabled
presentations follow the Figma component using `ink-strong` and `ink-disabled`. Related radios
must share a native name and accessible group label; use `RadioGroup` to render the required
`fieldset` and `legend`. Labels remain external so product layouts can support helper text and
long localized content without expanding the primitive API.

TextField provides `sm` (44px) and `md` (56px) single-line controls. Focus, filled, disabled,
readonly, and invalid appearances derive from native input state rather than a visual `state`
prop. Labels remain visible, helper and error text are programmatically associated, and
adornments are composable slots. Loading geometry is exposed separately as
`TextFieldSkeleton`, which never renders a disabled or focusable input. Unlike the Figma error
example, entered text remains `ink-strong`; error color is reserved for the border and recovery
message to preserve readability.

Pin supports the approved four- and six-digit layouts with 60px and 40px circular cells.
It uses one native numeric text input beneath the visual cells so paste, selection, mobile
keyboards, password managers, `one-time-code` autofill, and screen readers behave consistently.
Focus, completion, disabled, readonly, and invalid appearances follow actual input state.
Loading is exposed separately through `PinSkeleton`. Unlike the Figma error example,
entered digits remain `ink-strong`; error color is reserved for cell borders and the associated
recovery message because `ink-error` on `surface` does not meet normal-text contrast.

### DataTable, TableCell, and CardTable

`DataTable<T>` is the public responsive API. The consumer owns data loading, filtering, sorting,
pagination, and remote state. The component renders a native `table` at `>=768px` and derives
mobile CardTable items from the same rows and column definitions below that breakpoint.

Anatomy and metrics:

- DataTable container: 20px radius, semantic standard border, 56px minimum header.
- TableCell: native `td`; TableHeaderCell: native `th`; both use 16px padding and 6px slot gap.
- CardTable: 16px radius and `border-non-opaque`.
- CardTable `default` density uses 12px block padding and 14px section gap.
- CardTable `compact` density uses 10px block padding and 10px section gap.
- `two-columns` is for short comparable values. `stacked` is for long or localized values.

Column `mobileRole` determines mobile composition: `title`, `meta`, `status`, `field`, `action`,
or `hidden`. Fields reuse the desktop header as their label unless `mobileLabel` is provided.
Business statuses are composed with Tag; they are not table or card variants.

Selection is controlled. Select-all affects only selectable rows on the current page and keeps
selected IDs from other pages. The Checkbox indeterminate state represents partial page
selection. On mobile, selection occupies a dedicated leading region before the title; it is never
mixed with row actions. Non-selectable cards retain a disabled Checkbox so the content alignment
remains stable. Pagination is controlled, never mutates or slices consumer data, and aligns to the
right edge at every breakpoint.

Rows and cards are never clickable containers. Links, toggles, buttons, and icon buttons remain
explicit controls with accessible names. Do not nest an interactive row target around these
controls. TableCell must remain inside `tr` and `table`; do not recreate table semantics with
`div`, CSS grid, or ARIA roles.

Long content wraps rather than truncating critical values. Designs must remain usable with a 30%
text-size increase, browser zoom at 200%, keyboard navigation, visible focus, and every supported
theme. Consumers may provide custom empty and error content, but the state must use the typed
`ready | loading | empty | error` union rather than contradictory booleans.

## Do's and Don'ts

**Do:**

- Use semantic tokens (`ink-standard`, `surface-weak`) in components — never hardcode hex values.
- Apply `data-theme="rt-app"` (or other mode) at the app root to activate a theme.
- Import `@rappi-ds/tokens/base.css` before the selected theme file (includes PP Object Sans).
- Use the spacing scale for all padding, margin, and gap values.
- Maintain at least a 24px target and prefer 44px or larger for touch-first controls.
- Import CSS theme files via `@rappi-ds/tokens/themes/<mode>.css`.
- Use DataTable columns as the single mapping for desktop cells and mobile cards.
- Use native table elements and explicit accessible actions inside data displays.

**Don't:**

- Don't use `--brand-primary` directly in components — use semantic tokens like `--bg-accent` or `--ink-accent`.
- Don't create per-mode component variants — use CSS custom property theming instead.
- Don't add typography sizes outside this scale without design team review.
- Don't use Tailwind's built-in color names (`orange-500`, `green-600`) — use semantic tokens.
- Don't override feedback colors (`positive`, `error`, `warning`, `info`) unless the Figma mode explicitly differs.
- Don't create or publish separate `@rappi-ds/theme-*` packages.
- Don't expose hover, pressed, focus, or skeleton as Button props.
- Don't use compact Button sizes as primary touch actions.
- Don't build data tables from `div` elements or make entire rows/cards clickable.
- Don't add business props such as `showPro` or merchant-status variants to CardTable.
