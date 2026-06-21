import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ShoppingBag, WifiOff, Search, PackageOpen } from '@rappi-ds/icons'
import { EmptyState } from '@rappi-ds/react'

const meta: Meta<typeof EmptyState> = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 375, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EmptyState>

/* ── Sizes ── */

export const Medium: Story = {
  name: 'md — Compact (sección / tarjeta)',
  render: () => (
    <EmptyState
      size="md"
      title="Algo ocurrió"
      description="Se produjo un error, vuelve a intentarlo."
      onAction={() => alert('Reintentar')}
    />
  ),
}

export const Large: Story = {
  name: 'lg — Full page',
  render: () => (
    <EmptyState
      size="lg"
      title="Algo ocurrió"
      description="Se produjo un error, vuelve a intentarlo."
      onAction={() => alert('Reintentar')}
    />
  ),
}

/* ── Skeletons ── */

export const MediumSkeleton: Story = {
  name: 'md — Skeleton',
  render: () => <EmptyState size="md" skeleton />,
}

export const LargeSkeleton: Story = {
  name: 'lg — Skeleton',
  render: () => <EmptyState size="lg" skeleton />,
}

/* ── Custom icons ── */

export const CustomIcons: Story = {
  name: 'Íconos personalizados',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#eee' }}>
      <EmptyState
        size="md"
        title="Sin conexión"
        description="Revisa tu conexión a internet."
        icon={<WifiOff size={24} strokeWidth={1.5} />}
        actionLabel="Reintentar"
      />
      <EmptyState
        size="md"
        title="Sin pedidos"
        description="Aquí aparecerán tus pedidos activos."
        icon={<ShoppingBag size={24} strokeWidth={1.5} />}
        showAction={false}
      />
      <EmptyState
        size="md"
        title="Sin resultados"
        description="Prueba con otros términos de búsqueda."
        icon={<Search size={24} strokeWidth={1.5} />}
        actionLabel="Limpiar filtros"
      />
    </div>
  ),
}

/* ── No action ── */

export const NoAction: Story = {
  name: 'Sin acción',
  render: () => (
    <EmptyState
      size="md"
      title="No hay datos"
      description="En este momento no hay información disponible."
      showAction={false}
      icon={<PackageOpen size={24} strokeWidth={1.5} />}
    />
  ),
}

/* ── Custom action ── */

export const CustomAction: Story = {
  name: 'Acción personalizada',
  render: () => (
    <EmptyState
      size="lg"
      title="Sesión expirada"
      description="Tu sesión ha expirado. Vuelve a iniciar sesión para continuar."
      action={
        <button
          type="button"
          style={{
            padding: '8px 24px',
            borderRadius: 9999,
            border: '1px solid var(--border-non-opaque)',
            background: 'var(--surface)',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-body-md)',
            fontWeight: 500,
            color: 'var(--ink-strong)',
          }}
        >
          Iniciar sesión
        </button>
      }
    />
  ),
}

/* ── Custom label ── */

export const CustomLabel: Story = {
  name: 'Label de acción personalizado',
  args: {
    title: 'Error de carga',
    description: 'No pudimos cargar la información.',
    actionLabel: 'Actualizar página',
    size: 'md',
  },
}
