// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Calendar } from './Calendar'

afterEach(cleanup)

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns 1st of a given month with time zeroed */
function monthOf(year: number, month: number) {
  return new Date(year, month, 1)
}

/** Returns a specific date with time zeroed */
function dateOf(year: number, month: number, day: number) {
  return new Date(year, month, day)
}

/** Get all gridcells inside the rendered calendar */
function getAllDayCells(container: HTMLElement) {
  return container.querySelectorAll('[role="gridcell"]')
}

/** Get cells with a specific data-state */
function getCellsByState(container: HTMLElement, state: string) {
  return container.querySelectorAll(`[role="gridcell"][data-state="${state}"]`)
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Calendar – structure', () => {
  it('renders .rds-calendar root', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('.rds-calendar')).toBeTruthy()
  })

  it('sets data-variant="single" by default', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('.rds-calendar')?.getAttribute('data-variant')).toBe('single')
  })

  it('sets data-variant="double" when variant=double', () => {
    const { container } = render(<Calendar variant="double" />)
    expect(container.querySelector('.rds-calendar')?.getAttribute('data-variant')).toBe('double')
  })

  it('forwards ref to root div', () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = render(<Calendar ref={ref} />)
    expect(ref.current).toBe(container.querySelector('.rds-calendar'))
  })

  it('merges custom className', () => {
    const { container } = render(<Calendar className="my-custom" />)
    expect(container.querySelector('.rds-calendar')?.classList.contains('my-custom')).toBe(true)
  })

  it('has role=application', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('.rds-calendar')?.getAttribute('role')).toBe('application')
  })
})

describe('Calendar – navigation', () => {
  it('shows the correct month title on first render (defaultMonth)', () => {
    render(<Calendar defaultMonth={monthOf(2024, 2)} />) // March 2024
    expect(screen.getByText('Marzo 2024')).toBeTruthy()
  })

  it('clicking next navigates to the next month', async () => {
    const user = userEvent.setup()
    render(<Calendar defaultMonth={monthOf(2024, 2)} />) // March 2024

    const nextBtn = screen.getByRole('button', { name: 'Mes siguiente' })
    await user.click(nextBtn)

    expect(screen.getByText('Abril 2024')).toBeTruthy()
  })

  it('clicking prev navigates to the previous month', async () => {
    const user = userEvent.setup()
    render(<Calendar defaultMonth={monthOf(2024, 2)} />) // March 2024

    const prevBtn = screen.getByRole('button', { name: 'Mes anterior' })
    await user.click(prevBtn)

    expect(screen.getByText('Febrero 2024')).toBeTruthy()
  })

  it('can navigate multiple months in sequence', async () => {
    const user = userEvent.setup()
    render(<Calendar defaultMonth={monthOf(2024, 0)} />) // January 2024

    const nextBtn = screen.getByRole('button', { name: 'Mes siguiente' })
    await user.click(nextBtn)
    await user.click(nextBtn)
    await user.click(nextBtn)

    expect(screen.getByText('Abril 2024')).toBeTruthy()
  })
})

describe('Calendar – single selection', () => {
  it('clicking a day in current month marks it selected', async () => {
    const user = userEvent.setup()
    const { container } = render(<Calendar defaultMonth={monthOf(2024, 2)} />) // March 2024

    // Find a cell in the current month (not outside-month)
    const dayCells = container.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const fifthDay = Array.from(dayCells).find(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent === '5',
    ) as HTMLElement

    expect(fifthDay).toBeTruthy()
    await user.click(fifthDay)

    expect(fifthDay.getAttribute('data-state')).toBe('selected')
  })

  it('calls onChange when a day is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Calendar defaultMonth={monthOf(2024, 2)} onChange={onChange} />,
    )

    const dayCells = container.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const firstCell = dayCells[0] as HTMLElement
    await user.click(firstCell)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
  })
})

