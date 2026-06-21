// @vitest-environment jsdom

import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '@rappi-ds/icons'
import { Tab, TabList, TabPanel, Tabs } from './Tabs'

afterEach(cleanup)

function BasicTabs({ defaultValue = 'a', onChange }: { defaultValue?: string; onChange?: (v: string) => void }) {
  const [tab, setTab] = useState(defaultValue)
  return (
    <Tabs value={tab} onChange={(v) => { setTab(v); onChange?.(v) }}>
      <TabList aria-label="Test tabs">
        <Tab value="a">Tab A</Tab>
        <Tab value="b">Tab B</Tab>
        <Tab value="c" disabled>Tab C</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
      <TabPanel value="c">Panel C</TabPanel>
    </Tabs>
  )
}

describe('Tabs — structure & ARIA', () => {
  it('renders a tablist landmark', () => {
    render(<BasicTabs />)
    expect(screen.getByRole('tablist')).toBeTruthy()
  })

  it('renders all tabs', () => {
    render(<BasicTabs />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('renders all panels', () => {
    render(<BasicTabs />)
    // all panels are rendered in DOM; only active one is visible
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(3)
  })

  it('sets aria-selected=true on the active tab', () => {
    render(<BasicTabs defaultValue="b" />)
    expect(screen.getByRole('tab', { name: 'Tab B' }).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByRole('tab', { name: 'Tab A' }).getAttribute('aria-selected')).toBe('false')
  })

  it('links each tab to its panel via aria-controls / aria-labelledby', () => {
    render(<BasicTabs />)
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    const panelA = screen.getByRole('tabpanel', { name: 'Tab A', hidden: true })
    expect(tabA.getAttribute('aria-controls')).toBe(panelA.id)
    expect(panelA.getAttribute('aria-labelledby')).toBe(tabA.id)
  })

  it('active panel is visible; inactive panels are hidden', () => {
    render(<BasicTabs defaultValue="a" />)
    expect(screen.getByRole('tabpanel', { name: 'Tab A' })).toBeTruthy()
    expect(screen.queryByRole('tabpanel', { name: 'Tab B' })).toBeNull()
  })

  it('shows panel content for the active tab', () => {
    render(<BasicTabs defaultValue="b" />)
    expect(screen.getByRole('tabpanel', { name: 'Tab B' }).textContent).toBe('Panel B')
  })
})

describe('Tabs — interaction', () => {
  it('calls onChange when a tab is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<BasicTabs onChange={onChange} />)
    await user.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('switches the visible panel on click', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    await user.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(screen.getByRole('tabpanel', { name: 'Tab B' }).textContent).toBe('Panel B')
    expect(screen.queryByRole('tabpanel', { name: 'Tab A' })).toBeNull()
  })

  it('does not call onChange when a disabled tab is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<BasicTabs onChange={onChange} />)
    await user.click(screen.getByRole('tab', { name: 'Tab C' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('marks the disabled tab with aria-disabled-like disabled attribute', () => {
    render(<BasicTabs />)
    expect((screen.getByRole('tab', { name: 'Tab C' }) as HTMLButtonElement).disabled).toBe(true)
  })
})

describe('Tabs — keyboard navigation', () => {
  it('moves focus to the next tab with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    tabA.focus()
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Tab B' }))
  })

  it('moves focus to the previous tab with ArrowLeft', async () => {
    const user = userEvent.setup()
    render(<BasicTabs defaultValue="b" />)
    screen.getByRole('tab', { name: 'Tab B' }).focus()
    await user.keyboard('{ArrowLeft}')
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Tab A' }))
  })

  it('wraps focus from last to first with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    // Skip disabled tab — only 2 enabled tabs (A, B)
    screen.getByRole('tab', { name: 'Tab B' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Tab A' }))
  })

  it('moves focus to first tab with Home key', async () => {
    const user = userEvent.setup()
    render(<BasicTabs defaultValue="b" />)
    screen.getByRole('tab', { name: 'Tab B' }).focus()
    await user.keyboard('{Home}')
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Tab A' }))
  })

  it('moves focus to last enabled tab with End key', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    screen.getByRole('tab', { name: 'Tab A' }).focus()
    await user.keyboard('{End}')
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Tab B' }))
  })

  it('active tab has tabIndex=0; inactive tabs have tabIndex=-1', () => {
    render(<BasicTabs defaultValue="a" />)
    expect((screen.getByRole('tab', { name: 'Tab A' }) as HTMLButtonElement).tabIndex).toBe(0)
    expect((screen.getByRole('tab', { name: 'Tab B' }) as HTMLButtonElement).tabIndex).toBe(-1)
  })
})

describe('Tabs — icon support', () => {
  it('renders startIcon inside the tab', () => {
    render(
      <Tabs value="x" onChange={() => {}}>
        <TabList aria-label="Icon tabs">
          <Tab value="x" startIcon={<Home size={16} data-testid="icon-start" />}>Home</Tab>
        </TabList>
      </Tabs>,
    )
    expect(screen.getByTestId('icon-start')).toBeTruthy()
  })

  it('renders endIcon inside the tab', () => {
    render(
      <Tabs value="x" onChange={() => {}}>
        <TabList aria-label="Icon tabs">
          <Tab value="x" endIcon={<Home size={16} data-testid="icon-end" />}>Home</Tab>
        </TabList>
      </Tabs>,
    )
    expect(screen.getByTestId('icon-end')).toBeTruthy()
  })

  it('icon containers have aria-hidden so icons are decorative', () => {
    const { container } = render(
      <Tabs value="x" onChange={() => {}}>
        <TabList aria-label="Icon tabs">
          <Tab value="x" startIcon={<Home size={16} />}>Home</Tab>
        </TabList>
      </Tabs>,
    )
    expect(container.querySelector('.rds-tab__icon[aria-hidden="true"]')).toBeTruthy()
  })
})

describe('Tabs — data attributes', () => {
  it('sets data-selected on the active tab', () => {
    const { container } = render(<BasicTabs defaultValue="b" />)
    const tabs = container.querySelectorAll('[role="tab"][data-selected]')
    expect(tabs).toHaveLength(1)
    expect(tabs[0].textContent).toContain('Tab B')
  })

  it('sets data-disabled on a disabled tab', () => {
    const { container } = render(<BasicTabs />)
    expect(container.querySelector('[role="tab"][data-disabled]')).toBeTruthy()
  })
})

describe('Tabs — error boundary', () => {
  it('throws when Tab is used outside Tabs', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <TabList aria-label="orphan">
          <Tab value="x">X</Tab>
        </TabList>,
      ),
    ).toThrow('<Tab> must be used inside <Tabs>')
    spy.mockRestore()
  })
})
