import type { Meta, StoryObj } from '@storybook/react'
import { SegmentedControl, SegmentedOption } from '@rappi-ds/react'
import { BarChart2, Grid, List, Moon, Sun } from '@rappi-ds/icons'
import React, { useState } from 'react'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Primitives/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

/* ─── Helper ─── */
function Controlled(
  props: Omit<React.ComponentProps<typeof SegmentedControl>, 'value' | 'onChange'> & {
    defaultValue?: string
  },
) {
  const { defaultValue, children, ...rest } = props
  const firstValue = defaultValue ?? 'a'
  const [value, setValue] = useState(firstValue)
  return (
    <SegmentedControl {...rest} value={value} onChange={setValue}>
      {children}
    </SegmentedControl>
  )
}

/* ─── Figma reference — 2 options ─── */

export const FigmaDefault: Story = {
  name: 'Figma — 2 options (default)',
  render: () => (
    <Controlled aria-label="Vista" defaultValue="a">
      <SegmentedOption value="a">Label</SegmentedOption>
      <SegmentedOption value="b">Label</SegmentedOption>
    </Controlled>
  ),
}

/* ─── 2 / 3 / 4 options ─── */

export const TwoOptions: Story = {
  name: '2 options',
  render: () => (
    <Controlled aria-label="Modo" defaultValue="list">
      <SegmentedOption value="list">Lista</SegmentedOption>
      <SegmentedOption value="grid">Cuadrícula</SegmentedOption>
    </Controlled>
  ),
}

export const ThreeOptions: Story = {
  name: '3 options',
  render: () => (
    <Controlled aria-label="Período" defaultValue="day">
      <SegmentedOption value="day">Hoy</SegmentedOption>
      <SegmentedOption value="week">Semana</SegmentedOption>
      <SegmentedOption value="month">Mes</SegmentedOption>
    </Controlled>
  ),
}

export const FourOptions: Story = {
  name: '4 options',
  render: () => (
    <Controlled aria-label="Estadísticas" defaultValue="day">
      <SegmentedOption value="day">Hoy</SegmentedOption>
      <SegmentedOption value="week">Semana</SegmentedOption>
      <SegmentedOption value="month">Mes</SegmentedOption>
      <SegmentedOption value="year">Año</SegmentedOption>
    </Controlled>
  ),
}

/* ─── With icons (Figma annotation: Left Icon and Right Icon support) ─── */

export const WithStartIcons: Story = {
  name: 'With start icons',
  render: () => (
    <Controlled aria-label="Vista" defaultValue="list">
      <SegmentedOption value="list" startIcon={<List size={14} strokeWidth={1.5} />}>
        Lista
      </SegmentedOption>
      <SegmentedOption value="grid" startIcon={<Grid size={14} strokeWidth={1.5} />}>
        Cuadrícula
      </SegmentedOption>
    </Controlled>
  ),
}

export const WithEndIcons: Story = {
  name: 'With end icons',
  render: () => (
    <Controlled aria-label="Tema" defaultValue="light">
      <SegmentedOption value="light" endIcon={<Sun size={14} strokeWidth={1.5} />}>
        Claro
      </SegmentedOption>
      <SegmentedOption value="dark" endIcon={<Moon size={14} strokeWidth={1.5} />}>
        Oscuro
      </SegmentedOption>
    </Controlled>
  ),
}

export const IconOnly: Story = {
  name: 'Icon only (no label)',
  render: () => (
    <Controlled aria-label="Vista de datos" defaultValue="chart">
      <SegmentedOption value="chart" startIcon={<BarChart2 size={14} strokeWidth={1.5} />}>
        {/* visually icon only; text serves as accessible name */}
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Gráfica
        </span>
      </SegmentedOption>
      <SegmentedOption value="list" startIcon={<List size={14} strokeWidth={1.5} />}>
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Lista
        </span>
      </SegmentedOption>
      <SegmentedOption value="grid" startIcon={<Grid size={14} strokeWidth={1.5} />}>
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Cuadrícula
        </span>
      </SegmentedOption>
    </Controlled>
  ),
}

