import type { Meta, StoryObj } from '@storybook/react'
import { BadgeLive, Checkbox, Radio, Select, SelectSkeleton } from '@rappi-ds/react'
import { Globe, Star, Zap } from '@rappi-ds/icons'
import React, { useState } from 'react'

const OPTIONS = [
  { value: 'op1', label: 'Opción 1' },
  { value: 'op2', label: 'Opción 2' },
  { value: 'op3', label: 'Opción 3' },
  { value: 'op4', label: 'Opción 4' },
  { value: 'op5', label: 'Opción 5' },
]

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    skeleton: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    readOnly: false,
    invalid: false,
    skeleton: false,
    label: 'Selecciona una de las opciones',
    placeholder: 'Selecciona una opción',
    options: OPTIONS,
  },
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Select>

function ControlledSelect(props: React.ComponentProps<typeof Select>) {
  const [value, setValue] = useState(props.value ?? '')
  return <Select {...props} value={value} onChange={setValue} />
}

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 375 }}>
      <ControlledSelect {...args} />
    </div>
  ),
}

export const States: Story = {
  render: () => {
    const states: Array<{ label: string; props: Partial<React.ComponentProps<typeof Select>> }> = [
      { label: 'Default', props: {} },
      { label: 'Filled', props: { value: 'op1' } },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Error', props: { invalid: true, error: 'Este campo es requerido' } },
      { label: 'Read only', props: { readOnly: true, value: 'op2' } },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', maxWidth: 375 }}>
        {states.map(({ label, props }) => (
          <div key={label}>
            <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
              {label}
            </p>
            <ControlledSelect
              label="Selecciona una de las opciones"
              options={OPTIONS}
              {...props}
            />
          </div>
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', maxWidth: 375 }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size}>
          <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
            {size}
          </p>
          <ControlledSelect
            label="Selecciona una de las opciones"
            options={OPTIONS}
            size={size}
          />
        </div>
      ))}
    </div>
  ),
}

export const Skeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 375 }}>
      <SelectSkeleton size="md" />
      <SelectSkeleton size="sm" />
      <SelectSkeleton showLabel={false} />
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledSelect
        label="País de operación"
        options={OPTIONS}
        helperText="Selecciona el país donde opera tu negocio"
      />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledSelect
        label="País de operación"
        options={OPTIONS}
        invalid
        error="Debes seleccionar un país para continuar"
      />
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'Start icons per option',
  render: () => {
    const [value, setValue] = useState('')
    const options = [
      { value: 'global', label: 'Global', startElement: <Globe size={16} strokeWidth={1.5} /> },
      { value: 'popular', label: 'Popular', startElement: <Star size={16} strokeWidth={1.5} /> },
      { value: 'fast', label: 'Turbo', startElement: <Zap size={16} strokeWidth={1.5} /> },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select label="Categoría" options={options} value={value} onChange={setValue} selectionIndicator="check" />
      </div>
    )
  },
}

export const WithFlags: Story = {
  name: 'Flags — startElement + endElement',
  render: () => {
    const [value, setValue] = useState('')
    const FLAG: Record<string, string> = { co: '🇨🇴', mx: '🇲🇽', ar: '🇦🇷', br: '🇧🇷', cl: '🇨🇱' }
    const options = [
      { value: 'co', label: 'Colombia', startElement: <span style={{ fontSize: 16 }}>{FLAG.co}</span> },
      { value: 'mx', label: 'México', startElement: <span style={{ fontSize: 16 }}>{FLAG.mx}</span> },
      { value: 'ar', label: 'Argentina', startElement: <span style={{ fontSize: 16 }}>{FLAG.ar}</span> },
      { value: 'br', label: 'Brasil', startElement: <span style={{ fontSize: 16 }}>{FLAG.br}</span> },
      { value: 'cl', label: 'Chile', startElement: <span style={{ fontSize: 16 }}>{FLAG.cl}</span> },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select label="País" options={options} value={value} onChange={setValue} selectionIndicator="check" />
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginTop: 'var(--spacing-8)' }}>
          El ícono del país seleccionado aparece dentro del trigger
        </p>
      </div>
    )
  },
}

export const IndicatorCheck: Story = {
  name: 'Indicator — check (right)',
  render: () => {
    const [value, setValue] = useState('b')
    return (
      <div style={{ maxWidth: 375 }}>
        <Select
          label="Tipo de negocio"
          options={OPTIONS}
          value={value}
          onChange={setValue}
          selectionIndicator="check"
        />
      </div>
    )
  },
}

