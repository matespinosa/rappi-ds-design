import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, type AccordionProps, Button, Tag } from '@rappi-ds/react'
import {
  Bell,
  CreditCard,
  HelpCircle,
  MapPin,
  Package,
  Shield,
  Star,
  User,
} from '@rappi-ds/icons'
import React, { useState } from 'react'

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    title: '¿Cómo funciona el proceso de entrega?',
    subtitle: 'Información sobre tiempos y logística',
    disabled: false,
    defaultOpen: false,
    children:
      'El proceso de entrega comienza cuando el comercio acepta el pedido. Luego, un mensajero es asignado y recoge el paquete en el punto de origen. Puedes seguir el estado en tiempo real desde tu app.',
  },
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Accordion>

const sectionLabel = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  fontWeight: 600,
  color: 'var(--ink-weak)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
}

const faqContent = (
  <p
    style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-body-md)',
      color: 'var(--ink-standard)',
      lineHeight: 'var(--line-height-body-md)',
      margin: 0,
    }}
  >
    El proceso de entrega comienza cuando el comercio acepta el pedido. Luego,
    un mensajero es asignado y recoge el paquete en el punto de origen. Puedes
    seguir el estado en tiempo real desde tu app.
  </p>
)

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <Accordion {...args}>{args.children}</Accordion>
    </div>
  ),
}

export const DefaultOpen: Story = {
  name: 'Default open',
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <Accordion {...args} defaultOpen>
        {faqContent}
      </Accordion>
    </div>
  ),
}

export const WithIcon: Story = {
  name: 'With left icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', maxWidth: 600 }}>
      <Accordion title="Pedidos activos" icon={<Package size={24} strokeWidth={1.5} />}>
        {faqContent}
      </Accordion>
      <Accordion title="Mi perfil" icon={<User size={24} strokeWidth={1.5} />}>
        {faqContent}
      </Accordion>
      <Accordion title="Métodos de pago" icon={<CreditCard size={24} strokeWidth={1.5} />}>
        {faqContent}
      </Accordion>
      <Accordion title="Direcciones guardadas" icon={<MapPin size={24} strokeWidth={1.5} />}>
        {faqContent}
      </Accordion>
    </div>
  ),
}

export const WithSubtitle: Story = {
  name: 'With subtitle',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', maxWidth: 600 }}>
      <Accordion
        title="Plan Rappi Prime"
        subtitle="Suscripción activa · Renovación 15 jul 2025"
        icon={<Star size={24} strokeWidth={1.5} />}
      >
        {faqContent}
      </Accordion>
      <Accordion
        title="Notificaciones"
        subtitle="3 alertas pendientes de configurar"
        icon={<Bell size={24} strokeWidth={1.5} />}
      >
        {faqContent}
      </Accordion>
    </div>
  ),
}

function ControlledAccordionDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 600 }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
        <Button size="sm" appearance="outline" onClick={() => setOpen(true)}>
          Abrir
        </Button>
        <Button size="sm" appearance="outline" onClick={() => setOpen(false)}>
          Cerrar
        </Button>
        <Button size="sm" appearance="outline" onClick={() => setOpen((v) => !v)}>
          Alternar
        </Button>
      </div>
      <Accordion
        title="Accordion controlado"
        subtitle={`Estado: ${open ? 'abierto' : 'cerrado'}`}
        open={open}
        onOpenChange={setOpen}
      >
        {faqContent}
      </Accordion>
    </div>
  )
}

export const Controlled: Story = {
  name: 'Controlled',
  render: () => <ControlledAccordionDemo />,
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', maxWidth: 600 }}>
      <Accordion title="Accordion activo" subtitle="Puedes hacer clic para expandir">
        {faqContent}
      </Accordion>
      <Accordion title="Accordion deshabilitado" subtitle="No es posible expandir" disabled>
        {faqContent}
      </Accordion>
    </div>
  ),
}

export const WithSlotRight: Story = {
  name: 'With slot right',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', maxWidth: 600 }}>
      <Accordion
        title="Seguridad de la cuenta"
        icon={<Shield size={24} strokeWidth={1.5} />}
        slotRight={<Tag intent="success" variant="pastel">Activo</Tag>}
      >
        {faqContent}
      </Accordion>
      <Accordion
        title="Preguntas frecuentes"
        icon={<HelpCircle size={24} strokeWidth={1.5} />}
        slotRight={<Tag intent="info" variant="pastel">12 artículos</Tag>}
      >
        {faqContent}
      </Accordion>
    </div>
  ),
}

const FAQ_ITEMS: Array<Pick<AccordionProps, 'title' | 'subtitle' | 'icon'>> = [
  { title: '¿Cómo hago un seguimiento de mi pedido?', icon: <Package size={24} strokeWidth={1.5} /> },
  { title: '¿Cuáles son los métodos de pago disponibles?', icon: <CreditCard size={24} strokeWidth={1.5} /> },
  { title: '¿Cómo cambio mi dirección de entrega?', icon: <MapPin size={24} strokeWidth={1.5} /> },
  { title: '¿Cómo cancelo un pedido activo?', subtitle: 'Solo es posible antes de que el mensajero lo recoja', icon: <HelpCircle size={24} strokeWidth={1.5} /> },
]

export const Group: Story = {
  name: 'Group (FAQ)',
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <p style={{ ...sectionLabel, marginBottom: 'var(--spacing-16)' }}>Preguntas frecuentes</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {FAQ_ITEMS.map((item, i) => (
          <Accordion key={i} title={item.title} subtitle={item.subtitle} icon={item.icon}>
            {faqContent}
          </Accordion>
        ))}
      </div>
    </div>
  ),
}

export const RichContent: Story = {
  name: 'Rich content inside',
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Accordion
        title="Resumen del pedido"
        subtitle="3 productos · $45.900"
        icon={<Package size={24} strokeWidth={1.5} />}
        defaultOpen
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-12)',
            fontFamily: 'var(--font-family-base)',
          }}
        >
          {[
            { name: 'Hamburguesa clásica', qty: 1, price: '$22.900' },
            { name: 'Papas medianas', qty: 2, price: '$12.000' },
            { name: 'Gaseosa 350ml', qty: 1, price: '$5.000' },
          ].map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'var(--font-size-body-md)',
                color: 'var(--ink-standard)',
              }}
            >
              <span>
                {item.qty}× {item.name}
              </span>
              <span style={{ color: 'var(--ink-strong)', fontWeight: 600 }}>{item.price}</span>
            </div>
          ))}
          <div
            style={{
              borderTop: '1px solid var(--border-standard)',
              paddingTop: 'var(--spacing-12)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--font-size-body-md)',
              fontWeight: 600,
              color: 'var(--ink-strong)',
            }}
          >
            <span>Total</span>
            <span>$45.900</span>
          </div>
        </div>
      </Accordion>
    </div>
  ),
}
