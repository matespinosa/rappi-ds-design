// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion } from './Accordion'

afterEach(cleanup)

describe('Accordion — structure', () => {
  it('renders a button with role=button and aria-expanded=false when closed', () => {
    render(<Accordion title="FAQ">Contenido</Accordion>)
    const trigger = screen.getByRole('button', { name: /FAQ/i })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('renders a region panel controlled by the trigger', () => {
    render(<Accordion title="FAQ">Contenido</Accordion>)
    const trigger = screen.getByRole('button', { name: /FAQ/i })
    const contentId = trigger.getAttribute('aria-controls')
    expect(contentId).toBeTruthy()
    const panel = document.getElementById(contentId!)
    expect(panel?.getAttribute('role')).toBe('region')
    expect(panel?.getAttribute('aria-labelledby')).toBe(trigger.id)
  })

  it('renders the title text', () => {
    render(<Accordion title="Preguntas frecuentes">Body</Accordion>)
    expect(screen.getByText('Preguntas frecuentes')).toBeTruthy()
  })

  it('renders the subtitle when provided', () => {
    render(<Accordion title="FAQ" subtitle="Respuestas rápidas">Body</Accordion>)
    expect(screen.getByText('Respuestas rápidas')).toBeTruthy()
  })

  it('renders the left icon wrapped in rds-accordion__icon', () => {
    const { container } = render(
      <Accordion title="FAQ" icon={<svg data-testid="left-icon" />}>Body</Accordion>,
    )
    expect(screen.getByTestId('left-icon')).toBeTruthy()
    expect(container.querySelector('.rds-accordion__icon')).toBeTruthy()
  })

  it('icon wrapper has aria-hidden', () => {
    const { container } = render(
      <Accordion title="FAQ" icon={<svg />}>Body</Accordion>,
    )
    expect(container.querySelector('.rds-accordion__icon')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders the slotRight when provided', () => {
    render(
      <Accordion title="FAQ" slotRight={<span data-testid="slot">Extra</span>}>Body</Accordion>,
    )
    expect(screen.getByTestId('slot')).toBeTruthy()
  })

  it('chevron pill has aria-hidden', () => {
    const { container } = render(<Accordion title="FAQ">Body</Accordion>)
    expect(container.querySelector('.rds-accordion__chevron-pill')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Accordion ref={ref} title="FAQ">Body</Accordion>)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.classList.contains('rds-accordion')).toBe(true)
  })

  it('applies className to the root element', () => {
    const { container } = render(
      <Accordion title="FAQ" className="extra">Body</Accordion>,
    )
    expect(container.querySelector('.rds-accordion')?.classList.contains('extra')).toBe(true)
  })
})

describe('Accordion — uncontrolled', () => {
  it('starts closed by default', () => {
    const { container } = render(<Accordion title="FAQ">Contenido</Accordion>)
    expect(container.querySelector('.rds-accordion')?.getAttribute('data-open')).toBeNull()
  })

  it('starts open when defaultOpen=true', () => {
    const { container } = render(
      <Accordion title="FAQ" defaultOpen>Contenido</Accordion>,
    )
    expect(container.querySelector('.rds-accordion')?.getAttribute('data-open')).toBeTruthy()
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('true')
  })

  it('toggles open on click', async () => {
    const user = userEvent.setup()
    render(<Accordion title="FAQ">Contenido</Accordion>)
    const trigger = screen.getByRole('button')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    await user.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    await user.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('calls onOpenChange with the new state on toggle', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Accordion title="FAQ" onOpenChange={onChange}>Contenido</Accordion>)
    await user.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(true)
    await user.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('toggles with Enter key', async () => {
    const user = userEvent.setup()
    render(<Accordion title="FAQ">Contenido</Accordion>)
    const trigger = screen.getByRole('button')
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('toggles with Space key', async () => {
    const user = userEvent.setup()
    render(<Accordion title="FAQ">Contenido</Accordion>)
    const trigger = screen.getByRole('button')
    trigger.focus()
    await user.keyboard(' ')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })
})

describe('Accordion — controlled', () => {
  function ControlledAccordion() {
    const [open, setOpen] = useState(false)
    return (
      <Accordion title="FAQ" open={open} onOpenChange={setOpen}>
        Contenido controlado
      </Accordion>
    )
  }

  it('reflects controlled open=false', () => {
    render(<Accordion title="FAQ" open={false} onOpenChange={() => {}}>Body</Accordion>)
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('false')
  })

  it('reflects controlled open=true', () => {
    render(<Accordion title="FAQ" open onOpenChange={() => {}}>Body</Accordion>)
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('true')
  })

  it('calls onOpenChange when trigger is clicked in controlled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Accordion title="FAQ" open={false} onOpenChange={onChange}>Body</Accordion>)
    await user.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not change state without handler updating open prop', async () => {
    const user = userEvent.setup()
    render(<Accordion title="FAQ" open={false} onOpenChange={() => {}}>Body</Accordion>)
    await user.click(screen.getByRole('button'))
    // State stays false because handler doesn't update prop
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('false')
  })

  it('updates when controlled prop changes', async () => {
    const user = userEvent.setup()
    render(<ControlledAccordion />)
    const trigger = screen.getByRole('button')
    await user.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    await user.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})

describe('Accordion — disabled', () => {
  it('has disabled attribute on the trigger button', () => {
    render(<Accordion title="FAQ" disabled>Body</Accordion>)
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true)
  })

  it('does not toggle on click when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Accordion title="FAQ" disabled onOpenChange={onChange}>Body</Accordion>)
    await user.click(screen.getByRole('button'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies data-disabled to root element', () => {
    const { container } = render(<Accordion title="FAQ" disabled>Body</Accordion>)
    expect(container.querySelector('.rds-accordion')?.getAttribute('data-disabled')).toBeTruthy()
  })
})

describe('Accordion — slotRight', () => {
  it('prevents trigger toggle when clicking inside slotRight', async () => {
    const user = userEvent.setup()
    const onAccordion = vi.fn()
    render(
      <Accordion title="FAQ" onOpenChange={onAccordion} slotRight={<button type="button">Action</button>}>
        Body
      </Accordion>,
    )
    await user.click(screen.getByRole('button', { name: 'Action' }))
    expect(onAccordion).not.toHaveBeenCalled()
  })
})

describe('Accordion — data attributes', () => {
  it('has no data-open when closed', () => {
    const { container } = render(<Accordion title="FAQ">Body</Accordion>)
    expect(container.querySelector('[data-open]')).toBeNull()
  })

  it('has data-open when open', async () => {
    const user = userEvent.setup()
    const { container } = render(<Accordion title="FAQ">Body</Accordion>)
    await user.click(screen.getByRole('button'))
    expect(container.querySelector('[data-open]')).toBeTruthy()
  })
})
