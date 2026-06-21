import type { Meta, StoryObj } from '@storybook/react'
import { Uploader } from '@rappi-ds/react'
import React, { useRef, useState } from 'react'

const meta: Meta<typeof Uploader> = {
  title: 'Primitives/Uploader',
  component: Uploader,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'lg'] },
    state: {
      control: 'select',
      options: ['no-upload', 'drop', 'loading', 'uploaded', 'error'],
    },
    progress: { control: { type: 'range', min: 0, max: 100 } },
    fileName: { control: 'text' },
    fileInfo: { control: 'text' },
    errorMessage: { control: 'text' },
  },
  args: {
    size: 'sm',
    state: 'no-upload',
    progress: 70,
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#f7f8f9' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Uploader>

const sectionLabel = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-label-xs)',
  fontWeight: 600,
  color: 'var(--ink-weak)',
  marginBottom: 'var(--spacing-8)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Uploader {...args} />
    </div>
  ),
}

// ─── All sm states ────────────────────────────────────────────────────────────

export const AllSmStates: Story = {
  name: 'All states — sm',
  render: () => (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      <div>
        <p style={sectionLabel}>no-upload</p>
        <Uploader size="sm" state="no-upload" onSelect={() => {}} />
      </div>
      <div>
        <p style={sectionLabel}>drop</p>
        <Uploader size="sm" state="drop" />
      </div>
      <div>
        <p style={sectionLabel}>loading</p>
        <Uploader size="sm" state="loading" fileName="IMG_345444" fileInfo="JPG 5 MB" />
      </div>
      <div>
        <p style={sectionLabel}>uploaded</p>
        <Uploader size="sm" state="uploaded" fileName="IMG_345444" fileInfo="JPG 5 MB" />
      </div>
      <div>
        <p style={sectionLabel}>error</p>
        <Uploader
          size="sm"
          state="error"
          errorMessage="Supera los 5 MB"
          onSelect={() => {}}
        />
      </div>
    </div>
  ),
}

// ─── All lg states ────────────────────────────────────────────────────────────

export const AllLgStates: Story = {
  name: 'All states — lg',
  render: () => (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
      <div>
        <p style={sectionLabel}>no-upload</p>
        <Uploader size="lg" state="no-upload" onSelect={() => {}} />
      </div>
      <div>
        <p style={sectionLabel}>drop</p>
        <Uploader size="lg" state="drop" />
      </div>
      <div>
        <p style={sectionLabel}>loading — 70%</p>
        <Uploader
          size="lg"
          state="loading"
          fileName="IMG_345444"
          fileInfo="JPG 5 MB"
          progress={70}
        />
      </div>
      <div>
        <p style={sectionLabel}>uploaded</p>
        <Uploader
          size="lg"
          state="uploaded"
          fileName="IMG_345444"
          fileInfo="JPG 5 MB"
          thumbnail="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=64&q=80"
          onSelect={() => {}}
        />
      </div>
      <div>
        <p style={sectionLabel}>error</p>
        <Uploader
          size="lg"
          state="error"
          errorMessage="Supera los 5 MB"
          onSelect={() => {}}
        />
      </div>
    </div>
  ),
}

// ─── Side-by-side sizes ───────────────────────────────────────────────────────

export const SizeComparison: Story = {
  name: 'Size comparison',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-24)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 320px', minWidth: 300 }}>
        <p style={{ ...sectionLabel, marginBottom: 'var(--spacing-12)' }}>Small (sm)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          <Uploader size="sm" state="no-upload" />
          <Uploader size="sm" state="uploaded" fileName="IMG_001" fileInfo="JPG 2 MB" />
          <Uploader size="sm" state="error" errorMessage="Supera los 5 MB" />
        </div>
      </div>
      <div style={{ flex: '1 1 320px', minWidth: 300 }}>
        <p style={{ ...sectionLabel, marginBottom: 'var(--spacing-12)' }}>Large (lg)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
          <Uploader size="lg" state="no-upload" onSelect={() => {}} />
          <Uploader
            size="lg"
            state="uploaded"
            fileName="IMG_001"
            fileInfo="JPG 2 MB"
            thumbnail="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=64&q=80"
            onSelect={() => {}}
          />
          <Uploader size="lg" state="error" errorMessage="Supera los 5 MB" onSelect={() => {}} />
        </div>
      </div>
    </div>
  ),
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

export const ProgressBar: Story = {
  name: 'Progress bar (lg loading)',
  render: () => (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      {[0, 25, 50, 70, 100].map((p) => (
        <div key={p}>
          <p style={sectionLabel}>{p}%</p>
          <Uploader
            size="lg"
            state="loading"
            fileName="banner_rappi_2024"
            fileInfo="PNG 3.2 MB"
            progress={p}
          />
        </div>
      ))}
    </div>
  ),
}

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Use case — interactive upload',
  render: () => {
    type Phase = 'no-upload' | 'drop' | 'loading' | 'uploaded' | 'error'
    const [phase, setPhase] = useState<Phase>('no-upload')
    const [progress, setProgress] = useState(0)
    const [fileName, setFileName] = useState<string | undefined>()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSelect = () => {
      inputRef.current?.click()
    }

    const handleFile = (file: File) => {
      setFileName(file.name.replace(/\.[^.]+$/, ''))
      setPhase('loading')
      setProgress(0)

      let p = 0
      const iv = setInterval(() => {
        p += 20
        setProgress(Math.min(p, 100))
        if (p >= 100) {
          clearInterval(iv)
          setTimeout(() => setPhase('uploaded'), 300)
        }
      }, 350)
    }

    return (
      <div
        style={{ maxWidth: 360 }}
        onDragOver={(e) => { e.preventDefault(); setPhase('drop') }}
        onDragLeave={() => { if (phase === 'drop') setPhase('no-upload') }}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
        <Uploader
          size="lg"
          state={phase}
          fileName={fileName}
          fileInfo="JPG, PNG, WEBP"
          progress={progress}
          onSelect={phase === 'no-upload' || phase === 'error' ? handleSelect : undefined}
        />
      </div>
    )
  },
}

// ─── Custom icon ──────────────────────────────────────────────────────────────

export const CustomIcon: Story = {
  name: 'Custom icon',
  render: () => (
    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
      <p style={sectionLabel}>sm — ícono CSV</p>
      <Uploader
        size="sm"
        state="no-upload"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
        uploadTitle="Sube tu archivo CSV"
        uploadSubtitle="CSV • Max 10 MB"
        onSelect={() => {}}
      />
      <p style={sectionLabel}>lg — ícono CSV</p>
      <Uploader
        size="lg"
        state="no-upload"
        icon={
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        }
        uploadTitle="Sube tu catálogo"
        uploadSubtitle="CSV, XLSX • Max 10 MB"
        selectLabel="Elegir archivo"
        onSelect={() => {}}
      />
    </div>
  ),
}
