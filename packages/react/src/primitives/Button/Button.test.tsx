// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, IconButton } from './Button'

function TestIcon() {
  return <svg data-testid="test-icon" />
}

afterEach(cleanup)

describe('Button', () => {
  it('uses the curated defaults', () => {
    render(<Button>Continue</Button>)

    const button = screen.getByRole('button', { name: 'Continue' })
    expect(button.getAttribute('type')).toBe('button')
    expect(button.getAttribute('data-appearance')).toBe('primary')
    expect(button.getAttribute('data-size')).toBe('md')
  })

  it.each(['primary', 'secondary', 'tertiary'] as const)(
    'renders the %s appearance',
    (appearance) => {
      render(<Button appearance={appearance}>{appearance}</Button>)
      expect(screen.getByRole('button', { name: appearance }).getAttribute('data-appearance')).toBe(
        appearance,
      )
    },
  )

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders the %s size', (size) => {
    render(<Button size={size}>{size}</Button>)
    expect(screen.getByRole('button', { name: size }).getAttribute('data-size')).toBe(size)
  })

  it('supports one icon position without changing the accessible name', () => {
    const { rerender } = render(<Button startIcon={<TestIcon />}>Add item</Button>)

    expect(screen.getByRole('button', { name: 'Add item' })).toBeTruthy()
    expect(screen.getByTestId('test-icon').parentElement?.getAttribute('aria-hidden')).toBe('true')

    rerender(<Button endIcon={<TestIcon />}>Next</Button>)
    expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy()
  })

  it('supports keyboard and pointer activation', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Submit</Button>)

    const button = screen.getByRole('button', { name: 'Submit' })
    await user.click(button)
    button.focus()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('prevents activation when disabled', () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Disabled' })
    fireEvent.click(button)

    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('exposes loading state, preserves its name, and prevents duplicate actions', () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Save changes
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save changes' })
    fireEvent.click(button)

    expect(button.getAttribute('aria-busy')).toBe('true')
    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
    expect(button.querySelector('.rds-button__spinner')).toBeTruthy()
  })
})

describe('IconButton', () => {
  it('uses its required aria-label as the accessible name', () => {
    render(<IconButton icon={<TestIcon />} aria-label="Add item" />)

    const button = screen.getByRole('button', { name: 'Add item' })
    expect(button.classList.contains('rds-icon-button')).toBe(true)
    expect(screen.getByTestId('test-icon')).toBeTruthy()
  })

  it('preserves its accessible name while loading', () => {
    render(<IconButton loading icon={<TestIcon />} aria-label="Refresh results" />)

    const button = screen.getByRole('button', { name: 'Refresh results' })
    expect(button.getAttribute('aria-busy')).toBe('true')
    expect((button as HTMLButtonElement).disabled).toBe(true)
  })
})
