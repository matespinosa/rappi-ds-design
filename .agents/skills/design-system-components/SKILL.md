---
name: design-system-components
description: Defines best practices for researching, designing, implementing, documenting, and reviewing new design system components. Use when proposing, creating, modifying, or evaluating any component without assuming in advance which components the library should contain.
---

# Design System Component Creation

This skill defines the general process and quality criteria for creating components. It does not prescribe a component catalog: every component must originate from a real, recurring, and validated need.

## Principles

- Solve a product need instead of filling an inventory.
- Prefer established patterns before inventing new interactions.
- Design the API and behavior before the visual treatment.
- Reuse existing tokens, primitives, and components.
- Keep each component focused on one responsibility.
- Include accessibility, content, states, and responsive behavior from the start.
- Avoid premature abstraction; generalize after observing real usage.
- Prefer composition over components with excessive variants and props.

## Before Creating a Component

Do not implement immediately. First answer:

1. What user problem does it solve?
2. In which specific contexts will it appear?
3. Is it a recurring pattern or an isolated need?
4. Can existing elements be composed to solve it?
5. Is there a native HTML element that provides the required behavior?
6. Which alternatives were evaluated, and why are they insufficient?
7. Who will maintain the component, and which products will consume it?

Create a shared component when:

- At least two real use cases exist, or the use case is clearly cross-product.
- Behavior must remain consistent across products.
- Centralization reduces duplication, errors, or accessibility problems.
- Its responsibility and boundaries can be explained clearly.

Do not create a shared component when:

- It only encapsulates styles specific to one screen.
- Its API depends on business rules from a single flow.
- Its real variations are not yet understood.
- It adds more complexity than direct composition.
- It duplicates an existing solution with cosmetic differences.

## Creation Workflow

### 1. Research

- Gather real use cases and available screenshots or prototypes.
- Identify users, platforms, constraints, and primary tasks.
- Review existing components, native web patterns, and platform conventions.
- Record edge cases such as long content, missing data, errors, latency, and permissions.

### 2. Define the Contract

Before building, document:

- **Purpose:** the component's single responsibility.
- **When to use:** appropriate contexts.
- **When not to use:** recommended alternatives.
- **Anatomy:** required and optional parts.
- **Composition:** allowed parents, children, and combinations.
- **Variants:** justified semantic differences.
- **Sizes:** real density or platform requirements.
- **States:** visual, interactive, and asynchronous states.
- **Behavior:** keyboard, pointer, touch, focus, and responsive behavior.
- **Content:** labels, limits, formatting, and localization.
- **Accessibility:** semantics, accessible name, relationships, and announcements.

Keep the component experimental while any significant decision remains unresolved.

### 3. Design the API

- Prefer semantic names such as `disabled`, `loading`, `selected`, `expanded`, and `invalid`.
- Reuse native HTML attributes instead of duplicating them with custom props.
- Expose only options supported by real use cases.
- Avoid generic visual props such as `color`, `padding`, or `borderRadius`.
- Avoid multiple booleans that produce invalid combinations.
- Use explicit variants when they represent meaning or hierarchy.
- Expose slots only when a stable composition need exists.
- Keep implementation details private.
- Make default values safe and accessible.
- Prevent invalid combinations through types or development warnings.
- Emit events that represent user intent rather than implementation details.
- Forward the `ref` to the primary semantic or interactive element.

### 4. Design Every Applicable State

Consider:

- Default.
- Hover.
- Focus visible.
- Active or pressed.
- Selected or expanded.
- Disabled.
- Read-only.
- Loading.
- Success.
- Warning.
- Invalid or error.
- Empty.
- Offline.

Do not create states as purely visual variations. Every state must have a defined cause, behavior, and recovery path.

### 5. Implement Within the System

- Use semantic color, typography, spacing, size, radius, elevation, and motion tokens.
- Do not introduce isolated values without a documented reason.
- Use intrinsic layout and allow content to determine size.
- Avoid fixed heights in components containing text.
- Keep layout stable during loading, validation, and icon changes.
- Build on shared primitives for focus, overlays, text, and interaction.
- Keep business rules outside generic components.
- Avoid circular dependencies between components.

## UI Best Practices

- Maintain a clear visual hierarchy.
- Use color, typography, spacing, and elevation consistently and intentionally.
- Align anatomy and metrics across related components.
- Maintain targets of at least 24×24 CSS pixels; prefer 44×44 for touch interfaces.
- Do not rely on color, icons, position, or motion alone to communicate meaning.
- Use a consistent icon family.
- Hide decorative icons from assistive technologies.
- Reserve elevation for communicating layers or interaction, not decoration.
- Use motion to explain continuity or state changes.
- Respect `prefers-reduced-motion`.

## UX Best Practices

