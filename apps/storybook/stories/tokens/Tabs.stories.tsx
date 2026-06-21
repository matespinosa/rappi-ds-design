import type { Meta, StoryObj } from '@storybook/react'
import { Tab, TabList, TabPanel, Tabs } from '@rappi-ds/react'
import { BadgeLive } from '@rappi-ds/react'
import { BarChart2, Bell, Home, Settings, ShoppingBag, Star, Users } from '@rappi-ds/icons'
import React, { useState } from 'react'

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Tabs>

/* ─── Helper ─── */
function ControlledTabs(props: React.ComponentProps<typeof Tabs>) {
  const [tab, setTab] = useState(props.value)
  return <Tabs {...props} value={tab} onChange={setTab} />
}

/* ─── Figma reference — 2 states ─── */

export const FigmaStates: Story = {
  name: 'Figma — selected / not selected',
  render: () => (
    <ControlledTabs value="a">
      <TabList aria-label="Figma reference">
        <Tab value="a">Título 01</Tab>
        <Tab value="b">Título 01</Tab>
      </TabList>
      <TabPanel value="a">
        <p style={{ fontFamily: 'var(--font-family-base)', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Contenido del tab seleccionado
        </p>
      </TabPanel>
      <TabPanel value="b">
        <p style={{ fontFamily: 'var(--font-family-base)', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Contenido del segundo tab
        </p>
      </TabPanel>
    </ControlledTabs>
  ),
}

/* ─── All states ─── */

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      {/* Selected vs not selected */}
      <div>
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
          Selected / Not selected
        </p>
        <ControlledTabs value="a">
          <TabList aria-label="Selected state">
            <Tab value="a">Seleccionado</Tab>
            <Tab value="b">No seleccionado</Tab>
          </TabList>
          <TabPanel value="a">Panel A</TabPanel>
          <TabPanel value="b">Panel B</TabPanel>
        </ControlledTabs>
      </div>

      {/* Disabled */}
      <div>
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
          Disabled tab
        </p>
        <ControlledTabs value="a">
          <TabList aria-label="Disabled state">
            <Tab value="a">Activo</Tab>
            <Tab value="b">Normal</Tab>
            <Tab value="c" disabled>Deshabilitado</Tab>
          </TabList>
          <TabPanel value="a">Panel A</TabPanel>
          <TabPanel value="b">Panel B</TabPanel>
          <TabPanel value="c">Panel C</TabPanel>
        </ControlledTabs>
      </div>

      {/* With icons */}
      <div>
        <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-label-xs)', color: 'var(--ink-weak)', marginBottom: 'var(--spacing-8)' }}>
          With icons (startIcon / endIcon)
        </p>
        <ControlledTabs value="a">
          <TabList aria-label="Icon state">
            <Tab value="a" startIcon={<Home size={16} strokeWidth={1.5} />}>Inicio</Tab>
            <Tab value="b" startIcon={<ShoppingBag size={16} strokeWidth={1.5} />}>Pedidos</Tab>
            <Tab value="c" startIcon={<Settings size={16} strokeWidth={1.5} />} disabled>Config.</Tab>
          </TabList>
          <TabPanel value="a">Inicio</TabPanel>
          <TabPanel value="b">Pedidos</TabPanel>
          <TabPanel value="c">Config.</TabPanel>
        </ControlledTabs>
      </div>
    </div>
  ),
}

/* ─── Icon variants ─── */

export const WithStartIcons: Story = {
  name: 'Icons — start only',
  render: () => (
    <ControlledTabs value="overview">
      <TabList aria-label="Dashboard">
        <Tab value="overview" startIcon={<BarChart2 size={16} strokeWidth={1.5} />}>Resumen</Tab>
        <Tab value="orders" startIcon={<ShoppingBag size={16} strokeWidth={1.5} />}>Pedidos</Tab>
        <Tab value="customers" startIcon={<Users size={16} strokeWidth={1.5} />}>Clientes</Tab>
        <Tab value="reviews" startIcon={<Star size={16} strokeWidth={1.5} />}>Reseñas</Tab>
      </TabList>
      <TabPanel value="overview">
        <p style={{ fontFamily: 'var(--font-family-base)', padding: 'var(--spacing-4) 0', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Métricas generales de tu tienda
        </p>
      </TabPanel>
      <TabPanel value="orders">
        <p style={{ fontFamily: 'var(--font-family-base)', padding: 'var(--spacing-4) 0', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Historial de pedidos
        </p>
      </TabPanel>
      <TabPanel value="customers">
        <p style={{ fontFamily: 'var(--font-family-base)', padding: 'var(--spacing-4) 0', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Base de clientes
        </p>
      </TabPanel>
      <TabPanel value="reviews">
        <p style={{ fontFamily: 'var(--font-family-base)', padding: 'var(--spacing-4) 0', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Valoraciones de usuarios
        </p>
      </TabPanel>
    </ControlledTabs>
  ),
}

export const WithEndIcons: Story = {
  name: 'Icons — end (badge/notification)',
  render: () => (
    <ControlledTabs value="inbox">
      <TabList aria-label="Notificaciones">
        <Tab value="inbox" endIcon={<BadgeLive status="active" animated />}>Inbox</Tab>
        <Tab value="sent">Enviados</Tab>
        <Tab value="archived" endIcon={<Bell size={14} strokeWidth={1.5} />}>Archivados</Tab>
      </TabList>
      <TabPanel value="inbox">
        <p style={{ fontFamily: 'var(--font-family-base)', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Mensajes recibidos
        </p>
      </TabPanel>
      <TabPanel value="sent">
        <p style={{ fontFamily: 'var(--font-family-base)', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Mensajes enviados
        </p>
      </TabPanel>
      <TabPanel value="archived">
        <p style={{ fontFamily: 'var(--font-family-base)', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
          Mensajes archivados
        </p>
      </TabPanel>
    </ControlledTabs>
  ),
}

export const WithBothIcons: Story = {
  name: 'Icons — both start + end',
  render: () => (
    <ControlledTabs value="active">
      <TabList aria-label="Estado de pedidos">
        <Tab value="active" startIcon={<ShoppingBag size={16} strokeWidth={1.5} />} endIcon={<BadgeLive status="active" animated />}>
          Activos
        </Tab>
        <Tab value="history" startIcon={<BarChart2 size={16} strokeWidth={1.5} />}>
          Historial
        </Tab>
        <Tab value="cancelled" startIcon={<Star size={16} strokeWidth={1.5} />} disabled>
          Cancelados
        </Tab>
      </TabList>
      <TabPanel value="active">Pedidos en curso</TabPanel>
      <TabPanel value="history">Pedidos pasados</TabPanel>
      <TabPanel value="cancelled">Sin pedidos cancelados</TabPanel>
    </ControlledTabs>
  ),
}

/* ─── Real-world example ─── */

export const MerchantDashboard: Story = {
  name: 'Merchant dashboard',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <ControlledTabs value="today">
        <TabList aria-label="Panel del negocio">
          <Tab value="today" startIcon={<BarChart2 size={16} strokeWidth={1.5} />}>Hoy</Tab>
          <Tab value="week">Esta semana</Tab>
          <Tab value="month">Este mes</Tab>
          <Tab value="reports" disabled startIcon={<Star size={16} strokeWidth={1.5} />}>Reportes</Tab>
        </TabList>
        <TabPanel value="today">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', fontFamily: 'var(--font-family-base)', color: 'var(--ink-standard)', fontSize: 'var(--font-size-body-md)' }}>
            <p>🛍 32 pedidos completados</p>
            <p>⭐ Calificación promedio: 4.8</p>
            <p>💰 Total: $1,240,000</p>
          </div>
        </TabPanel>
        <TabPanel value="week">Resumen semanal aquí</TabPanel>
        <TabPanel value="month">Resumen mensual aquí</TabPanel>
        <TabPanel value="reports">No disponible todavía</TabPanel>
      </ControlledTabs>
    </div>
  ),
}

/* ─── Many tabs (overflow scroll) ─── */

export const Overflow: Story = {
  name: 'Overflow — horizontal scroll',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ControlledTabs value="1">
        <TabList aria-label="Overflow tabs">
          {Array.from({ length: 8 }, (_, i) => (
            <Tab key={i + 1} value={String(i + 1)}>
              Tab {i + 1}
            </Tab>
          ))}
        </TabList>
        {Array.from({ length: 8 }, (_, i) => (
          <TabPanel key={i + 1} value={String(i + 1)}>
            Contenido del tab {i + 1}
          </TabPanel>
        ))}
      </ControlledTabs>
    </div>
  ),
}
