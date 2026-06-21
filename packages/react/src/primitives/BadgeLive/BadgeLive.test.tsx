// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { BadgeLive } from './BadgeLive'

afterEach(cleanup)

describe('BadgeLive', () => {
  it('renders with role img and the given status', () => {
    render(<BadgeLive status="active" aria-label="Tienda activa" />)

    const badge = screen.getByRole('img', { name: 'Tienda activa' })
    expect(badge.getAttribute('data-status')).toBe('active')
  })

  it.each(['active', 'inactive', 'closed', 'suspended'] as const)(
    'sets data-status="%s"',
    (status) => {
      render(<BadgeLive status={status} aria-label={status} />)
      expect(screen.getByRole('img', { name: status }).getAttribute('data-status')).toBe(status)
    },
  )

  it('does not set data-animated when animated is false', () => {
    render(<BadgeLive status="active" aria-label="Activa" />)
    expect(screen.getByRole('img', { name: 'Activa' }).hasAttribute('data-animated')).toBe(false)
  })

  it('sets data-animated when animated is true', () => {
    render(<BadgeLive status="active" animated aria-label="Activa en vivo" />)
    expect(screen.getByRole('img', { name: 'Activa en vivo' }).hasAttribute('data-animated')).toBe(
      true,
    )
  })

  it('forwards extra span attributes', () => {
    render(<BadgeLive status="closed" aria-label="Cerrada" data-testid="badge" />)
    expect(screen.getByTestId('badge').getAttribute('data-status')).toBe('closed')
  })

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<BadgeLive ref={ref} status="active" aria-label="Activa" />)
    expect(ref.current?.tagName).toBe('SPAN')
  })

  it('applies additional className', () => {
    render(<BadgeLive status="active" aria-label="Activa" className="custom-class" />)
    expect(screen.getByRole('img', { name: 'Activa' }).classList.contains('custom-class')).toBe(
      true,
    )
  })
})
