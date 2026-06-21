import type { Meta, StoryObj } from '@storybook/react'
import { TextArea, TextAreaSkeleton } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof TextArea> = {
  title: 'Primitives/TextArea',
  component: TextArea,
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    label: 'This is a label',
    placeholder: "It's a placeholder",
    disabled: false,
    readOnly: false,
    required: false,
  },
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof TextArea>

function ControlledTextArea(props: React.ComponentProps<typeof TextArea>) {
  const [value, setValue] = useState(props.value ?? '')
  return (
    <TextArea
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={props.onClear ? () => setValue('') : undefined}
    />
  )
}

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 375 }}>
      <ControlledTextArea {...args} />
    </div>
  ),
}

export const States: Story = {
  render: () => {
    const states: Array<{ label: string; props: Partial<React.ComponentProps<typeof TextArea>> }> =
      [
        { label: 'Default', props: { placeholder: "It's a placeholder" } },
        { label: 'Focus (type to activate)', props: {} },
        { label: 'Filled', props: { value: 'This is a input value' } },
        { label: 'Disabled', props: { value: 'This is a input value', disabled: true } },
        {
          label: 'Error',
          props: { value: 'This is a input value', error: 'Hint text' },
        },
      ]

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', maxWidth: 375 }}
      >
        {states.map(({ label, props }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-label-xs)',
                color: 'var(--ink-weak)',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              {label}
            </p>
            <ControlledTextArea
              label="This is a label"
              helperText={!props.error ? 'Hint text' : undefined}
              {...props}
            />
          </div>
        ))}
      </div>
    )
  },
}

export const Skeleton: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 375 }}
    >
      <TextAreaSkeleton />
      <TextAreaSkeleton showLabel={false} />
      <TextAreaSkeleton showHelperText={false} />
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledTextArea label="Descripción del negocio" helperText="Máximo 500 caracteres" />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledTextArea
        label="Descripción"
        value="This is a input value"
        error="Este campo es requerido"
      />
    </div>
  ),
}

export const WithRequired: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledTextArea
        label="Descripción del negocio"
        required
        helperText="Este campo es obligatorio"
        placeholder="Describe tu negocio brevemente"
      />
    </div>
  ),
}

export const WithClearButton: Story = {
  name: 'With clear button',
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledTextArea
        label="Notas internas"
        value="Texto que puede borrarse"
        helperText="El botón × aparece cuando hay contenido"
        onClear={() => {}}
      />
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <ControlledTextArea
        label="Descripción registrada"
        value="Este valor no puede editarse desde la interfaz."
        readOnly
        helperText="Contacta a soporte para modificar este campo"
      />
    </div>
  ),
}

export const FormExample: Story = {
  name: 'Form — merchant onboarding',
  render: () => {
    const [description, setDescription] = useState('')
    const MAX = 300
    const remaining = MAX - description.length
    const isOver = remaining < 0

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 375 }}
      >
        <TextArea
          label="Descripción del negocio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onClear={() => setDescription('')}
          placeholder="Cuéntale a tus clientes sobre tu negocio…"
          error={isOver ? `Excediste el límite por ${Math.abs(remaining)} caracteres` : undefined}
          helperText={!isOver ? `${remaining} caracteres restantes` : undefined}
          required
        />
      </div>
    )
  },
}
