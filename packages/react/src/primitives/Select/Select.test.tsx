// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select, SelectSkeleton } from './Select'

const OPTIONS = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C' },
]

const OPTIONS_WITH_SLOTS = [
  { value: 'co', label: 'Colombia', startElement: <span data-testid="flag-co">🇨🇴</span> },
  { value: 'mx', label: 'México', startElement: <span data-testid="flag-mx">🇲🇽</span>, endElement: <span data-testid="end-mx">popular</span> },
  { value: 'ar', label: 'Argentina', startElement: <span data-testid="flag-ar">🇦🇷</span> },
]

afterEach(cleanup)

describe('Select', () => {
  it('renders a combobox button', () => {
    render(<Select aria-label="Selecciona" options={OPTIONS} />)
    expect(screen.getByRole('combobox', { name: 'Selecciona' })).toBeTruthy()
  })

  it('shows placeholder when no value is selected', () => {
    render(<Select aria-label="Select" options={OPTIONS} placeholder="Elige algo" />)
    expect(screen.getByText('Elige algo')).toBeTruthy()
  })

  it('shows the selected option label when value is set', () => {
    render(<Select aria-label="Select" options={OPTIONS} value="b" />)
    expect(screen.getByText('Opción B')).toBeTruthy()
  })

  it('renders a visible label and associates it with the trigger', () => {
    render(<Select label="País" options={OPTIONS} />)
    const label = screen.getByText('País')
    expect(label.tagName).toBe('LABEL')
    const trigger = screen.getByRole('combobox')
    expect(label.getAttribute('for')).toBe(trigger.id)
  })

  it('opens the listbox on click', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
  })

  it('shows all options when open', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getAllByRole('option')).toHaveLength(3)
  })

  it('calls onChange with the selected value and closes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select aria-label="Select" options={OPTIONS} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Opción B' }))
    expect(onChange).toHaveBeenCalledWith('b')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('marks the selected option with aria-selected=true', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={OPTIONS} value="a" />)
    await user.click(screen.getByRole('combobox'))
    const selected = screen.getByRole('option', { name: 'Opción A' })
    expect(selected.getAttribute('aria-selected')).toBe('true')
  })

  it('opens with Enter key and navigates with arrows', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select aria-label="Select" options={OPTIONS} onChange={onChange} />)
    const trigger = screen.getByRole('combobox')
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('listbox')).toBeTruthy()
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalled()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={OPTIONS} disabled />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('does not open when readOnly', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={OPTIONS} readOnly value="a" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('sets aria-invalid when invalid prop is true', () => {
    render(<Select aria-label="Select" options={OPTIONS} invalid />)
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBe('true')
  })

  it('sets aria-invalid and shows error message', () => {
    render(<Select aria-label="Select" options={OPTIONS} error="Campo requerido" />)
    expect(screen.getByText('Campo requerido')).toBeTruthy()
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBe('true')
  })

  it('shows helper text', () => {
    render(<Select aria-label="Select" options={OPTIONS} helperText="Selecciona tu país" />)
    expect(screen.getByText('Selecciona tu país')).toBeTruthy()
  })

  it('applies data-size attribute', () => {
    render(<Select aria-label="Select" options={OPTIONS} size="sm" />)
    const wrapper = screen.getByRole('combobox').closest('.rds-select')
    expect(wrapper?.getAttribute('data-size')).toBe('sm')
  })

  it('forwards ref to the trigger button', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Select ref={ref} aria-label="Ref test" options={OPTIONS} />)
    expect(ref.current?.tagName).toBe('BUTTON')
    expect(ref.current?.getAttribute('role')).toBe('combobox')
  })
})

describe('Select — startElement / endElement slots', () => {
  it('renders startElement inside each option', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="País" options={OPTIONS_WITH_SLOTS} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('flag-co')).toBeTruthy()
    expect(screen.getByTestId('flag-mx')).toBeTruthy()
    expect(screen.getByTestId('flag-ar')).toBeTruthy()
  })

  it('renders endElement inside the matching option', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="País" options={OPTIONS_WITH_SLOTS} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('end-mx')).toBeTruthy()
  })

  it('shows selected option startElement inside the trigger', () => {
    render(<Select aria-label="País" options={OPTIONS_WITH_SLOTS} value="co" />)
    expect(screen.getByTestId('flag-co')).toBeTruthy()
  })

  it('does not show startElement in trigger when no value is selected', () => {
    render(<Select aria-label="País" options={OPTIONS_WITH_SLOTS} />)
    expect(screen.queryByTestId('flag-co')).toBeNull()
  })
})

