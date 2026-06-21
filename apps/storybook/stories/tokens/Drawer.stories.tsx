import type { Meta, StoryObj } from '@storybook/react'
import { Button, Drawer, type DrawerSize } from '@rappi-ds/react'
import React, { useState } from 'react'

const sizes: DrawerSize[] = ['sm', 'md', 'lg']

function DrawerExample({
  size = 'sm',
  showFooter = true,
}: {
  size?: DrawerSize
  showFooter?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {size} drawer</Button>
      <Drawer
        open={open}
        title="Titulo"
        size={size}
        showFooter={showFooter}
        primaryLabel="Primary"
        secondaryLabel="Secondary"
        onClose={() => setOpen(false)}
        onSecondary={() => setOpen(false)}
      >
        <div style={{ padding: 'var(--spacing-24)' }}>Add task-specific content here.</div>
      </Drawer>
    </>
  )
}

const meta: Meta<typeof Drawer> = {
  title: 'Organisms/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: sizes },
    showFooter: { control: 'boolean' },
    showSecondaryAction: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Playground: Story = {
  render: (args) => <DrawerExample size={args.size} showFooter={args.showFooter} />,
  args: {
    size: 'sm',
    showFooter: true,
  },
}

export const Medium: Story = {
  render: () => <DrawerExample size="md" />,
}

export const Large: Story = {
  render: () => <DrawerExample size="lg" />,
}

export const WithoutFooter: Story = {
  render: () => <DrawerExample showFooter={false} />,
}
