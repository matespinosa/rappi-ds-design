import {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { ChevronRight, X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Notification text content. */
  message: ReactNode
  /**
   * Decorative icon rendered on the left.
   * Shown when neither `avatar` nor `loading` is active.
   */
  icon?: ReactNode
  /**
   * Avatar element rendered on the left (40×40px, rounded-xl).
   * Takes precedence over `icon`. Typically an `<img>`.
   */
  avatar?: ReactNode
  /**
   * Replaces the left slot with an animated spinner.
   * Takes precedence over `icon` and `avatar`.
   */
  loading?: boolean
  /**
   * Label for the right-hand text action button (brand accent color).
   * Takes precedence over `onNavigate` and `onClose`.
   */
  actionLabel?: string
  /** Called when the action text button is clicked. */
  onAction?: () => void
  /**
   * Shows a chevron-right icon-button on the right.
   * Takes precedence over `onClose`.
   */
  onNavigate?: () => void
  /**
   * Shows a close (×) icon-button on the right.
   * Shown when neither `actionLabel` nor `onNavigate` is provided.
   */
  onClose?: () => void
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      message,
      icon,
      avatar,
      loading = false,
      actionLabel,
      onAction,
      onNavigate,
      onClose,
      className,
      role = 'status',
      'aria-live': ariaLive = 'polite',
      ...props
    },
    ref,
  ) => {
    const stopProp =
      (fn?: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        fn?.()
      }

    return (
      <div
        ref={ref}
        className={cn('rds-snackbar', className)}
        role={role}
        aria-live={ariaLive}
        {...props}
      >
        {/* ── Left slot: spinner > avatar > icon ── */}
        {loading ? (
          <span
            className="rds-snackbar__spinner"
            role="progressbar"
            aria-label="Cargando"
          />
        ) : avatar !== undefined ? (
          <span className="rds-snackbar__avatar" aria-hidden="true">
            {avatar}
          </span>
        ) : icon !== undefined ? (
          <span className="rds-snackbar__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}

        {/* ── Message ── */}
        <span className="rds-snackbar__message">{message}</span>

        {/* ── Right slot: actionLabel > onNavigate > onClose ── */}
        {actionLabel !== undefined ? (
          <button
            type="button"
            className="rds-snackbar__action"
            onClick={stopProp(onAction)}
          >
            {actionLabel}
          </button>
        ) : onNavigate !== undefined ? (
          <button
            type="button"
            className="rds-snackbar__icon-btn"
            onClick={stopProp(onNavigate)}
            aria-label="Ver más"
          >
            <ChevronRight size={16} strokeWidth={2} aria-hidden />
          </button>
        ) : onClose !== undefined ? (
          <button
            type="button"
            className="rds-snackbar__icon-btn"
            onClick={stopProp(onClose)}
            aria-label="Cerrar"
          >
            <X size={16} strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </div>
    )
  },
)

Snackbar.displayName = 'Snackbar'
