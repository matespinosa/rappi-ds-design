import type { Meta, StoryObj } from '@storybook/react'
import { Pin, PinSkeleton } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof Pin> = {
  title: 'Primitives/Pin',
  component: Pin,
  args: {
    label: 'Verification code',
    length: 4,
  },
  argTypes: {
    length: { control: 'select', options: [4, 6] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
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

type Story = StoryObj<typeof Pin>

export const Playground: Story = {}

function InteractivePin({ length }: { length: 4 | 6 }) {
  const [value, setValue] = useState('')

  return (
    <Pin
      label={`${length}-digit verification code`}
      length={length}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractivePin length={6} />,
}

export const FourDigitStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)' }}>
      <Pin label="Empty PIN" />
      <Pin label="Focused PIN" autoFocus />
      <Pin label="Completed PIN" defaultValue="0741" />
      <Pin label="Disabled PIN" defaultValue="0741" disabled />
      <Pin label="Invalid PIN" defaultValue="0741" error="The PIN is incorrect" />
      <PinSkeleton />
    </div>
  ),
}

export const SixDigitStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)' }}>
      <Pin label="Empty verification code" length={6} />
      <Pin label="Focused verification code" length={6} autoFocus />
      <Pin label="Completed verification code" length={6} defaultValue="074168" />
      <Pin label="Disabled verification code" length={6} defaultValue="074168" disabled />
      <Pin
        label="Invalid verification code"
        length={6}
        defaultValue="074168"
        error="Enter a valid verification code"
      />
      <PinSkeleton length={6} />
    </div>
  ),
}