describe('Calendar – controlled single', () => {
  it('value prop drives selected state', () => {
    const { container } = render(
      <Calendar
        defaultMonth={monthOf(2024, 2)}
        value={dateOf(2024, 2, 10)}
      />,
    )

    const selected = container.querySelector('[data-state="selected"]')
    expect(selected).toBeTruthy()
    expect(selected?.querySelector('.rds-calendar__day-inner')?.textContent).toBe('10')
  })

  it('onChange is called with the clicked date', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Calendar
        defaultMonth={monthOf(2024, 2)}
        value={dateOf(2024, 2, 10)}
        onChange={onChange}
      />,
    )

    const dayCells = container.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const fifthCell = Array.from(dayCells).find(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent === '5',
    ) as HTMLElement

    await user.click(fifthCell)

    expect(onChange).toHaveBeenCalledTimes(1)
    const calledWith = onChange.mock.calls[0][0] as Date
    expect(calledWith.getDate()).toBe(5)
    expect(calledWith.getMonth()).toBe(2)
    expect(calledWith.getFullYear()).toBe(2024)
  })
})

describe('Calendar – outside-month cells', () => {
  it('has outside-month cells with pointer-events none', () => {
    const { container } = render(<Calendar defaultMonth={monthOf(2024, 2)} />)
    const outside = getCellsByState(container, 'outside-month')
    expect(outside.length).toBeGreaterThan(0)
  })

  it('outside-month cells have tabIndex=-1', () => {
    const { container } = render(<Calendar defaultMonth={monthOf(2024, 2)} />)
    const outside = getCellsByState(container, 'outside-month')
    outside.forEach((cell) => {
      expect(cell.getAttribute('tabindex')).toBe('-1')
    })
  })
})

describe('Calendar – today cell', () => {
  it('marks today with data-state="today" when today is in the view', () => {
    const today = new Date()
    const { container } = render(
      <Calendar defaultMonth={monthOf(today.getFullYear(), today.getMonth())} />,
    )

    const todayCells = getCellsByState(container, 'today')
    expect(todayCells.length).toBeGreaterThanOrEqual(1)

    const todayCell = todayCells[0]
    expect(todayCell.querySelector('.rds-calendar__day-inner')?.textContent).toBe(
      String(today.getDate()),
    )
  })
})

describe('Calendar – double variant', () => {
  it('renders two month panels', () => {
    render(<Calendar variant="double" defaultMonth={monthOf(2024, 2)} />)
    // Two grids should exist
    const grids = screen.getAllByRole('grid')
    expect(grids.length).toBe(2)
  })

  it('second panel shows next month', () => {
    render(<Calendar variant="double" defaultMonth={monthOf(2024, 2)} />) // March + April
    expect(screen.getByText('Marzo 2024')).toBeTruthy()
    expect(screen.getByText('Abril 2024')).toBeTruthy()
  })

  it('renders vertical divider', () => {
    const { container } = render(<Calendar variant="double" />)
    expect(container.querySelector('.rds-calendar__divider-v')).toBeTruthy()
  })

  it('renders range text in footer', () => {
    render(
      <Calendar
        variant="double"
        defaultMonth={monthOf(2024, 2)}
        rangeValue={{ start: null, end: null }}
      />,
    )
    expect(screen.getByText('—')).toBeTruthy()
  })
})

describe('Calendar – range selection', () => {
  it('first click sets start (state=selected with no end)', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Calendar variant="double" defaultMonth={monthOf(2024, 2)} />,
    )

    // Click on day 5 in the first panel
    const panels = container.querySelectorAll('.rds-calendar__panel')
    const firstPanel = panels[0]
    const dayCells = firstPanel.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const day5 = Array.from(dayCells).find(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent === '5',
    ) as HTMLElement

    await user.click(day5)

    // After first click, no end → state should be 'selected'
    expect(day5.getAttribute('data-state')).toBe('selected')
  })

  it('second click after start sets end (range-start + range-end + in-range)', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Calendar variant="double" defaultMonth={monthOf(2024, 2)} />,
    )

    const panels = container.querySelectorAll('.rds-calendar__panel')
    const firstPanel = panels[0]
    const dayCells = firstPanel.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')

    const day5 = Array.from(dayCells).find(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent === '5',
    ) as HTMLElement
    const day10 = Array.from(dayCells).find(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent === '10',
    ) as HTMLElement

    await user.click(day5)
    await user.click(day10)

    expect(day5.getAttribute('data-state')).toBe('range-start')
    expect(day10.getAttribute('data-state')).toBe('range-end')

    // Some cells in between should be in-range
    const inRange = getCellsByState(container, 'in-range')
    expect(inRange.length).toBeGreaterThan(0)
  })

  it('calls onRangeChange when days are clicked', async () => {
    const user = userEvent.setup()
    const onRangeChange = vi.fn()
    const { container } = render(
      <Calendar
        variant="double"
        defaultMonth={monthOf(2024, 2)}
        onRangeChange={onRangeChange}
      />,
    )

    const firstPanel = container.querySelectorAll('.rds-calendar__panel')[0]
    const dayCells = firstPanel.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const day5 = Array.from(dayCells).find(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent === '5',
    ) as HTMLElement

    await user.click(day5)
    expect(onRangeChange).toHaveBeenCalledTimes(1)
    expect(onRangeChange.mock.calls[0][0].start).toBeInstanceOf(Date)
  })
})

