import type { Meta, StoryObj } from '@storybook/react'
import { Button, IconButton, type ButtonAppearance, type ButtonSize } from '@rappi-ds/react'
import React from 'react'

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

const appearances: ButtonAppearance[] = ['primary', 'secondary', 'tertiary']
const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    appearance: { control: 'select', options: appearances },
    size: { control: 'select', options: sizes },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Label',
    appearance: 'primary',
    size: 'md',
  },
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Button>

export const Playground: Story = {}

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
      {appearances.map((appearance) => (
        <Button key={appearance} appearance={appearance}>
          {appearance}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-12)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

export const Icons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
      <Button startIcon={<PlusIcon />}>Start icon</Button>
      <Button endIcon={<PlusIcon />}>End icon</Button>
      <IconButton icon={<PlusIcon />} aria-label="Add item" />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
      <Button loading>Save changes</Button>
      <IconButton loading icon={<PlusIcon />} aria-label="Add item" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
      {appearances.map((appearance) => (
        <Button key={appearance} appearance={appearance} disabled>
          {appearance}
        </Button>
      ))}
    </div>
  ),
}

export const FocusVisible: Story = {
  args: {
    autoFocus: true,
    children: 'Keyboard focus',
  },
}

export const IconButtonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-12)', alignItems: 'center' }}>
      {sizes.map((size) => (
        <IconButton key={size} size={size} icon={<PlusIcon />} aria-label={`Add item (${size})`} />
      ))}
    </div>
  ),
}
