import type { Meta, StoryObj } from '@storybook/react'
import { BadgeLive, type BadgeLiveStatus } from '@rappi-ds/react'
import React from 'react'

const statuses: BadgeLiveStatus[] = ['active', 'inactive', 'closed', 'suspended']

const labels: Record<BadgeLiveStatus, string> = {
  active: 'Activa',
  inactive: 'Inactiva',
  closed: 'Cerrada',
  suspended: 'Suspendida',
}

const meta: Meta<typeof BadgeLive> = {
  title: 'Primitives/BadgeLive',
  component: BadgeLive,
  argTypes: {
    status: { control: 'select', options: statuses },
    animated: { control: 'boolean' },
  },
  args: {
    status: 'active',
    animated: false,
    'aria-label': 'Tienda activa',
  },
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof BadgeLive>

export const Playground: Story = {}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {statuses.map((status) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
          <BadgeLive status={status} aria-hidden="true" />
          <span style={{ fontSize: 'var(--font-size-body-md)', color: 'var(--ink-standard)' }}>
            {labels[status]}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const Animated: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {statuses.map((status) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
          <BadgeLive status={status} animated aria-hidden="true" />
          <span style={{ fontSize: 'var(--font-size-body-md)', color: 'var(--ink-standard)' }}>
            {labels[status]}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const InlineWithStoreName: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      {statuses.map((status) => (
        <div
          key={status}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            padding: 'var(--spacing-12) var(--spacing-16)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-standard)',
            minWidth: 200,
          }}
        >
          <BadgeLive
            status={status}
            animated={status === 'active'}
            aria-label={`Tienda ${labels[status].toLowerCase()}`}
          />
          <span style={{ fontSize: 'var(--font-size-body-md)', color: 'var(--ink-strong)', fontWeight: 'var(--font-weight-label-md)' }}>
            Rappi Burgers
          </span>
        </div>
      ))}
    </div>
  ),
}
