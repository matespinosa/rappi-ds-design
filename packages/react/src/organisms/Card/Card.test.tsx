// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Card } from './Card'

afterEach(cleanup)

// ─── Structure ────────────────────────────────────────────────────────────────

describe('Card — structure', () => {
  it('renders with class rds-card', () => {
    const { container } = render(<Card />)
    expect(container.querySelector('.rds-card')).toBeTruthy()
  })

  it('renders a div by default', () => {
    const { container } = render(<Card />)
    expect(container.querySelector('div.rds-card')).toBeTruthy()
  })

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Card ref={ref} />)
    expect(ref.current?.classList.contains('rds-card')).toBe(true)
  })

  it('merges extra className', () => {
    const { container } = render(<Card className="my-card" />)
    const el = container.querySelector('.rds-card')!
    expect(el.classList.contains('my-card')).toBe(true)
    expect(el.classList.contains('rds-card')).toBe(true)
  })

  it('forwards arbitrary HTML attributes', () => {
    const { container } = render(<Card data-testid="card-root" aria-label="Card" />)
    const el = container.querySelector('.rds-card')!
    expect(el.getAttribute('data-testid')).toBe('card-root')
    expect(el.getAttribute('aria-label')).toBe('Card')
  })

  it('renders children', () => {
    const { container } = render(<Card><span className="child">hello</span></Card>)
    expect(container.querySelector('.child')).toBeTruthy()
  })
})

// ─── Elevation ────────────────────────────────────────────────────────────────

describe('Card — elevation', () => {
  it('defaults to data-elevation="flat"', () => {
    const { container } = render(<Card />)
    expect(container.querySelector('.rds-card')?.getAttribute('data-elevation')).toBe('flat')
  })

  it('sets data-elevation="raised"', () => {
    const { container } = render(<Card elevation="raised" />)
    expect(container.querySelector('.rds-card')?.getAttribute('data-elevation')).toBe('raised')
  })

  it('sets data-elevation="floating"', () => {
    const { container } = render(<Card elevation="floating" />)
    expect(container.querySelector('.rds-card')?.getAttribute('data-elevation')).toBe('floating')
  })
})
