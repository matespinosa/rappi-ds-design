import type { Meta, StoryObj } from '@storybook/react'
import { Search, type SearchSize } from '@rappi-ds/react'
import React, { useState } from 'react'

const sizes: SearchSize[] = ['lg', 'sm']

const meta: Meta<typeof Search> = {
  title: 'Primitives/Search',
  component: Search,
  argTypes: {
    size: { control: 'select', options: sizes },
    showBackButton: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    size: 'lg',
    showBackButton: false,
    disabled: false,
    placeholder: 'Buscar',
  },
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Search>

const label = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  fontWeight: 600,
  color: 'var(--ink-weak)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
}

// ─── Playground ──────────────────────────────────────────────────────────────

function ControlledSearch(props: React.ComponentProps<typeof Search>) {
  const [value, setValue] = useState('')
  return (
    <div style={{ maxWidth: 400 }}>
      <Search
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        onBack={() => setValue('')}
      />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <ControlledSearch {...args} />,
}

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => {
    // Static snapshots of each visual state — not interactive
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', maxWidth: 400 }}>
        <div>
          <p style={label}>Default</p>
          <Search placeholder="Buscar" />
        </div>
        <div>
          <p style={label}>Focused (click the input)</p>
          <Search placeholder="Buscar" autoFocus />
        </div>
        <div>
          <p style={label}>Typing / has value</p>
          <Search value="Starbuck" onChange={() => {}} onClear={() => {}} />
        </div>
        <div>
          <p style={label}>Active (blurred with value)</p>
          <Search value="Starbucks" onChange={() => {}} onClear={() => {}} />
        </div>
      </div>
    )
  },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 400 }}>
      {sizes.map((size) => (
        <div key={size}>
          <p style={label}>{size === 'lg' ? 'Large' : 'Small'}</p>
          <ControlledSearch size={size} />
        </div>
      ))}
    </div>
  ),
}

// ─── With back button ─────────────────────────────────────────────────────────

export const WithBackButton: Story = {
  name: 'With back button',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', maxWidth: 400 }}>
      <div>
        <p style={label}>Large + back button</p>
        <ControlledSearch showBackButton size="lg" />
      </div>
      <div>
        <p style={label}>Small + back button</p>
        <ControlledSearch showBackButton size="sm" />
      </div>
    </div>
  ),
}

// ─── All variants grid ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants (size × type)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', maxWidth: 400 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
          <p style={label}>{size === 'lg' ? 'Large' : 'Small'}</p>
          <ControlledSearch size={size} />
          <ControlledSearch size={size} showBackButton />
        </div>
      ))}
    </div>
  ),
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', maxWidth: 400 }}>
      <Search disabled placeholder="Buscar (deshabilitado)" />
      <Search disabled showBackButton placeholder="Buscar (deshabilitado)" />
    </div>
  ),
}

// ─── Navigation use-case ──────────────────────────────────────────────────────

export const NavigationUseCase: Story = {
  name: 'Use case — nested screen with back',
  render: () => {
    const [screen, setScreen] = useState<'home' | 'search'>('home')
    const [value, setValue] = useState('')

    if (screen === 'home') {
      return (
        <div style={{ maxWidth: 400 }}>
          <p style={{ ...label, marginBottom: 'var(--spacing-16)' }}>Pantalla principal</p>
          <Search
            placeholder="Buscar restaurantes"
            onFocus={() => setScreen('search')}
          />
        </div>
      )
    }

    return (
      <div style={{ maxWidth: 400 }}>
        <p style={{ ...label, marginBottom: 'var(--spacing-16)' }}>Pantalla de búsqueda</p>
        <Search
          showBackButton
          autoFocus
          placeholder="Buscar restaurantes"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
          onBack={() => {
            setValue('')
            setScreen('home')
          }}
        />
        {value && (
          <p
            style={{
              marginTop: 'var(--spacing-16)',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-body-md)',
              color: 'var(--ink-weak)',
            }}
          >
            Buscando: <strong style={{ color: 'var(--ink-strong)' }}>{value}</strong>
          </p>
        )}
      </div>
    )
  },
}
