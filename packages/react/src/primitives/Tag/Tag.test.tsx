// @vitest-environment jsdom

import { createRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Tag } from './Tag'

afterEach(cleanup)

describe('Tag', () => {
  it('renders as a span with the label text', () => {
    render(<Tag>En proceso</Tag>)
    expect(screen.getByText('En proceso').tagName).toBe('SPAN')
  })

  it('applies default data attributes (intent=standard, variant=pastel, size=md)', () => {
    const { container } = render(<Tag>Label</Tag>)
    const tag = container.querySelector('.rds-tag')
    expect(tag?.getAttribute('data-intent')).toBe('standard')
    expect(tag?.getAttribute('data-variant')).toBe('pastel')
    expect(tag?.getAttribute('data-size')).toBe('md')
  })

  it.each(['standard', 'success', 'warning', 'error', 'info', 'suggestion', 'ai'] as const)(
    'applies data-intent="%s"',
    (intent) => {
      const { container } = render(<Tag intent={intent}>Label</Tag>)
      expect(container.querySelector('.rds-tag')?.getAttribute('data-intent')).toBe(intent)
    },
  )

  it.each(['solid', 'pastel', 'outline', 'ghost'] as const)(
    'applies data-variant="%s"',
    (variant) => {
      const { container } = render(<Tag variant={variant}>Label</Tag>)
      expect(container.querySelector('.rds-tag')?.getAttribute('data-variant')).toBe(variant)
    },
  )

  it.each(['sm', 'md'] as const)('applies data-size="%s"', (size) => {
    const { container } = render(<Tag size={size}>Label</Tag>)
    expect(container.querySelector('.rds-tag')?.getAttribute('data-size')).toBe(size)
  })

  it('renders startIcon wrapped in rds-tag__icon', () => {
    const { container } = render(
      <Tag startIcon={<svg data-testid="icon-start" />}>Label</Tag>,
    )
    expect(screen.getByTestId('icon-start')).toBeTruthy()
    expect(container.querySelector('.rds-tag__icon')).toBeTruthy()
  })

  it('renders endIcon wrapped in rds-tag__icon', () => {
    const { container } = render(
      <Tag endIcon={<svg data-testid="icon-end" />}>Label</Tag>,
    )
    expect(screen.getByTestId('icon-end')).toBeTruthy()
  })

  it('renders both startIcon and endIcon', () => {
    const { container } = render(
      <Tag startIcon={<svg data-testid="start" />} endIcon={<svg data-testid="end" />}>
        Label
      </Tag>,
    )
    expect(container.querySelectorAll('.rds-tag__icon')).toHaveLength(2)
    expect(screen.getByTestId('start')).toBeTruthy()
    expect(screen.getByTestId('end')).toBeTruthy()
  })

  it('renders no icon wrapper when no icons are passed', () => {
    const { container } = render(<Tag>Label</Tag>)
    expect(container.querySelectorAll('.rds-tag__icon')).toHaveLength(0)
  })

  it('icon wrappers have aria-hidden', () => {
    const { container } = render(
      <Tag startIcon={<svg />} endIcon={<svg />}>Label</Tag>,
    )
    container.querySelectorAll('.rds-tag__icon').forEach((el) => {
      expect(el.getAttribute('aria-hidden')).toBe('true')
    })
  })

  it('wraps label in rds-tag__label', () => {
    const { container } = render(<Tag>My Label</Tag>)
    expect(container.querySelector('.rds-tag__label')?.textContent).toBe('My Label')
  })

  it('merges className prop', () => {
    const { container } = render(<Tag className="custom-class">Label</Tag>)
    expect(container.querySelector('.rds-tag')?.classList.contains('custom-class')).toBe(true)
  })

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Tag ref={ref}>Label</Tag>)
    expect(ref.current?.tagName).toBe('SPAN')
    expect(ref.current?.classList.contains('rds-tag')).toBe(true)
  })

  it('forwards arbitrary HTML attributes to the span', () => {
    render(<Tag id="my-tag" title="tooltip" aria-label="estado">Label</Tag>)
    const tag = document.getElementById('my-tag')
    expect(tag?.getAttribute('title')).toBe('tooltip')
    expect(tag?.getAttribute('aria-label')).toBe('estado')
  })

  it('accepts ReactNode children (not just strings)', () => {
    render(<Tag><strong>Bold label</strong></Tag>)
    expect(screen.getByText('Bold label').tagName).toBe('STRONG')
  })
})
