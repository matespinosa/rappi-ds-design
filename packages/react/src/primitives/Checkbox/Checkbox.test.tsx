// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

afterEach(cleanup)

describe('Checkbox', () => {
  it('renders as a native checkbox', () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeTruthy()
  })

  it('applies rds-checkbox class', () => {
    render(<Checkbox aria-label="Agree" />)
    expect(screen.getByRole('checkbox', { name: 'Agree' }).className).toContain('rds-checkbox')
  })

  it('merges additional className', () => {
    render(<Checkbox aria-label="Agree" className="extra" />)
    const el = screen.getByRole('checkbox', { name: 'Agree' })
    expect(el.classList.contains('rds-checkbox')).toBe(true)
    expect(el.classList.contains('extra')).toBe(true)
  })

  it('does not set data-indeterminate when indeterminate is false', () => {
    render(<Checkbox aria-label="Agree" />)
    expect(screen.getByRole('checkbox', { name: 'Agree' }).hasAttribute('data-indeterminate')).toBe(
      false,
    )
  })

  it('sets data-indeterminate and the DOM property when indeterminate is true', () => {
    render(<Checkbox aria-label="Select all" indeterminate />)
    const el = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement
    expect(el.hasAttribute('data-indeterminate')).toBe(true)
    expect(el.indeterminate).toBe(true)
  })

  it('clears the indeterminate DOM property when prop changes to false', () => {
    const { rerender } = render(<Checkbox aria-label="Select all" indeterminate />)
    rerender(<Checkbox aria-label="Select all" indeterminate={false} />)
    const el = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement
    expect(el.indeterminate).toBe(false)
    expect(el.hasAttribute('data-indeterminate')).toBe(false)
  })

  it('can be checked and unchecked via keyboard', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox aria-label="Newsletter" onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox', { name: 'Newsletter' })
    checkbox.focus()
    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('is not interactive when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox aria-label="Disabled" disabled onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox', { name: 'Disabled' }) as HTMLInputElement
    await user.click(checkbox)

    expect(onChange).not.toHaveBeenCalled()
    expect(checkbox.disabled).toBe(true)
  })

  it('renders as checked when checked prop is set', () => {
    render(<Checkbox aria-label="Checked" checked onChange={() => undefined} />)
    const el = screen.getByRole('checkbox', { name: 'Checked' }) as HTMLInputElement
    expect(el.checked).toBe(true)
  })

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Checkbox ref={ref} aria-label="Ref test" />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('checkbox')
  })

  it('forwards arbitrary native attributes', () => {
    render(<Checkbox aria-label="Data attr" data-testid="my-checkbox" name="agree" />)
    const el = screen.getByTestId('my-checkbox') as HTMLInputElement
    expect(el.name).toBe('agree')
  })
})
