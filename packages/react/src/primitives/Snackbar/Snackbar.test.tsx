// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Snackbar } from './Snackbar'

afterEach(cleanup)

// ─── Structure ───────────────────────────────────────────────────────────────

describe('Snackbar — structure', () => {
  it('renders the message', () => {
    render(<Snackbar message="Pedido confirmado" />)
    expect(screen.getByText('Pedido confirmado')).toBeTruthy()
  })

  it('has role="status" and aria-live="polite" by default', () => {
    const { container } = render(<Snackbar message="Mensaje" />)
    const root = container.querySelector('.rds-snackbar')
    expect(root?.getAttribute('role')).toBe('status')
    expect(root?.getAttribute('aria-live')).toBe('polite')
  })

  it('allows overriding role and aria-live', () => {
    const { container } = render(<Snackbar message="Error" role="alert" aria-live="assertive" />)
    const root = container.querySelector('.rds-snackbar')
    expect(root?.getAttribute('role')).toBe('alert')
    expect(root?.getAttribute('aria-live')).toBe('assertive')
  })

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Snackbar ref={ref} message="Msg" />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.classList.contains('rds-snackbar')).toBe(true)
  })

  it('applies extra className', () => {
    const { container } = render(<Snackbar message="Msg" className="my-class" />)
    expect(container.querySelector('.rds-snackbar')?.classList.contains('my-class')).toBe(true)
  })

  it('forwards arbitrary HTML attributes', () => {
    const { container } = render(<Snackbar message="Msg" data-testid="sb" />)
    expect(container.querySelector('[data-testid="sb"]')).toBeTruthy()
  })
})

// ─── Left slot: spinner > avatar > icon ──────────────────────────────────────

