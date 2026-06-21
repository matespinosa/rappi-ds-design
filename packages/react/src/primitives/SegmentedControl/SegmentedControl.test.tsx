// @vitest-environment jsdom

import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl, SegmentedOption } from './SegmentedControl'

afterEach(cleanup)

function Basic({
  defaultValue = 'a',
  onChange,
}: {
  defaultValue?: string
  onChange?: (v: string) => void
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <SegmentedControl
      value={value}
      onChange={(v) => { setValue(v); onChange?.(v) }}
      aria-label="Test control"
    >
      <SegmentedOption value="a">Option A</SegmentedOption>
      <SegmentedOption value="b">Option B</SegmentedOption>
      <SegmentedOption value="c">Option C</SegmentedOption>
    </SegmentedControl>
  )
}

/* ─── Structure & ARIA ─── */

describe('SegmentedControl — structure & ARIA', () => {
  it('renders a radiogroup landmark', () => {
    render(<Basic />)
    expect(screen.getByRole('radiogroup', { name: 'Test control' })).toBeTruthy()
  })

  it('renders all options as radio buttons', () => {
    render(<Basic />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('selected option has aria-checked=true', () => {
    render(<Basic defaultValue="b" />)
    expect((screen.getByRole('radio', { name: 'Option B' }) as HTMLInputElement).ariaChecked).toBe('true')
    expect((screen.getByRole('radio', { name: 'Option A' }) as HTMLInputElement).ariaChecked).toBe('false')
  })

  it('selected option has tabIndex=0; others have tabIndex=-1', () => {
    render(<Basic defaultValue="a" />)
    expect((screen.getByRole('radio', { name: 'Option A' }) as HTMLButtonElement).tabIndex).toBe(0)
    expect((screen.getByRole('radio', { name: 'Option B' }) as HTMLButtonElement).tabIndex).toBe(-1)
  })

  it('sets data-selected on the active option', () => {
    const { container } = render(<Basic defaultValue="b" />)
    const selected = container.querySelectorAll('[data-selected]')
    expect(selected).toHaveLength(1)
    expect(selected[0].textContent).toContain('Option B')
  })
})

/* ─── Interaction ─── */

describe('SegmentedControl — interaction', () => {
  it('calls onChange with the new value on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Basic onChange={onChange} />)
    await user.click(screen.getByRole('radio', { name: 'Option B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('updates aria-checked after click', async () => {
    const user = userEvent.setup()
    render(<Basic />)
    await user.click(screen.getByRole('radio', { name: 'Option C' }))
    expect((screen.getByRole('radio', { name: 'Option C' }) as HTMLInputElement).ariaChecked).toBe('true')
    expect((screen.getByRole('radio', { name: 'Option A' }) as HTMLInputElement).ariaChecked).toBe('false')
  })

  it('does not call onChange when a disabled option is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const [value, setValue] = [vi.fn().mockReturnValue('a'), vi.fn()]
    render(
      <SegmentedControl value="a" onChange={onChange} aria-label="Ctrl">
        <SegmentedOption value="a">A</SegmentedOption>
        <SegmentedOption value="b" disabled>B</SegmentedOption>
      </SegmentedControl>,
    )
    await user.click(screen.getByRole('radio', { name: 'B' }))
    expect(onChange).not.toHaveBeenCalled()
    void value; void setValue
  })

  it('disabled option has data-disabled attribute', () => {
    const { container } = render(
      <SegmentedControl value="a" onChange={() => {}} aria-label="Ctrl">
        <SegmentedOption value="a">A</SegmentedOption>
        <SegmentedOption value="b" disabled>B</SegmentedOption>
      </SegmentedControl>,
    )
    expect(container.querySelector('[data-disabled]')).toBeTruthy()
  })

  it('disabled option has native disabled attribute', () => {
    render(
      <SegmentedControl value="a" onChange={() => {}} aria-label="Ctrl">
        <SegmentedOption value="a">A</SegmentedOption>
        <SegmentedOption value="b" disabled>B</SegmentedOption>
      </SegmentedControl>,
    )
    expect((screen.getByRole('radio', { name: 'B' }) as HTMLButtonElement).disabled).toBe(true)
  })
})

/* ─── Keyboard navigation ─── */

describe('SegmentedControl — keyboard navigation', () => {
  it('ArrowRight moves focus and selects next option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Basic onChange={onChange} />)
    screen.getByRole('radio', { name: 'Option A' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Option B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('ArrowLeft moves focus and selects previous option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Basic defaultValue="b" onChange={onChange} />)
    screen.getByRole('radio', { name: 'Option B' }).focus()
    await user.keyboard('{ArrowLeft}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Option A' }))
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('ArrowRight wraps from last to first', async () => {
    const user = userEvent.setup()
    render(<Basic defaultValue="c" />)
    screen.getByRole('radio', { name: 'Option C' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Option A' }))
  })

  it('ArrowLeft wraps from first to last', async () => {
    const user = userEvent.setup()
    render(<Basic defaultValue="a" />)
    screen.getByRole('radio', { name: 'Option A' }).focus()
    await user.keyboard('{ArrowLeft}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Option C' }))
  })

  it('Home moves focus to first option', async () => {
    const user = userEvent.setup()
    render(<Basic defaultValue="c" />)
    screen.getByRole('radio', { name: 'Option C' }).focus()
    await user.keyboard('{Home}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Option A' }))
  })

  it('End moves focus to last option', async () => {
    const user = userEvent.setup()
    render(<Basic defaultValue="a" />)
    screen.getByRole('radio', { name: 'Option A' }).focus()
    await user.keyboard('{End}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Option C' }))
  })

  it('skips disabled options with arrow keys', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    function CtrlWithDisabled() {
      const [v, setV] = useState('a')
      return (
        <SegmentedControl value={v} onChange={(x) => { setV(x); onChange(x) }} aria-label="Nav">
          <SegmentedOption value="a">A</SegmentedOption>
          <SegmentedOption value="b" disabled>B</SegmentedOption>
          <SegmentedOption value="c">C</SegmentedOption>
        </SegmentedControl>
      )
    }
    render(<CtrlWithDisabled />)
    screen.getByRole('radio', { name: 'A' }).focus()
    await user.keyboard('{ArrowRight}')
    // Skips B (disabled), should land on C
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'C' }))
    expect(onChange).toHaveBeenCalledWith('c')
  })
})

