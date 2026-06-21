---
name: design-system-foundations
description: Use when creating, editing, or reviewing any React component in this project. Mandatory prerequisite — must read DESIGN.md color, typography, and spacing foundations before writing any component code. Apply this rule to every component, no exceptions.
---

# Design System Foundations

## Iron Law

**Read `DESIGN.md` foundations before writing a single line of component code.** Every color, font size, spacing, and border radius must come from a token — never from memory, never guessed.

## How to Read Foundations

1. Open `DESIGN.md` and read the YAML frontmatter
2. Run `npx @google/design.md lint DESIGN.md` — fix all errors before proceeding
3. Extract `colors`, `typography`, `spacing`, `rounded` sections
4. Map every needed token to a Tailwind class before writing JSX

Full token schema and CLI commands: [[design-system-usage]].

## Token → Tailwind Mapping

| Token section | DESIGN.md value | Tailwind class |
|:---|:---|:---|
| `colors.<name>` | `"#FF441A"` | `bg-[#FF441A]`, `text-[#FF441A]` |
| `typography.<name>.fontSize` | `"16px"` | `text-[16px]` |
| `typography.<name>.fontWeight` | `700` | `font-[700]` |
| `typography.<name>.lineHeight` | `"24px"` | `leading-[24px]` |
| `spacing.<name>` | `"16px"` | `p-[16px]`, `gap-[16px]`, `m-[16px]` |
| `rounded.<name>` | `"8px"` | `rounded-[8px]` |

Use token references (`{colors.primary}`) to trace resolved values when the file uses aliasing.

## Never Hardcode

| Forbidden | Correct |
|:---|:---|
| `className="bg-orange-500"` | Resolve `colors.primary` → `bg-[#FF441A]` |
| `className="text-sm"` | Resolve `typography.body-sm.fontSize` → `text-[14px]` |
| `className="p-4"` | Resolve `spacing.md` → `p-[16px]` |
| `style={{ borderRadius: 8 }}` | Resolve `rounded.md` → `rounded-[8px]` |
| Any guessed Tailwind scale value | Always read the token first |

## Pre-Component Checklist

Before writing any JSX:

- [ ] `DESIGN.md` is valid (linted, no errors)
- [ ] Colors needed by this component are identified and their hex values noted
- [ ] Typography token for this component is identified (fontSize, fontWeight, lineHeight)
- [ ] Spacing tokens for padding, margin, gap are identified
- [ ] Rounded tokens for border radius are identified
- [ ] Every token is mapped to a Tailwind class

## Red Flags — Stop and Re-Read

- You are typing a Tailwind color name (`red`, `orange`, `gray`) without having read `colors:`
- You used `text-sm` / `text-base` / `text-lg` without verifying against `typography:`
- You used `p-2`, `p-4`, `p-6` without checking `spacing:`
- You added `rounded-md` without checking `rounded:`

**Any of these means: stop, open `DESIGN.md`, read the relevant section, then continue.**
