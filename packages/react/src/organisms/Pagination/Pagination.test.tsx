// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

afterEach(cleanup)

// ─── Structure ────────────────────────────────────────────────────────────────

describe('Pagination — structure', () => {
  it('renders a nav element with aria-label=Paginación', () => {
    render(<Pagination page={1} totalPages={5} />)
    expect(screen.getByRole('navigation', { name: 'Paginación' })).toBeTruthy()
  })

  it('forwards ref to the nav element', () => {
    const ref = createRef<HTMLElement>()
    render(<Pagination page={1} totalPages={5} ref={ref} />)
    expect(ref.current?.tagName.toLowerCase()).toBe('nav')
  })

  it('merges extra className', () => {
    render(<Pagination page={1} totalPages={5} className="custom" />)
    expect(screen.getByRole('navigation').classList.contains('custom')).toBe(true)
  })

  it('forwards arbitrary HTML attributes', () => {
    render(<Pagination page={1} totalPages={5} data-testid="pg" />)
    expect(screen.getByRole('navigation').getAttribute('data-testid')).toBe('pg')
  })
})

// ─── Page buttons ─────────────────────────────────────────────────────────────

describe('Pagination — page buttons', () => {
  it('shows all pages when totalPages ≤ 7', () => {
    render(<Pagination page={1} totalPages={5} />)
    for (let p = 1; p <= 5; p++) {
      expect(screen.getByRole('button', { name: `Página ${p}` })).toBeTruthy()
    }
  })

  it('marks the current page with aria-current="page"', () => {
    render(<Pagination page={3} totalPages={5} />)
    const active = screen.getByRole('button', { name: 'Página 3' })
    expect(active.getAttribute('aria-current')).toBe('page')
  })

  it('does not mark other pages with aria-current', () => {
    render(<Pagination page={3} totalPages={5} />)
    const btn = screen.getByRole('button', { name: 'Página 1' })
    expect(btn.getAttribute('aria-current')).toBeNull()
  })
})

// ─── Navigation buttons ───────────────────────────────────────────────────────

describe('Pagination — navigation buttons', () => {
  it('renders prev and next buttons', () => {
    render(<Pagination page={2} totalPages={5} />)
    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página siguiente' })).toBeTruthy()
  })

  it('disables prev button on page 1', () => {
    render(<Pagination page={1} totalPages={5} />)
    const btn = screen.getByRole('button', { name: 'Página anterior' }) as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} />)
    const btn = screen.getByRole('button', { name: 'Página siguiente' }) as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })

  it('enables prev button when page > 1', () => {
    render(<Pagination page={3} totalPages={5} />)
    const btn = screen.getByRole('button', { name: 'Página anterior' }) as HTMLButtonElement
    expect(btn.disabled).toBe(false)
  })

  it('enables next button when page < totalPages', () => {
    render(<Pagination page={3} totalPages={5} />)
    const btn = screen.getByRole('button', { name: 'Página siguiente' }) as HTMLButtonElement
    expect(btn.disabled).toBe(false)
  })
})

// ─── onPageChange callbacks ───────────────────────────────────────────────────

describe('Pagination — onPageChange', () => {
  it('calls onPageChange with the clicked page number', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Página 3' }))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange(page - 1) when prev is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={4} totalPages={5} onPageChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Página anterior' }))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange(page + 1) when next is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={4} totalPages={5} onPageChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Página siguiente' }))
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('does not call onPageChange when current page button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Página 3' }))
    expect(onChange).not.toHaveBeenCalled()
  })
})

// ─── Ellipsis algorithm ───────────────────────────────────────────────────────

describe('Pagination — ellipsis algorithm', () => {
  it('shows all pages when totalPages ≤ 7', () => {
    const { container } = render(<Pagination page={1} totalPages={7} />)
    const ellipsis = container.querySelector('[data-type="ellipsis"]')
    expect(ellipsis).toBeNull()
  })

  it('shows trailing ellipsis when near start (page=1, total=10)', () => {
    const { container } = render(<Pagination page={1} totalPages={10} />)
    const ellipsis = container.querySelectorAll('[data-type="ellipsis"]')
    expect(ellipsis).toHaveLength(1)
    // shows pages 1, 2, 3 and last page
    expect(screen.getByRole('button', { name: 'Página 1' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 10' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Página 5' })).toBeNull()
  })

  it('shows leading ellipsis when near end (page=10, total=10)', () => {
    const { container } = render(<Pagination page={10} totalPages={10} />)
    const ellipsis = container.querySelectorAll('[data-type="ellipsis"]')
    expect(ellipsis).toHaveLength(1)
    // shows page 1 and last 3 pages
    expect(screen.getByRole('button', { name: 'Página 1' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 8' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 9' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 10' })).toBeTruthy()
  })

  it('shows both ellipses when in middle (page=5, total=10)', () => {
    const { container } = render(<Pagination page={5} totalPages={10} />)
    const ellipsis = container.querySelectorAll('[data-type="ellipsis"]')
    expect(ellipsis).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Página 4' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 5' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Página 6' })).toBeTruthy()
  })
})
