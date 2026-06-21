// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip, type TooltipArrowPosition } from './Tooltip'

afterEach(cleanup)

const ARROW_POSITIONS: TooltipArrowPosition[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
]

// ─── Structure ───────────────────────────────────────────────────────────────

describe('Tooltip — structure', () => {
  it('renders the children text', () => {
    render(<Tooltip>Mensaje de ayuda</Tooltip>)
    expect(screen.getByText('Mensaje de ayuda')).toBeTruthy()
  })

  it('renders ReactNode children', () => {
    render(<Tooltip><strong data-testid="bold">Texto</strong></Tooltip>)
    expect(screen.getByTestId('bold')).toBeTruthy()
  })

  it('has class rds-tooltip on the root div', () => {
    const { container } = render(<Tooltip>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip')).toBeTruthy()
  })

  it('applies extra className to the root', () => {
    const { container } = render(<Tooltip className="extra">Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip')?.classList.contains('extra')).toBe(true)
  })

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Tooltip ref={ref}>Texto</Tooltip>)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.classList.contains('rds-tooltip')).toBe(true)
  })

  it('forwards arbitrary HTML attributes', () => {
    const { container } = render(<Tooltip data-testid="tt">Texto</Tooltip>)
    expect(container.querySelector('[data-testid="tt"]')).toBeTruthy()
  })
})

// ─── Arrow ────────────────────────────────────────────────────────────────────

describe('Tooltip — arrow', () => {
  it('does not set data-arrow when arrowPosition is omitted', () => {
    const { container } = render(<Tooltip>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip')?.hasAttribute('data-arrow')).toBe(false)
  })

  it.each(ARROW_POSITIONS)('sets data-arrow="%s" correctly', (pos) => {
    const { container } = render(<Tooltip arrowPosition={pos}>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip')?.getAttribute('data-arrow')).toBe(pos)
  })
})

// ─── Left icon slot ───────────────────────────────────────────────────────────

describe('Tooltip — left icon', () => {
  it('renders no icon slot when icon is omitted', () => {
    const { container } = render(<Tooltip>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip__icon')).toBeNull()
  })

  it('renders icon inside the icon slot', () => {
    render(<Tooltip icon={<svg data-testid="icon" />}>Texto</Tooltip>)
    expect(screen.getByTestId('icon')).toBeTruthy()
  })

  it('icon slot has aria-hidden', () => {
    const { container } = render(<Tooltip icon={<svg />}>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip__icon')?.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Close button ─────────────────────────────────────────────────────────────

describe('Tooltip — close button', () => {
  it('renders no close button when onClose is omitted', () => {
    render(<Tooltip>Texto</Tooltip>)
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull()
  })

  it('renders close button when onClose is provided', () => {
    render(<Tooltip onClose={() => {}}>Texto</Tooltip>)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeTruthy()
  })

  it('close button has aria-label="Cerrar"', () => {
    render(<Tooltip onClose={() => {}}>Texto</Tooltip>)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeTruthy()
  })

  it('close button has class rds-tooltip__close', () => {
    const { container } = render(<Tooltip onClose={() => {}}>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip__close')).toBeTruthy()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Tooltip onClose={onClose}>Texto</Tooltip>)
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('stop-propagates click from close button to parent', async () => {
    const user = userEvent.setup()
    const parentClick = vi.fn()
    render(
      <div onClick={parentClick}>
        <Tooltip onClose={() => {}}>Texto</Tooltip>
      </div>,
    )
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(parentClick).not.toHaveBeenCalled()
  })
})

// ─── Combined ─────────────────────────────────────────────────────────────────

describe('Tooltip — combined', () => {
  it('renders icon + text + close together', () => {
    render(
      <Tooltip
        icon={<svg data-testid="icon" />}
        onClose={() => {}}
        arrowPosition="top-left"
      >
        Mensaje con ícono y cierre
      </Tooltip>,
    )
    expect(screen.getByTestId('icon')).toBeTruthy()
    expect(screen.getByText('Mensaje con ícono y cierre')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeTruthy()
  })

  it('text lives in rds-tooltip__text', () => {
    const { container } = render(<Tooltip>Contenido</Tooltip>)
    expect(container.querySelector('.rds-tooltip__text')?.textContent).toBe('Contenido')
  })

  it('content row is rds-tooltip__content', () => {
    const { container } = render(<Tooltip>Texto</Tooltip>)
    expect(container.querySelector('.rds-tooltip__content')).toBeTruthy()
  })
})
