import type { Meta, StoryObj } from '@storybook/react'
import { Radio, RadioGroup } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'playground',
    value: 'option',
    'aria-label': 'Option',
  },
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof Radio>

export const Playground: Story = {}

export const FigmaStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 'var(--spacing-48) var(--spacing-64)',
      }}
    >
      <Radio name="enabled-unselected" aria-label="Enabled unselected" />
      <Radio name="enabled-selected" defaultChecked aria-label="Enabled selected" />
      <Radio name="disabled-unselected" disabled aria-label="Disabled unselected" />
      <Radio name="disabled-selected" disabled defaultChecked aria-label="Disabled selected" />
    </div>
  ),
}

export const DeliveryMethod: Story = {
  render: () => {
    const [value, setValue] = useState('delivery')

    const optionStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--spacing-8)',
      cursor: 'pointer',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 'var(--line-height-body-md)',
      color: 'var(--ink-standard)',
    }

    return (
      <RadioGroup
        name="delivery-method"
        legend="Método de entrega"
        style={{
          flexDirection: 'column',
          gap: 'var(--spacing-12)',
          minWidth: 280,
          color: 'var(--ink-strong)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        {[
          { value: 'delivery', label: 'Domicilio', description: 'Entrega al cliente' },
          {
            value: 'pickup',
            label: 'Recoger en tienda',
            description: 'El cliente recoge su pedido',
          },
        ].map((option) => (
          <label key={option.value} style={optionStyle}>
            <Radio
              value={option.value}
              checked={value === option.value}
              onChange={(event) => setValue(event.target.value)}
            />
            <span>
              <strong style={{ display: 'block', fontWeight: 'var(--font-weight-label-md)' }}>
                {option.label}
              </strong>
              <span style={{ color: 'var(--ink-weak)' }}>{option.description}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    )
  },
}

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup
      name="payment"
      legend="Método de pago"
      disabled
      style={{
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
        color: 'var(--ink-disabled)',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Radio value="cash" defaultChecked />
        Efectivo
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Radio value="card" />
        Tarjeta
      </label>
    </RadioGroup>
  ),
}
