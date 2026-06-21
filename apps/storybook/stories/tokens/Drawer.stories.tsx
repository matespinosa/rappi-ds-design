import type { Meta, StoryObj } from '@storybook/react'
import { Button, Drawer, type DrawerSize } from '@rappi-ds/react'
import React, { useState } from 'react'

const sizes: DrawerSize[] = ['sm', 'md', 'lg']

function DrawerExample({
  size = 'sm',
  showFooter = true,
  showPrimaryAction = true,
  showSecondaryAction = true,
}: {
  size?: DrawerSize
  showFooter?: boolean
  showPrimaryAction?: boolean
  showSecondaryAction?: boolean
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
        showPrimaryAction={showPrimaryAction}
        showSecondaryAction={showSecondaryAction}
        primaryLabel="Primary"
        secondaryLabel="Secondary"
        onClose={() => setOpen(false)}
        onSecondary={() => setOpen(false)}
      >
        <div>Add task-specific content here.</div>
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
    showPrimaryAction: { control: 'boolean' },
    showSecondaryAction: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Playground: Story = {
  render: (args) => (
    <DrawerExample
      size={args.size}
      showFooter={args.showFooter}
      showPrimaryAction={args.showPrimaryAction}
      showSecondaryAction={args.showSecondaryAction}
    />
  ),
  args: {
    size: 'sm',
    showFooter: true,
    showPrimaryAction: true,
    showSecondaryAction: true,
  },
}

export const Medium: Story = {
  render: () => <DrawerExample size="md" />,
}

export const Large: Story = {
  render: () => <DrawerExample size="lg" />,
}

export const PrimaryOnly: Story = {
  render: () => <DrawerExample showSecondaryAction={false} />,
}

export const SecondaryOnly: Story = {
  render: () => <DrawerExample showPrimaryAction={false} />,
}

export const WithoutFooter: Story = {
  render: () => <DrawerExample showFooter={false} />,
}
