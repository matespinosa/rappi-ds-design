// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Drawer } from './Drawer'

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
})

describe('Drawer', () => {
  it('renders a labelled modal dialog when open', () => {
    render(<Drawer open title="Order details" />)

    const drawer = screen.getByRole('dialog', { name: 'Order details' })
    expect(drawer.getAttribute('aria-modal')).toBe('true')
    expect(screen.getByRole('heading', { level: 2 })).toBeTruthy()
  })

  it('does not render when initially closed', () => {
    render(<Drawer open={false} title="Order details" />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders the %s Figma size', (size) => {
    render(<Drawer open title="Order details" size={size} />)
    expect(screen.getByRole('dialog').getAttribute('data-size')).toBe(size)
  })

  it('forwards the ref and className to the panel', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Drawer ref={ref} open title="Order details" className="custom" />)

    expect(ref.current).toBe(screen.getByRole('dialog'))
    expect(ref.current?.classList.contains('custom')).toBe(true)
  })

  it('renders content and the Figma action pair by default', () => {
    render(
      <Drawer open title="Order details">
        <p>Drawer content</p>
      </Drawer>,
    )

    expect(screen.getByText('Drawer content')).toBeTruthy()
    expect(screen.getByText('Drawer content').closest('.rds-drawer__content')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Primary' })).toBeTruthy()
  })

  it('supports hiding individual footer actions or the whole footer', () => {
    const { rerender } = render(<Drawer open title="Order details" showSecondaryAction={false} />)

    expect(screen.queryByRole('button', { name: 'Secondary' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Primary' })).toBeTruthy()

    rerender(<Drawer open title="Order details" showPrimaryAction={false} />)
    expect(screen.queryByRole('button', { name: 'Primary' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeTruthy()

    rerender(
      <Drawer
        open
        title="Order details"
        showPrimaryAction={false}
        showSecondaryAction={false}
      />,
    )
    expect(screen.queryByRole('button', { name: 'Primary' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Secondary' })).toBeNull()

    rerender(<Drawer open title="Order details" showFooter={false} />)
    expect(screen.queryByRole('button', { name: 'Primary' })).toBeNull()
  })

  it('calls the corresponding action handlers', async () => {
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    const onSecondary = vi.fn()
    render(
      <Drawer
        open
        title="Order details"
        primaryLabel="Save"
        secondaryLabel="Cancel"
        onPrimary={onPrimary}
        onSecondary={onSecondary}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSecondary).toHaveBeenCalledOnce()
    expect(onPrimary).toHaveBeenCalledOnce()
  })

  it('closes from its button, Escape key, and scrim', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Drawer open title="Order details" onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    await user.keyboard('{Escape}')
    await user.click(document.querySelector('.rds-drawer__scrim') as HTMLElement)

    expect(onClose).toHaveBeenCalledTimes(3)
  })

  it('can ignore scrim clicks and customize the close label', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Drawer
        open
        title="Order details"
        onClose={onClose}
        closeOnScrimClick={false}
        closeLabel="Dismiss drawer"
      />,
    )

    await user.click(document.querySelector('.rds-drawer__scrim') as HTMLElement)
    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Dismiss drawer' })).toBeTruthy()
  })

  it('locks body scrolling while open', () => {
    const { rerender } = render(<Drawer open title="Order details" />)
    expect(document.body.style.overflow).toBe('hidden')

    rerender(<Drawer open={false} title="Order details" />)
    expect(document.body.style.overflow).toBe('')
  })
})