- Make the primary purpose or action evident.
- Provide immediate feedback for every interaction.
- Explain what happened and how to recover from errors.
- Preserve user input after recoverable errors.
- Avoid irreversible actions without confirmation or an undo path.
- Do not use disabled states to hide requirements; explain what is missing.
- Do not require hover to discover information or complete tasks.
- Avoid unexpected changes to context, focus, or scroll position.
- Keep behavior consistent across equivalent components.
- Reduce cognitive load by showing only options needed for the current task.

## Required Accessibility

- Prefer native HTML elements.
- Define an accessible name, role, value, and state.
- Support keyboard interaction whenever pointer interaction exists.
- Maintain a logical focus order.
- Provide a visible and unobscured focus indicator.
- Follow the applicable ARIA pattern when native HTML is insufficient.
- Programmatically associate labels, help text, errors, and descriptions.
- Announce important dynamic changes without causing excessive interruption.
- Meet WCAG 2.2 AA:
  - 4.5:1 for normal text.
  - 3:1 for large text and essential graphics.
- Support 200% browser zoom and text enlargement without loss of functionality.
- Test primary flows with a screen reader.

ARIA does not replace semantics or repair an incorrect interaction model. Use it only when necessary.

## Content and Localization

- Use short, specific, outcome-oriented labels.
- Prefer sentence case.
- Do not use placeholder text as the only label.
- Avoid technical terms, ambiguous abbreviations, and generic text.
- Design for at least 30% text expansion.
- Support empty, long, dynamic, and user-generated content.
- Format dates, times, numbers, and currencies according to locale.
- Consider right-to-left languages when supported by the product.
- Truncate only when the complete content remains available through an accessible method.

## Responsive Behavior

- Work from 320 CSS pixels without page-level horizontal scrolling.
- Prefer reflow and wrapping before hiding or truncating content.
- Define what changes between pointer and touch input.
- Keep critical actions accessible without covering content or the virtual keyboard.
- Account for safe areas on mobile devices.
- Do not use breakpoints to compensate for a rigid structure.

## Required Documentation

Document every component using this structure:

```md
# Component name

## Purpose

## When to use

## When not to use

## Anatomy

## Variants and sizes

## States

## Behavior
### Pointer and touch
### Keyboard
### Focus
### Responsive

## Content

## Accessibility

## Composition
### Allowed
### Not allowed

## API

## Tokens

## Do

## Don't

## Examples

## Tests
```

Examples must demonstrate real decisions. Do not document nonexistent variants or hypothetical cases as if they were part of the API.

## Do

- Start with real needs and use cases.
- Build the smallest API that solves the problem.
- Test extreme content and states from the first prototype.
- Include design, engineering, and accessibility in the contract definition.
- Reuse decisions through semantic tokens.
- Allow controlled composition.
- Document limitations and unresolved decisions.
- Mark components as experimental until they are sufficiently stable.
- Review components after observing their use in products.

## Don't

- Create a complete catalog before real needs exist.
- Copy components from other libraries without validating their fit.
- Add variants "just in case."
- Turn every screen pattern into a shared component.
- Use props to override every visual detail.
- Mix generic presentation with business rules.
- Sacrifice semantics for a specific appearance.
- Omit loading, errors, long content, or keyboard navigation.
- Use visual snapshots as the only testing strategy.
- Declare a component stable without documentation and real consumers.

## Minimum Testing

Every component must cover:

- Primary rendering and behavior.
- Keyboard, pointer, and touch interactions when applicable.
- Accessible name, role, state, and relationships.
- Every supported state.
- Long, empty, and localized content.
- 200% zoom and a 320 CSS pixel viewport.
- Loading, errors, retries, and repeated actions when relevant.
- Integration with supported themes.
- Valid and invalid API combinations.

Prefer behavior tests over implementation-detail tests.

## Review Checklist

- [ ] It solves a validated need.
- [ ] It does not duplicate an existing component or primitive.
- [ ] It has one clear responsibility.
- [ ] Its API is minimal, semantic, and consistent.
- [ ] Its variants and sizes are justified.
- [ ] Its states and recovery paths are defined.
- [ ] It uses semantic tokens.
- [ ] It works with a keyboard and screen reader.
- [ ] It meets contrast and visible-focus requirements.
- [ ] It supports long content, localization, zoom, and responsive layouts.
- [ ] It includes behavior and accessibility tests.
- [ ] It includes documentation, Do, and Don't guidance.
- [ ] It has real consumers before being declared stable.

## Definition of Done

A component is ready when:

1. Its need and scope are validated.
2. Its contract is documented.
3. Its API contains no speculative options.
4. Every applicable state is implemented.
5. It meets accessibility and responsive requirements.
6. It uses system tokens and primitives.
7. Its primary tests pass.
8. Its examples demonstrate correct and incorrect usage.
9. It has no critical usability or accessibility issues.

