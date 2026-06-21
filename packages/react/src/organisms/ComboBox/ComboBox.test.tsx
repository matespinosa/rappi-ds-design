// @vitest-environment jsdom

import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MapPin } from '@rappi-ds/icons'
import { ComboBox, ComboBoxSkeleton } from './ComboBox'

afterEach(cleanup)

const CITIES = [
  { value: 'bog', label: 'Bogotá' },
  { value: 'med', label: 'Medellín' },
  { value: 'cal', label: 'Cali' },
  { value: 'bar', label: 'Barranquilla', disabled: true },
]

/** Fully controlled — delegates filtering to consumer (like async search). */
function Controlled({
  defaultSelected = [] as string[],
  defaultInput = '',
  onChange,
  options = CITIES,
  ...props
}: Partial<React.ComponentProps<typeof ComboBox>> & {
  defaultSelected?: string[]
  defaultInput?: string
}) {
  const [value, setValue] = useState<string[]>(defaultSelected)
  const [input, setInput] = useState(defaultInput)
  return (
    <ComboBox
      options={options}
      value={value}
      onChange={(v) => { setValue(v); onChange?.(v) }}
      inputValue={input}
      onInputChange={setInput}
      label="Ciudad"
      placeholder="Buscar ciudad…"
      {...props}
    />
  )
}

/** Self-filtering — lets the component filter internally (no controlled inputValue). */
function SelfFiltering({
  defaultSelected = [] as string[],
  onChange,
  options = CITIES,
  ...props
}: Partial<React.ComponentProps<typeof ComboBox>> & {
  defaultSelected?: string[]
}) {
  const [value, setValue] = useState<string[]>(defaultSelected)
  return (
    <ComboBox
      options={options}
      value={value}
      onChange={(v) => { setValue(v); onChange?.(v) }}
      label="Ciudad"
      placeholder="Buscar ciudad…"
      {...props}
    />
  )
}

/* ─── Rendering ─── */

describe('ComboBox — rendering', () => {
  it('renders an input with role=combobox', () => {
    render(<Controlled />)
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders the label and links it to the input', () => {
    render(<Controlled />)
    const input = screen.getByRole('combobox')
    expect(screen.getByLabelText('Ciudad')).toBe(input)
  })

  it('renders placeholder text', () => {
    render(<Controlled />)
    expect((screen.getByRole('combobox') as HTMLInputElement).placeholder).toBe('Buscar ciudad…')
  })

  it('renders required asterisk when required=true', () => {
    const { container } = render(<Controlled required />)
    expect(container.querySelector('.rds-combobox__required')).toBeTruthy()
  })

  it('does not render required asterisk by default', () => {
    const { container } = render(<Controlled />)
    expect(container.querySelector('.rds-combobox__required')).toBeNull()
  })

  it('renders helper text', () => {
    render(<Controlled helperText="Escoge tu ciudad" />)
    expect(screen.getByText('Escoge tu ciudad')).toBeTruthy()
  })

  it('renders error message and links aria-describedby', () => {
    const { container } = render(<Controlled error="Campo requerido" />)
    const msg = container.querySelector('.rds-combobox__message[data-error]')
    expect(msg?.textContent).toBe('Campo requerido')
  })

  it('does not render clear button when input is empty', () => {
    render(<Controlled />)
    expect(screen.queryByRole('button', { name: 'Limpiar búsqueda' })).toBeNull()
  })

  it('renders clear button when input has text and clearable=true', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.type(screen.getByRole('combobox'), 'bog')
    expect(screen.getByRole('button', { name: 'Limpiar búsqueda' })).toBeTruthy()
  })

  it('hides clear button when clearable=false', async () => {
    const user = userEvent.setup()
    render(<Controlled clearable={false} />)
    await user.type(screen.getByRole('combobox'), 'bog')
    expect(screen.queryByRole('button', { name: 'Limpiar búsqueda' })).toBeNull()
  })
})

/* ─── Open / close ─── */

describe('ComboBox — dropdown open/close', () => {
  it('opens the listbox on input focus', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
  })

  it('closes the listbox on Escape', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('shows all options when open', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(CITIES.length)
  })

  it('sets aria-expanded=true when open', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    const input = screen.getByRole('combobox')
    expect(input.getAttribute('aria-expanded')).toBe('false')
    await user.click(input)
    expect(input.getAttribute('aria-expanded')).toBe('true')
  })

  it('sets aria-controls pointing to the listbox', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    const input = screen.getByRole('combobox')
    const listbox = screen.getByRole('listbox')
    expect(input.getAttribute('aria-controls')).toBe(listbox.id)
  })
})

