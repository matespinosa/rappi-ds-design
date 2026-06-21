// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pin, PinSkeleton } from './Pin'

afterEach(cleanup)

describe('Pin', () => {
  it('renders one labelled native input and four decorative cells by default', () => {
    const { container } = render(<Pin label="Verification code" />)

    const input = screen.getByRole('textbox', { name: 'Verification code' })
    expect(input.tagName).toBe('INPUT')
    expect(input.getAttribute('inputmode')).toBe('numeric')
    expect(input.getAttribute('autocomplete')).toBe('one-time-code')
    expect(container.querySelectorAll('.rds-pin-input-field__cell')).toHaveLength(4)
    expect(
      container.querySelector('.rds-pin-input-field__cells')?.getAttribute('aria-hidden'),
    ).toBe('true')
  })

  it('supports the six-digit Figma layout', () => {
    const { container } = render(<Pin label="Verification code" length={6} />)

    expect(container.querySelector('.rds-pin-input-field')?.getAttribute('data-length')).toBe('6')
    expect(container.querySelectorAll('.rds-pin-input-field__cell')).toHaveLength(6)
  })

  it('can show its label without changing the accessible name', () => {
    render(<Pin label="Transaction PIN" visuallyHiddenLabel={false} />)

    expect(screen.getByText('Transaction PIN').classList.contains('rds-visually-hidden')).toBe(
      false,
    )
    expect(screen.getByRole('textbox', { name: 'Transaction PIN' })).toBeTruthy()
  })

  it('accepts only digits and limits the value to the configured length', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Pin label="PIN" onValueChange={onValueChange} />)

    const input = screen.getByRole('textbox', { name: 'PIN' }) as HTMLInputElement
    await user.type(input, 'a1b2c345')

    expect(input.value).toBe('1234')
    expect(onValueChange).toHaveBeenLastCalledWith('1234')
  })

  it('supports pasting formatted codes into the single input', async () => {
    const user = userEvent.setup()
    render(<Pin label="Verification code" length={6} />)

    const input = screen.getByRole('textbox', { name: 'Verification code' }) as HTMLInputElement
    await user.click(input)
    await user.paste('12 34-56')

    expect(input.value).toBe('123456')
  })

  it('supports controlled values', async () => {
    const user = userEvent.setup()

    function ControlledPin() {
      const [value, setValue] = useState('')
      return <Pin label="PIN" value={value} onValueChange={setValue} />
    }

    render(<ControlledPin />)
    const input = screen.getByRole('textbox', { name: 'PIN' })
    await user.type(input, '7410')

    expect(input).toHaveProperty('value', '7410')
  })

  it('calls onComplete once for each newly completed value', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<Pin label="PIN" onComplete={onComplete} />)

    const input = screen.getByRole('textbox', { name: 'PIN' })
    await user.type(input, '7410')
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith('7410'))
    expect(onComplete).toHaveBeenCalledTimes(1)

    await user.type(input, '{Backspace}2')
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith('7412'))
    expect(onComplete).toHaveBeenCalledTimes(2)
  })

  it('connects error text and exposes invalid state', () => {
    const { container } = render(<Pin label="PIN" error="Enter the four-digit PIN" />)

    const input = screen.getByRole('textbox', { name: 'PIN' })
    const error = screen.getByText('Enter the four-digit PIN')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toContain(error.id)
    expect(container.querySelector('.rds-pin-input-field')?.hasAttribute('data-invalid')).toBe(true)
  })

  it('uses native disabled, readonly, required, name, and ref behavior', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLInputElement>()
    const { rerender } = render(
      <Pin ref={ref} label="PIN" name="pin" required disabled defaultValue="12" />,
    )

    const disabledInput = screen.getByRole('textbox', { name: 'PIN' }) as HTMLInputElement
    expect(ref.current).toBe(disabledInput)
    expect(disabledInput.name).toBe('pin')
    expect(disabledInput.required).toBe(true)
    expect(disabledInput.disabled).toBe(true)
    await user.type(disabledInput, '34')
    expect(disabledInput.value).toBe('12')

    rerender(<Pin label="PIN" readOnly defaultValue="7410" />)
    expect(screen.getByRole('textbox', { name: 'PIN' })).toHaveProperty('readOnly', true)
  })
})

describe('PinSkeleton', () => {
  it('renders no input or focusable content', () => {
    const { container } = render(<PinSkeleton length={6} />)

    expect(screen.queryByRole('textbox')).toBeNull()
    expect(container.querySelectorAll('.rds-pin-input-skeleton__cell')).toHaveLength(6)
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
  })
})
