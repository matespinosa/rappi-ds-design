import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Dialog, BottomSheet } from '@rappi-ds/react'
import type { BottomSheetSize } from '@rappi-ds/react'

// ─── Shared parameters ────────────────────────────────────────────────────────

const sharedParameters = {
  layout: 'padded',
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#ffffff' },
      { name: 'light', value: '#f7f8f9' },
    ],
  },
}

// ─── Dialog Meta ──────────────────────────────────────────────────────────────

const dialogMeta: Meta<typeof Dialog> = {
  title: 'Organisms/Dialog',
  component: Dialog,
  argTypes: {
    open: { control: 'boolean', description: 'Controls visibility of the dialog' },
    title: { control: 'text', description: 'Dialog title displayed in the header' },
    description: { control: 'text', description: 'Optional description below the title' },
    showFooter: { control: 'boolean', description: 'Show or hide the footer buttons' },
    elevation: { control: 'boolean', description: 'Add a drop shadow to the panel' },
    primaryLabel: { control: 'text', description: 'Label for the primary action button' },
    secondaryLabel: { control: 'text', description: 'Label for the secondary action button' },
  },
  args: {
    open: false,
    title: 'Dialog Title',
    description: 'This is an optional description that provides additional context.',
    showFooter: true,
    elevation: false,
    primaryLabel: 'Primary',
    secondaryLabel: 'Secondary',
  },
  parameters: sharedParameters,
}

export default dialogMeta
type DialogStory = StoryObj<typeof Dialog>

// ─── Dialog Playground ────────────────────────────────────────────────────────

export const DialogPlayground: DialogStory = {
  name: 'Playground',
  render: (args) => {
    const [open, setOpen] = useState(args.open ?? false)
    React.useEffect(() => {
      setOpen(args.open ?? false)
    }, [args.open])
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Open Dialog
        </button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    )
  },
}

// ─── Dialog Default ───────────────────────────────────────────────────────────

export const DialogDefault: DialogStory = {
  name: 'Default',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Open Dialog
        </button>
        <Dialog
          open={open}
          title="Confirmar acción"
          description="¿Estás seguro de que deseas realizar esta acción? Esta operación no se puede deshacer."
          primaryLabel="Confirmar"
          secondaryLabel="Cancelar"
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard dialog with title, description, and footer action buttons.',
      },
    },
  },
}

// ─── Dialog with Elevation ────────────────────────────────────────────────────

export const DialogWithElevation: DialogStory = {
  name: 'With Elevation',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Open Elevated Dialog
        </button>
        <Dialog
          open={open}
          title="Elevated Dialog"
          description="This dialog has a shadow (elevation) applied to the panel."
          elevation
          primaryLabel="OK"
          secondaryLabel="Cancel"
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with the `elevation` prop adds a drop shadow to the panel.',
      },
    },
  },
}

// ─── Dialog No Footer ─────────────────────────────────────────────────────────

export const DialogNoFooter: DialogStory = {
  name: 'No Footer',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Open Dialog (No Footer)
        </button>
        <Dialog
          open={open}
          title="Información"
          description="Este diálogo no tiene botones de acción en el pie. Se cierra con el botón X o haciendo clic en el overlay."
          showFooter={false}
          onClose={() => setOpen(false)}
        >
          <div
            style={{
              padding: '16px',
              background: '#f7f8f9',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#555',
            }}
          >
            Contenido personalizado sin footer.
          </div>
        </Dialog>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog without footer buttons — closed only via the X button or overlay click.',
      },
    },
  },
}

// ─── Bottom Sheet Meta ────────────────────────────────────────────────────────

