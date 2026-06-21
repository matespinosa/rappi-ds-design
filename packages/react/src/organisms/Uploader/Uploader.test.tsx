// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Uploader } from './Uploader'

afterEach(cleanup)

// ─── Structure ───────────────────────────────────────────────────────────────

describe('Uploader — structure', () => {
  it('renders with class rds-uploader', () => {
    const { container } = render(<Uploader />)
    expect(container.querySelector('.rds-uploader')).toBeTruthy()
  })

  it('sets data-size="sm" by default', () => {
    const { container } = render(<Uploader />)
    expect(container.querySelector('.rds-uploader')?.getAttribute('data-size')).toBe('sm')
  })

  it('sets data-state="no-upload" by default', () => {
    const { container } = render(<Uploader />)
    expect(container.querySelector('.rds-uploader')?.getAttribute('data-state')).toBe('no-upload')
  })

  it('sets data-size="lg" when passed', () => {
    const { container } = render(<Uploader size="lg" />)
    expect(container.querySelector('.rds-uploader')?.getAttribute('data-size')).toBe('lg')
  })

  it('sets data-state for every state', () => {
    const states = ['no-upload', 'drop', 'loading', 'uploaded', 'error'] as const
    for (const state of states) {
      const { container, unmount } = render(<Uploader state={state} />)
      expect(container.querySelector('.rds-uploader')?.getAttribute('data-state')).toBe(state)
      unmount()
    }
  })

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Uploader ref={ref} />)
    expect(ref.current?.classList.contains('rds-uploader')).toBe(true)
  })

  it('merges extra className', () => {
    const { container } = render(<Uploader className="extra" />)
    expect(container.querySelector('.rds-uploader')?.classList.contains('extra')).toBe(true)
  })

  it('forwards arbitrary HTML attributes', () => {
    const { container } = render(<Uploader data-testid="ul" />)
    expect(container.querySelector('[data-testid="ul"]')).toBeTruthy()
  })

  it('icon slot has aria-hidden', () => {
    const { container } = render(<Uploader />)
    expect(container.querySelector('.rds-uploader__icon')?.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Text content ─────────────────────────────────────────────────────────────

describe('Uploader — default text', () => {
  it('no-upload shows default title and subtitle', () => {
    render(<Uploader state="no-upload" />)
    expect(screen.getByText('Upload your image')).toBeTruthy()
    expect(screen.getByText('JPG, PNG, WEBP • Max 5 MB')).toBeTruthy()
  })

  it('drop shows "Suéltalo aquí" with no subtitle', () => {
    const { container } = render(<Uploader state="drop" />)
    expect(screen.getByText('Suéltalo aquí')).toBeTruthy()
    expect(container.querySelector('.rds-uploader__subtitle')).toBeNull()
  })

  it('loading shows filename in title when provided', () => {
    render(<Uploader state="loading" fileName="IMG_001" />)
    expect(screen.getByText('Subiendo IMG_001...')).toBeTruthy()
  })

  it('loading falls back to generic title', () => {
    render(<Uploader state="loading" />)
    expect(screen.getByText('Subiendo...')).toBeTruthy()
  })

  it('uploaded shows filename in title', () => {
    render(<Uploader state="uploaded" fileName="IMG_001" />)
    expect(screen.getByText('IMG_001 Cargada')).toBeTruthy()
  })

  it('uploaded falls back to generic title', () => {
    render(<Uploader state="uploaded" />)
    expect(screen.getByText('Archivo cargado')).toBeTruthy()
  })

  it('error shows uploadTitle and errorMessage as subtitle', () => {
    render(<Uploader state="error" errorMessage="Supera los 5 MB" />)
    expect(screen.getByText('Supera los 5 MB')).toBeTruthy()
  })

  it('error shows uploadTitle prop', () => {
    render(<Uploader state="error" uploadTitle="Error al subir" />)
    expect(screen.getByText('Error al subir')).toBeTruthy()
  })

  it('fileInfo overrides subtitle in loading/uploaded', () => {
    render(<Uploader state="loading" fileInfo="PNG 2 MB" />)
    expect(screen.getByText('PNG 2 MB')).toBeTruthy()
  })

  it('uploadSubtitle prop overrides default subtitle', () => {
    render(<Uploader state="no-upload" uploadSubtitle="SVG, PNG" />)
    expect(screen.getByText('SVG, PNG')).toBeTruthy()
  })
})

// ─── Icon slot ────────────────────────────────────────────────────────────────

describe('Uploader — custom icon', () => {
  it('renders custom icon when provided', () => {
    render(<Uploader icon={<svg data-testid="custom-icon" />} />)
    expect(screen.getByTestId('custom-icon')).toBeTruthy()
  })

  it('renders default ImageIcon when no icon prop', () => {
    const { container } = render(<Uploader />)
    expect(container.querySelector('.rds-uploader__icon svg')).toBeTruthy()
  })
})

// ─── Trailing actions (sm) ────────────────────────────────────────────────────

describe('Uploader — sm trailing', () => {
  it('sm no-upload shows upload button with aria-label', () => {
    render(<Uploader size="sm" state="no-upload" />)
    expect(screen.getByRole('button', { name: 'Seleccionar archivo' })).toBeTruthy()
  })

  it('sm loading shows non-interactive spinner, no button', () => {
    render(<Uploader size="sm" state="loading" />)
    expect(screen.queryByRole('button', { name: 'Seleccionar archivo' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Reintentar' })).toBeNull()
  })

  it('sm loading spinner has aria-hidden', () => {
    const { container } = render(<Uploader size="sm" state="loading" />)
    const action = container.querySelector('.rds-uploader__action')
    expect(action?.tagName.toLowerCase()).toBe('span')
    expect(action?.getAttribute('aria-hidden')).toBe('true')
  })

  it('sm uploaded shows no trailing element', () => {
    render(<Uploader size="sm" state="uploaded" />)
    expect(screen.queryByRole('button', { name: 'Seleccionar archivo' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Reintentar' })).toBeNull()
  })

  it('sm error shows retry button', () => {
    render(<Uploader size="sm" state="error" />)
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeTruthy()
  })

  it('sm drop shows no trailing button', () => {
    render(<Uploader size="sm" state="drop" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('clicking upload button calls onSelect', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Uploader size="sm" state="no-upload" onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Seleccionar archivo' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it('clicking retry button calls onSelect', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Uploader size="sm" state="error" onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })
})

// ─── lg: progress bar ─────────────────────────────────────────────────────────

describe('Uploader — lg progress bar', () => {
  it('renders progress bar in lg loading', () => {
    const { container } = render(<Uploader size="lg" state="loading" />)
    expect(container.querySelector('.rds-uploader__progress')).toBeTruthy()
  })

  it('progress bar has role="progressbar"', () => {
    render(<Uploader size="lg" state="loading" />)
    expect(screen.getByRole('progressbar')).toBeTruthy()
  })

  it('progress bar aria-valuenow reflects prop', () => {
    render(<Uploader size="lg" state="loading" progress={70} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('70')
  })

  it('progress bar clamps to 0–100', () => {
    const { container, rerender } = render(<Uploader size="lg" state="loading" progress={-10} />)
    const fill = container.querySelector('.rds-uploader__progress-fill') as HTMLElement
    expect(fill.style.width).toBe('0%')
    rerender(<Uploader size="lg" state="loading" progress={150} />)
    expect(fill.style.width).toBe('100%')
  })

  it('does not render progress bar in sm loading', () => {
    const { container } = render(<Uploader size="sm" state="loading" />)
    expect(container.querySelector('.rds-uploader__progress')).toBeNull()
  })

  it('does not render progress bar in lg no-upload', () => {
    const { container } = render(<Uploader size="lg" state="no-upload" />)
    expect(container.querySelector('.rds-uploader__progress')).toBeNull()
  })
})

// ─── lg: action button ────────────────────────────────────────────────────────

describe('Uploader — lg action button', () => {
  it('renders button in lg no-upload', () => {
    render(<Uploader size="lg" state="no-upload" />)
    expect(screen.getByRole('button', { name: 'Selecciona un archivo' })).toBeTruthy()
  })

  it('renders "Seleccionar otro archivo" in lg uploaded', () => {
    render(<Uploader size="lg" state="uploaded" />)
    expect(screen.getByRole('button', { name: 'Seleccionar otro archivo' })).toBeTruthy()
  })

  it('renders select button in lg error', () => {
    render(<Uploader size="lg" state="error" />)
    expect(screen.getByRole('button', { name: 'Selecciona un archivo' })).toBeTruthy()
  })

  it('does not render button in lg loading', () => {
    render(<Uploader size="lg" state="loading" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('does not render button in lg drop', () => {
    render(<Uploader size="lg" state="drop" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('selectLabel prop overrides button text', () => {
    render(<Uploader size="lg" state="no-upload" selectLabel="Elegir imagen" />)
    expect(screen.getByRole('button', { name: 'Elegir imagen' })).toBeTruthy()
  })

  it('reSelectLabel prop overrides uploaded button text', () => {
    render(<Uploader size="lg" state="uploaded" reSelectLabel="Cambiar imagen" />)
    expect(screen.getByRole('button', { name: 'Cambiar imagen' })).toBeTruthy()
  })

  it('clicking button calls onSelect', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Uploader size="lg" state="no-upload" onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Selecciona un archivo' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })
})

// ─── lg: thumbnail ────────────────────────────────────────────────────────────

describe('Uploader — lg thumbnail', () => {
  it('renders thumbnail in lg uploaded when provided', () => {
    const { container } = render(
      <Uploader size="lg" state="uploaded" thumbnail="https://example.com/img.jpg" />,
    )
    const img = container.querySelector('.rds-uploader__thumbnail') as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.src).toBe('https://example.com/img.jpg')
  })

  it('does not render thumbnail when prop is omitted', () => {
    const { container } = render(<Uploader size="lg" state="uploaded" />)
    expect(container.querySelector('.rds-uploader__thumbnail')).toBeNull()
  })

  it('thumbnail has empty alt (decorative)', () => {
    const { container } = render(
      <Uploader size="lg" state="uploaded" thumbnail="https://example.com/img.jpg" />,
    )
    expect(container.querySelector('.rds-uploader__thumbnail')?.getAttribute('alt')).toBe('')
  })

  it('file row only renders in lg uploaded', () => {
    const { container } = render(<Uploader size="lg" state="no-upload" />)
    expect(container.querySelector('.rds-uploader__file-row')).toBeNull()
  })

  it('file row renders in lg uploaded', () => {
    const { container } = render(<Uploader size="lg" state="uploaded" />)
    expect(container.querySelector('.rds-uploader__file-row')).toBeTruthy()
  })
})
