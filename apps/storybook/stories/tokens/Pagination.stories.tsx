import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
  args: {
    page: 1,
    totalPages: 10,
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#f7f8f9' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  fontWeight: 600,
  color: 'var(--ink-weak)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page)
    return <Pagination {...args} page={page} onPageChange={setPage} />
  },
}

// ─── Figma states ─────────────────────────────────────────────────────────────

export const FigmaStates: Story = {
  name: 'Estados del Figma',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <div>
        <p style={sectionLabel}>Default — 3 páginas (sin elipsis)</p>
        <Pagination page={1} totalPages={3} />
      </div>
      <div>
        <p style={sectionLabel}>Intermediate — page 1 de 10 (elipsis al final)</p>
        <Pagination page={1} totalPages={10} />
      </div>
      <div>
        <p style={sectionLabel}>Last — page 10 de 10 (elipsis al inicio)</p>
        <Pagination page={10} totalPages={10} />
      </div>
    </div>
  ),
}

// ─── All ellipsis positions ───────────────────────────────────────────────────

export const EllipsisPositions: Story = {
  name: 'Posiciones de elipsis',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {[1, 2, 3, 5, 8, 9, 10].map((p) => (
        <div key={p}>
          <p style={{ ...sectionLabel, marginBottom: 'var(--spacing-4)' }}>Página {p} de 10</p>
          <Pagination page={p} totalPages={10} />
        </div>
      ))}
    </div>
  ),
}

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactivo',
  render: () => {
    const [page, setPage] = useState(1)
    const total = 15

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', fontFamily: 'var(--font-family-base)' }}>
        <Pagination page={page} totalPages={total} onPageChange={setPage} />
        <p style={{ margin: 0, fontSize: 'var(--font-size-body-md)', color: 'var(--ink-standard)' }}>
          Página <strong>{page}</strong> de <strong>{total}</strong>
        </p>
      </div>
    )
  },
}

// ─── Edge cases ───────────────────────────────────────────────────────────────

export const EdgeCases: Story = {
  name: 'Casos extremos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      <div>
        <p style={sectionLabel}>1 sola página</p>
        <Pagination page={1} totalPages={1} />
      </div>
      <div>
        <p style={sectionLabel}>2 páginas</p>
        <Pagination page={1} totalPages={2} />
      </div>
      <div>
        <p style={sectionLabel}>7 páginas (máximo sin elipsis)</p>
        <Pagination page={4} totalPages={7} />
      </div>
      <div>
        <p style={sectionLabel}>8 páginas (comienza elipsis), página central</p>
        <Pagination page={4} totalPages={8} />
      </div>
      <div>
        <p style={sectionLabel}>50 páginas, página 25</p>
        <Pagination page={25} totalPages={50} />
      </div>
    </div>
  ),
}
