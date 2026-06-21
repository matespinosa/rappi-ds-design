import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@rappi-ds/react'
import React from 'react'

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  argTypes: {
    elevation: {
      control: 'radio',
      options: ['flat', 'raised', 'floating'],
    },
  },
  args: {
    elevation: 'flat',
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#f7f8f9' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

const Placeholder = ({ label }: { label?: string }) => (
  <div
    style={{
      width: '100%',
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-mild)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-label-sm)',
      color: 'var(--ink-weak)',
    }}
  >
    {label ?? 'Contenido del card'}
  </div>
)

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 463 }}>
      <Placeholder />
    </Card>
  ),
}

// ─── All elevations ───────────────────────────────────────────────────────────

export const AllElevations: Story = {
  name: 'All elevations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', maxWidth: 463 }}>
      {(['flat', 'raised', 'floating'] as const).map((elevation) => (
        <div key={elevation}>
          <p
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-label-xs)',
              fontWeight: 600,
              color: 'var(--ink-weak)',
              marginBottom: 'var(--spacing-8)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {elevation}
          </p>
          <Card elevation={elevation}>
            <Placeholder label={`elevation="${elevation}"`} />
          </Card>
        </div>
      ))}
    </div>
  ),
}

// ─── As article ──────────────────────────────────────────────────────────────

export const WithContent: Story = {
  name: 'With content',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-16)', flexWrap: 'wrap' }}>
      <Card elevation="raised" style={{ maxWidth: 300 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-8)',
            fontFamily: 'var(--font-family-base)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-label-lg)',
              fontWeight: 'var(--font-weight-label-lg)',
              color: 'var(--ink-strong)',
            }}
          >
            Título del card
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-body-md)',
              color: 'var(--ink-standard)',
              lineHeight: 'var(--line-height-body-md)',
            }}
          >
            Descripción breve del contenido del card. Puede incluir texto, imágenes u otros componentes.
          </p>
        </div>
      </Card>
      <Card elevation="floating" style={{ maxWidth: 300 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-8)',
            fontFamily: 'var(--font-family-base)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-label-lg)',
              fontWeight: 'var(--font-weight-label-lg)',
              color: 'var(--ink-strong)',
            }}
          >
            Card flotante
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-body-md)',
              color: 'var(--ink-standard)',
              lineHeight: 'var(--line-height-body-md)',
            }}
          >
            Usa elevation="floating" para destacar el card sobre el resto del contenido de la página.
          </p>
        </div>
      </Card>
    </div>
  ),
}

// ─── Nesting ──────────────────────────────────────────────────────────────────

export const Nested: Story = {
  name: 'Cards anidados',
  render: () => (
    <Card elevation="raised" style={{ maxWidth: 480 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-12)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 'var(--font-size-label-lg)',
            fontWeight: 'var(--font-weight-label-lg)',
            color: 'var(--ink-strong)',
          }}
        >
          Card contenedor
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-12)' }}>
          {['Opción A', 'Opción B', 'Opción C'].map((label) => (
            <Card key={label} elevation="flat" style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--font-size-label-sm)',
                  color: 'var(--ink-standard)',
                  textAlign: 'center',
                }}
              >
                {label}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  ),
}
