// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextArea, TextAreaSkeleton } from './TextArea'

afterEach(cleanup)

describe('TextArea', () => {
  it('renders a textarea element', () => {
    render(<TextArea label="Descripción" />)
    expect(screen.getByRole('textbox')).toBeTruthy()
  })

  it('renders a visible label', () => {
    render(<TextArea label="Notas" />)
    expect(screen.getByText('Notas')).toBeTruthy()
  })

  it('associates label with the textarea via htmlFor/id', () => {
    render(<TextArea label="Mensaje" />)
    const textarea = screen.getByRole('textbox')
    const label = screen.getByText('Mensaje').closest('label')
    expect(label?.getAttribute('for')).toBe(textarea.id)
  })

  it('uses the provided id', () => {
    render(<TextArea label="Bio" id="bio-field" />)
    expect(screen.getByRole('textbox').id).toBe('bio-field')
  })

  it('shows placeholder text', () => {
    render(<TextArea label="Bio" placeholder="Escribe tu biografía" />)
    expect(screen.getByPlaceholderText('Escribe tu biografía')).toBeTruthy()
  })

  it('accepts and shows controlled value', () => {
    function Wrapper() {
      const [val, setVal] = useState('Texto inicial')
      return <TextArea label="Campo" value={val} onChange={(e) => setVal(e.target.value)} />
    }
    render(<Wrapper />)
    expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('Texto inicial')
  })

  it('accepts user input in uncontrolled mode', async () => {
    const user = userEvent.setup()
    render(<TextArea label="Notas" />)
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hola')
    expect((textarea as HTMLTextAreaElement).value).toBe('Hola')
  })

  it('shows helper text', () => {
    render(<TextArea label="Campo" helperText="Texto de ayuda" />)
    expect(screen.getByText('Texto de ayuda')).toBeTruthy()
  })

  it('shows error message and sets aria-invalid', () => {
    render(<TextArea label="Campo" error="Campo requerido" />)
    expect(screen.getByText('Campo requerido')).toBeTruthy()
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not show helper text when error is present', () => {
    render(<TextArea label="Campo" helperText="Ayuda" error="Error aquí" />)
    expect(screen.queryByText('Ayuda')).toBeNull()
    expect(screen.getByText('Error aquí')).toBeTruthy()
  })

  it('shows required asterisk when required=true', () => {
    const { container } = render(<TextArea label="Campo" required />)
    expect(container.querySelector('.rds-text-area__required')).toBeTruthy()
    const textarea = screen.getByRole('textbox')
    expect(textarea.getAttribute('required')).not.toBeNull()
  })

  it('disables the textarea and applies data-disabled', () => {
    const { container } = render(<TextArea label="Campo" disabled />)
    expect((screen.getByRole('textbox') as HTMLTextAreaElement).disabled).toBe(true)
    expect(container.querySelector('.rds-text-area[data-disabled]')).toBeTruthy()
  })

  it('sets readOnly and applies data-readonly', () => {
    const { container } = render(<TextArea label="Campo" readOnly value="Solo lectura" />)
    expect((screen.getByRole('textbox') as HTMLTextAreaElement).readOnly).toBe(true)
    expect(container.querySelector('.rds-text-area[data-readonly]')).toBeTruthy()
  })

  it('applies data-invalid when error is provided', () => {
    const { container } = render(<TextArea label="Campo" error="Inválido" />)
    expect(container.querySelector('.rds-text-area[data-invalid]')).toBeTruthy()
  })

  it('shows clear button when onClear is provided and field has a value', () => {
    render(<TextArea label="Campo" value="algo" onClear={vi.fn()} />)
    expect(screen.getByLabelText('Limpiar')).toBeTruthy()
  })

  it('calls onClear when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<TextArea label="Campo" value="texto" onClear={onClear} />)
    await user.click(screen.getByLabelText('Limpiar'))
    expect(onClear).toHaveBeenCalledOnce()
  })

  it('hides clear button when field is disabled', () => {
    render(<TextArea label="Campo" value="texto" onClear={vi.fn()} disabled />)
    expect(screen.queryByLabelText('Limpiar')).toBeNull()
  })

  it('hides clear button when field is readOnly', () => {
    render(<TextArea label="Campo" value="texto" onClear={vi.fn()} readOnly />)
    expect(screen.queryByLabelText('Limpiar')).toBeNull()
  })

  it('hides clear button when value is empty', () => {
    render(<TextArea label="Campo" value="" onClear={vi.fn()} />)
    expect(screen.queryByLabelText('Limpiar')).toBeNull()
  })

  it('describes the textarea with helperText id', () => {
    render(<TextArea label="Campo" helperText="Descripción" />)
    const textarea = screen.getByRole('textbox')
    const describedBy = textarea.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const helperEl = document.getElementById(describedBy!)
    expect(helperEl?.textContent).toBe('Descripción')
  })

  it('describes the textarea with error id when error is set', () => {
    render(<TextArea label="Campo" error="Algo salió mal" />)
    const textarea = screen.getByRole('textbox')
    const describedBy = textarea.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const errorEl = document.getElementById(describedBy!)
    expect(errorEl?.textContent).toBe('Algo salió mal')
  })

  it('merges external aria-describedby with internal one', () => {
    render(<TextArea label="Campo" helperText="Ayuda" aria-describedby="ext-id" />)
    const describedBy = screen.getByRole('textbox').getAttribute('aria-describedby')
    expect(describedBy).toContain('ext-id')
  })

  it('forwards ref to the underlying textarea', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<TextArea ref={ref} label="Campo" />)
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  it('passes extra props to the textarea', () => {
    render(<TextArea label="Campo" rows={5} data-testid="ta" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.getAttribute('rows')).toBe('5')
  })

  it('merges className onto the textarea', () => {
    render(<TextArea label="Campo" className="custom-class" />)
    expect(screen.getByRole('textbox').classList.contains('custom-class')).toBe(true)
  })

  it('accepts containerClassName on the wrapper', () => {
    const { container } = render(<TextArea label="Campo" containerClassName="outer-class" />)
    expect(container.querySelector('.outer-class')).toBeTruthy()
  })
})

describe('TextAreaSkeleton', () => {
  it('renders no interactive elements', () => {
    render(<TextAreaSkeleton />)
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('renders label placeholder by default', () => {
    const { container } = render(<TextAreaSkeleton />)
    expect(container.querySelector('.rds-text-area-skeleton__label')).toBeTruthy()
  })

  it('hides label placeholder when showLabel=false', () => {
    const { container } = render(<TextAreaSkeleton showLabel={false} />)
    expect(container.querySelector('.rds-text-area-skeleton__label')).toBeNull()
  })

  it('renders helper placeholder by default', () => {
    const { container } = render(<TextAreaSkeleton />)
    expect(container.querySelector('.rds-text-area-skeleton__helper')).toBeTruthy()
  })

  it('hides helper placeholder when showHelperText=false', () => {
    const { container } = render(<TextAreaSkeleton showHelperText={false} />)
    expect(container.querySelector('.rds-text-area-skeleton__helper')).toBeNull()
  })

  it('is hidden from assistive technology', () => {
    const { container } = render(<TextAreaSkeleton />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})