/* ─── With disabled option ─── */

export const WithDisabled: Story = {
  name: 'With disabled option',
  render: () => (
    <Controlled aria-label="Período" defaultValue="day">
      <SegmentedOption value="day">Hoy</SegmentedOption>
      <SegmentedOption value="week">Semana</SegmentedOption>
      <SegmentedOption value="month" disabled>Mes</SegmentedOption>
    </Controlled>
  ),
}

/* ─── Real-world: dashboard time filter ─── */

export const MerchantDashboard: Story = {
  name: 'Merchant dashboard — time filter',
  render: () => {
    const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today')

    const data: Record<string, { orders: number; revenue: string; rating: number }> = {
      today:  { orders: 32, revenue: '$1,240,000', rating: 4.8 },
      week:   { orders: 218, revenue: '$8,750,000', rating: 4.7 },
      month:  { orders: 892, revenue: '$34,200,000', rating: 4.6 },
    }
    const { orders, revenue, rating } = data[period]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', width: 360, fontFamily: 'var(--font-family-base)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'var(--font-weight-label-lg)', fontSize: 'var(--font-size-body-lg)', color: 'var(--ink-strong)' }}>
            Resumen
          </span>
          <SegmentedControl value={period} onChange={(v) => setPeriod(v as typeof period)} aria-label="Período">
            <SegmentedOption value="today">Hoy</SegmentedOption>
            <SegmentedOption value="week">Semana</SegmentedOption>
            <SegmentedOption value="month">Mes</SegmentedOption>
          </SegmentedControl>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-12)' }}>
          {[
            { label: 'Pedidos', value: orders },
            { label: 'Ingresos', value: revenue },
            { label: 'Calificación', value: `⭐ ${rating}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--surface-mild)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-12)' }}>
              <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--ink-weak)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 'var(--font-size-body-lg)', fontWeight: 'var(--font-weight-label-md)', color: 'var(--ink-strong)' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/* ─── Full showcase ─── */

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
      {[
        { label: '2 options', node: (
          <Controlled aria-label="2 ops" defaultValue="a">
            <SegmentedOption value="a">Label</SegmentedOption>
            <SegmentedOption value="b">Label</SegmentedOption>
          </Controlled>
        )},
        { label: '3 options', node: (
          <Controlled aria-label="3 ops" defaultValue="a">
            <SegmentedOption value="a">Label</SegmentedOption>
            <SegmentedOption value="b">Label</SegmentedOption>
            <SegmentedOption value="c">Label</SegmentedOption>
          </Controlled>
        )},
        { label: '4 options', node: (
          <Controlled aria-label="4 ops" defaultValue="a">
            <SegmentedOption value="a">Label</SegmentedOption>
            <SegmentedOption value="b">Label</SegmentedOption>
            <SegmentedOption value="c">Label</SegmentedOption>
            <SegmentedOption value="d">Label</SegmentedOption>
          </Controlled>
        )},
        { label: 'With icons', node: (
          <Controlled aria-label="icons" defaultValue="list">
            <SegmentedOption value="list" startIcon={<List size={14} strokeWidth={1.5} />}>Lista</SegmentedOption>
            <SegmentedOption value="grid" startIcon={<Grid size={14} strokeWidth={1.5} />}>Grid</SegmentedOption>
          </Controlled>
        )},
        { label: 'With disabled', node: (
          <Controlled aria-label="disabled" defaultValue="a">
            <SegmentedOption value="a">Activo</SegmentedOption>
            <SegmentedOption value="b" disabled>Desactivado</SegmentedOption>
            <SegmentedOption value="c">Activo</SegmentedOption>
          </Controlled>
        )},
      ].map(({ label, node }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}>
          <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-caption)', color: 'var(--ink-weak)', width: 100, flexShrink: 0 }}>
            {label}
          </span>
          {node}
        </div>
      ))}
    </div>
  ),
}
