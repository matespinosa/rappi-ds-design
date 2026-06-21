// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Notification } from './Notification'

afterEach(cleanup)

describe('Notification — rendering', () => {
  it('renders the message text', () => {
    render(<Notification message="Cambios guardados" />)
    expect(screen.getByText('Cambios guardados')).toBeTruthy()
  })

  it('renders an icon by default', () => {
    const { container } = render(<Notification message="Hola" />)
    expect(container.querySelector('.rds-notification__icon')).toBeTruthy()
  })

  it('does not render icon when icon={null}', () => {
    const { container } = render(<Notification message="Hola" icon={null} />)
    expect(container.querySelector('.rds-notification__icon')).toBeNull()
  })

  it('renders a custom icon when provided', () => {
    const { container } = render(
      <Notification message="Hola" icon={<svg data-testid="custom-icon" />} />,
    )
    expect(screen.getByTestId('custom-icon')).toBeTruthy()
    expect(container.querySelector('.rds-notification__icon')).toBeTruthy()
  })

  it('renders image slot instead of icon when image is provided', () => {
    const { container } = render(
      <Notification message="Hola" image={<img src="" alt="" data-testid="avatar" />} />,
    )
    expect(screen.getByTestId('avatar')).toBeTruthy()
    expect(container.querySelector('.rds-notification__image')).toBeTruthy()
    expect(container.querySelector('.rds-notification__icon')).toBeNull()
  })

  it('does not render close button when onClose is not provided', () => {
    render(<Notification message="Hola" />)
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull()
  })

  it('renders close button when onClose is provided', () => {
    render(<Notification message="Hola" onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeTruthy()
  })

  it('uses a custom closeLabel', () => {
    render(<Notification message="Hola" onClose={() => {}} closeLabel="Dismiss" />)
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeTruthy()
  })

  it('does not render action when action prop is absent', () => {
    const { container } = render(<Notification message="Hola" />)
    expect(container.querySelector('.rds-notification__action')).toBeNull()
  })

  it('renders action when action prop is provided', () => {
    render(<Notification message="Hola" action="Deshacer" />)
    expect(screen.getByText('Deshacer')).toBeTruthy()
  })
})

describe('Notification — data attributes', () => {
  it('sets data-intent correctly', () => {
    const { container } = render(<Notification message="x" intent="success" />)
    expect(container.querySelector('[data-intent="success"]')).toBeTruthy()
  })

  it('sets data-variant="solid" by default for non-default intents', () => {
    const { container } = render(<Notification message="x" intent="error" />)
    expect(container.querySelector('[data-variant="solid"]')).toBeTruthy()
  })

  it('sets data-variant="pastel" when variant="pastel"', () => {
    const { container } = render(<Notification message="x" intent="success" variant="pastel" />)
    expect(container.querySelector('[data-variant="pastel"]')).toBeTruthy()
  })

  it('sets data-variant="neutral" for default intent regardless of variant prop', () => {
    const { container } = render(<Notification message="x" intent="default" variant="solid" />)
    expect(container.querySelector('[data-variant="neutral"]')).toBeTruthy()
  })

  it('sets data-size="lg" by default', () => {
    const { container } = render(<Notification message="x" />)
    expect(container.querySelector('[data-size="lg"]')).toBeTruthy()
  })

  it('sets data-size="sm" when size="sm"', () => {
    const { container } = render(<Notification message="x" size="sm" />)
    expect(container.querySelector('[data-size="sm"]')).toBeTruthy()
  })
})

describe('Notification — ARIA / accessibility', () => {
  it('has role="status" for non-error intents', () => {
    render(<Notification message="OK" intent="success" />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has role="alert" for error intent', () => {
    render(<Notification message="Fallo" intent="error" />)
    expect(screen.getByRole('alert')).toBeTruthy()
  })

  it('respects the explicit role prop', () => {
    render(<Notification message="x" role="alert" />)
    expect(screen.getByRole('alert')).toBeTruthy()
  })

  it('has no live-region role when role="none"', () => {
    const { container } = render(<Notification message="x" role="none" />)
    expect(container.querySelector('[role]')).toBeNull()
  })

  it('has aria-atomic="true"', () => {
    const { container } = render(<Notification message="x" />)
    expect(container.querySelector('[aria-atomic="true"]')).toBeTruthy()
  })

  it('icon and image containers are aria-hidden', () => {
    const { container } = render(
      <Notification message="x" image={<img src="" alt="" />} />,
    )
    expect(container.querySelector('.rds-notification__image[aria-hidden="true"]')).toBeTruthy()
  })

  it('close button is focusable and labelled', () => {
    render(<Notification message="x" onClose={() => {}} />)
    const btn = screen.getByRole('button', { name: 'Cerrar' })
    expect(btn.tagName).toBe('BUTTON')
    expect(btn.getAttribute('aria-label')).toBe('Cerrar')
  })
})

describe('Notification — interactions', () => {
  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Notification message="x" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<Notification message="x" action="Deshacer" onAction={onAction} />)
    await user.click(screen.getByText('Deshacer'))
    expect(onAction).toHaveBeenCalledOnce()
  })
})

describe('Notification — className passthrough', () => {
  it('merges className with rds-notification', () => {
    const { container } = render(<Notification message="x" className="my-custom" />)
    const el = container.querySelector('.rds-notification')
    expect(el?.classList.contains('my-custom')).toBe(true)
  })
})

describe('Notification — all intents render', () => {
  const intents = ['default', 'success', 'warning', 'error', 'info', 'ai'] as const

  for (const intent of intents) {
    it(`renders intent="${intent}" without error`, () => {
      const { container } = render(<Notification message="Test" intent={intent} />)
      expect(container.querySelector('.rds-notification')).toBeTruthy()
    })

    if (intent !== 'default') {
      it(`renders intent="${intent}" with variant="pastel"`, () => {
        const { container } = render(
          <Notification message="Test" intent={intent} variant="pastel" />,
        )
        expect(container.querySelector('[data-variant="pastel"]')).toBeTruthy()
      })
    }
  }
})
