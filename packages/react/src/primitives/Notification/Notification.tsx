import { type ReactNode } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Info,
  Sparkles,
  X,
} from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

/* ─── Types ─── */

export type NotificationIntent = 'default' | 'success' | 'warning' | 'error' | 'info' | 'ai'
export type NotificationVariant = 'solid' | 'pastel'
export type NotificationSize = 'lg' | 'sm'

export interface NotificationProps {
  /** Semantic intent — drives background color, text color and default icon. */
  intent?: NotificationIntent
  /**
   * Visual weight:
   * - `'solid'`  — vibrant/dark background, white text (default for success/warning/error/info/ai)
   * - `'pastel'` — light tinted background, colored text
   *
   * The `'default'` intent ignores this prop and always renders a neutral surface.
   */
  variant?: NotificationVariant
  /** `'lg'` (default) — full-width inline banner. `'sm'` — compact toast style. */
  size?: NotificationSize
  /** Main notification text. */
  message: ReactNode
  /**
   * Overrides the default intent icon. Pass `null` to hide the icon entirely.
   * Ignored when `image` is provided.
   */
  icon?: ReactNode | null
  /**
   * Image or avatar rendered in the icon slot (e.g. brand logo, user photo).
   * Takes priority over `icon`.
   */
  image?: ReactNode
  /** Inline action label shown at the trailing end of the notification (e.g. "Deshacer"). */
  action?: ReactNode
  /** Called when the user clicks the inline action. */
  onAction?: () => void
  /** When provided a dismiss (×) button is rendered. */
  onClose?: () => void
  /** Accessible label for the close button. @default "Cerrar" */
  closeLabel?: string
  /**
   * ARIA live region role.
   * Defaults to `'alert'` for `error` intent and `'status'` for all others.
   * Pass `'none'` to opt out of the live region.
   */
  role?: 'alert' | 'status' | 'none'
  className?: string
}

/* ─── Helpers ─── */

function defaultIconForIntent(intent: NotificationIntent, size: number) {
  const props = { size, strokeWidth: 1.5 } as const
  switch (intent) {
    case 'success': return <CheckCircle {...props} />
    case 'warning': return <AlertTriangle {...props} />
    case 'error':   return <AlertCircle {...props} />
    case 'ai':      return <Sparkles {...props} />
    default:        return <Info {...props} />
  }
}

/**
 * Inline notification banner or compact toast.
 *
 * Use as an **inline alert** by placing it directly in the page layout, or as a
 * **toast** by wrapping it in a `position: fixed` container.
 *
 * @example — inline
 * <Notification intent="success" message="Cambios guardados" onClose={dismiss} />
 *
 * @example — toast
 * <div style={{ position: 'fixed', bottom: 16, insetInline: 16 }}>
 *   <Notification intent="error" size="sm" message="Sin conexión" onClose={dismiss} />
 * </div>
 */
export function Notification({
  intent = 'default',
  variant = 'solid',
  size = 'lg',
  message,
  icon,
  image,
  action,
  onAction,
  onClose,
  closeLabel = 'Cerrar',
  role: roleProp,
  className,
}: NotificationProps) {
  // 'default' intent always uses neutral surface; variant has no effect on it
  const resolvedVariant = intent === 'default' ? 'neutral' : variant

  const ariaRole = roleProp ?? (intent === 'error' ? 'alert' : 'status')
  const liveRole = ariaRole === 'none' ? undefined : ariaRole

  const iconSize = size === 'sm' ? 16 : 20
  const actionIconSize = size === 'sm' ? 14 : 16

  // Left slot resolution: image > custom icon > default icon per intent > nothing (null)
  const leftSlot: ReactNode = image != null
    ? image
    : icon !== undefined
      ? icon  // null means "no icon"; any other value overrides
      : defaultIconForIntent(intent, iconSize)

  return (
    <div
      role={liveRole}
      aria-live={liveRole === 'status' ? 'polite' : undefined}
      aria-atomic="true"
      className={cn('rds-notification', className)}
      data-intent={intent}
      data-variant={resolvedVariant}
      data-size={size}
    >
      {/* Left slot — image or icon */}
      {image != null ? (
        <span className="rds-notification__image" aria-hidden="true">
          {image}
        </span>
      ) : leftSlot != null ? (
        <span className="rds-notification__icon" aria-hidden="true">
          {leftSlot}
        </span>
      ) : null}

      {/* Message */}
      <span className="rds-notification__message">{message}</span>

      {/* Inline action */}
      {action != null ? (
        <button
          type="button"
          className="rds-notification__action"
          onClick={onAction}
        >
          {action}
          <ArrowRight
            size={actionIconSize}
            strokeWidth={1.5}
            aria-hidden="true"
            className="rds-notification__action-arrow"
          />
        </button>
      ) : null}

      {/* Close button */}
      {onClose != null ? (
        <button
          type="button"
          className="rds-notification__close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X size={actionIconSize} strokeWidth={2} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}

Notification.displayName = 'Notification'