/* ─── Filtering ─── */

describe('ComboBox — filtering', () => {
  it('filters options as the user types', async () => {
    const user = userEvent.setup()
    render(<SelfFiltering />)
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'bog')
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0].textContent).toContain('Bogotá')
  })

  it('shows "Sin resultados" when no options match', async () => {
    const user = userEvent.setup()
    render(<SelfFiltering />)
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'zzz')
    expect(screen.getByText('Sin resultados')).toBeTruthy()
  })

  it('is case-insensitive', async () => {
    const user = userEvent.setup()
    render(<SelfFiltering />)
    await user.click(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'BOGO')
    expect(screen.getAllByRole('option')).toHaveLength(1)
  })
})

/* ─── Selection (multi) ─── */

describe('ComboBox — multi-selection', () => {
  it('calls onChange when an option is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Controlled onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /bogotá/i }))
    expect(onChange).toHaveBeenCalledWith(['bog'])
  })

  it('toggles selection — clicking a selected option removes it', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Controlled defaultSelected={['bog']} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /bogotá/i }))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('can select multiple values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Controlled onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /bogotá/i }))
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /medellín/i }))
    expect(onChange).toHaveBeenLastCalledWith(['bog', 'med'])
  })

  it('marks selected options with aria-selected=true', async () => {
    const user = userEvent.setup()
    render(<Controlled defaultSelected={['med']} />)
    await user.click(screen.getByRole('combobox'))
    const med = screen.getByRole('option', { name: /medellín/i })
    expect(med.getAttribute('aria-selected')).toBe('true')
  })

  it('does not call onChange when a disabled option is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Controlled onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /barranquilla/i }))
    expect(onChange).not.toHaveBeenCalled()
  })
})

/* ─── Clear button ─── */

describe('ComboBox — clear button', () => {
  it('clears the input when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    const input = screen.getByRole('combobox') as HTMLInputElement
    await user.type(input, 'bog')
    expect(input.value).toBe('bog')
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(input.value).toBe('')
  })

  it('calls onClear when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<Controlled onClear={onClear} />)
    await user.type(screen.getByRole('combobox'), 'bog')
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(onClear).toHaveBeenCalledOnce()
  })
})

/* ─── Keyboard navigation ─── */

describe('ComboBox — keyboard navigation', () => {
  it('opens dropdown with ArrowDown when closed', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    screen.getByRole('combobox').focus()
    await user.keyboard('{Escape}') // close first
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('listbox')).toBeTruthy()
  })

  it('navigates with ArrowDown and sets aria-activedescendant', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}')
    const input = screen.getByRole('combobox')
    const activeId = input.getAttribute('aria-activedescendant')
    expect(activeId).toBeTruthy()
  })

  it('selects the active option with Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Controlled onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalled()
  })

  it('closes with Escape and does not select', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Controlled onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(onChange).not.toHaveBeenCalled()
  })
})

/* ─── States ─── */

describe('ComboBox — states', () => {
  it('is disabled — input is not interactive', () => {
    render(<Controlled disabled />)
    const input = screen.getByRole('combobox') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Controlled disabled />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('applies data-disabled to root when disabled', () => {
    const { container } = render(<Controlled disabled />)
    expect(container.querySelector('.rds-combobox[data-disabled]')).toBeTruthy()
  })

  it('applies data-invalid to root when error is set', () => {
    const { container } = render(<Controlled error="Requerido" />)
    expect(container.querySelector('.rds-combobox[data-invalid]')).toBeTruthy()
  })

  it('applies data-invalid to root when invalid=true', () => {
    const { container } = render(<Controlled invalid />)
    expect(container.querySelector('.rds-combobox[data-invalid]')).toBeTruthy()
  })
})

/* ─── Icons ─── */

describe('ComboBox — option icons', () => {
  it('renders option icons when provided', async () => {
    const user = userEvent.setup()
    const optionsWithIcons = [
      { value: 'a', label: 'Alpha', icon: <MapPin size={16} data-testid="icon-a" /> },
    ]
    render(<Controlled options={optionsWithIcons} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('icon-a')).toBeTruthy()
  })

  it('renders left icon in input field', () => {
    render(<Controlled leftIcon={<MapPin size={20} data-testid="left-icon" />} />)
    expect(screen.getByTestId('left-icon')).toBeTruthy()
  })
})

/* ─── Sizes ─── */

describe('ComboBox — sizes', () => {
  it('sets data-size=lg by default', () => {
    const { container } = render(<Controlled />)
    expect(container.querySelector('.rds-combobox[data-size="lg"]')).toBeTruthy()
  })

  it('sets data-size=sm when size=sm', () => {
    const { container } = render(<Controlled size="sm" />)
    expect(container.querySelector('.rds-combobox[data-size="sm"]')).toBeTruthy()
  })
})

/* ─── ARIA ─── */

describe('ComboBox — ARIA', () => {
  it('has aria-haspopup=listbox', () => {
    render(<Controlled />)
    expect(screen.getByRole('combobox').getAttribute('aria-haspopup')).toBe('listbox')
  })

  it('has aria-multiselectable=true on listbox', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox').getAttribute('aria-multiselectable')).toBe('true')
  })

  it('has aria-autocomplete=list', () => {
    render(<Controlled />)
    expect(screen.getByRole('combobox').getAttribute('aria-autocomplete')).toBe('list')
  })

  it('disabled option has aria-disabled=true', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    const disabled = screen.getByRole('option', { name: /barranquilla/i })
    expect(disabled.getAttribute('aria-disabled')).toBe('true')
  })

  it('error message is linked via aria-describedby', () => {
    render(<Controlled error="Campo inválido" />)
    const input = screen.getByRole('combobox')
    const describedBy = input.getAttribute('aria-describedby')
    const msg = describedBy ? document.getElementById(describedBy) : null
    expect(msg?.textContent).toBe('Campo inválido')
  })
})

