// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Breadcrumb } from './Breadcrumb'

afterEach(cleanup)

const ITEMS_1 = [{ label: 'Inicio' }]

const ITEMS_2 = [{ label: 'Inicio', href: '/' }, { label: 'Mi tienda' }]

const ITEMS_3 = [
  { label: 'Inicio', href: '/' },
  { label: 'Tiendas', href: '/stores' },
  { label: 'Mi tienda' },
]

const ITEMS_4 = [
  { label: 'Inicio', href: '/' },
  { label: 'Tiendas', href: '/stores' },
  { label: 'Zona Norte', href: '/stores/zone' },
  { label: 'Mi tienda' },
]

describe('Breadcrumb', () => {
  it('renders a navigation landmark', () => {
    render(<Breadcrumb items={ITEMS_1} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy()
  })

  it('renders nothing when items is empty', () => {
    const { container } = render(<Breadcrumb items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the current page label with aria-current=page', () => {
    render(<Breadcrumb items={ITEMS_3} />)
    const current = screen.getByText('Mi tienda')
    expect(current.getAttribute('aria-current')).toBe('page')
  })

  it('renders ancestor items as links when href is provided', () => {
    render(<Breadcrumb items={ITEMS_3} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/stores')
  })

  it('renders ancestor item as button when onClick is provided (no href)', () => {
    const items = [
      { label: 'Inicio', onClick: vi.fn() },
      { label: 'Actual' },
    ]
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('button', { name: 'Inicio' })).toBeTruthy()
  })

  it('shows a back button when there are at least 2 items', () => {
    render(<Breadcrumb items={ITEMS_2} />)
    expect(screen.getByRole('button', { name: 'Volver' })).toBeTruthy()
  })

  it('does not show back button when there is only 1 item', () => {
    render(<Breadcrumb items={ITEMS_1} />)
    expect(screen.queryByRole('button', { name: 'Volver' })).toBeNull()
  })

  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup()
    const onBack = vi.fn()
    render(<Breadcrumb items={ITEMS_3} onBack={onBack} />)
    await user.click(screen.getByRole('button', { name: 'Volver' }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('falls back to the previous item onClick when onBack is not provided', async () => {
    const user = userEvent.setup()
    const prevOnClick = vi.fn()
    const items = [
      { label: 'Inicio', href: '/' },
      { label: 'Tiendas', onClick: prevOnClick },
      { label: 'Mi tienda' },
    ]
    render(<Breadcrumb items={items} />)
    await user.click(screen.getByRole('button', { name: 'Volver' }))
    expect(prevOnClick).toHaveBeenCalled()
  })

  it('renders the ordered list as an accessible list', () => {
    render(<Breadcrumb items={ITEMS_3} />)
    expect(screen.getByRole('list')).toBeTruthy()
  })

  it('renders the correct number of list items', () => {
    render(<Breadcrumb items={ITEMS_4} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  it('does not render the current page as an interactive element', () => {
    render(<Breadcrumb items={ITEMS_3} />)
    // Current item is a span, not a link or button
    const current = screen.getByText('Mi tienda')
    expect(current.tagName).toBe('SPAN')
  })

  it('applies the containerClassName', () => {
    const { container } = render(<Breadcrumb items={ITEMS_2} className="my-nav" />)
    expect(container.querySelector('nav.my-nav')).toBeTruthy()
  })

  it('renders separators between items (hidden from a11y)', () => {
    const { container } = render(<Breadcrumb items={ITEMS_3} />)
    const separators = container.querySelectorAll('.rds-breadcrumb__separator[aria-hidden="true"]')
    // 2 separators: between item 0→1 and item 1→2 (current has none after)
    expect(separators).toHaveLength(2)
  })

  it('renders the link with correct class for current page', () => {
    const { container } = render(<Breadcrumb items={ITEMS_3} />)
    expect(container.querySelector('.rds-breadcrumb__link--current')).toBeTruthy()
  })

  it('calls onClick on an ancestor link', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const items = [
      { label: 'Inicio', href: '/', onClick },
      { label: 'Actual' },
    ]
    render(<Breadcrumb items={items} />)
    await user.click(screen.getByRole('link', { name: 'Inicio' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders with 4 levels correctly', () => {
    render(<Breadcrumb items={ITEMS_4} />)
    expect(screen.getByText('Inicio')).toBeTruthy()
    expect(screen.getByText('Tiendas')).toBeTruthy()
    expect(screen.getByText('Zona Norte')).toBeTruthy()
    expect(screen.getByText('Mi tienda').getAttribute('aria-current')).toBe('page')
  })
})
