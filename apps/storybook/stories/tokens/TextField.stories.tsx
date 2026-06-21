import type { Meta, StoryObj } from '@storybook/react'
import { X } from '@rappi-ds/icons'
import { TextField, TextFieldSkeleton } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof TextField> = {
  title: 'Primitives/TextField',
  component: TextField,
  argTypes: {
    fieldSize: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'This is a label',
    placeholder: 'It’s a placeholder',
    helperText: 'Hint text',
    fieldSize: 'md',
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TextField>

export const Playground: Story = {}

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Clear value"
      style={{
        display: 'inline-flex',
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        border: 0,
        borderRadius: 'var(--radius-full)',
        color: 'var(--ink-strong)',
        background: 'var(--surface-mild)',
        cursor: 'pointer',
      }}
    >
      <X aria-hidden="true" />
    </button>
  )
}

function InteractiveField({ fieldSize }: { fieldSize: 'sm' | 'md' }) {
  const [value, setValue] = useState('Input text field')

  return (
    <TextField
      label="This is a label"
      fieldSize={fieldSize}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      helperText="Hint text"
      endAdornment={value ? <ClearButton onClick={() => setValue('')} /> : null}
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveField fieldSize="md" />,
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-24)' }}>
      <TextField label="Medium field" fieldSize="md" placeholder="56px control" />
      <TextField label="Small field" fieldSize="sm" placeholder="44px control" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-24)' }}>
      <TextField label="Default" placeholder="It’s a placeholder" helperText="Hint text" />
      <TextField label="Filled" defaultValue="Input text field" helperText="Hint text" />
      <TextField label="Error" defaultValue="Input text field" error="Enter a valid value" />
      <TextField
        label="Disabled"
        defaultValue="Input text field"
        helperText="This field is unavailable"
        disabled
      />
      <TextField
        label="Read only"
        defaultValue="Input text field"
        helperText="This value cannot be edited"
        readOnly
      />
      <TextFieldSkeleton />
    </div>
  ),
}

export const Required: Story = {
  args: {
    label: 'Store name',
    name: 'storeName',
    required: true,
    autoComplete: 'organization',
    helperText: 'This name is visible to customers',
  },
}

export const SkeletonSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-24)' }}>
      <TextFieldSkeleton size="md" />
      <TextFieldSkeleton size="sm" />
    </div>
  ),
}
