// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { BadgeNumber } from './BadgeNumber'

afterEach(cleanup)

describe('BadgeNumber', () => {
  it('uses the Figma defaults', () => {
    render(<BadgeNumber aria-label="2 unread notifications" />)

    const badge = screen.getByLabelText('2 unread notifications')
    expect(badge.getAttribute('data-appearance')).toBe('accent')
    expect(badge.getAttribute('data-size')).toBe('xs')
    expect(badge.textContent).toBe('2')
  })

  it.each(['accent', 'light', 'dark'] as const)('renders the %s appearance', (appearance) => {
    render(<BadgeNumber appearance={appearance} aria-label={appearance} />)
    expect(screen.getByLabelText(appearance).getAttribute('data-appearance')).toBe(appearance)
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders the %s size', (size) => {
    render(<BadgeNumber size={size} aria-label={size} />)
    expect(screen.getByLabelText(size).getAttribute('data-size')).toBe(size)
  })

  it('supports zero and multi-digit values', () => {
    const { rerender } = render(<BadgeNumber value={0} aria-label="No notifications" />)
    expect(screen.getByLabelText('No notifications').textContent).toBe('0')

    rerender(<BadgeNumber value="99+" aria-label="More than 99 notifications" />)
    expect(screen.getByLabelText('More than 99 notifications').textContent).toBe('99+')
  })

  it('renders an empty badge when the value is hidden', () => {
    render(<BadgeNumber showValue={false} aria-label="New activity" />)

    const badge = screen.getByLabelText('New activity')
    expect(badge.getAttribute('data-empty')).toBe('true')
    expect(badge.textContent).toBe('')
  })

  it('renders an empty badge when value is omitted explicitly', () => {
    render(<BadgeNumber value={null} aria-label="New activity" />)

    const badge = screen.getByLabelText('New activity')
    expect(badge.getAttribute('data-empty')).toBe('true')
  })

  it('forwards native span attributes and the ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<BadgeNumber ref={ref} value={7} title="Unread orders" />)

    expect(ref.current?.tagName).toBe('SPAN')
    expect(ref.current?.getAttribute('title')).toBe('Unread orders')
  })
})
