// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Flag, type FlagCountry } from './Flag'

afterEach(cleanup)

const countries: readonly FlagCountry[] = [
  'COL',
  'MEX',
  'BRA',
  'ARG',
  'CL',
  'EC',
  'PE',
  'CR',
  'URG',
  'ESP',
]

describe('Flag', () => {
  it('uses Colombia as the Figma default', () => {
    render(<Flag />)

    const flag = screen.getByRole('img', { name: 'Colombia' })
    expect(flag.getAttribute('data-country')).toBe('COL')
    expect(flag.querySelector('img')?.getAttribute('src')).toMatch(/^data:image\/png;base64,/)
  })

  it.each(countries)('renders the %s country asset', (country) => {
    render(<Flag country={country} aria-label={country} />)

    expect(screen.getByRole('img', { name: country }).getAttribute('data-country')).toBe(country)
  })

  it('is hidden from assistive technology when decorative', () => {
    const { container } = render(<Flag country="MEX" decorative aria-label="Ignored label" />)

    const flag = container.querySelector('.rds-flag')
    expect(flag?.getAttribute('aria-hidden')).toBe('true')
    expect(flag?.hasAttribute('role')).toBe(false)
    expect(flag?.hasAttribute('aria-label')).toBe(false)
  })

  it('forwards native span attributes and the ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Flag ref={ref} country="BRA" title="Brazil market" />)

    expect(ref.current?.tagName).toBe('SPAN')
    expect(ref.current?.getAttribute('title')).toBe('Brazil market')
  })
})
