import type { Meta, StoryObj } from '@storybook/react'
import { Tag, type TagIntent, type TagVariant } from '@rappi-ds/react'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Sparkles,
  Star,
  X,
} from '@rappi-ds/icons'
import React from 'react'

const INTENTS: TagIntent[] = ['standard', 'success', 'warning', 'error', 'info', 'suggestion', 'ai']
const VARIANTS: TagVariant[] = ['solid', 'pastel', 'outline', 'ghost']

const INTENT_ICONS: Record<TagIntent, React.ReactNode> = {
  standard: <Star size={12} strokeWidth={1.5} />,
  success: <CheckCircle size={12} strokeWidth={1.5} />,
  warning: <AlertTriangle size={12} strokeWidth={1.5} />,
  error: <AlertCircle size={12} strokeWidth={1.5} />,
  info: <Info size={12} strokeWidth={1.5} />,
  suggestion: <Lightbulb size={12} strokeWidth={1.5} />,
  ai: <Sparkles size={12} strokeWidth={1.5} />,
}

const INTENT_LABELS: Record<TagIntent, string> = {
  standard: 'Estándar',
  success: 'Exitoso',
  warning: 'Advertencia',
  error: 'Error',
  info: 'Información',
  suggestion: 'Sugerencia',
  ai: 'IA',
}

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  argTypes: {
    intent: { control: 'select', options: INTENTS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: ['sm', 'md'] },
    children: { control: 'text' },
  },
  args: {
    intent: 'success',
    variant: 'pastel',
    size: 'md',
    children: 'Activo',
  },
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Tag>

const label = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  color: 'var(--ink-weak)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'capitalize' as const,
}

export const Playground: Story = {
  render: (args) => <Tag {...args} />,
}

export const AllIntents: Story = {
  name: 'All intents × Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p style={label}>{variant}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8)' }}>
            {INTENTS.map((intent) => (
              <Tag key={intent} intent={intent} variant={variant}>
                {INTENT_LABELS[intent]}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllIntentsSm: Story = {
  name: 'All intents × Variants — sm',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p style={label}>{variant}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8)' }}>
            {INTENTS.map((intent) => (
              <Tag key={intent} intent={intent} variant={variant} size="sm">
                {INTENT_LABELS[intent]}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-8)' }}>
          <span style={label}>{size}</span>
          {INTENTS.map((intent) => (
            <Tag key={intent} intent={intent} size={size} variant="pastel">
              {INTENT_LABELS[intent]}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const WithStartIcon: Story = {
  name: 'With start icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p style={label}>{variant}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8)' }}>
            {INTENTS.map((intent) => (
              <Tag
                key={intent}
                intent={intent}
                variant={variant}
                startIcon={INTENT_ICONS[intent]}
              >
                {INTENT_LABELS[intent]}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const WithEndIcon: Story = {
  name: 'With end icon (dismissible)',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8)' }}>
      {INTENTS.map((intent) => (
        <Tag
          key={intent}
          intent={intent}
          variant="pastel"
          endIcon={<X size={12} strokeWidth={2} />}
        >
          {INTENT_LABELS[intent]}
        </Tag>
      ))}
    </div>
  ),
}

export const WithBothIcons: Story = {
  name: 'With start + end icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8)' }}>
      {INTENTS.map((intent) => (
        <Tag
          key={intent}
          intent={intent}
          variant="pastel"
          startIcon={INTENT_ICONS[intent]}
          endIcon={<X size={12} strokeWidth={2} />}
        >
          {INTENT_LABELS[intent]}
        </Tag>
      ))}
    </div>
  ),
}

export const SmWithIcons: Story = {
  name: 'sm — with icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8)', alignItems: 'center' }}>
      {INTENTS.map((intent) => (
        <Tag
          key={intent}
          intent={intent}
          size="sm"
          variant="pastel"
          startIcon={<span style={{ fontSize: 8 }}>●</span>}
        >
          {INTENT_LABELS[intent]}
        </Tag>
      ))}
    </div>
  ),
}

export const OrderStatusUseCase: Story = {
  name: 'Use case — order status',
  render: () => {
    const orders = [
      { id: '#4521', status: 'Activo', intent: 'success' as TagIntent },
      { id: '#4522', status: 'Pendiente', intent: 'warning' as TagIntent },
      { id: '#4523', status: 'Cancelado', intent: 'error' as TagIntent },
      { id: '#4524', status: 'En revisión', intent: 'info' as TagIntent },
      { id: '#4525', status: 'Sugerido', intent: 'suggestion' as TagIntent },
      { id: '#4526', status: 'IA activa', intent: 'ai' as TagIntent },
    ]
    return (
      <table style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-body-md)', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {['Pedido', 'Estado (pastel)', 'Estado (solid)', 'Estado (outline)', 'Estado (ghost)'].map((h) => (
              <th key={h} style={{ textAlign: 'left', padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--ink-weak)', fontWeight: 500, fontSize: 'var(--font-size-label-xs)', borderBottom: '1px solid var(--border-standard)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, status, intent }) => (
            <tr key={id}>
              <td style={{ padding: 'var(--spacing-12)', color: 'var(--ink-standard)' }}>{id}</td>
              {(['pastel', 'solid', 'outline', 'ghost'] as TagVariant[]).map((v) => (
                <td key={v} style={{ padding: 'var(--spacing-12)' }}>
                  <Tag intent={intent} variant={v} size="sm">{status}</Tag>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
}

export const ProductCatalogUseCase: Story = {
  name: 'Use case — product catalog',
  render: () => {
    const products = [
      { name: 'Burger Clásica', tags: [{ label: 'Más vendido', intent: 'success' as TagIntent }, { label: 'IA recomendado', intent: 'ai' as TagIntent }] },
      { name: 'Pizza Margarita', tags: [{ label: 'Bajo stock', intent: 'warning' as TagIntent }] },
      { name: 'Limonada Natural', tags: [{ label: 'Nuevo', intent: 'info' as TagIntent }, { label: 'Oferta', intent: 'suggestion' as TagIntent }] },
      { name: 'Ensalada César', tags: [{ label: 'Sin stock', intent: 'error' as TagIntent }] },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', maxWidth: 400 }}>
        {products.map(({ name, tags }) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-12) var(--spacing-16)', border: '1px solid var(--border-standard)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-body-md)', fontWeight: 500 }}>
              {name}
            </span>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              {tags.map(({ label: tLabel, intent }) => (
                <Tag key={tLabel} intent={intent} variant="pastel" size="sm">
                  {tLabel}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
