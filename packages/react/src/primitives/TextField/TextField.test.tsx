// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextField, TextFieldSkeleton } from './TextField'

afterEach(cleanup)

describe('TextField', () => {
  it('associates its visible label with the native input', () => {
    render(<TextField label="Store name" />)

    const input = screen.getByRole('textbox', { name: 'Store name' })
    expect(input.tagName).toBe('INPUT')
    expect(input.getAttribute('id')).toBeTruthy()
  })

  it('focuses the input when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<TextField label="Store name" />)

    await user.click(screen.getByText('Store name'))

    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Store name' }))
  })

  it('can visually hide the label while preserving the accessible name', () => {
    render(<TextField label="Search stores" visuallyHiddenLabel />)

    const input = screen.getByRole('textbox', { name: 'Search stores' })
    const label = document.querySelector('.rds-text-field__label')

    expect(input).toBeTruthy()
    expect(label?.classList.contains('rds-visually-hidden')).toBe(true)
  })

  it('supports both Figma sizes', () => {
    const { rerender } = render(
      <TextField label="Store name" fieldSize="sm" containerClassName="field" />,
    )
    expect(document.querySelector('.field')?.getAttribute('data-size')).toBe('sm')

    rerender(<TextField label="Store name" fieldSize="md" containerClassName="field" />)
    expect(document.querySelector('.field')?.getAttribute('data-size')).toBe('md')
  })

  it('supports uncontrolled typing', async () => {
    const user = userEvent.setup()
    render(<TextField label="Store name" />)

    const input = screen.getByRole('textbox', { name: 'Store name' }) as HTMLInputElement
    await user.type(input, 'Rappi Burgers')

    expect(input.value).toBe('Rappi Burgers')
  })

  it('supports controlled values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function ControlledField() {
      const [value, setValue] = useState('')
      return (
        <TextField
          label="Store name"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            onChange(event)
          }}
        />
      )
    }

    render(<ControlledField />)
    await user.type(screen.getByRole('textbox', { name: 'Store name' }), 'Rappi')

    expect(screen.getByRole('textbox', { name: 'Store name' })).toHaveProperty('value', 'Rappi')
    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it('connects helper text through aria-describedby', () => {
    render(<TextField label="Store name" helperText="Shown to customers" />)

    const input = screen.getByRole('textbox', { name: 'Store name' })
    const helper = screen.getByText('Shown to customers')

    expect(input.getAttribute('aria-describedby')).toContain(helper.id)
  })

  it('prioritizes error text and exposes invalid state', () => {
    render(
      <TextField label="Store name" helperText="Shown to customers" error="Enter a store name" />,
    )

    const input = screen.getByRole('textbox', { name: 'Store name' })
    const error = screen.getByText('Enter a store name')

    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toContain(error.id)
    expect(screen.queryByText('Shown to customers')).toBeNull()
  })

  it('preserves an external aria-describedby id', () => {
    render(
      <>
        <span id="external-description">External guidance</span>
        <TextField
          label="Store name"
          helperText="Local guidance"
          aria-describedby="external-description"
        />
      </>,
    )

    const describedBy = screen
      .getByRole('textbox', { name: 'Store name' })
      .getAttribute('aria-describedby')

    expect(describedBy).toContain('external-description')
    expect(describedBy).toContain(screen.getByText('Local guidance').id)
  })

  it('uses native required, disabled, and readOnly behavior', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { unmount } = render(<TextField label="Store name" required disabled />)

    const disabledInput = screen.getByRole('textbox', { name: /Store name/ }) as HTMLInputElement
    expect(disabledInput.required).toBe(true)
    expect(disabledInput.disabled).toBe(true)
    await user.type(disabledInput, 'Ignored')
    expect(disabledInput.value).toBe('')

    unmount()
    render(<TextField label="Store name" readOnly value="Rappi" onChange={onChange} />)
    const readOnlyInput = screen.getByRole('textbox', { name: 'Store name' }) as HTMLInputElement
    expect(readOnlyInput.readOnly).toBe(true)
    await user.type(readOnlyInput, ' ignored')
    expect(readOnlyInput.value).toBe('Rappi')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders composable adornments without changing the label association', () => {
    render(
      <TextField
        label="Amount"
        startAdornment={<span data-testid="currency">$</span>}
        endAdornment={<button type="button">Clear amount</button>}
      />,
    )

    expect(screen.getByTestId('currency')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Clear amount' })).toBeTruthy()
    expect(screen.getByRole('textbox', { name: 'Amount' })).toBeTruthy()
  })

  it('forwards refs, native attributes, and classes to the input', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <TextField
        ref={ref}
        label="Email"
        type="email"
        autoComplete="email"
        className="custom-input"
        data-testid="email"
      />,
    )

    expect(ref.current).toBe(screen.getByTestId('email'))
    expect(ref.current?.type).toBe('email')
    expect(ref.current?.autocomplete).toBe('email')
    expect(ref.current?.classList.contains('custom-input')).toBe(true)
  })
})

describe('TextFieldSkeleton', () => {
  it('renders no textbox or focusable content', () => {
    const { container } = render(<TextFieldSkeleton />)

    expect(screen.queryByRole('textbox')).toBeNull()
    expect(container.querySelector('input')).toBeNull()
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('supports size and optional placeholder regions', () => {
    const { container } = render(
      <TextFieldSkeleton size="sm" showLabel={false} showHelperText={false} />,
    )

    const skeleton = container.firstElementChild
    expect(skeleton?.getAttribute('data-size')).toBe('sm')
    expect(container.querySelector('.rds-text-field-skeleton__label')).toBeNull()
    expect(container.querySelector('.rds-text-field-skeleton__helper')).toBeNull()
  })
})
