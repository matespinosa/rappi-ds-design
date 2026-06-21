// @vitest-environment jsdom
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog, BottomSheet } from './Dialog'

afterEach(cleanup)

// ─── Dialog — structure ───────────────────────────────────────────────────────

describe('Dialog — structure', () => {
  it('renders role=dialog with aria-modal when open', () => {
    render(<Dialog open title="Test" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeTruthy()
    expect(dialog.getAttribute('aria-modal')).toBe('true')
  })

  it('does not render when open=false', () => {
    render(<Dialog open={false} title="Test" />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows title in an h2 element', () => {
    render(<Dialog open title="My Dialog" />)
    const h2 = screen.getByRole('heading', { level: 2, name: 'My Dialog' })
    expect(h2).toBeTruthy()
  })

  it('aria-labelledby points to the title element', () => {
    render(<Dialog open title="My Dialog" />)
    const dialog = screen.getByRole('dialog')
    const titleId = dialog.getAttribute('aria-labelledby')!
    expect(document.getElementById(titleId)?.textContent).toBe('My Dialog')
  })

  it('shows description when provided', () => {
    render(<Dialog open title="T" description="Description text" />)
    expect(screen.getByText('Description text')).toBeTruthy()
  })

  it('aria-describedby points to the description when provided', () => {
    render(<Dialog open title="T" description="Desc" />)
    const dialog = screen.getByRole('dialog')
    const descId = dialog.getAttribute('aria-describedby')!
    expect(document.getElementById(descId)?.textContent).toBe('Desc')
  })

  it('does not set aria-describedby when no description', () => {
    render(<Dialog open title="T" />)
    expect(screen.getByRole('dialog').getAttribute('aria-describedby')).toBeNull()
  })

  it('renders children inside content slot', () => {
    render(
      <Dialog open title="T">
        <span data-testid="child" />
      </Dialog>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('forwards ref to the panel element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Dialog open title="T" ref={ref} />)
    expect(ref.current?.getAttribute('role')).toBe('dialog')
  })

  it('merges className on the panel', () => {
    render(<Dialog open title="T" className="custom" />)
    expect(screen.getByRole('dialog').classList.contains('custom')).toBe(true)
  })

  it('applies data-elevation=true when elevation=true', () => {
    render(<Dialog open title="T" elevation />)
    expect(screen.getByRole('dialog').getAttribute('data-elevation')).toBe('true')
  })
})

// ─── Dialog — close button ────────────────────────────────────────────────────

describe('Dialog — close button', () => {
  it('renders close button with aria-label=Cerrar', () => {
    render(<Dialog open title="T" />)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeTruthy()
  })

  it('close button calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog open title="T" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('Escape key calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog open title="T" onClose={onClose} />)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })
})

// ─── Dialog — footer ─────────────────────────────────────────────────────────

describe('Dialog — footer', () => {
  it('shows footer buttons by default', () => {
    render(<Dialog open title="T" primaryLabel="OK" secondaryLabel="Cancel" />)
    expect(screen.getByRole('button', { name: 'OK' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy()
  })

  it('hides footer when showFooter=false', () => {
    render(<Dialog open title="T" showFooter={false} />)
    // Only the close button should remain
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('primary button calls onPrimary', async () => {
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    render(<Dialog open title="T" primaryLabel="OK" onPrimary={onPrimary} />)
    await user.click(screen.getByRole('button', { name: 'OK' }))
    expect(onPrimary).toHaveBeenCalledOnce()
  })

  it('secondary button calls onSecondary', async () => {
    const user = userEvent.setup()
    const onSecondary = vi.fn()
    render(<Dialog open title="T" secondaryLabel="Cancel" onSecondary={onSecondary} />)
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onSecondary).toHaveBeenCalledOnce()
  })
})

// ─── BottomSheet — structure ──────────────────────────────────────────────────

describe('BottomSheet — structure', () => {
  it('renders role=dialog with aria-modal when open', () => {
    render(<BottomSheet open title="Sheet" />)
    const dialog = screen.getByRole('dialog')
    expect(dialog.getAttribute('aria-modal')).toBe('true')
  })

  it('does not render when open=false', () => {
    render(<BottomSheet open={false} title="Sheet" />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows title in an h2', () => {
    render(<BottomSheet open title="My Sheet" />)
    expect(screen.getByRole('heading', { level: 2, name: 'My Sheet' })).toBeTruthy()
  })

  it('aria-labelledby points to the title', () => {
    render(<BottomSheet open title="My Sheet" />)
    const dialog = screen.getByRole('dialog')
    const titleId = dialog.getAttribute('aria-labelledby')!
    expect(document.getElementById(titleId)?.textContent).toBe('My Sheet')
  })

  it('renders children in content slot', () => {
    render(
      <BottomSheet open title="T">
        <span data-testid="child" />
      </BottomSheet>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('forwards ref to the panel element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<BottomSheet open title="T" ref={ref} />)
    expect(ref.current?.getAttribute('role')).toBe('dialog')
  })
})

// ─── BottomSheet — grabber ────────────────────────────────────────────────────

describe('BottomSheet — grabber', () => {
  it('renders grabber by default', () => {
    render(<BottomSheet open title="T" />)
    expect(document.querySelector('.rds-bottom-sheet__grabber')).toBeTruthy()
  })

  it('hides grabber when grabber=false', () => {
    render(<BottomSheet open title="T" grabber={false} />)
    expect(document.querySelector('.rds-bottom-sheet__grabber')).toBeNull()
  })
})

// ─── BottomSheet — size ───────────────────────────────────────────────────────

describe('BottomSheet — size', () => {
  it('defaults to data-size=hug', () => {
    render(<BottomSheet open title="T" />)
    expect(screen.getByRole('dialog').getAttribute('data-size')).toBe('hug')
  })

  it('applies data-size=half', () => {
    render(<BottomSheet open title="T" size="half" />)
    expect(screen.getByRole('dialog').getAttribute('data-size')).toBe('half')
  })

  it('applies data-size=full', () => {
    render(<BottomSheet open title="T" size="full" />)
    expect(screen.getByRole('dialog').getAttribute('data-size')).toBe('full')
  })
})

// ─── BottomSheet — footer and close ──────────────────────────────────────────

describe('BottomSheet — footer and close', () => {
  it('shows footer by default with Confirmar and Cancelar', () => {
    render(<BottomSheet open title="T" />)
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeTruthy()
  })

  it('hides footer when showFooter=false', () => {
    render(<BottomSheet open title="T" showFooter={false} />)
    expect(screen.queryByRole('button', { name: 'Confirmar' })).toBeNull()
  })

  it('close button calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<BottomSheet open title="T" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('Escape key calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<BottomSheet open title="T" onClose={onClose} />)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('primary button calls onPrimary', async () => {
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    render(<BottomSheet open title="T" primaryLabel="Confirmar" onPrimary={onPrimary} />)
    await user.click(screen.getByRole('button', { name: 'Confirmar' }))
    expect(onPrimary).toHaveBeenCalledOnce()
  })

  it('secondary button calls onSecondary', async () => {
    const user = userEvent.setup()
    const onSecondary = vi.fn()
    render(<BottomSheet open title="T" secondaryLabel="Cancelar" onSecondary={onSecondary} />)
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onSecondary).toHaveBeenCalledOnce()
  })

  it('custom labels override defaults', () => {
    render(<BottomSheet open title="T" primaryLabel="Guardar" secondaryLabel="Volver" />)
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Volver' })).toBeTruthy()
  })
})
