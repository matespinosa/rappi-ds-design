# TextFieldPhone

## Purpose

Collects an international phone number through a country calling-code selector and a native telephone input.

## Anatomy

- Visible label associated with the phone input.
- Country flag and calling code.
- Native `<select>` covering the country trigger.
- Native `<input type="tel">`.
- Optional clear button.
- Helper text or error text.

## States

Default, focus, filled, disabled, readonly, and invalid appearances derive from native state and content. Loading uses the separate `TextFieldPhoneSkeleton`.

## Accessibility

- The phone input has a persistent label.
- The country trigger is a native select with its own accessible label.
- Helper/error text is connected with `aria-describedby`.
- Errors set `aria-invalid`.
- Disabled and required behavior remains native.
- Readonly disables country changes because HTML select has no readonly state.
- The clear action is a named button and returns focus to the input.

## API

- `label: ReactNode`
- `countries: readonly TextFieldPhoneCountry[]`
- `countryCode: string`
- `onCountryChange?: (country, event) => void`
- `countrySelectLabel?: string`
- `countrySelectName?: string`
- `value?: string`
- `defaultValue?: string`
- `helperText?: ReactNode`
- `error?: ReactNode`
- `clearable?: boolean`
- `onClear?: () => void`
- `containerClassName?: string`
- `visuallyHiddenLabel?: boolean`
- Native input attributes except conflicting `children`, `size`, `type`, `value`, and `defaultValue`.

Each country contains `code`, `callingCode`, `name`, and an optional visual `flag`.

## Data handling

The component intentionally does not format or validate phone numbers. Applications should combine the selected calling code with the national number, normalize it to E.164, and validate it with a phone-number library before submission.

For a controlled value, `onClear` must update the parent value. For an uncontrolled value, the component clears its own state and then calls `onClear`.

## Example

```tsx
const countries = [
  { code: 'CO', callingCode: '+57', name: 'Colombia', flag: <ColombiaFlag /> },
  { code: 'MX', callingCode: '+52', name: 'Mexico', flag: <MexicoFlag /> },
]

<TextFieldPhone
  label="Phone number"
  countries={countries}
  countryCode="CO"
  onCountryChange={(country) => setCountryCode(country.code)}
  name="phone"
  autoComplete="tel-national"
  helperText="We will use this number for order updates"
/>
```