export const BottomSheetPlayground: DialogStory = {
  name: 'BottomSheet / Playground',
  render: () => {
    const [open, setOpen] = useState(false)
    const [size, setSize] = useState<BottomSheetSize>('hug')
    const [grabber, setGrabber] = useState(true)
    const [showFooter, setShowFooter] = useState(true)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['hug', 'half', 'full'] as BottomSheetSize[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setSize(s); setOpen(true) }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                background: size === s ? '#eee' : '#fff',
                fontWeight: size === s ? 600 : 400,
              }}
            >
              Open {s}
            </button>
          ))}
        </div>
        <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={grabber}
            onChange={(e) => setGrabber(e.target.checked)}
          />
          grabber
        </label>
        <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={showFooter}
            onChange={(e) => setShowFooter(e.target.checked)}
          />
          showFooter
        </label>
        <BottomSheet
          open={open}
          title="Bottom Sheet"
          size={size}
          grabber={grabber}
          showFooter={showFooter}
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <div style={{ padding: '0 24px 16px', color: '#555', fontSize: '14px', lineHeight: '20px' }}>
            Este es el contenido del bottom sheet. Puede contener cualquier elemento de React.
          </div>
        </BottomSheet>
      </div>
    )
  },
  parameters: {
    ...sharedParameters,
    docs: {
      description: {
        story: 'Interactive playground for BottomSheet. Toggle size, grabber, and footer.',
      },
    },
  },
}

// ─── BottomSheet Sizes ────────────────────────────────────────────────────────

export const BottomSheetSizes: DialogStory = {
  name: 'BottomSheet / Sizes',
  render: () => {
    const [openSize, setOpenSize] = useState<BottomSheetSize | null>(null)
    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {(['hug', 'half', 'full'] as BottomSheetSize[]).map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setOpenSize(size)}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              background: '#fff',
              textTransform: 'capitalize',
            }}
          >
            {size}
          </button>
        ))}
        {(['hug', 'half', 'full'] as BottomSheetSize[]).map((size) => (
          <BottomSheet
            key={size}
            open={openSize === size}
            title={`Bottom Sheet — ${size}`}
            size={size}
            onClose={() => setOpenSize(null)}
            onPrimary={() => setOpenSize(null)}
            onSecondary={() => setOpenSize(null)}
          >
            <div
              style={{
                padding: '0 24px 16px',
                color: '#555',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              <p>Size: <strong>{size}</strong></p>
              {size === 'hug' && <p>Height is content-driven (max 90dvh).</p>}
              {size === 'half' && <p>Height is fixed at 60dvh.</p>}
              {size === 'full' && <p>Height is calc(100dvh - 64px).</p>}
            </div>
          </BottomSheet>
        ))}
      </div>
    )
  },
  parameters: {
    ...sharedParameters,
    docs: {
      description: {
        story:
          'Three size variants: `hug` (content-driven, max 90dvh), `half` (60dvh), `full` (100dvh - 64px).',
      },
    },
  },
}

// ─── BottomSheet Interactive ──────────────────────────────────────────────────

export const BottomSheetInteractive: DialogStory = {
  name: 'BottomSheet / Interactive',
  render: () => {
    const [open, setOpen] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <button
          type="button"
          onClick={() => { setOpen(true); setConfirmed(false) }}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Abrir Bottom Sheet
        </button>
        {confirmed && (
          <p style={{ color: '#16a34a', fontSize: '14px', margin: 0 }}>
            ¡Acción confirmada!
          </p>
        )}
        <BottomSheet
          open={open}
          title="Confirmar pedido"
          size="hug"
          onClose={() => setOpen(false)}
          primaryLabel="Confirmar"
          secondaryLabel="Cancelar"
          onPrimary={() => {
            setOpen(false)
            setConfirmed(true)
          }}
          onSecondary={() => setOpen(false)}
        >
          <div
            style={{
              padding: '0 24px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                background: '#f7f8f9',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                color: '#555',
                lineHeight: '20px',
              }}
            >
              <p style={{ margin: '0 0 8px' }}>
                <strong>Resumen del pedido</strong>
              </p>
              <p style={{ margin: 0 }}>1x Hamburguesa clásica — $18.500</p>
              <p style={{ margin: 0 }}>1x Papas fritas — $6.000</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600, color: '#222' }}>
                Total: $24.500
              </p>
            </div>
          </div>
        </BottomSheet>
      </div>
    )
  },
  parameters: {
    ...sharedParameters,
    docs: {
      description: {
        story:
          'Fully interactive BottomSheet triggered by a button, with primary confirm and secondary cancel actions.',
      },
    },
  },
}
