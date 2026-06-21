import type { Meta, StoryObj } from '@storybook/react'
import { BadgeNumber, type BadgeNumberAppearance, type BadgeNumberSize } from '@rappi-ds/react'
import React from 'react'

const appearances: BadgeNumberAppearance[] = ['accent', 'light', 'dark']
const sizes: BadgeNumberSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const meta: Meta<typeof BadgeNumber> = {
  title: 'Primitives/BadgeNumber',
  component: BadgeNumber,
  argTypes: {
    appearance: { control: 'select', options: appearances },
    size: { control: 'select', options: sizes },
    showValue: { control: 'boolean' },
    value: { control: 'text' },
  },
  args: {
    appearance: 'accent',
    size: 'xs',
    showValue: true,
    value: 2,
    'aria-label': '2 unread notifications',
  },
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof BadgeNumber>

export const Playground: Story = {}

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-24)' }}>
      {appearances.map((appearance) => (
        <div
          key={appearance}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}
        >
          {sizes.map((size) => (
            <BadgeNumber
              key={size}
              appearance={appearance}
              size={size}
              value={2}
              aria-label={`2 notifications, ${appearance}, ${size}`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}>
      {sizes.map((size) => (
        <BadgeNumber key={size} size={size} showValue={false} aria-label="New activity" />
      ))}
    </div>
  ),
}

export const MultipleDigits: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}>
      <BadgeNumber size="sm" value={8} aria-label="8 unread orders" />
      <BadgeNumber size="md" value={24} aria-label="24 unread orders" />
      <BadgeNumber size="lg" value="99+" aria-label="More than 99 unread orders" />
    </div>
  ),
}
