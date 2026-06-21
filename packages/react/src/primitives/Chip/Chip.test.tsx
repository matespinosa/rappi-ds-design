// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Chip } from './Chip'

afterEach(cleanup)

describe('Chip', () => {
  it('renders as a button with the label text', () => {
    render(<Chip>Categorías</Chip>)
    expect(screen.getByRole('button', { name: 'Categorías' })).toBeTruthy()
  })

  it('uses safe defaults', () => {
    render(<Chip>Label</Chip>)
    const button = screen.getByRole('button', { name: 'Label' })
    expect(button.getAttribute('type')).toBe('button')
    expect(button.getAttribute('data-size')).toBe('md')
    expect(button.getAttribute('data-variant')).toBe('filled')
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(button.hasAttribute('data-selected')).toBe(false)
    expect(button.hasAttribute('data-shadow')).toBe(false)
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('applies data-size="%s"', (size) => {
    render(<Chip size={size}>{size}</Chip>)
    expect(screen.getByRole('button', { name: size }).getAttribute('data-size')).toBe(size)
  })

  it.each(['filled', 'outline'] as const)('applies data-variant="%s"', (variant) => {
    render(<Chip variant={variant}>{variant}</Chip>)
    expect(screen.getByRole('button', { name: variant }).getAttribute('data-variant')).toBe(variant)
  })

  it('sets aria-pressed=true and data-selected when selected', () => {
    render(<Chip selected>Filtro</Chip>)
    const button = screen.getByRole('button', { name: 'Filtro' })
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.hasAttribute('data-selected')).toBe(true)
  })

  it('sets aria-pressed=false and no data-selected when not selected', () => {
    render(<Chip selected={false}>Filtro</Chip>)
    const button = screen.getByRole('button', { name: 'Filtro' })
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(button.hasAttribute('data-selected')).toBe(false)
  })

  it('sets data-shadow when shadow is true', () => {
    render(<Chip shadow>Label</Chip>)
    expect(screen.getByRole('button', { name: 'Label' }).hasAttribute('data-shadow')).toBe(true)
  })

  it('does not set data-shadow when shadow is false', () => {
    render(<Chip>Label</Chip>)
    expect(screen.getByRole('button', { name: 'Label' }).hasAttribute('data-shadow')).toBe(false)
  })

  it('renders startIcon with aria-hidden', () => {
    render(
      <Chip startIcon={<svg data-testid="start-icon" />}>Label</Chip>,
    )
    const icon = screen.getByTestId('start-icon').closest('.rds-chip__icon')
    expect(icon?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders endIcon with aria-hidden', () => {
    render(
      <Chip endIcon={<svg data-testid="end-icon" />}>Label</Chip>,
    )
    const icon = screen.getByTestId('end-icon').closest('.rds-chip__icon')
    expect(icon?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders badge with aria-hidden', () => {
    render(<Chip badge={3}>Label</Chip>)
    const badge = screen.getByRole('button', { name: 'Label' }).querySelector('.rds-chip__badge')
    expect(badge?.getAttribute('aria-hidden')).toBe('true')
  })

  it('does not render badge when badge is null/undefined', () => {
    render(<Chip>Label</Chip>)
    expect(
      screen.getByRole('button', { name: 'Label' }).querySelector('.rds-chip__badge'),
    ).toBeNull()
  })

  it('activates via click and fires onClick', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Chip onClick={onClick}>Label</Chip>)
    await user.click(screen.getByRole('button', { name: 'Label' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('activates via Space key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Chip onClick={onClick}>Label</Chip>)
    screen.getByRole('button', { name: 'Label' }).focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('activates via Enter key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Chip onClick={onClick}>Label</Chip>)
    screen.getByRole('button', { name: 'Label' }).focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn()
    render(
      <Chip disabled onClick={onClick}>
        Label
      </Chip>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Label' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('is disabled when the disabled prop is set', () => {
    render(<Chip disabled>Label</Chip>)
    expect(
      (screen.getByRole('button', { name: 'Label' }) as HTMLButtonElement).disabled,
    ).toBe(true)
  })

  it('merges additional className', () => {
    render(<Chip className="custom">Label</Chip>)
    const el = screen.getByRole('button', { name: 'Label' })
    expect(el.classList.contains('rds-chip')).toBe(true)
    expect(el.classList.contains('custom')).toBe(true)
  })

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Chip ref={ref}>Label</Chip>)
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('forwards arbitrary native attributes', () => {
    render(<Chip data-testid="chip-el" name="filter">Label</Chip>)
    expect(screen.getByTestId('chip-el').getAttribute('name')).toBe('filter')
  })
})
