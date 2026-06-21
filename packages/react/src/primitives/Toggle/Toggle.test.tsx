// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from './Toggle'

afterEach(cleanup)

describe('Toggle', () => {
  it('renders as a switch button', () => {
    render(<Toggle aria-label="Enable notifications" />)
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeTruthy()
  })

  it('applies rds-toggle class', () => {
    render(<Toggle aria-label="Toggle" />)
    expect(screen.getByRole('switch', { name: 'Toggle' }).className).toContain('rds-toggle')
  })

  it('sets aria-checked=false by default', () => {
    render(<Toggle aria-label="Toggle" />)
    const el = screen.getByRole('switch', { name: 'Toggle' })
    expect(el.getAttribute('aria-checked')).toBe('false')
  })

  it('sets aria-checked=true and data-checked when checked', () => {
    render(<Toggle aria-label="Toggle" checked />)
    const el = screen.getByRole('switch', { name: 'Toggle' })
    expect(el.getAttribute('aria-checked')).toBe('true')
    expect(el.hasAttribute('data-checked')).toBe(true)
  })

  it('does not set data-checked when unchecked', () => {
    render(<Toggle aria-label="Toggle" checked={false} />)
    expect(screen.getByRole('switch', { name: 'Toggle' }).hasAttribute('data-checked')).toBe(false)
  })

  it('sets data-size attribute', () => {
    render(<Toggle aria-label="Toggle" size="md" />)
    expect(screen.getByRole('switch', { name: 'Toggle' }).getAttribute('data-size')).toBe('md')
  })

  it('defaults to size lg', () => {
    render(<Toggle aria-label="Toggle" />)
    expect(screen.getByRole('switch', { name: 'Toggle' }).getAttribute('data-size')).toBe('lg')
  })

  it('is not interactive when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Toggle aria-label="Toggle" disabled onClick={onClick} />)

    const el = screen.getByRole('switch', { name: 'Toggle' }) as HTMLButtonElement
    await user.click(el)

    expect(onClick).not.toHaveBeenCalled()
    expect(el.disabled).toBe(true)
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Toggle aria-label="Toggle" onClick={onClick} />)

    await user.click(screen.getByRole('switch', { name: 'Toggle' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('can be toggled via Space key', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Toggle aria-label="Toggle" onClick={onClick} />)

    screen.getByRole('switch', { name: 'Toggle' }).focus()
    await user.keyboard(' ')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('merges additional className', () => {
    render(<Toggle aria-label="Toggle" className="extra" />)
    const el = screen.getByRole('switch', { name: 'Toggle' })
    expect(el.classList.contains('rds-toggle')).toBe(true)
    expect(el.classList.contains('extra')).toBe(true)
  })

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Toggle ref={ref} aria-label="Ref test" />)
    expect(ref.current?.tagName).toBe('BUTTON')
    expect(ref.current?.getAttribute('role')).toBe('switch')
  })

  it('forwards arbitrary native attributes', () => {
    render(<Toggle aria-label="Toggle" data-testid="my-toggle" />)
    expect(screen.getByTestId('my-toggle')).toBeTruthy()
  })
})
