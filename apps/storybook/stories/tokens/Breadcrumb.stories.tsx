import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from '@rappi-ds/react'
import React from 'react'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

/* ─── Matching Figma "levels" variants ─── */

export const Level0: Story = {
  name: 'Level 0 — root only',
  render: () => (
    <Breadcrumb items={[{ label: 'Inicio' }]} />
  ),
}

export const Level1: Story = {
  name: 'Level 1 — 1 ancestor',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Inicio', href: '/' },
        { label: 'Mi tienda' },
      ]}
      onBack={() => alert('← Volver')}
    />
  ),
}

export const Level2: Story = {
  name: 'Level 2 — 2 ancestors',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Inicio', href: '/' },
        { label: 'Tiendas', href: '/stores' },
        { label: 'Mi tienda' },
      ]}
      onBack={() => alert('← Volver')}
    />
  ),
}

export const Level3: Story = {
  name: 'Level 3 — 3 ancestors',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Inicio', href: '/' },
        { label: 'Tiendas', href: '/stores' },
        { label: 'Zona Norte', href: '/stores/zone' },
        { label: 'Mi tienda' },
      ]}
      onBack={() => alert('← Volver')}
    />
  ),
}

export const Level4: Story = {
  name: 'Level 4 — 4 ancestors',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Inicio', href: '/' },
        { label: 'Tiendas', href: '/stores' },
        { label: 'Zona Norte', href: '/stores/zone' },
        { label: 'Rappi Food', href: '/stores/zone/food' },
        { label: 'Mi tienda' },
      ]}
      onBack={() => alert('← Volver')}
    />
  ),
}

/* ─── Real-world example ─── */

export const AllLevels: Story = {
  name: 'All levels — Figma reference',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      {[
        [{ label: 'Label text link' }],
        [
          { label: 'Label text link', href: '/' },
          { label: 'Label text link' },
        ],
        [
          { label: 'Label text link', href: '/' },
          { label: 'Label text link', href: '/a' },
          { label: 'Label text link' },
        ],
        [
          { label: 'Label text link', href: '/' },
          { label: 'Label text link', href: '/a' },
          { label: 'Label text link', href: '/a/b' },
          { label: 'Label text link' },
        ],
        [
          { label: 'Label text link', href: '/' },
          { label: 'Label text link', href: '/a' },
          { label: 'Label text link', href: '/a/b' },
          { label: 'Label text link', href: '/a/b/c' },
          { label: 'Label text link' },
        ],
      ].map((items, i) => (
        <Breadcrumb key={i} items={items} onBack={() => {}} />
      ))}
    </div>
  ),
}

export const MerchantFlow: Story = {
  name: 'Merchant onboarding flow',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Mi cuenta', href: '/account' },
        { label: 'Mis tiendas', href: '/account/stores' },
        { label: 'Rappi Burgers Centro' },
      ]}
      onBack={() => alert('← Volver a Mis tiendas')}
    />
  ),
}

export const WithLongLabels: Story = {
  name: 'Long labels — overflow check',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Breadcrumb
        items={[
          { label: 'Gestión de cuentas', href: '/account' },
          { label: 'Configuración avanzada', href: '/account/config' },
          { label: 'Horarios de apertura y cierre' },
        ]}
        onBack={() => {}}
      />
    </div>
  ),
}