/* ─── Icon support ─── */

describe('SegmentedControl — icon support', () => {
  it('renders startIcon inside the option', () => {
    render(
      <SegmentedControl value="a" onChange={() => {}} aria-label="Icons">
        <SegmentedOption value="a" startIcon={<svg data-testid="icon-start" />}>A</SegmentedOption>
      </SegmentedControl>,
    )
    expect(screen.getByTestId('icon-start')).toBeTruthy()
  })

  it('renders endIcon inside the option', () => {
    render(
      <SegmentedControl value="a" onChange={() => {}} aria-label="Icons">
        <SegmentedOption value="a" endIcon={<svg data-testid="icon-end" />}>A</SegmentedOption>
      </SegmentedControl>,
    )
    expect(screen.getByTestId('icon-end')).toBeTruthy()
  })

  it('icon containers are aria-hidden', () => {
    const { container } = render(
      <SegmentedControl value="a" onChange={() => {}} aria-label="Icons">
        <SegmentedOption value="a" startIcon={<svg />}>A</SegmentedOption>
      </SegmentedControl>,
    )
    expect(container.querySelector('.rds-segmented-option__icon[aria-hidden="true"]')).toBeTruthy()
  })
})

/* ─── Error boundary ─── */

describe('SegmentedControl — error boundary', () => {
  it('throws when SegmentedOption is used outside SegmentedControl', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<SegmentedOption value="x">X</SegmentedOption>)).toThrow(
      '<SegmentedOption> must be used inside <SegmentedControl>',
    )
    spy.mockRestore()
  })
})
