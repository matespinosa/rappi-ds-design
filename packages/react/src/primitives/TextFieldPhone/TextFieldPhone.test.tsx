// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  TextFieldPhone,
  TextFieldPhoneSkeleton,
  type TextFieldPhoneCountry,
} from './TextFieldPhone'

const countries: readonly TextFieldPhoneCountry[] = [
  { code: 'CO', callingCode: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: 'MX', callingCode: '+52', name: 'Mexico', flag: '🇲🇽' },
]

afterEach(cleanup)

describe('TextFieldPhone', () => {
  it('associates its label with a native telephone input', () => {
    render(<TextFieldPhone label="Phone number" countries={countries} countryCode="CO" />)

    const input = screen.getByRole('textbox', { name: 'Phone number' }) as HTMLInputElement
    expect(input.type).toBe('tel')
    expect(input.inputMode).toBe('tel')
    expect(input.autocomplete).toBe('tel-national')
  })

  it('renders a native, independently labelled country selector', () => {
    render(<TextFieldPhone label="Phone number" countries={countries} countryCode="CO" />)

    const select = screen.getByRole('combobox', { name: 'Country calling code' })
    expect(select.tagName).toBe('SELECT')
    expect(select).toHaveProperty('value', 'CO')
    expect(screen.getByText('+57')).toBeTruthy()
  })

  it('reports the selected country to the consumer', async () => {
    const user = userEvent.setup()
    const onCountryChange = vi.fn()
    render(
      <TextFieldPhone
        label="Phone number"
        countries={countries}
        countryCode="CO"
        onCountryChange={onCountryChange}
      />,
    )

    await user.selectOptions(screen.getByRole('combobox'), 'MX')

    expect(onCountryChange).toHaveBeenCalledTimes(1)
    expect(onCountryChange.mock.calls[0][0]).toEqual(countries[1])
  })

  it('supports uncontrolled typing and clearing while returning focus', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(
      <TextFieldPhone
        label="Phone number"
        countries={countries}
        countryCode="CO"
        onClear={onClear}
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Phone number' }) as HTMLInputElement
    await user.type(input, '3004501212')
    await user.click(screen.getByRole('button', { name: 'Clear phone number' }))

    expect(input.value).toBe('')
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(input)
  })

  it('supports a controlled phone value and delegated clear action', async () => {
    const user = userEvent.setup()

    function ControlledInput() {
      const [phone, setPhone] = useState('3004501212')
      return (
        <TextFieldPhone
          label="Phone number"
          countries={countries}
          countryCode="CO"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          onClear={() => setPhone('')}
        />
      )
    }

    render(<ControlledInput />)
    await user.click(screen.getByRole('button', { name: 'Clear phone number' }))

    expect(screen.getByRole('textbox', { name: 'Phone number' })).toHaveProperty('value', '')
  })

  it('connects helper and error text and exposes invalid state', () => {
    const { rerender } = render(
      <TextFieldPhone
        label="Phone number"
        countries={countries}
        countryCode="CO"
        helperText="Include your mobile number"
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Phone number' })
    expect(input.getAttribute('aria-describedby')).toContain(
      screen.getByText('Include your mobile number').id,
    )

    rerender(
      <TextFieldPhone
        label="Phone number"
        countries={countries}
        countryCode="CO"
        helperText="Include your mobile number"
        error="Enter a valid phone number"
      />,
    )

    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toContain(
      screen.getByText('Enter a valid phone number').id,
    )
    expect(screen.queryByText('Include your mobile number')).toBeNull()
  })

  it('uses native required and disabled behavior for both controls', () => {
    render(
      <TextFieldPhone
        label="Phone number"
        countries={countries}
        countryCode="CO"
        required
        disabled
      />,
    )

    const input = screen.getByRole('textbox', { name: /Phone number/ }) as HTMLInputElement
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(input.required).toBe(true)
    expect(input.disabled).toBe(true)
    expect(select.disabled).toBe(true)
  })

  it('keeps the phone readonly and prevents country changes', () => {
    render(
      <TextFieldPhone
        label="Phone number"
        countries={countries}
        countryCode="CO"
        defaultValue="3004501212"
        readOnly
      />,
    )

    expect(screen.getByRole('textbox', { name: 'Phone number' })).toHaveProperty('readOnly', true)
    expect(screen.getByRole('combobox')).toHaveProperty('disabled', true)
    expect(screen.queryByRole('button', { name: 'Clear phone number' })).toBeNull()
  })

  it('forwards its ref, native attributes, and input class', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <TextFieldPhone
        ref={ref}
        label="Phone number"
        countries={countries}
        countryCode="CO"
        name="phone"
        className="custom-input"
        data-testid="phone"
      />,
    )

    expect(ref.current).toBe(screen.getByTestId('phone'))
    expect(ref.current?.name).toBe('phone')
    expect(ref.current?.classList.contains('custom-input')).toBe(true)
  })
})

describe('TextFieldPhoneSkeleton', () => {
  it('renders no form controls or focusable content', () => {
    const { container } = render(<TextFieldPhoneSkeleton />)

    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.queryByRole('combobox')).toBeNull()
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})
