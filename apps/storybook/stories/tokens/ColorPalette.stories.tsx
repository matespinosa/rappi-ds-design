import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

interface SwatchProps {
  label: string
  cssVar: string
}

function Swatch({ label, cssVar }: SwatchProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `var(${cssVar})`,
          border: '1px solid var(--border-standard)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'monospace' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-weak)', fontFamily: 'monospace' }}>
          {cssVar}
        </div>
      </div>
    </div>
  )
}

const BRAND = [
  { label: 'brand-primary', cssVar: '--brand-primary' },
  { label: 'brand-primary-dark', cssVar: '--brand-primary-dark' },
  { label: 'brand-primary-light', cssVar: '--brand-primary-light' },
  { label: 'brand-primary-container', cssVar: '--brand-primary-container' },
  { label: 'brand-secondary', cssVar: '--brand-secondary' },
]

const INK = [
  { label: 'ink-strong', cssVar: '--ink-strong' },
  { label: 'ink-standard', cssVar: '--ink-standard' },
  { label: 'ink-weak', cssVar: '--ink-weak' },
  { label: 'ink-disabled', cssVar: '--ink-disabled' },
  { label: 'ink-inverse', cssVar: '--ink-inverse' },
]

const SURFACE = [
  { label: 'surface', cssVar: '--surface' },
  { label: 'surface-mild', cssVar: '--surface-mild' },
  { label: 'surface-weak', cssVar: '--surface-weak' },
  { label: 'surface-inverse', cssVar: '--surface-inverse' },
]

const FEEDBACK = [
  { label: 'positive', cssVar: '--positive' },
  { label: 'positive-container', cssVar: '--positive-container' },
  { label: 'warning', cssVar: '--warning' },
  { label: 'warning-container', cssVar: '--warning-container' },
  { label: 'error', cssVar: '--error' },
  { label: 'error-container', cssVar: '--error-container' },
  { label: 'info', cssVar: '--info' },
  { label: 'info-container', cssVar: '--info-container' },
]

const CHART = [
  { label: 'chart-blue-02', cssVar: '--chart-blue-02' },
  { label: 'chart-blue-04', cssVar: '--chart-blue-04' },
  { label: 'chart-green-02', cssVar: '--chart-green-02' },
  { label: 'chart-green-04', cssVar: '--chart-green-04' },
  { label: 'chart-red-02', cssVar: '--chart-red-02' },
  { label: 'chart-red-03', cssVar: '--chart-red-03' },
  { label: 'chart-red-04', cssVar: '--chart-red-04' },
  { label: 'chart-orange-02', cssVar: '--chart-orange-02' },
  { label: 'chart-orange-03', cssVar: '--chart-orange-03' },
  { label: 'chart-orange-04', cssVar: '--chart-orange-04' },
  { label: 'chart-yellow-02', cssVar: '--chart-yellow-02' },
  { label: 'chart-teal-01', cssVar: '--chart-teal-01' },
  { label: 'chart-teal-02', cssVar: '--chart-teal-02' },
  { label: 'chart-teal-03', cssVar: '--chart-teal-03' },
  { label: 'chart-teal-04', cssVar: '--chart-teal-04' },
  { label: 'chart-purple-02', cssVar: '--chart-purple-02' },
  { label: 'chart-indigo-01', cssVar: '--chart-indigo-01' },
  { label: 'chart-indigo-02', cssVar: '--chart-indigo-02' },
  { label: 'chart-indigo-03', cssVar: '--chart-indigo-03' },
  { label: 'chart-indigo-04', cssVar: '--chart-indigo-04' },
  { label: 'chart-magenta-01', cssVar: '--chart-magenta-01' },
  { label: 'chart-magenta-02', cssVar: '--chart-magenta-02' },
  { label: 'chart-magenta-03', cssVar: '--chart-magenta-03' },
  { label: 'chart-magenta-04', cssVar: '--chart-magenta-04' },
]

function ColorGroup({ title, swatches }: { title: string; swatches: SwatchProps[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--ink-standard)' }}>
        {title}
      </h3>
      {swatches.map((s) => (
        <Swatch key={s.cssVar} {...s} />
      ))}
    </div>
  )
}

function ColorPaletteComponent() {
  return (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 13, color: 'var(--ink-weak)', marginBottom: 24 }}>
        Switch the vertical in the toolbar to see brand token overrides.
      </p>
      <ColorGroup title="Brand primitives" swatches={BRAND} />
      <ColorGroup title="Ink (text & icons)" swatches={INK} />
      <ColorGroup title="Surface" swatches={SURFACE} />
      <ColorGroup title="Feedback" swatches={FEEDBACK} />
      <ColorGroup title="Chart palette" swatches={CHART} />
    </div>
  )
}

const meta: Meta = {
  title: 'Tokens/Color Palette',
  component: ColorPaletteComponent,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
