# Pin

## Purpose

Collects a four- or six-digit PIN or one-time verification code while preserving native input, paste, autofill, and assistive-technology behavior.

## When to use

Use for short numeric verification codes, transaction PINs, or one-time passwords.

## When not to use

Use `TextField` for general numeric values and a password field for account passwords. Do not use PIN entry for codes longer than six digits.

## Anatomy

- Required label, visually hidden by default.
- One native numeric text input.
- Four or six decorative visual cells.
- Optional error message.

## Variants and sizes

- `length={4}`: four 60px cells.
- `length={6}`: six 40px cells.

The supported lengths come directly from the Figma component. Arbitrary lengths are intentionally not exposed.

## States

Empty, partial, complete, focused, disabled, readonly, and invalid states derive from native props and current value. Loading uses the separate `PinSkeleton`.

## Behavior

### Pointer and touch

The complete cell region is a single native input target. Tapping anywhere focuses the input and opens the numeric keyboard on supported devices.

### Keyboard

Uses native single-input editing. Users can type, paste, select, replace, and delete the code without manually moving between cells.

### Focus

The next empty cell receives the strong focus border. When complete, the final cell remains active while the input has focus.

### Responsive

The control fills up to 375px and preserves the Figma 32px inline padding. Both lengths fit within a 320px viewport without horizontal scrolling.

## Content

The label must identify the code's purpose, for example “Verification code”. Error text must explain recovery, such as “Enter the six-digit code”.

## Accessibility

- Uses one native input rather than one input per digit.
- Requires a programmatic label.
- Defaults to `inputMode="numeric"` and `autoComplete="one-time-code"`.
- Invalid state is exposed through `aria-invalid`.
- Error text is connected through `aria-describedby`.
- Visual cells are hidden from assistive technology.
- Entered digits remain `ink-strong` during errors; the border and message communicate the error with better text contrast than the Figma example.

## Composition

### Allowed

Place inside forms and pair with contextual instructions, resend actions, or submit buttons.

### Not allowed

Do not add interactive content inside the cell region. Do not use external code to move focus between visual cells.

## API

- `label: ReactNode`
- `length?: 4 | 6`
- `value?: string`
- `defaultValue?: string`
- `onValueChange?: (value: string) => void`
- `onComplete?: (value: string) => void`
- `error?: ReactNode`
- `containerClassName?: string`
- `visuallyHiddenLabel?: boolean`
- Native input attributes except conflicting value, change, type, size, pattern, input mode, and max length attributes.

`PinSkeleton` supports `length` and `className`.

## Tokens

Uses `--pin-input-*` geometry tokens and semantic ink, surface, border, skeleton, typography, spacing, and radius tokens.

## Do

- Use a specific label.
- Allow password managers and OS code autofill.
- Validate the complete code in product logic.
- Use controlled or uncontrolled state consistently.

## Don't

- Do not create one input per digit.
- Do not expose focus or completion as visual props.
- Do not accept non-numeric content.
- Do not disable paste.
- Do not use a disabled input as a loading state.

## Examples

```tsx
<Pin
  label="Six-digit verification code"
  length={6}
  name="verificationCode"
  onComplete={verifyCode}
/>

<Pin
  label="Transaction PIN"
  value={pin}
  onValueChange={setPin}
  error={errorMessage}
/>
```

## Tests

Tests cover accessible naming, four and six digit layouts, numeric filtering, controlled and uncontrolled state, paste, completion, errors, native disabled/readonly behavior, refs, and skeleton semantics.
