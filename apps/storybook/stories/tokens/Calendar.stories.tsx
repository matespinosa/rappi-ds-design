import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '@rappi-ds/react'
import React, { useState } from 'react'
import type { CalendarRange } from '@rappi-ds/react'

const meta: Meta<typeof Calendar> = {
  title: 'Primitives/Calendar',
  component: Calendar,
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'double'],
      description: 'Single date picker or double-panel date range picker',
    },
    confirmLabel: { control: 'text' },
    applyLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
  },
  args: {
    variant: 'single',
    confirmLabel: 'Seleccionar',
    applyLabel: 'Seleccionar',
    cancelLabel: 'Cancelar',
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <Calendar
      {...args}
      defaultMonth={new Date(2025, 0, 1)} // January 2025
    />
  ),
}

// ─── Single Calendar ──────────────────────────────────────────────────────────

export const SingleCalendar: Story = {
  name: 'Single Calendar',
  render: () => (
    <Calendar
      variant="single"
      defaultValue={new Date(2025, 0, 15)}
      defaultMonth={new Date(2025, 0, 1)}
      onConfirm={(date) => {
        console.log('Confirmed:', date)
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Single date picker with a pre-selected date (January 15, 2025). Click any day to select it, then press "Seleccionar" to confirm.',
      },
    },
  },
}

// ─── Double Calendar ──────────────────────────────────────────────────────────

export const DoubleCalendar: Story = {
  name: 'Double Calendar (Range)',
  render: () => (
    <Calendar
      variant="double"
      defaultMonth={new Date(2025, 0, 1)}
      rangeValue={{
        start: new Date(2025, 0, 10),
        end: new Date(2025, 1, 5),
      }}
      onApply={(range) => {
        console.log('Applied range:', range)
      }}
      onCancel={() => {
        console.log('Cancelled')
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Double-panel range picker showing January and February 2025 with a pre-selected range from Jan 10 to Feb 5.',
      },
    },
  },
}

// ─── Interactive ──────────────────────────────────────────────────────────────

function InteractiveDemo() {
  const [singleDate, setSingleDate] = useState<Date | null>(null)
  const [range, setRange] = useState<CalendarRange>({ start: null, end: null })

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-label-sm)',
    fontWeight: 600,
    color: 'var(--ink-weak)',
    marginBottom: 8,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  }

  const valueStyle: React.CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-body-md)',
    color: 'var(--ink-standard)',
    marginTop: 8,
    minHeight: 24,
  }

  const fmt = (d: Date | null) =>
    d ? `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}` : '—'

  return (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <div style={labelStyle}>Single</div>
        <Calendar
          variant="single"
          defaultMonth={new Date(2025, 3, 1)}
          value={singleDate}
          onChange={setSingleDate}
          onConfirm={(d) => alert(`Confirmed: ${fmt(d)}`)}
        />
        <div style={valueStyle}>
          Selected: <strong>{fmt(singleDate)}</strong>
        </div>
      </div>

      <div>
        <div style={labelStyle}>Range</div>
        <Calendar
          variant="double"
          defaultMonth={new Date(2025, 3, 1)}
          rangeValue={range}
          onRangeChange={setRange}
          onApply={(r) => alert(`Applied: ${fmt(r.start)} – ${fmt(r.end)}`)}
          onCancel={() => setRange({ start: null, end: null })}
        />
        <div style={valueStyle}>
          Start: <strong>{fmt(range.start)}</strong> / End:{' '}
          <strong>{fmt(range.end)}</strong>
        </div>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive single and double calendars side by side. State is lifted to a parent component.',
      },
    },
  },
}

// ─── With Constraints ─────────────────────────────────────────────────────────

export const WithConstraints: Story = {
  name: 'With Min/Max Constraints',
  render: () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
    return (
      <Calendar
        variant="single"
        minDate={minDate}
        maxDate={maxDate}
        defaultMonth={new Date(today.getFullYear(), today.getMonth(), 1)}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Calendar with minDate (3 days ago) and maxDate (14 days from now). Days outside the valid range are disabled.',
      },
    },
  },
}

// ─── Controlled ───────────────────────────────────────────────────────────────

function ControlledDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 5, 15))

  const formatDate = (d: Date | null) =>
    d
      ? d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Sin selección'

  const panelStyle: React.CSSProperties = {
    padding: '16px 20px',
    background: 'var(--surface-mild)',
    borderRadius: 12,
    marginBottom: 16,
    fontFamily: 'var(--font-family-base)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-label-xs)',
    fontWeight: 600,
    color: 'var(--ink-weak)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 4,
  }

  const valueStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-body-md)',
    color: 'var(--ink-strong)',
    fontWeight: 500,
  }

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <div style={panelStyle}>
          <div style={labelStyle}>Fecha seleccionada (externa)</div>
          <div style={valueStyle}>{formatDate(selectedDate)}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            new Date(2025, 5, 1),
            new Date(2025, 5, 15),
            new Date(2025, 5, 30),
            null,
          ].map((d, i) => (
            <button
              key={i}
              type="button"
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-standard)',
                background: 'var(--surface)',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-label-sm)',
                color: 'var(--ink-standard)',
              }}
              onClick={() => setSelectedDate(d)}
            >
              {d
                ? d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
                : 'Limpiar'}
            </button>
          ))}
        </div>
        <Calendar
          variant="single"
          value={selectedDate}
          defaultMonth={new Date(2025, 5, 1)}
          onChange={setSelectedDate}
          onConfirm={(d) => console.log('Confirmed:', d)}
        />
      </div>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Fully controlled Calendar — the selected date is driven by external state. Use the quick-select buttons to drive the calendar from outside.',
      },
    },
  },
}
