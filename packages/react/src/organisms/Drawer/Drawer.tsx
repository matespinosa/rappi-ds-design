import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'
import { Button } from '../../primitives/Button'

export type DrawerSize = 'sm' | 'md' | 'lg'

export interface DrawerProps {
  /** Controls whether the modal drawer is visible. */
  open: boolean
  /** Accessible title displayed in the fixed header. */
  title: string
  /** Scrollable drawer content. */
  children?: ReactNode
  /** Figma width variant: 380px, 480px, or 640px. */
  size?: DrawerSize
  /** Called by the close button, Escape key, or scrim click. */
  onClose?: () => void
  /** Accessible label for the icon-only close action. */
  closeLabel?: string
  /** Shows the docked action region from the Figma component. */
  showFooter?: boolean
  /** Shows the supporting action before the primary action. */
  showSecondaryAction?: boolean
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  /** Allows consumers to keep the drawer open when the scrim is clicked. */
  closeOnScrimClick?: boolean
  className?: string
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function useDrawerPresence(open: boolean) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }

    setVisible(false)
    const timer = setTimeout(() => setMounted(false), 300)
    return () => clearTimeout(timer)
  }, [open])

  return { mounted, visible }
}

/**
 * Modal task container anchored to the right viewport edge.
 * It preserves focus, traps keyboard navigation, and locks background scrolling while open.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    title,
    children,
    size = 'sm',
    onClose,
    closeLabel = 'Cerrar',
    showFooter = true,
    showSecondaryAction = true,
    primaryLabel = 'Primary',
    secondaryLabel = 'Secondary',
    onPrimary,
    onSecondary,
    closeOnScrimClick = true,
    className,
  },
  ref,
) {
  const { mounted, visible } = useDrawerPresence(open)
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  const titleId = `${useId()}-drawer-title`
  onCloseRef.current = onClose

  const setPanelRef = (node: HTMLDivElement | null) => {
    ;(panelRef as MutableRefObject<HTMLDivElement | null>).current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
  }

  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  useEffect(() => {
    if (!visible) {
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTORS)
      ;(first ?? panel).focus()
    })

    return () => cancelAnimationFrame(raf)
  }, [visible])

  useEffect(() => {
    if (!visible) return

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [visible])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
    if (focusable.length === 0) {
      event.preventDefault()
      panel.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <div className="rds-drawer" data-open={visible ? 'true' : 'false'} onKeyDown={handleKeyDown}>
      <div
        className="rds-drawer__scrim"
        onClick={closeOnScrimClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={setPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn('rds-drawer__panel', className)}
        data-size={size}
        tabIndex={-1}
      >
        <header className="rds-drawer__header">
          <h2 id={titleId} className="rds-drawer__title">
            {title}
          </h2>
          <button
            type="button"
            className="rds-drawer__close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X aria-hidden />
          </button>
        </header>

        <div className="rds-drawer__content">{children}</div>

        {showFooter ? (
          <footer className="rds-drawer__footer">
            {showSecondaryAction ? (
              <Button appearance="secondary" size="lg" onClick={onSecondary}>
                {secondaryLabel}
              </Button>
            ) : null}
            <Button appearance="primary" size="lg" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  )
})

Drawer.displayName = 'Drawer'
