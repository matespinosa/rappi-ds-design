import type { Meta, StoryObj } from '@storybook/react'
import { Chip, type ChipSize, type ChipVariant } from '@rappi-ds/react'
import { SlidersHorizontal, Star, X, ChevronDown, ShoppingCart } from '@rappi-ds/icons'
import React, { useState } from 'react'

const sizes: ChipSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const variants: ChipVariant[] = ['filled', 'outline']

const meta: Meta<typeof Chip> = {
  title: 'Primitives/Chip',
  component: Chip,
  argTypes: {
    size: { control: 'select', options: sizes },
    variant: { control: 'select', options: variants },
    selected: { control: 'boolean' },
    shadow: { control: 'boolean' },
    disabled: { control: 'boolean' },
    badge: { control: 'text' },
  },
  args: {
    children: 'Chip label',
    size: 'md',
    variant: 'filled',
    selected: false,
    shadow: false,
    disabled: false,
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Chip>

function ToggleChip(props: React.ComponentProps<typeof Chip>) {
  const [selected, setSelected] = useState(props.selected ?? false)
  return (
    <Chip {...props} selected={selected} onClick={() => setSelected((s) => !s)} />
  )
}

export const Playground: Story = {
  render: (args) => <ToggleChip {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', flexWrap: 'wrap' }}>
      {sizes.map((size) => (
        <Chip key={size} size={size}>
          {size}
        </Chip>
      ))}
    </div>
  ),
}

export const VariantFilled: Story = {
  name: 'Variant: filled (filter chip)',
  render: () => {
    const filters = ['Todas', 'Activas', 'Cerradas', 'Suspendidas']
    const [active, setActive] = useState('Todas')
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-8)', flexWrap: 'wrap' }}>
        {filters.map((label) => (
          <Chip
            key={label}
            variant="filled"
            selected={active === label}
            onClick={() => setActive(label)}
          >
            {label}
          </Chip>
        ))}
      </div>
    )
  },
}

export const VariantOutline: Story = {
  name: 'Variant: outline (tab chip)',
  render: () => {
    const tabs = ['General', 'Pedidos', 'Finanzas', 'Reportes']
    const [active, setActive] = useState('General')
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-8)', flexWrap: 'wrap' }}>
        {tabs.map((label) => (
          <Chip
            key={label}
            variant="outline"
            selected={active === label}
            onClick={() => setActive(label)}
          >
            {label}
          </Chip>
        ))}
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
        <Chip startIcon={<Star size={16} />}>Favoritos</Chip>
        <Chip endIcon={<ChevronDown size={16} />}>Categoría</Chip>
        <Chip startIcon={<SlidersHorizontal size={16} />} endIcon={<X size={16} />}>
          Filtros
        </Chip>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
        <Chip startIcon={<Star size={16} />} selected>
          Favoritos
        </Chip>
        <Chip startIcon={<ShoppingCart size={16} />} selected variant="outline">
          Carrito
        </Chip>
      </div>
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip badge={3}>Filtros activos</Chip>
      <Chip badge={12} selected>
        Pedidos
      </Chip>
      <Chip badge="99+" variant="outline" selected>
        Alertas
      </Chip>
      <Chip startIcon={<SlidersHorizontal size={16} />} badge={2}>
        Filtrar
      </Chip>
    </div>
  ),
}

export const WithShadow: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-16)',
        padding: 'var(--spacing-24)',
        background: 'var(--surface-mild)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <Chip shadow>Sin sombra</Chip>
      <Chip shadow selected>
        Con sombra
      </Chip>
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip disabled>Desactivado</Chip>
      <Chip disabled selected>
        Seleccionado desactivado
      </Chip>
      <Chip disabled startIcon={<Star size={16} />}>
        Con ícono
      </Chip>
      <Chip disabled badge={4}>
        Con badge
      </Chip>
    </div>
  ),
}

export const FilterGroup: Story = {
  name: 'Filter group (real use case)',
  render: () => {
    type Category = 'all' | 'burgers' | 'sushi' | 'pizza' | 'drinks' | 'desserts'
    const options: { id: Category; label: string; count?: number }[] = [
      { id: 'all', label: 'Todos', count: 42 },
      { id: 'burgers', label: 'Hamburguesas', count: 8 },
      { id: 'sushi', label: 'Sushi', count: 12 },
      { id: 'pizza', label: 'Pizza', count: 6 },
      { id: 'drinks', label: 'Bebidas', count: 9 },
      { id: 'desserts', label: 'Postres', count: 7 },
    ]
    const [active, setActive] = useState<Category>('all')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
        <p
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-label-sm)',
            color: 'var(--ink-weak)',
            margin: 0,
          }}
        >
          Categorías
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-8)', flexWrap: 'wrap' }}>
          {options.map(({ id, label, count }) => (
            <Chip
              key={id}
              size="sm"
              variant="filled"
              selected={active === id}
              badge={active === id && count !== undefined ? count : undefined}
              onClick={() => setActive(id)}
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>
    )
  },
}