describe('Snackbar — left slot', () => {
  it('renders nothing in the left slot when no icon/avatar/loading', () => {
    const { container } = render(<Snackbar message="Msg" />)
    expect(container.querySelector('.rds-snackbar__icon')).toBeNull()
    expect(container.querySelector('.rds-snackbar__avatar')).toBeNull()
    expect(container.querySelector('.rds-snackbar__spinner')).toBeNull()
  })

  it('renders icon in the left slot', () => {
    render(<Snackbar message="Msg" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeTruthy()
  })

  it('wraps icon in .rds-snackbar__icon with aria-hidden', () => {
    const { container } = render(<Snackbar message="Msg" icon={<svg />} />)
    const iconSlot = container.querySelector('.rds-snackbar__icon')
    expect(iconSlot).toBeTruthy()
    expect(iconSlot?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders avatar in the left slot', () => {
    render(<Snackbar message="Msg" avatar={<img alt="Logo" data-testid="avatar" />} />)
    expect(screen.getByTestId('avatar')).toBeTruthy()
  })

  it('wraps avatar in .rds-snackbar__avatar with aria-hidden', () => {
    const { container } = render(<Snackbar message="Msg" avatar={<img alt="" />} />)
    const avatarSlot = container.querySelector('.rds-snackbar__avatar')
    expect(avatarSlot).toBeTruthy()
    expect(avatarSlot?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders spinner when loading=true', () => {
    const { container } = render(<Snackbar message="Procesando…" loading />)
    expect(container.querySelector('.rds-snackbar__spinner')).toBeTruthy()
  })

  it('spinner has role="progressbar" and accessible label', () => {
    const { container } = render(<Snackbar message="Msg" loading />)
    const spinner = container.querySelector('.rds-snackbar__spinner')
    expect(spinner?.getAttribute('role')).toBe('progressbar')
    expect(spinner?.getAttribute('aria-label')).toBe('Cargando')
  })

  it('spinner takes priority over avatar', () => {
    const { container } = render(
      <Snackbar message="Msg" loading avatar={<img alt="" />} />,
    )
    expect(container.querySelector('.rds-snackbar__spinner')).toBeTruthy()
    expect(container.querySelector('.rds-snackbar__avatar')).toBeNull()
  })

  it('spinner takes priority over icon', () => {
    const { container } = render(
      <Snackbar message="Msg" loading icon={<svg />} />,
    )
    expect(container.querySelector('.rds-snackbar__spinner')).toBeTruthy()
    expect(container.querySelector('.rds-snackbar__icon')).toBeNull()
  })

  it('avatar takes priority over icon', () => {
    const { container } = render(
      <Snackbar message="Msg" avatar={<img alt="" />} icon={<svg />} />,
    )
    expect(container.querySelector('.rds-snackbar__avatar')).toBeTruthy()
    expect(container.querySelector('.rds-snackbar__icon')).toBeNull()
  })
})

// ─── Right slot: actionLabel > onNavigate > onClose ──────────────────────────

describe('Snackbar — right slot', () => {
  it('renders nothing in the right slot when no right props given', () => {
    const { container } = render(<Snackbar message="Msg" />)
    expect(container.querySelector('.rds-snackbar__action')).toBeNull()
    expect(container.querySelector('.rds-snackbar__icon-btn')).toBeNull()
  })

  it('renders text action button when actionLabel is provided', () => {
    render(<Snackbar message="Msg" actionLabel="Deshacer" onAction={() => {}} />)
    expect(screen.getByRole('button', { name: 'Deshacer' })).toBeTruthy()
  })

  it('action button has class rds-snackbar__action', () => {
    const { container } = render(<Snackbar message="Msg" actionLabel="Acción" />)
    expect(container.querySelector('.rds-snackbar__action')).toBeTruthy()
  })

  it('renders close icon-button when onClose is provided', () => {
    render(<Snackbar message="Msg" onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeTruthy()
  })

  it('renders navigate icon-button when onNavigate is provided', () => {
    render(<Snackbar message="Msg" onNavigate={() => {}} />)
    expect(screen.getByRole('button', { name: 'Ver más' })).toBeTruthy()
  })

  it('actionLabel takes priority over onNavigate', () => {
    render(<Snackbar message="Msg" actionLabel="Acción" onNavigate={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Ver más' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Acción' })).toBeTruthy()
  })

  it('actionLabel takes priority over onClose', () => {
    render(<Snackbar message="Msg" actionLabel="Acción" onClose={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Acción' })).toBeTruthy()
  })

  it('onNavigate takes priority over onClose', () => {
    render(<Snackbar message="Msg" onNavigate={() => {}} onClose={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Ver más' })).toBeTruthy()
  })
})

// ─── Interactions ─────────────────────────────────────────────────────────────

describe('Snackbar — interactions', () => {
  it('calls onAction when text button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<Snackbar message="Msg" actionLabel="Cancelar" onAction={onAction} />)
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onAction).toHaveBeenCalledOnce()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Snackbar message="Msg" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onNavigate when navigate button is clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<Snackbar message="Msg" onNavigate={onNavigate} />)
    await user.click(screen.getByRole('button', { name: 'Ver más' }))
    expect(onNavigate).toHaveBeenCalledOnce()
  })

  it('stop-propagates click from action button to parent', async () => {
    const user = userEvent.setup()
    const parentClick = vi.fn()
    render(
      <div onClick={parentClick}>
        <Snackbar message="Msg" actionLabel="OK" onAction={() => {}} />
      </div>,
    )
    await user.click(screen.getByRole('button', { name: 'OK' }))
    expect(parentClick).not.toHaveBeenCalled()
  })

  it('stop-propagates click from close button to parent', async () => {
    const user = userEvent.setup()
    const parentClick = vi.fn()
    render(
      <div onClick={parentClick}>
        <Snackbar message="Msg" onClose={() => {}} />
      </div>,
    )
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(parentClick).not.toHaveBeenCalled()
  })

  it('stop-propagates click from navigate button to parent', async () => {
    const user = userEvent.setup()
    const parentClick = vi.fn()
    render(
      <div onClick={parentClick}>
        <Snackbar message="Msg" onNavigate={() => {}} />
      </div>,
    )
    await user.click(screen.getByRole('button', { name: 'Ver más' }))
    expect(parentClick).not.toHaveBeenCalled()
  })
})

// ─── ReactNode message ────────────────────────────────────────────────────────

describe('Snackbar — ReactNode message', () => {
  it('renders ReactNode message', () => {
    render(<Snackbar message={<strong data-testid="bold">Mensaje en negrita</strong>} />)
    expect(screen.getByTestId('bold')).toBeTruthy()
  })
})
