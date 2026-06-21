// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardAction } from './CardAction'

afterEach(cleanup)

/* ─── Rendering ─── */

describe('CardAction — rendering', () => {
  it('renders title text', () => {
    render(<CardAction title="Bogotá" />)
    expect(screen.getByText('Bogotá')).toBeTruthy()
  })

  it('renders description when provided and showDescription is true', () => {
    render(<CardAction title="Bogotá" description="Capital" />)
    expect(screen.getByText('Capital')).toBeTruthy()
  })

  it('hides description when showDescription=false', () => {
    render(<CardAction title="Bogotá" description="Capital" showDescription={false} />)
    expect(screen.queryByText('Capital')).toBeNull()
  })

  it('renders description by default (showDescription defaults to true)', () => {
    render(<CardAction title="T" description="D" />)
    expect(screen.getByText('D')).toBeTruthy()
  })

  it('does not render left slot when leftSlot is omitted', () => {
    const { container } = render(<CardAction title="T" />)
    expect(container.querySelector('.rds-card-action__slot--left')).toBeNull()
  })

  it('renders custom leftSlot when provided', () => {
    render(<CardAction title="T" leftSlot={<span data-testid="custom-left" />} />)
    expect(screen.getByTestId('custom-left')).toBeTruthy()
  })

  it('renders nothing in left slot when leftSlot=null', () => {
    const { container } = render(<CardAction title="T" leftSlot={null} />)
    expect(container.querySelector('.rds-card-action__slot--left')).toBeNull()
  })

  it('does not render right slot when rightSlot is omitted', () => {
    const { container } = render(<CardAction title="T" />)
    expect(container.querySelector('.rds-card-action__slot--right')).toBeNull()
  })

  it('renders custom rightSlot when provided', () => {
    render(<CardAction title="T" rightSlot={<span data-testid="custom-right" />} />)
    expect(screen.getByTestId('custom-right')).toBeTruthy()
  })

  it('renders nothing in right slot when rightSlot=null', () => {
    const { container } = render(<CardAction title="T" rightSlot={null} />)
    expect(container.querySelector('.rds-card-action__slot--right')).toBeNull()
  })

  it('merges className onto the root element', () => {
    const { container } = render(<CardAction title="T" className="my-card" />)
    expect(container.querySelector('.rds-card-action.my-card')).toBeTruthy()
  })
})

/* ─── Selected state ─── */

describe('CardAction — selected state', () => {
  it('does not have data-selected by default', () => {
    const { container } = render(<CardAction title="T" />)
    expect(container.querySelector('[data-selected]')).toBeNull()
  })

  it('has data-selected when selected=true', () => {
    const { container } = render(<CardAction title="T" selected />)
    expect(container.querySelector('.rds-card-action[data-selected]')).toBeTruthy()
  })

  it('does not have data-selected when selected=false', () => {
    const { container } = render(<CardAction title="T" selected={false} />)
    expect(container.querySelector('[data-selected]')).toBeNull()
  })
})

/* ─── Interactivity ─── */

describe('CardAction — interactivity', () => {
  it('renders as role=button when onClick is provided', () => {
    render(<CardAction title="T" onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('does not have role=button when onClick is absent', () => {
    render(<CardAction title="T" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CardAction title="T" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Enter key', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CardAction title="T" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Space key', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CardAction title="T" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{ }')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has aria-pressed=false when not selected and onClick is provided', () => {
    render(<CardAction title="T" onClick={() => {}} selected={false} />)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('false')
  })

  it('has aria-pressed=true when selected and onClick is provided', () => {
    render(<CardAction title="T" onClick={() => {}} selected />)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true')
  })

  it('is focusable via tabIndex when onClick is provided', () => {
    render(<CardAction title="T" onClick={() => {}} />)
    expect(screen.getByRole('button').getAttribute('tabindex')).toBe('0')
  })
})

/* ─── Ref forwarding ─── */

describe('CardAction — ref forwarding', () => {
  it('forwards ref to the root div', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<CardAction title="T" ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.classList.contains('rds-card-action')).toBe(true)
  })
})

/* ─── ReactNode title/description ─── */

describe('CardAction — ReactNode content', () => {
  it('renders ReactNode as title', () => {
    render(<CardAction title={<strong data-testid="rich-title">Bold</strong>} />)
    expect(screen.getByTestId('rich-title')).toBeTruthy()
  })

  it('renders ReactNode as description', () => {
    render(
      <CardAction
        title="T"
        description={<em data-testid="rich-desc">italic</em>}
      />,
    )
    expect(screen.getByTestId('rich-desc')).toBeTruthy()
  })
})
