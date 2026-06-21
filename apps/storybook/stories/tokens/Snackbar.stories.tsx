import type { Meta, StoryObj } from '@storybook/react'
import { Snackbar } from '@rappi-ds/react'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
} from '@rappi-ds/icons'
import React, { useState } from 'react'

const meta: Meta<typeof Snackbar> = {
  title: 'Primitives/Snackbar',
  component: Snackbar,
  argTypes: {
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    loading: { control: 'boolean' },
  },
  args: {
    message: 'Mensaje de éxito',
    loading: false,
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a2e' },
        { name: 'image', value: 'url(https://picsum.photos/seed/snackbar/800/400) center/cover' },
        { name: 'light', value: '#f7f8f9' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Snackbar>

const wrapper = {
  maxWidth: 360,
}

const sectionLabel = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
}

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={wrapper}>
      <Snackbar
        {...args}
        icon={args.loading ? undefined : <CheckCircle size={24} strokeWidth={2} />}
        onClose={args.actionLabel ? undefined : () => {}}
      />
    </div>
  ),
}

// ─── All Figma variants ───────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ ...wrapper, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      {/* Figma: icon + close */}
      <div>
        <p style={sectionLabel}>Icon + Close</p>
        <Snackbar
          message="Pedido confirmado correctamente"
          icon={<CheckCircle size={24} strokeWidth={2} />}
          onClose={() => {}}
        />
      </div>

      {/* Figma: image + navigate */}
      <div>
        <p style={sectionLabel}>Image + Navigate</p>
        <Snackbar
          message="Nueva notificación de Starbucks"
          avatar={
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=SB&backgroundColor=ff441f&fontFamily=PP%20Object%20Sans"
              alt=""
            />
          }
          onNavigate={() => {}}
        />
      </div>

      {/* Figma: loading + action */}
      <div>
        <p style={sectionLabel}>Loading + Action</p>
        <Snackbar
          message="Procesando el pago…"
          loading
          actionLabel="Cancelar"
          onAction={() => {}}
        />
      </div>

      {/* Figma: label (icon + action) */}
      <div>
        <p style={sectionLabel}>Icon + Action</p>
        <Snackbar
          message="Se eliminó el producto del carrito"
          icon={<CheckCircle size={24} strokeWidth={2} />}
          actionLabel="Deshacer"
          onAction={() => {}}
        />
      </div>
    </div>
  ),
}

// ─── Right slot options ───────────────────────────────────────────────────────

export const RightSlotOptions: Story = {
  name: 'Right slot options',
  render: () => (
    <div style={{ ...wrapper, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      <div>
        <p style={sectionLabel}>Sin acción</p>
        <Snackbar message="Cambios guardados" icon={<CheckCircle size={24} strokeWidth={2} />} />
      </div>
      <div>
        <p style={sectionLabel}>Cerrar (×)</p>
        <Snackbar
          message="Cambios guardados"
          icon={<CheckCircle size={24} strokeWidth={2} />}
          onClose={() => {}}
        />
      </div>
      <div>
        <p style={sectionLabel}>Navegar (›)</p>
        <Snackbar
          message="Nueva oferta disponible"
          icon={<Star size={24} strokeWidth={2} />}
          onNavigate={() => {}}
        />
      </div>
      <div>
        <p style={sectionLabel}>Acción de texto</p>
        <Snackbar
          message="Producto eliminado del carrito"
          icon={<AlertCircle size={24} strokeWidth={2} />}
          actionLabel="Deshacer"
          onAction={() => {}}
        />
      </div>
    </div>
  ),
}

// ─── Intent examples ──────────────────────────────────────────────────────────

export const IntentExamples: Story = {
  name: 'Intent examples (icon)',
  render: () => (
    <div style={{ ...wrapper, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      <Snackbar
        message="Operación exitosa"
        icon={<CheckCircle size={24} strokeWidth={2} />}
        onClose={() => {}}
      />
      <Snackbar
        message="Ha ocurrido un error al procesar"
        icon={<AlertCircle size={24} strokeWidth={2} />}
        actionLabel="Reintentar"
        onAction={() => {}}
      />
      <Snackbar
        message="Verifica los datos ingresados"
        icon={<AlertTriangle size={24} strokeWidth={2} />}
        onClose={() => {}}
      />
      <Snackbar
        message="Tu sesión expirará en 5 minutos"
        icon={<Info size={24} strokeWidth={2} />}
        actionLabel="Renovar"
        onAction={() => {}}
      />
    </div>
  ),
}

// ─── Long message ─────────────────────────────────────────────────────────────

export const LongMessage: Story = {
  name: 'Long message (wrapping)',
  render: () => (
    <div style={wrapper}>
      <Snackbar
        message="Tu pedido ha sido confirmado y será entregado en un tiempo estimado de 45 minutos. Puedes rastrear el estado en tiempo real."
        icon={<CheckCircle size={24} strokeWidth={2} />}
        onClose={() => {}}
      />
    </div>
  ),
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export const LoadingVariant: Story = {
  name: 'Loading variant',
  render: () => (
    <div style={{ ...wrapper, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      <Snackbar message="Cargando resultados…" loading />
      <Snackbar message="Procesando pago…" loading actionLabel="Cancelar" onAction={() => {}} />
    </div>
  ),
}

// ─── Interactive use-case ─────────────────────────────────────────────────────

export const InteractiveUseCase: Story = {
  name: 'Use case — dismissible',
  render: () => {
    const [visible, setVisible] = useState(true)
    const [undone, setUndone] = useState(false)

    if (!visible) {
      return (
        <div style={{ ...wrapper, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-family-base)',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 'var(--spacing-16)',
            }}
          >
            {undone ? 'Acción deshecha ✓' : 'Snackbar cerrado'}
          </p>
          <button
            type="button"
            onClick={() => { setVisible(true); setUndone(false) }}
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: '14px',
              color: 'white',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Mostrar de nuevo
          </button>
        </div>
      )
    }

    return (
      <div style={wrapper}>
        <Snackbar
          message="Producto eliminado del carrito"
          icon={<CheckCircle size={24} strokeWidth={2} />}
          actionLabel="Deshacer"
          onAction={() => { setUndone(true); setVisible(false) }}
        />
      </div>
    )
  },
}
