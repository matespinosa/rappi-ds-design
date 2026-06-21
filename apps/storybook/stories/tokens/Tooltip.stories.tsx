import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from '@rappi-ds/react'
import { Info, ShoppingCart, Star, Zap } from '@rappi-ds/icons'
import React, { useState } from 'react'

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  argTypes: {
    arrowPosition: {
      control: 'select',
      options: [
        undefined,
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right',
      ],
    },
  },
  args: {
    children: 'Texto de ayuda contextual para el usuario',
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#6b7280' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'light', value: '#f7f8f9' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

const sectionLabel = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 327, margin: '40px auto' }}>
      <Tooltip {...args} />
    </div>
  ),
}

// ─── All arrow positions ──────────────────────────────────────────────────────

export const AllArrowPositions: Story = {
  name: 'All arrow positions',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 'var(--spacing-24)',
        maxWidth: 900,
        margin: '40px auto',
      }}
    >
      {(['top-left', 'top-center', 'top-right'] as const).map((pos) => (
        <div key={pos}>
          <p style={sectionLabel}>{pos}</p>
          <Tooltip arrowPosition={pos}>
            La flecha indica la posición del trigger
          </Tooltip>
        </div>
      ))}
      {(['bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
        <div key={pos}>
          <p style={sectionLabel}>{pos}</p>
          <Tooltip arrowPosition={pos}>
            La flecha indica la posición del trigger
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}

// ─── Without arrow ────────────────────────────────────────────────────────────

export const WithoutArrow: Story = {
  name: 'Without arrow',
  render: () => (
    <div style={{ maxWidth: 327, margin: '40px auto' }}>
      <p style={sectionLabel}>Sin flecha (modal / popover)</p>
      <Tooltip>
        Este tooltip no tiene flecha y puede usarse como un popover o card flotante.
      </Tooltip>
    </div>
  ),
}

// ─── With icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With icon',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 327 }}
    >
      <div>
        <p style={sectionLabel}>Info</p>
        <Tooltip icon={<Info size={40} strokeWidth={1.5} />} arrowPosition="bottom-left">
          Revisa los detalles de tu pedido antes de confirmar el pago.
        </Tooltip>
      </div>
      <div>
        <p style={sectionLabel}>Star</p>
        <Tooltip icon={<Star size={40} strokeWidth={1.5} />} arrowPosition="bottom-center">
          Este restaurante tiene 4.8 estrellas de calificación.
        </Tooltip>
      </div>
      <div>
        <p style={sectionLabel}>Zap</p>
        <Tooltip icon={<Zap size={40} strokeWidth={1.5} />} arrowPosition="top-right">
          Entrega exprés disponible en menos de 30 minutos.
        </Tooltip>
      </div>
    </div>
  ),
}

// ─── With close ───────────────────────────────────────────────────────────────

export const WithClose: Story = {
  name: 'With close button',
  render: () => (
    <div style={{ maxWidth: 327, margin: '40px auto' }}>
      <Tooltip onClose={() => {}} arrowPosition="top-left">
        Puedes cerrar este tooltip haciendo clic en la X.
      </Tooltip>
    </div>
  ),
}

// ─── With icon + close ────────────────────────────────────────────────────────

export const WithIconAndClose: Story = {
  name: 'With icon + close',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 327 }}
    >
      <div>
        <p style={sectionLabel}>top-left</p>
        <Tooltip
          icon={<ShoppingCart size={40} strokeWidth={1.5} />}
          onClose={() => {}}
          arrowPosition="top-left"
        >
          Agrega productos al carrito para continuar con tu pedido.
        </Tooltip>
      </div>
      <div>
        <p style={sectionLabel}>bottom-center</p>
        <Tooltip
          icon={<Info size={40} strokeWidth={1.5} />}
          onClose={() => {}}
          arrowPosition="bottom-center"
        >
          La tarifa de servicio se calcula según la distancia de entrega.
        </Tooltip>
      </div>
    </div>
  ),
}

// ─── Interactive use-case ─────────────────────────────────────────────────────

export const InteractiveUseCase: Story = {
  name: 'Use case — dismissible tooltip',
  render: () => {
    const [visible, setVisible] = useState(true)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--spacing-16)',
          padding: 'var(--spacing-32)',
        }}
      >
        {/* Simulated trigger */}
        <button
          type="button"
          onClick={() => setVisible(true)}
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: '14px',
            background: 'var(--accent-default)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Mostrar tooltip
        </button>

        {visible && (
          <Tooltip
            icon={<Zap size={40} strokeWidth={1.5} />}
            onClose={() => setVisible(false)}
            arrowPosition="top-left"
          >
            Entrega exprés: recibe tu pedido en menos de 30 minutos o te devolvemos el costo.
          </Tooltip>
        )}
      </div>
    )
  },
}
