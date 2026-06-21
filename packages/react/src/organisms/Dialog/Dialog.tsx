import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from '@rappi-ds/icons'
import { Button } from '../../primitives/Button'
import { cn } from '../../lib/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DialogProps {
  open: boolean
  title: string
  description?: string
  children?: ReactNode
  onClose?: () => void
  showFooter?: boolean
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  elevation?: boolean
  className?: string
}

export type BottomSheetSize = 'hug' | 'half' | 'full'

export interface BottomSheetProps {
  open: boolean
  title: string
  children?: ReactNode
  size?: BottomSheetSize
  grabber?: boolean
  showFooter?: boolean
  onClose?: () => void
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  className?: string
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function useMountedOpen(open: boolean, duration: number) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    } else {
      setVisible(false)
      const timer = setTimeout(() => setMounted(false), duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration])

  return { mounted, visible }
}

function useBodyScrollLock(open: boolean) {
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])
}

function useFocusTrap(
  panelRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose?: () => void,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      requestAnimationFrame(() => {
        const panel = panelRef.current
        if (!panel) return
        const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTORS)
        ;(first ?? panel).focus()
      })
    } else {
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [open, panelRef])

  // Listen for Escape at the document level so it works regardless of focus position
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current?.()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Tab') return
    const panel = panelRef.current
    if (!panel) return
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return { handleKeyDown }
}

let dialogCounter = 0

function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="rds-dialog__close" onClick={onClick} aria-label="Cerrar">
      <X size={24} strokeWidth={2} aria-hidden />
    </button>
  )
}

// ─── Dialog ───────────────────────────────────────────────────────────────────

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    open,
    title,
    description,
    children,
    onClose,
    showFooter = true,
    primaryLabel = 'Primary',
    secondaryLabel = 'Secondary',
    onPrimary,
    onSecondary,
    elevation = false,
    className,
  },
  ref,
) {
  const { mounted, visible } = useMountedOpen(open, 200)
  const internalRef = useRef<HTMLDivElement>(null)
  const panelRef = (node: HTMLDivElement | null) => {
    ;(internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
  }
  const { handleKeyDown } = useFocusTrap(internalRef, visible, onClose)
  useBodyScrollLock(open)

  const [uid] = useState(() => ++dialogCounter)
  const titleId = `rds-dialog-title-${uid}`
  const descId = description ? `rds-dialog-desc-${uid}` : undefined

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="rds-dialog"
      data-open={visible ? 'true' : 'false'}
      onKeyDown={handleKeyDown}
    >
      <div className="rds-dialog__overlay" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={cn('rds-dialog__panel', className)}
        data-elevation={elevation ? 'true' : 'false'}
        tabIndex={-1}
      >
        <div className="rds-dialog__body">
          <header className="rds-dialog__header">
            <h2 id={titleId} className="rds-dialog__title">
              {title}
            </h2>
            <CloseButton onClick={onClose} />
          </header>
          {description && (
            <p id={descId} className="rds-dialog__description">
              {description}
            </p>
          )}
        </div>
        {children != null && <div className="rds-dialog__content">{children}</div>}
        {showFooter && (
          <footer className="rds-dialog__footer">
            <Button appearance="secondary" size="md" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
            <Button appearance="primary" size="md" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </footer>
        )}
      </div>
    </div>,
    document.body,
  )
})

Dialog.displayName = 'Dialog'

// ─── Bottom Sheet ─────────────────────────────────────────────────────────────

let sheetCounter = 0

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
  {
    open,
    title,
    children,
    size = 'hug',
    grabber = true,
    showFooter = true,
    onClose,
    primaryLabel = 'Confirmar',
    secondaryLabel = 'Cancelar',
    onPrimary,
    onSecondary,
    className,
  },
  ref,
) {
  const { mounted, visible } = useMountedOpen(open, 300)
  const internalRef = useRef<HTMLDivElement>(null)
  const panelRef = (node: HTMLDivElement | null) => {
    ;(internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
  }
  const { handleKeyDown } = useFocusTrap(internalRef, visible, onClose)
  useBodyScrollLock(open)

  const [uid] = useState(() => ++sheetCounter)
  const titleId = `rds-sheet-title-${uid}`

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="rds-bottom-sheet"
      data-open={visible ? 'true' : 'false'}
      onKeyDown={handleKeyDown}
    >
      <div className="rds-bottom-sheet__scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn('rds-bottom-sheet__panel', className)}
        data-size={size}
        tabIndex={-1}
      >
        {grabber && (
          <div className="rds-bottom-sheet__grabber" aria-hidden="true">
            <div className="rds-bottom-sheet__grabber-handle" />
          </div>
        )}
        <header className="rds-bottom-sheet__header">
          <h2 id={titleId} className="rds-bottom-sheet__title">
            {title}
          </h2>
          <CloseButton onClick={onClose} />
        </header>
        {children != null && (
          <div className="rds-bottom-sheet__content">{children}</div>
        )}
        {showFooter && (
          <footer className="rds-bottom-sheet__footer">
            <Button appearance="secondary" size="lg" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
            <Button appearance="primary" size="lg" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </footer>
        )}
      </div>
    </div>,
    document.body,
  )
})

BottomSheet.displayName = 'BottomSheet'
