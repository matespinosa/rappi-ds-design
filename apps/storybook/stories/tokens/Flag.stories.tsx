import type { Meta, StoryObj } from '@storybook/react'
import { Flag, type FlagCountry } from '@rappi-ds/react'
import React from 'react'

const countries: readonly FlagCountry[] = [
  'COL',
  'MEX',
  'BRA',
  'ARG',
  'CL',
  'EC',
  'PE',
  'CR',
  'URG',
  'ESP',
]

const countryNames: Record<FlagCountry, string> = {
  COL: 'Colombia',
  MEX: 'Mexico',
  BRA: 'Brazil',
  ARG: 'Argentina',
  CL: 'Chile',
  EC: 'Ecuador',
  PE: 'Peru',
  CR: 'Costa Rica',
  URG: 'Uruguay',
  ESP: 'Spain',
}

const meta: Meta<typeof Flag> = {
  title: 'Primitives/Flag',
  component: Flag,
  args: {
    country: 'COL',
    decorative: false,
  },
  argTypes: {
    country: { control: 'select', options: countries },
    decorative: { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof Flag>

export const Playground: Story = {}

export const Countries: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-32)' }}>
      {countries.map((country) => (
        <div
          key={country}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-8)',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-body-sm)',
          }}
        >
          <Flag country={country} decorative />
          <span>{country}</span>
        </div>
      ))}
    </div>
  ),
}

export const SelectedItems: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        width: 280,
        gap: 'var(--spacing-8)',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {(['COL', 'MEX', 'BRA'] as const).map((country) => (
        <div
          key={country}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-12)',
            padding: 'var(--spacing-12)',
            border: '1px solid var(--border-standard)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Flag country={country} decorative />
          <span>{countryNames[country]}</span>
        </div>
      ))}
    </div>
  ),
}
