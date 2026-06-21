// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AlertTriangle } from '@rappi-ds/icons'
import { EmptyState } from './EmptyState'

afterEach(cleanup)

/* ─── Default rendering ─── */

describe('EmptyState — rendering', () => {
  it('renders default title and description', () => {
    render(<EmptyState />)
    expect(screen.getByText('Algo ocurrió')).toBeTruthy()
    expect(screen.getByText('Se produjo un error, vuelve a intentarlo.')).toBeTruthy()
  })

  it('renders custom title and description', () => {
    render(<EmptyState title="Sin resultados" description="No hay datos disponibles." />)
    expect(screen.getByText('Sin resultados')).toBeTruthy()
    expect(screen.getByText('No hay datos disponibles.')).toBeTruthy()
  })

  it('renders the default action button with label "Reintentar"', () => {
    render(<EmptyState />)
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeTruthy()
  })

  it('renders custom actionLabel', () => {
    render(<EmptyState actionLabel="Actualizar" />)
    expect(screen.getByRole('button', { name: 'Actualizar' })).toBeTruthy()
  })

  it('hides action when showAction=false', () => {
    render(<EmptyState showAction={false} />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('renders custom action element', () => {
    render(<EmptyState action={<button type="button">Custom CTA</button>} />)
    expect(screen.getByRole('button', { name: 'Custom CTA' })).toBeTruthy()
  })

  it('renders circle illustration element', () => {
    const { container } = render(<EmptyState />)
    expect(container.querySelector('.rds-empty-state__circle')).toBeTruthy()
  })

  it('renders default Unplug icon inside circle', () => {
    const { container } = render(<EmptyState />)
    const circle = container.querySelector('.rds-empty-state__circle')
    expect(circle?.querySelector('svg')).toBeTruthy()
  })

  it('renders custom icon inside circle', () => {
    render(<EmptyState icon={<AlertTriangle data-testid="custom-icon" size={24} />} />)
    expect(screen.getByTestId('custom-icon')).toBeTruthy()
  })

  it('renders no icon when icon=null', () => {
    const { container } = render(<EmptyState icon={null} />)
    const circle = container.querySelector('.rds-empty-state__circle')
    expect(circle?.querySelector('svg')).toBeNull()
  })

  it('merges className onto root element', () => {
    const { container } = render(<EmptyState className="my-class" />)
    expect(container.querySelector('.rds-empty-state.my-class')).toBeTruthy()
  })
})

/* ─── Sizes ─── */

describe('EmptyState — sizes', () => {
  it('renders size=md by default', () => {
    const { container } = render(<EmptyState />)
    expect(container.querySelector('.rds-empty-state[data-size="md"]')).toBeTruthy()
  })

  it('renders size=lg when specified', () => {
    const { container } = render(<EmptyState size="lg" />)
    expect(container.querySelector('.rds-empty-state[data-size="lg"]')).toBeTruthy()
  })

  it('md — text block renders BELOW the circle', () => {
    const { container } = render(<EmptyState size="md" title="T" />)
    const children = Array.from(container.querySelector('.rds-empty-state')!.children)
    const circleIdx = children.findIndex((c) => c.classList.contains('rds-empty-state__circle'))
    const textIdx = children.findIndex((c) => c.classList.contains('rds-empty-state__text'))
    expect(circleIdx).toBeLessThan(textIdx)
  })

  it('lg — text block renders ABOVE the circle', () => {
    const { container } = render(<EmptyState size="lg" title="T" />)
    const children = Array.from(container.querySelector('.rds-empty-state')!.children)
    const circleIdx = children.findIndex((c) => c.classList.contains('rds-empty-state__circle'))
    const textIdx = children.findIndex((c) => c.classList.contains('rds-empty-state__text'))
    expect(textIdx).toBeLessThan(circleIdx)
  })
})

/* ─── Skeleton ─── */

describe('EmptyState — skeleton', () => {
  it('does not show skeleton by default', () => {
    const { container } = render(<EmptyState />)
    expect(container.querySelector('[data-skeleton]')).toBeNull()
  })

  it('adds data-skeleton attribute when skeleton=true', () => {
    const { container } = render(<EmptyState skeleton />)
    expect(container.querySelector('.rds-empty-state[data-skeleton]')).toBeTruthy()
  })

  it('renders skeleton text bars instead of real text', () => {
    const { container } = render(<EmptyState skeleton title="Title" />)
    expect(container.querySelector('.rds-empty-state__skeleton-title')).toBeTruthy()
    expect(container.querySelector('.rds-empty-state__skeleton-desc')).toBeTruthy()
    expect(screen.queryByText('Title')).toBeNull()
  })

  it('renders skeleton CTA instead of real button', () => {
    const { container } = render(<EmptyState skeleton />)
    expect(container.querySelector('.rds-empty-state__action-skeleton')).toBeTruthy()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('skeleton with size=md', () => {
    const { container } = render(<EmptyState skeleton size="md" />)
    expect(container.querySelector('.rds-empty-state[data-size="md"][data-skeleton]')).toBeTruthy()
  })

  it('skeleton with size=lg', () => {
    const { container } = render(<EmptyState skeleton size="lg" />)
    expect(container.querySelector('.rds-empty-state[data-size="lg"][data-skeleton]')).toBeTruthy()
  })
})

/* ─── Action ─── */

describe('EmptyState — action', () => {
  it('calls onAction when button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<EmptyState onAction={onAction} />)
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(onAction).toHaveBeenCalledOnce()
  })

  it('custom action slot is rendered instead of default button', () => {
    render(
      <EmptyState
        action={<a href="#retry" data-testid="custom-link">Retry</a>}
      />,
    )
    expect(screen.getByTestId('custom-link')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Reintentar' })).toBeNull()
  })

  it('showAction=false hides action even in skeleton state', () => {
    const { container } = render(<EmptyState skeleton showAction={false} />)
    expect(container.querySelector('.rds-empty-state__action')).toBeNull()
  })
})

/* ─── ReactNode content ─── */

describe('EmptyState — ReactNode content', () => {
  it('renders ReactNode title', () => {
    render(<EmptyState title={<strong data-testid="rich-title">Error</strong>} />)
    expect(screen.getByTestId('rich-title')).toBeTruthy()
  })

  it('renders ReactNode description', () => {
    render(
      <EmptyState description={<em data-testid="rich-desc">Try again</em>} />,
    )
    expect(screen.getByTestId('rich-desc')).toBeTruthy()
  })
})

/* ─── Ref forwarding ─── */

describe('EmptyState — ref', () => {
  it('forwards ref to root div', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<EmptyState ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.classList.contains('rds-empty-state')).toBe(true)
  })
})
