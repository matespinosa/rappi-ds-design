// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from './Search'

afterEach(cleanup)

// ─── Structure ───────────────────────────────────────────────────────────────

describe('Search — structure', () => {
  it('renders an input with the given placeholder', () => {
    render(<Search placeholder="Buscar restaurantes" />)
    expect(screen.getByPlaceholderText('Buscar restaurantes')).toBeTruthy()
  })

  it('uses "Buscar" as the default placeholder', () => {
    render(<Search />)
    expect(screen.getByPlaceholderText('Buscar')).toBeTruthy()
  })

  it('sets aria-label to the placeholder by default', () => {
    render(<Search placeholder="Buscar tiendas" />)
    expect(screen.getByRole('textbox', { name: 'Buscar tiendas' })).toBeTruthy()
  })

  it('accepts a custom aria-label', () => {
    render(<Search aria-label="Buscar productos" />)
    expect(screen.getByRole('textbox', { name: 'Buscar productos' })).toBeTruthy()
  })

  it('renders the search icon when showBackButton is false', () => {
    const { container } = render(<Search />)
    expect(container.querySelector('.rds-search__icon')).toBeTruthy()
    expect(container.querySelector('.rds-search__back')).toBeNull()
  })

  it('renders the back button instead of the search icon when showBackButton is true', () => {
    const { container } = render(<Search showBackButton />)
    expect(container.querySelector('.rds-search__back')).toBeTruthy()
    expect(container.querySelector('.rds-search__icon')).toBeNull()
  })

  it('back button has aria-label="Volver"', () => {
    render(<Search showBackButton />)
    expect(screen.getByRole('button', { name: 'Volver' })).toBeTruthy()
  })

  it('does not render the clear button when the input is empty', () => {
    render(<Search />)
    expect(screen.queryByRole('button', { name: 'Limpiar búsqueda' })).toBeNull()
  })

  it('forwards ref to the underlying input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Search ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('applies containerClassName to the root div', () => {
    const { container } = render(<Search containerClassName="custom-container" />)
    expect(container.querySelector('.rds-search')?.classList.contains('custom-container')).toBe(true)
  })

  it('applies data-size attribute', () => {
    const { container } = render(<Search size="sm" />)
    expect(container.querySelector('.rds-search')?.getAttribute('data-size')).toBe('sm')
  })

  it('default size is lg', () => {
    const { container } = render(<Search />)
    expect(container.querySelector('.rds-search')?.getAttribute('data-size')).toBe('lg')
  })
})

// ─── Uncontrolled ─────────────────────────────────────────────────────────────

describe('Search — uncontrolled', () => {
  it('shows the clear button when the user types', async () => {
    const user = userEvent.setup()
    render(<Search />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'Starbucks')
    expect(screen.getByRole('button', { name: 'Limpiar búsqueda' })).toBeTruthy()
  })

  it('clears the input when the clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<Search />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await user.type(input, 'Starbucks')
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(input.value).toBe('')
    expect(screen.queryByRole('button', { name: 'Limpiar búsqueda' })).toBeNull()
  })

  it('clears the input when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<Search />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await user.type(input, 'Tacos')
    await user.keyboard('{Escape}')
    expect(input.value).toBe('')
  })

  it('does not clear when Escape is pressed on an empty input', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(<Search onKeyDown={onKeyDown} />)
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.keyboard('{Escape}')
    // Escape propagated to onKeyDown
    expect(onKeyDown).toHaveBeenCalled()
    expect((input as HTMLInputElement).value).toBe('')
  })

  it('initializes with defaultValue', () => {
    render(<Search defaultValue="Starbucks" />)
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Starbucks')
  })

  it('shows clear button when defaultValue is provided', () => {
    render(<Search defaultValue="Starbucks" />)
    expect(screen.getByRole('button', { name: 'Limpiar búsqueda' })).toBeTruthy()
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Search onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'KFC')
    expect(onChange).toHaveBeenCalled()
  })

  it('refocuses the input after clearing', async () => {
    const user = userEvent.setup()
    render(<Search />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'text')
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(document.activeElement).toBe(input)
  })
})

// ─── Controlled ───────────────────────────────────────────────────────────────

