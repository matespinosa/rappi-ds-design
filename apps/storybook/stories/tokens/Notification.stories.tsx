import type { Meta, StoryObj } from '@storybook/react'
import { Notification } from '@rappi-ds/react'
import { ShoppingBag } from '@rappi-ds/icons'
import React, { useState } from 'react'

const meta: Meta<typeof Notification> = {
  title: 'Primitives/Notification',
  component: Notification,
  parameters: { layout: 'padded' },
  argTypes: {
    intent: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'ai'],
    },
    variant: { control: 'radio', options: ['solid', 'pastel'] },
    size: { control: 'radio', options: ['lg', 'sm'] },
  },
}

export default meta
type Story = StoryObj<typeof Notification>

/* ─── Playground ─── */

export const Playground: Story = {
  args: {
    intent: 'info',
    variant: 'solid',
    size: 'lg',
    message: 'A thing happened and it takes 2 lines to explain it.',
  },
  render: (args) => {
    const [visible, setVisible] = useState(true)
    if (!visible)
      return (
        <button
          style={{ fontFamily: 'var(--font-family-base)', cursor: 'pointer' }}
          onClick={() => setVisible(true)}
        >
          Mostrar de nuevo
        </button>
      )
    return (
      <Notification
        {...args}
        onClose={() => setVisible(false)}
        action="Deshacer"
        onAction={() => alert('Deshacer!')}
      />
    )
  },
}

/* ─── All intents — solid (Figma reference: left column) ─── */

export const SolidIntents: Story = {
  name: 'Figma — Solid (vibrant)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: 480 }}>
      {(['default', 'success', 'warning', 'error', 'info', 'ai'] as const).map((intent) => (
        <Notification
          key={intent}
          intent={intent}
          variant="solid"
          message="A thing happened and it takes 2 lines to explain it."
          onClose={() => {}}
        />
      ))}
    </div>
  ),
}

/* ─── All intents — pastel (Figma reference: bottom half) ─── */

export const PastelIntents: Story = {
  name: 'Figma — Pastel (light)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: 480 }}>
      {(['success', 'warning', 'error', 'info', 'ai'] as const).map((intent) => (
        <Notification
          key={intent}
          intent={intent}
          variant="pastel"
          message="A thing happened and it takes 2 lines to explain it."
          onClose={() => {}}
        />
      ))}
    </div>
  ),
}

/* ─── Sizes (large vs small) ─── */

export const Sizes: Story = {
  name: 'Sizes — lg / sm',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 480 }}>
      <div>
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
          Large (lg) — inline banner
        </p>
        <Notification intent="info" variant="solid" size="lg" message="Pedido actualizado correctamente." onClose={() => {}} />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
          Small (sm) — compact toast
        </p>
        <Notification intent="info" variant="solid" size="sm" message="Pedido actualizado correctamente." onClose={() => {}} />
      </div>
    </div>
  ),
}

/* ─── Figma reference: solid large vs solid small side by side ─── */

export const FigmaReference: Story = {
  name: 'Figma — Large & Small grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-8)' }}>
      {(['default', 'success', 'warning', 'info', 'error', 'ai'] as const).flatMap((intent) =>
        (['lg', 'sm'] as const).map((size) => (
          <Notification
            key={`${intent}-${size}`}
            intent={intent}
            variant="solid"
            size={size}
            message="A thing happened and it takes 2 lines to explain it."
            onClose={() => {}}
          />
        )),
      )}
    </div>
  ),
}

/* ─── With action ─── */

export const WithAction: Story = {
  name: 'With inline action',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: 480 }}>
      <Notification
        intent="default"
        message="Tu pedido se eliminó del carrito."
        action="Deshacer"
        onAction={() => alert('Deshacer!')}
      />
      <Notification
        intent="success"
        variant="pastel"
        message="Pago procesado correctamente."
        action="Ver detalle"
        onAction={() => {}}
        onClose={() => {}}
      />
      <Notification
        intent="error"
        variant="solid"
        size="sm"
        message="Error al guardar cambios."
        action="Reintentar"
        onAction={() => {}}
      />
    </div>
  ),
}

/* ─── With image (Figma: imageType=true) ─── */

export const WithImage: Story = {
  name: 'With image / avatar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: 480 }}>
      <Notification
        intent="default"
        message="A thing happened and it takes 2 lines to explain it."
        image={
          <span
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40,
              background: 'var(--positive-container)', borderRadius: 'var(--radius-md)',
              color: 'var(--ink-positive)',
            }}
          >
            <ShoppingBag size={24} strokeWidth={1.5} />
          </span>
        }
        onClose={() => {}}
      />
      <Notification
        intent="default"
        size="sm"
        message="A thing happened and it takes 2 lines to explain it."
        image={
          <span
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32,
              background: 'var(--info-container)', borderRadius: 'var(--radius-md)',
              color: 'var(--ink-recommendation)',
            }}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
          </span>
        }
        onClose={() => {}}
      />
    </div>
  ),
}

/* ─── No icon ─── */

export const NoIcon: Story = {
  name: 'Without icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: 480 }}>
      <Notification intent="success" variant="solid" message="Sin ícono" icon={null} onClose={() => {}} />
      <Notification intent="error" variant="pastel" message="Sin ícono en pastel" icon={null} onClose={() => {}} />
    </div>
  ),
}

/* ─── Toast usage pattern ─── */

export const ToastPattern: Story = {
  name: 'Toast usage pattern',
  render: () => {
    const [toasts, setToasts] = useState<{ id: number; intent: 'success' | 'error' | 'info'; message: string }[]>([])
    const [counter, setCounter] = useState(0)

    function addToast(intent: 'success' | 'error' | 'info') {
      const messages: Record<string, string> = {
        success: 'Pedido enviado correctamente.',
        error: 'No se pudo procesar el pago.',
        info: 'Tu sesión expirará en 5 minutos.',
      }
      const id = counter
      setCounter((c) => c + 1)
      setToasts((t) => [...t, { id, intent, message: messages[intent] }])
    }

    function dismiss(id: number) {
      setToasts((t) => t.filter((x) => x.id !== id))
    }

    return (
      <div style={{ position: 'relative', minHeight: 240 }}>
        {/* Trigger buttons */}
        <div style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
          {(['success', 'error', 'info'] as const).map((intent) => (
            <button
              key={intent}
              type="button"
              onClick={() => addToast(intent)}
              style={{
                padding: '8px 16px',
                background: 'var(--surface-mild)',
                border: '1px solid var(--border-standard)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-family-base)',
                cursor: 'pointer',
              }}
            >
              Toast {intent}
            </button>
          ))}
        </div>

        {/* Toast container — fixed-like within the story frame */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-8)',
          }}
        >
          {toasts.map(({ id, intent, message }) => (
            <Notification
              key={id}
              intent={intent}
              variant="solid"
              size="sm"
              message={message}
              onClose={() => dismiss(id)}
            />
          ))}
        </div>
      </div>
    )
  },
}