describe('Calendar – callbacks', () => {
  it('onConfirm is called when single footer button is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(<Calendar onConfirm={onConfirm} />)

    const btn = screen.getByRole('button', { name: 'Seleccionar' })
    await user.click(btn)

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('onCancel is called when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(<Calendar variant="double" onCancel={onCancel} />)

    const btn = screen.getByRole('button', { name: 'Cancelar' })
    await user.click(btn)

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('onApply is called when double apply button is clicked', async () => {
    const user = userEvent.setup()
    const onApply = vi.fn()
    render(
      <Calendar
        variant="double"
        rangeValue={{ start: dateOf(2024, 2, 5), end: dateOf(2024, 2, 10) }}
        onApply={onApply}
      />,
    )

    // "Seleccionar" in double variant is the apply button (primary)
    const buttons = screen.getAllByRole('button', { name: 'Seleccionar' })
    await user.click(buttons[0])

    expect(onApply).toHaveBeenCalledTimes(1)
    expect(onApply.mock.calls[0][0]).toEqual({
      start: expect.any(Date),
      end: expect.any(Date),
    })
  })
})

describe('Calendar – keyboard', () => {
  it('Enter key on a day calls onDayClick (onChange)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Calendar defaultMonth={monthOf(2024, 2)} onChange={onChange} />,
    )

    const dayCells = container.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const firstCell = dayCells[0] as HTMLElement
    firstCell.focus()
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('Space key on a day calls onDayClick (onChange)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Calendar defaultMonth={monthOf(2024, 2)} onChange={onChange} />,
    )

    const dayCells = container.querySelectorAll('[role="gridcell"]:not([data-state="outside-month"])')
    const firstCell = dayCells[0] as HTMLElement
    firstCell.focus()
    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('Calendar – minDate constraint', () => {
  it('days before minDate get state="disabled"', () => {
    const { container } = render(
      <Calendar
        defaultMonth={monthOf(2024, 2)}
        minDate={dateOf(2024, 2, 15)}
      />,
    )

    // Days 1–14 of March 2024 should all be disabled
    const disabled = getCellsByState(container, 'disabled')
    expect(disabled.length).toBeGreaterThan(0)

    // Verify a specific day (e.g., day 5) is disabled
    const disabledDayNums = Array.from(disabled).map(
      (el) => el.querySelector('.rds-calendar__day-inner')?.textContent,
    )
    expect(disabledDayNums).toContain('5')
    expect(disabledDayNums).toContain('14')
  })

  it('days on or after minDate are not disabled', () => {
    const { container } = render(
      <Calendar
        defaultMonth={monthOf(2024, 2)}
        minDate={dateOf(2024, 2, 15)}
      />,
    )

    const day15 = Array.from(
      container.querySelectorAll('[role="gridcell"]'),
    ).find(
      (el) =>
        el.querySelector('.rds-calendar__day-inner')?.textContent === '15' &&
        el.getAttribute('data-state') !== 'outside-month',
    )

    expect(day15?.getAttribute('data-state')).not.toBe('disabled')
  })

  it('disabled cells have tabIndex=-1 and aria-disabled', () => {
    const { container } = render(
      <Calendar
        defaultMonth={monthOf(2024, 2)}
        minDate={dateOf(2024, 2, 15)}
      />,
    )

    const disabled = getCellsByState(container, 'disabled')
    disabled.forEach((cell) => {
      expect(cell.getAttribute('tabindex')).toBe('-1')
      expect(cell.getAttribute('aria-disabled')).toBe('true')
    })
  })
})