/* ─── Ref forwarding ─── */

describe('ComboBox — ref forwarding', () => {
  it('forwards ref to the input element', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(
      <ComboBox
        options={CITIES}
        value={[]}
        onChange={() => {}}
        aria-label="Test"
        ref={ref}
      />,
    )
    expect(ref.current?.tagName).toBe('INPUT')
  })
})

/* ─── Skeleton ─── */

describe('ComboBoxSkeleton', () => {
  it('renders non-interactive placeholder', () => {
    const { container } = render(<ComboBoxSkeleton />)
    expect(container.querySelector('.rds-combobox-skeleton')).toBeTruthy()
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('renders label placeholder by default', () => {
    const { container } = render(<ComboBoxSkeleton />)
    expect(container.querySelector('.rds-combobox-skeleton__label')).toBeTruthy()
  })

  it('hides label placeholder when showLabel=false', () => {
    const { container } = render(<ComboBoxSkeleton showLabel={false} />)
    expect(container.querySelector('.rds-combobox-skeleton__label')).toBeNull()
  })

  it('renders helper placeholder when showHelper=true', () => {
    const { container } = render(<ComboBoxSkeleton showHelper />)
    expect(container.querySelector('.rds-combobox-skeleton__helper')).toBeTruthy()
  })

  it('applies data-size', () => {
    const { container } = render(<ComboBoxSkeleton size="sm" />)
    expect(container.querySelector('[data-size="sm"]')).toBeTruthy()
  })
})

/* ─── Skeleton via prop ─── */

describe('ComboBox — skeleton prop', () => {
  it('renders skeleton when skeleton=true', () => {
    const { container } = render(<ComboBox options={[]} value={[]} onChange={() => {}} label="X" skeleton />)
    expect(container.querySelector('.rds-combobox-skeleton')).toBeTruthy()
    expect(screen.queryByRole('combobox')).toBeNull()
  })

  it('shows label in skeleton by default', () => {
    const { container } = render(<ComboBox options={[]} value={[]} onChange={() => {}} label="X" skeleton />)
    expect(container.querySelector('.rds-combobox-skeleton__label')).toBeTruthy()
  })
})

/* ─── className passthrough ─── */

describe('ComboBox — className', () => {
  it('merges className on root element', () => {
    const { container } = render(<Controlled className="my-class" />)
    expect(container.querySelector('.rds-combobox.my-class')).toBeTruthy()
  })
})

/* ─── listbox inside dropdown ─── */

describe('ComboBox — listbox', () => {
  it('shows listbox within the combobox container', async () => {
    const user = userEvent.setup()
    const { container } = render(<Controlled />)
    await user.click(screen.getByRole('combobox'))
    const listbox = within(container).getByRole('listbox')
    expect(listbox).toBeTruthy()
  })

  it('option check has data-selected on selected items', async () => {
    const user = userEvent.setup()
    const { container } = render(<Controlled defaultSelected={['bog']} />)
    await user.click(screen.getByRole('combobox'))
    const checks = container.querySelectorAll('.rds-combobox__option-check[data-selected]')
    expect(checks).toHaveLength(1)
  })
})
