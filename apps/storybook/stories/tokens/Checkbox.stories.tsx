import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    disabled: false,
    indeterminate: false,
    'aria-label': 'Checkbox',
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Checkbox>

function ControlledCheckbox(props: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox {...props} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  )
}

export const Playground: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {(
        [
          { label: 'Unchecked', props: {} },
          { label: 'Checked', props: { checked: true, readOnly: true } },
          { label: 'Indeterminate', props: { indeterminate: true } },
        ] as const
      ).map(({ label, props }) => (
        <label
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            cursor: 'pointer',
          }}
        >
          <Checkbox aria-label={label} {...props} />
          <span
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-body-md)',
              color: 'var(--ink-standard)',
            }}
          >
            {label}
          </span>
        </label>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {(
        [
          { label: 'Disabled unchecked', props: {} },
          { label: 'Disabled checked', props: { checked: true, readOnly: true } },
          { label: 'Disabled indeterminate', props: { indeterminate: true } },
        ] as const
      ).map(({ label, props }) => (
        <label
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            cursor: 'not-allowed',
          }}
        >
          <Checkbox aria-label={label} disabled {...props} />
          <span
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-body-md)',
              color: 'var(--ink-disabled)',
            }}
          >
            {label}
          </span>
        </label>
      ))}
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--spacing-8)',
          cursor: 'pointer',
          maxWidth: 280,
        }}
      >
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <span
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-body-md)',
            color: 'var(--ink-standard)',
            lineHeight: 'var(--line-height-body-md)',
            paddingTop: 2,
          }}
        >
          Acepto los términos y condiciones del servicio de Rappi Merchants
        </span>
      </label>
    )
  },
}

export const SelectAll: Story = {
  name: 'Select All (indeterminate)',
  render: () => {
    const items = ['Rappi Burgers', 'Sushi Express', 'Pizza Nova']
    const [selected, setSelected] = useState<Set<string>>(new Set(['Rappi Burgers']))

    const allSelected = selected.size === items.length
    const someSelected = selected.size > 0 && !allSelected

    function toggleAll() {
      setSelected(allSelected ? new Set() : new Set(items))
    }

    function toggleItem(item: string) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(item)) next.delete(item)
        else next.add(item)
        return next
      })
    }

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-8)',
      cursor: 'pointer',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-body-md)',
      color: 'var(--ink-standard)',
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', minWidth: 220 }}>
        <label style={{ ...rowStyle, fontWeight: 'var(--font-weight-label-md)', paddingBottom: 'var(--spacing-4)', borderBottom: '1px solid var(--border-standard)' }}>
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={toggleAll}
            aria-label="Seleccionar todas las tiendas"
          />
          Seleccionar todo
        </label>
        {items.map((item) => (
          <label key={item} style={rowStyle}>
            <Checkbox
              checked={selected.has(item)}
              onChange={() => toggleItem(item)}
              aria-label={item}
            />
            {item}
          </label>
        ))}
      </div>
    )
  },
}
