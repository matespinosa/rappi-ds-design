import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MapPin, Store, Truck } from '@rappi-ds/icons'
import { ComboBox, ComboBoxSkeleton } from '@rappi-ds/react'

const meta: Meta<typeof ComboBox> = {
  title: 'Organisms/ComboBox',
  component: ComboBox,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 360, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComboBox>

/* ── Shared options ── */

const CITIES = [
  { value: 'bog', label: 'Bogotá' },
  { value: 'med', label: 'Medellín' },
  { value: 'cal', label: 'Cali' },
  { value: 'bar', label: 'Barranquilla' },
  { value: 'buc', label: 'Bucaramanga' },
  { value: 'man', label: 'Manizales' },
]

const ICON_OPTIONS = [
  { value: 'store', label: 'Tiendas', icon: <Store size={20} /> },
  { value: 'delivery', label: 'Domicilios', icon: <Truck size={20} /> },
  { value: 'pickup', label: 'Recogida', icon: <MapPin size={20} /> },
]

/* ── Helpers ── */

function ControlledComboBox(props: Partial<React.ComponentProps<typeof ComboBox>>) {
  const [value, setValue] = useState<string[]>([])
  const [input, setInput] = useState('')
  return (
    <ComboBox
      options={CITIES}
      value={value}
      onChange={setValue}
      inputValue={input}
      onInputChange={setInput}
      label="Ciudad"
      placeholder="Buscar ciudad…"
      {...props}
    />
  )
}

/* ── Stories ── */

export const Default: Story = {
  render: () => <ControlledComboBox />,
}

export const WithPreselected: Story = {
  name: 'Con valores preseleccionados',
  render: () => {
    const [value, setValue] = useState(['bog', 'med'])
    const [input, setInput] = useState('')
    return (
      <ComboBox
        options={CITIES}
        value={value}
        onChange={setValue}
        inputValue={input}
        onInputChange={setInput}
        label="Ciudad"
        placeholder="Buscar ciudad…"
        helperText={`${value.length} ciudades seleccionadas`}
      />
    )
  },
}

export const WithLeftIcon: Story = {
  name: 'Con ícono izquierdo',
  render: () => <ControlledComboBox leftIcon={<MapPin size={20} />} label="Ubicación" />,
}

export const WithOptionIcons: Story = {
  name: 'Opciones con íconos',
  render: () => {
    const [value, setValue] = useState<string[]>([])
    const [input, setInput] = useState('')
    return (
      <ComboBox
        options={ICON_OPTIONS}
        value={value}
        onChange={setValue}
        inputValue={input}
        onInputChange={setInput}
        label="Tipo de servicio"
        placeholder="Selecciona servicios…"
      />
    )
  },
}

export const Sizes: Story = {
  name: 'Tamaños lg / sm',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <ControlledComboBox size="lg" label="Desktop (lg)" />
      <ControlledComboBox size="sm" label="Mobile (sm)" />
    </div>
  ),
}

export const HelperText: Story = {
  name: 'Con texto de ayuda',
  render: () => (
    <ControlledComboBox
      label="Ciudad de entrega"
      helperText="Puedes seleccionar varias ciudades"
    />
  ),
}

export const ErrorState: Story = {
  name: 'Estado de error',
  render: () => (
    <ControlledComboBox
      label="Ciudad"
      error="Debes seleccionar al menos una ciudad"
    />
  ),
}

export const Disabled: Story = {
  name: 'Deshabilitado',
  render: () => (
    <ComboBox
      options={CITIES}
      value={['bog']}
      onChange={() => {}}
      inputValue="Bogotá"
      label="Ciudad"
      disabled
    />
  ),
}

export const NoClear: Story = {
  name: 'Sin botón de limpiar',
  render: () => <ControlledComboBox clearable={false} label="Ciudad (sin clear)" />,
}

export const Required: Story = {
  name: 'Campo requerido',
  render: () => (
    <ControlledComboBox label="Ciudad" required helperText="Este campo es obligatorio" />
  ),
}

export const SkeletonVariant: Story = {
  name: 'Skeleton',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ComboBoxSkeleton size="lg" showLabel showHelper />
      <ComboBoxSkeleton size="sm" showLabel />
      <ComboBoxSkeleton showLabel={false} />
    </div>
  ),
}

export const SkeletonProp: Story = {
  name: 'Skeleton (prop)',
  render: () => (
    <ComboBox
      options={CITIES}
      value={[]}
      onChange={() => {}}
      label="Ciudad"
      skeleton
    />
  ),
}

export const EmptyResults: Story = {
  name: 'Sin resultados',
  render: () => {
    const [value, setValue] = useState<string[]>([])
    const [input, setInput] = useState('zzz')
    return (
      <ComboBox
        options={CITIES}
        value={value}
        onChange={setValue}
        inputValue={input}
        onInputChange={setInput}
        label="Ciudad"
        placeholder="Buscar ciudad…"
      />
    )
  },
}

export const FigmaReference: Story = {
  name: '⬛ Figma reference (node 77777-2196)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* All states side-by-side */}
      <ControlledComboBox label="Inactivo" />
      <ControlledComboBox label="Con error" error="Campo requerido" />
      <ComboBox
        options={CITIES}
        value={[]}
        onChange={() => {}}
        inputValue=""
        label="Deshabilitado"
        disabled
      />
      <ComboBox
        options={CITIES}
        value={[]}
        onChange={() => {}}
        label="Skeleton"
        skeleton
      />
    </div>
  ),
}