export const IndicatorRadio: Story = {
  name: 'Indicator — radio (left)',
  render: () => {
    const [value, setValue] = useState('op2')
    const options = [
      { value: 'op1', label: 'Restaurante' },
      { value: 'op2', label: 'Supermercado' },
      { value: 'op3', label: 'Farmacia' },
      { value: 'op4', label: 'Express' },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select
          label="Categoría"
          options={options}
          value={value}
          onChange={setValue}
          selectionIndicator="radio"
        />
      </div>
    )
  },
}

export const IndicatorCheckbox: Story = {
  name: 'Indicator — checkbox (left)',
  render: () => {
    const [value, setValue] = useState('op3')
    const options = [
      { value: 'op1', label: 'Lunes' },
      { value: 'op2', label: 'Martes' },
      { value: 'op3', label: 'Miércoles' },
      { value: 'op4', label: 'Jueves' },
      { value: 'op5', label: 'Viernes' },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select
          label="Día de cierre"
          options={options}
          value={value}
          onChange={setValue}
          selectionIndicator="checkbox"
        />
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginTop: 'var(--spacing-8)' }}>
          Visual de checkbox para day-picker de un solo valor
        </p>
      </div>
    )
  },
}

export const WithEndElement: Story = {
  name: 'End elements — status badges',
  render: () => {
    const [value, setValue] = useState('')
    const options = [
      { value: 'open', label: 'Abierto', endElement: <BadgeLive status="active" /> },
      { value: 'closed', label: 'Cerrado', endElement: <BadgeLive status="closed" /> },
      { value: 'busy', label: 'Ocupado', endElement: <BadgeLive status="suspended" /> },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select label="Estado del local" options={options} value={value} onChange={setValue} selectionIndicator="check" />
      </div>
    )
  },
}

export const WithDisabledOptions: Story = {
  name: 'Per-option disabled',
  render: () => {
    const [value, setValue] = useState('')
    const options = [
      { value: 'basic', label: 'Plan básico' },
      { value: 'pro', label: 'Plan Pro', endElement: <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 10, color: 'var(--ink-weak)' }}>No disponible</span>, disabled: true },
      { value: 'enterprise', label: 'Enterprise' },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select
          label="Plan de suscripción"
          options={options}
          value={value}
          onChange={setValue}
          helperText="Plan Pro no está disponible en tu región"
        />
      </div>
    )
  },
}

export const AllAdornments: Story = {
  name: 'All adornments combined',
  render: () => {
    const [value, setValue] = useState('co')
    const FLAG: Record<string, string> = { co: '🇨🇴', mx: '🇲🇽', ar: '🇦🇷' }
    const options = [
      {
        value: 'co',
        label: 'Colombia',
        startElement: <span style={{ fontSize: 16 }}>{FLAG.co}</span>,
        endElement: <BadgeLive status="active" />,
      },
      {
        value: 'mx',
        label: 'México',
        startElement: <span style={{ fontSize: 16 }}>{FLAG.mx}</span>,
        endElement: <BadgeLive status="active" />,
      },
      {
        value: 'ar',
        label: 'Argentina',
        startElement: <span style={{ fontSize: 16 }}>{FLAG.ar}</span>,
        endElement: <BadgeLive status="inactive" />,
        disabled: true,
      },
    ]
    return (
      <div style={{ maxWidth: 375 }}>
        <Select
          label="País de operación"
          options={options}
          value={value}
          onChange={setValue}
          selectionIndicator="check"
        />
      </div>
    )
  },
}

export const FormExample: Story = {
  name: 'Form — merchant setup',
  render: () => {
    const [country, setCountry] = useState('')
    const [category, setCategory] = useState('')
    const countries = [
      { value: 'co', label: 'Colombia' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
      { value: 'br', label: 'Brasil' },
    ]
    const categories = [
      { value: 'food', label: 'Restaurantes' },
      { value: 'grocery', label: 'Supermercado' },
      { value: 'pharmacy', label: 'Farmacia' },
      { value: 'express', label: 'Turbo Express' },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 375 }}>
        <Select
          label="País"
          options={countries}
          value={country}
          onChange={setCountry}
          placeholder="Selecciona tu país"
        />
        <Select
          label="Categoría"
          options={categories}
          value={category}
          onChange={setCategory}
          placeholder="Selecciona una categoría"
          disabled={!country}
          helperText={!country ? 'Primero selecciona un país' : undefined}
        />
      </div>
    )
  },
}
