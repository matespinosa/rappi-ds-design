import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

/* ─── Context ─── */

interface TabsContextValue {
  value: string
  onChange: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>`)
  return ctx
}

/* ─── Types ─── */

export interface TabsProps {
  /** Currently active tab value. */
  value: string
  /** Called when the user selects a different tab. */
  onChange: (value: string) => void
  children: ReactNode
  className?: string
}

export interface TabListProps {
  children: ReactNode
  className?: string
  /** Accessible label for the tab list when there is no visible heading nearby. */
  'aria-label'?: string
  'aria-labelledby'?: string
}

export interface TabProps {
  /** Unique identifier matching a `<TabPanel value>`. */
  value: string
  children: ReactNode
  disabled?: boolean
  /** Icon rendered to the left of the label. */
  startIcon?: ReactNode
  /** Icon rendered to the right of the label. */
  endIcon?: ReactNode
  className?: string
}

export interface TabPanelProps {
  /** Must match the `value` of its corresponding `<Tab>`. */
  value: string
  children: ReactNode
  className?: string
}

/* ─── Tabs (root) ─── */

/**
 * Root context provider. Wrap `<TabList>` and one `<TabPanel>` per tab.
 *
 * @example
 * const [tab, setTab] = useState('overview')
 * <Tabs value={tab} onChange={setTab}>
 *   <TabList aria-label="Secciones">
 *     <Tab value="overview">Resumen</Tab>
 *     <Tab value="orders">Pedidos</Tab>
 *     <Tab value="settings" disabled>Configuración</Tab>
 *   </TabList>
 *   <TabPanel value="overview">…</TabPanel>
 *   <TabPanel value="orders">…</TabPanel>
 *   <TabPanel value="settings">…</TabPanel>
 * </Tabs>
 */
export function Tabs({ value, onChange, children, className }: TabsProps) {
  const baseId = useId()
  return (
    <TabsContext.Provider value={{ value, onChange, baseId }}>
      <div className={cn('rds-tabs', className)}>{children}</div>
    </TabsContext.Provider>
  )
}
Tabs.displayName = 'Tabs'

/* ─── TabList ─── */

/**
 * Horizontal bar containing `<Tab>` buttons.
 * Implements the ARIA `tablist` role with keyboard navigation (← →).
 */
export function TabList({ children, className, ...ariaProps }: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ) ?? [],
    )
    const current = document.activeElement as HTMLButtonElement
    const idx = tabs.indexOf(current)
    if (idx === -1) return

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      tabs[(idx + 1) % tabs.length]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      tabs[(idx - 1 + tabs.length) % tabs.length]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      tabs[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      tabs[tabs.length - 1]?.focus()
    }
  }, [])

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn('rds-tab-list', className)}
      onKeyDown={handleKeyDown}
      {...ariaProps}
    >
      {children}
    </div>
  )
}
TabList.displayName = 'TabList'

/* ─── Tab ─── */

/**
 * Individual tab button. Must be a direct child of `<TabList>`.
 *
 * States from Figma:
 * - **Selected** — Medium 500, `ink-strong`, bottom indicator bar
 * - **Not selected** — Regular 400, `ink-weak`, no indicator
 *
 * Additional states (not in Figma, added for completeness):
 * - **Hover** — `ink-standard` to signal interactivity
 * - **Focus visible** — 2px inset ring (`border-focus`)
 * - **Disabled** — `ink-disabled`, pointer-events none
 */
export function Tab({ value, children, disabled, startIcon, endIcon, className }: TabProps) {
  const { value: activeValue, onChange, baseId } = useTabsContext('Tab')
  const isSelected = value === activeValue

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={isSelected}
      disabled={disabled}
      tabIndex={isSelected ? 0 : -1}
      className={cn('rds-tab', className)}
      data-selected={isSelected || undefined}
      data-disabled={disabled || undefined}
      onClick={() => !disabled && onChange(value)}
    >
      {startIcon ? (
        <span className="rds-tab__icon rds-tab__icon--start" aria-hidden="true">
          {startIcon}
        </span>
      ) : null}

      <span className="rds-tab__label">{children}</span>

      {endIcon ? (
        <span className="rds-tab__icon rds-tab__icon--end" aria-hidden="true">
          {endIcon}
        </span>
      ) : null}

      <span className="rds-tab__indicator" aria-hidden="true" />
    </button>
  )
}
Tab.displayName = 'Tab'

/* ─── TabPanel ─── */

/**
 * Content area associated with a `<Tab>`. Hidden when its tab is not active.
 * Always present in the DOM for SEO/crawlability — visually hidden via CSS.
 */
export function TabPanel({ value, children, className }: TabPanelProps) {
  const { value: activeValue, baseId } = useTabsContext('TabPanel')
  const isActive = value === activeValue

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      className={cn('rds-tab-panel', className)}
    >
      {children}
    </div>
  )
}
TabPanel.displayName = 'TabPanel'
