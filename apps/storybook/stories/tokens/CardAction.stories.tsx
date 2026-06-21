import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MapPin, Star } from '@rappi-ds/icons'
import { CardAction, Checkbox, Radio } from '@rappi-ds/react'

const meta: Meta<typeof CardAction> = {
  title: 'Organisms/CardAction',
  component: CardAction,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 487, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CardAction>

function selectionCheckbox(checked: boolean) {
  return <Checkbox checked={checked} readOnly tabIndex={-1} aria-hidden />
}

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'Title',
    description: 'Description',
  },
}

export const Selected: Story = {
  name: 'Selected',
  render: () => (
    <CardAction
      title="Title"
      description="Description"
      selected
      leftSlot={selectionCheckbox(true)}
    />
  ),
}

export const Interactive: Story = {
  name: 'Toggle interactivo',
  render: () => {
    const [selected, setSelected] = useState(false)
    return (
      <CardAction
        title="Bogotá"
        description="Capital de Colombia"
        selected={selected}
        onClick={() => setSelected(!selected)}
        leftSlot={selectionCheckbox(selected)}
      />
    )
  },
}

export const MultiSelect: Story = {
  name: 'Lista multi-selección',
  render: () => {
    const CITIES = [
      { value: 'bog', label: 'Bogotá', sub: 'Capital de Colombia' },
      { value: 'med', label: 'Medellín', sub: 'La ciudad de la eterna primavera' },
      { value: 'cal', label: 'Cali', sub: 'Sucursal del cielo' },
      { value: 'bar', label: 'Barranquilla', sub: 'La puerta de oro de Colombia' },
    ]
    const [selected, setSelected] = useState<string[]>([])

    const toggle = (val: string) =>
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
      )

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CITIES.map((city) => {
          const isSelected = selected.includes(city.value)
          return (
            <CardAction
              key={city.value}
              title={city.label}
              description={city.sub}
              selected={isSelected}
              onClick={() => toggle(city.value)}
              leftSlot={selectionCheckbox(isSelected)}
            />
          )
        })}
      </div>
    )
  },
}

export const SingleSelect: Story = {
  name: 'Lista single-selección',
  render: () => {
    const [selected, setSelected] = useState('bog')
    const CITIES = [
      { value: 'bog', label: 'Bogotá', sub: 'Capital de Colombia' },
      { value: 'med', label: 'Medellín', sub: 'La ciudad de la eterna primavera' },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CITIES.map((city) => {
          const isSelected = selected === city.value
          return (
            <CardAction
              key={city.value}
              title={city.label}
              description={city.sub}
              selected={isSelected}
              onClick={() => setSelected(city.value)}
              leftSlot={<Radio checked={isSelected} readOnly tabIndex={-1} aria-hidden />}
            />
          )
        })}
      </div>
    )
  },
}

export const CustomSlots: Story = {
  name: 'Custom slots',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <CardAction
        title="Con ícono izquierdo personalizado"
        description="MapPin en el slot izquierdo"
        leftSlot={<MapPin size={24} strokeWidth={1.5} aria-hidden />}
      />
      <CardAction
        title="Sin slots"
        description="Solo texto y borde"
      />
      <CardAction
        title="Slot derecho personalizado"
        description="Star en el slot derecho"
        rightSlot={<Star size={24} strokeWidth={1.5} aria-hidden />}
      />
    </div>
  ),
}

export const NoDescription: Story = {
  name: 'Sin descripción',
  args: {
    title: 'Solo título, sin descripción',
    showDescription: false,
  },
}

export const RichContent: Story = {
  name: 'Contenido enriquecido',
  render: () => (
    <CardAction
      title={
        <span>
          Título con <strong>bold</strong>
        </span>
      }
      description={
        <span style={{ color: 'var(--ink-positive)' }}>Descripción con color semántico</span>
      }
      selected
      leftSlot={selectionCheckbox(true)}
    />
  ),
}