describe('Search — controlled', () => {
  function ControlledSearch({ onClear }: { onClear?: () => void }) {
    const [val, setVal] = useState('')
    return (
      <Search
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClear={() => {
          setVal('')
          onClear?.()
        }}
      />
    )
  }

  it('reflects the controlled value', () => {
    render(<Search value="Starbucks" onChange={() => {}} />)
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Starbucks')
  })

  it('shows the clear button when value is non-empty', () => {
    render(<Search value="Starbucks" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Limpiar búsqueda' })).toBeTruthy()
  })

  it('calls onClear when clear button is clicked (controlled)', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<ControlledSearch onClear={onClear} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'KFC')
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(onClear).toHaveBeenCalled()
    expect((input as HTMLInputElement).value).toBe('')
  })

  it('calls onClear on Escape when controlled', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<ControlledSearch onClear={onClear} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'Domino')
    await user.keyboard('{Escape}')
    expect(onClear).toHaveBeenCalled()
  })
})

// ─── Focus state ──────────────────────────────────────────────────────────────

describe('Search — focus state', () => {
  it('adds data-focused on input focus', async () => {
    const user = userEvent.setup()
    const { container } = render(<Search />)
    await user.click(screen.getByRole('textbox'))
    expect(container.querySelector('.rds-search')?.getAttribute('data-focused')).toBeTruthy()
  })

  it('removes data-focused on input blur', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <>
        <Search />
        <button type="button">Otro</button>
      </>,
    )
    await user.click(screen.getByRole('textbox'))
    await user.click(screen.getByRole('button', { name: 'Otro' }))
    expect(container.querySelector('.rds-search')?.getAttribute('data-focused')).toBeNull()
  })

  it('calls onFocus and onBlur callbacks', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(
      <>
        <Search onFocus={onFocus} onBlur={onBlur} />
        <button type="button">Out</button>
      </>,
    )
    await user.click(screen.getByRole('textbox'))
    expect(onFocus).toHaveBeenCalledOnce()
    await user.click(screen.getByRole('button', { name: 'Out' }))
    expect(onBlur).toHaveBeenCalledOnce()
  })

  it('sets data-has-value when the input has text', async () => {
    const user = userEvent.setup()
    const { container } = render(<Search />)
    await user.type(screen.getByRole('textbox'), 'Sushi')
    expect(container.querySelector('.rds-search')?.getAttribute('data-has-value')).toBeTruthy()
  })

  it('removes data-has-value after clearing', async () => {
    const user = userEvent.setup()
    const { container } = render(<Search />)
    await user.type(screen.getByRole('textbox'), 'Sushi')
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(container.querySelector('.rds-search')?.getAttribute('data-has-value')).toBeNull()
  })
})

// ─── Disabled ─────────────────────────────────────────────────────────────────

describe('Search — disabled', () => {
  it('has a disabled native input', () => {
    render(<Search disabled />)
    expect((screen.getByRole('textbox') as HTMLInputElement).disabled).toBe(true)
  })

  it('applies data-disabled to the root', () => {
    const { container } = render(<Search disabled />)
    expect(container.querySelector('.rds-search')?.getAttribute('data-disabled')).toBeTruthy()
  })

  it('does not render the clear button when disabled and has value', () => {
    render(<Search value="text" onChange={() => {}} disabled />)
    expect(screen.queryByRole('button', { name: 'Limpiar búsqueda' })).toBeNull()
  })

  it('disables the back button when disabled', () => {
    render(<Search showBackButton disabled />)
    expect((screen.getByRole('button', { name: 'Volver' }) as HTMLButtonElement).disabled).toBe(
      true,
    )
  })
})

// ─── Back button ──────────────────────────────────────────────────────────────

describe('Search — back button', () => {
  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<Search showBackButton onBack={onBack} />)
    await user.click(screen.getByRole('button', { name: 'Volver' }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('does not toggle focus on back-button click (stopPropagation from container click)', async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    const { container } = render(<Search showBackButton onBack={onBack} />)
    // Click the back button: stopPropagation prevents the container onClick → no focus
    await user.click(screen.getByRole('button', { name: 'Volver' }))
    expect(onBack).toHaveBeenCalled()
    // data-focused should NOT be set (input was not focused by container click)
    expect(container.querySelector('[data-focused]')).toBeNull()
  })

  it('applies data-has-back-button to the root', () => {
    const { container } = render(<Search showBackButton />)
    expect(
      container.querySelector('.rds-search')?.getAttribute('data-has-back-button'),
    ).toBeTruthy()
  })
})