describe('Select — selectionIndicator', () => {
  it('check: renders a check indicator only for the selected option', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Select aria-label="Select" options={OPTIONS} value="b" selectionIndicator="check" />,
    )
    await user.click(screen.getByRole('combobox'))
    const indicators = container.querySelectorAll('.rds-select__option-indicator[data-type="check"]')
    expect(indicators).toHaveLength(1)
  })

  it('check: renders no check when nothing is selected', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Select aria-label="Select" options={OPTIONS} selectionIndicator="check" />,
    )
    await user.click(screen.getByRole('combobox'))
    expect(container.querySelectorAll('.rds-select__option-indicator[data-type="check"]')).toHaveLength(0)
  })

  it('radio: renders one indicator per option', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Select aria-label="Select" options={OPTIONS} value="a" selectionIndicator="radio" />,
    )
    await user.click(screen.getByRole('combobox'))
    expect(container.querySelectorAll('.rds-select__option-indicator[data-type="radio"]')).toHaveLength(3)
  })

  it('radio: marks selected option with data-selected', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Select aria-label="Select" options={OPTIONS} value="a" selectionIndicator="radio" />,
    )
    await user.click(screen.getByRole('combobox'))
    const selected = container.querySelectorAll(
      '.rds-select__option-indicator[data-type="radio"][data-selected]',
    )
    expect(selected).toHaveLength(1)
  })

  it('checkbox: renders one indicator per option', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Select aria-label="Select" options={OPTIONS} value="b" selectionIndicator="checkbox" />,
    )
    await user.click(screen.getByRole('combobox'))
    expect(container.querySelectorAll('.rds-select__option-indicator[data-type="checkbox"]')).toHaveLength(3)
  })

  it('checkbox: marks selected option with data-selected', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Select aria-label="Select" options={OPTIONS} value="b" selectionIndicator="checkbox" />,
    )
    await user.click(screen.getByRole('combobox'))
    const checked = container.querySelectorAll(
      '.rds-select__option-indicator[data-type="checkbox"][data-selected]',
    )
    expect(checked).toHaveLength(1)
  })
})

describe('Select — per-option disabled', () => {
  const MIXED = [
    { value: 'a', label: 'Opción A' },
    { value: 'b', label: 'Opción B', disabled: true },
    { value: 'c', label: 'Opción C' },
  ]

  it('marks disabled options with aria-disabled', async () => {
    const user = userEvent.setup()
    render(<Select aria-label="Select" options={MIXED} />)
    await user.click(screen.getByRole('combobox'))
    const optB = screen.getByRole('option', { name: 'Opción B' })
    expect(optB.getAttribute('aria-disabled')).toBe('true')
  })

  it('does not call onChange when clicking a disabled option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select aria-label="Select" options={MIXED} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Opción B' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('skips disabled options when navigating with ArrowDown', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select aria-label="Select" options={MIXED} onChange={onChange} />)
    const trigger = screen.getByRole('combobox')
    trigger.focus()
    await user.keyboard('{Enter}')
    // active is 0 (a) — ArrowDown should skip b and land on c
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('c')
  })
})

describe('SelectSkeleton', () => {
  it('renders no interactive content', () => {
    render(<SelectSkeleton />)
    expect(screen.queryByRole('combobox')).toBeNull()
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('renders label placeholder by default', () => {
    const { container } = render(<SelectSkeleton />)
    expect(container.querySelector('.rds-select-skeleton__label')).toBeTruthy()
  })

  it('hides label placeholder when showLabel=false', () => {
    const { container } = render(<SelectSkeleton showLabel={false} />)
    expect(container.querySelector('.rds-select-skeleton__label')).toBeNull()
  })

  it('applies data-size', () => {
    const { container } = render(<SelectSkeleton size="sm" />)
    expect(container.querySelector('.rds-select-skeleton')?.getAttribute('data-size')).toBe('sm')
  })
})
