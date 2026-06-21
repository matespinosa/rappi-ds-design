import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '@rappi-ds/react'
import React, { useState } from 'react'

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'lg',
    'aria-label': 'Toggle',
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Toggle>

function ControlledToggle(props: React.ComponentProps<typeof Toggle>) {
  const [checked, setChecked] = useState(props.checked ?? false)
  return <Toggle {...props} checked={checked} onClick={() => setChecked((v) => !v)} />
}

export const Playground: Story = {
  render: (args) => <ControlledToggle {...args} />,
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {(
        [
          { label: 'Off', checked: false },
          { label: 'On', checked: true },
        ] as const
      ).map(({ label, checked }) => (
        <label
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            cursor: 'pointer',
          }}
        >
          <Toggle aria-label={label} checked={checked} />
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
          { label: 'Disabled off', checked: false },
          { label: 'Disabled on', checked: true },
        ] as const
      ).map(({ label, checked }) => (
        <label
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            cursor: 'not-allowed',
          }}
        >
          <Toggle aria-label={label} checked={checked} disabled />
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

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      {(['lg', 'md', 'sm'] as const).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}
        >
          <Toggle aria-label={`${size} off`} size={size} checked={false} />
          <Toggle aria-label={`${size} on`} size={size} checked={true} />
          <span
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-body-md)',
              color: 'var(--ink-weak)',
              minWidth: 24,
            }}
          >
            {size}
          </span>
        </div>
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
          alignItems: 'center',
          gap: 'var(--spacing-8)',
          cursor: 'pointer',
        }}
      >
        <Toggle checked={checked} onClick={() => setChecked((v) => !v)} aria-label="Activar notificaciones" />
        <span
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-body-md)',
            color: 'var(--ink-standard)',
            lineHeight: 'var(--line-height-body-md)',
          }}
        >
          Activar notificaciones de pedidos
        </span>
      </label>
    )
  },
}

export const SettingsList: Story = {
  name: 'Settings list',
  render: () => {
    const settings = [
      { id: 'notifications', label: 'Notificaciones de pedidos', defaultOn: true },
      { id: 'promotions', label: 'Alertas de promociones', defaultOn: false },
      { id: 'reports', label: 'Reportes semanales', defaultOn: true },
    ]
    const [states, setStates] = useState<Record<string, boolean>>(
      Object.fromEntries(settings.map((s) => [s.id, s.defaultOn])),
    )

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          minWidth: 320,
          border: '1px solid var(--border-standard)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {settings.map((setting, i) => (
          <label
            key={setting.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--spacing-12)',
              padding: 'var(--spacing-16)',
              borderBottom:
                i < settings.length - 1 ? '1px solid var(--border-standard)' : 'none',
              cursor: 'pointer',
              backgroundColor: 'var(--surface)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-body-md)',
                color: 'var(--ink-strong)',
                lineHeight: 'var(--line-height-body-md)',
              }}
            >
              {setting.label}
            </span>
            <Toggle
              aria-label={setting.label}
              checked={states[setting.id]}
              onClick={() =>
                setStates((prev) => ({ ...prev, [setting.id]: !prev[setting.id] }))
              }
            />
          </label>
        ))}
      </div>
    )
  },
}
