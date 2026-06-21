import {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

/**
 * Position of the arrow caret on the tooltip bubble.
 * Determines which edge/side the arrow appears on, which in turn implies
 * where the trigger element lives relative to the tooltip.
 *
 * top-*    → arrow on top edge → trigger is ABOVE the tooltip
 * bottom-* → arrow on bottom edge → trigger is BELOW the tooltip
 *
 * -left / -center / -right → horizontal alignment of the arrow along the edge.
 */
export type TooltipArrowPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Main text or content of the tooltip. */
  children: ReactNode
  /**
   * Optional decorative element in the left slot (constrained to 40×40px).
   * Typically an icon, illustration, or avatar image.
   */
  icon?: ReactNode
  /**
   * Shows a close (×) button on the right and calls this handler when clicked.
   * When omitted, no close button is rendered.
   */
  onClose?: () => void
  /**
   * Position of the directional arrow caret on the bubble.
   * When omitted, no arrow is rendered.
   */
  arrowPosition?: TooltipArrowPosition
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      icon,
      onClose,
      arrowPosition,
      className,
      ...props
    },
    ref,
  ) => {
    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onClose?.()
    }

    return (
      <div
        ref={ref}
        className={cn('rds-tooltip', className)}
        data-arrow={arrowPosition ?? undefined}
        {...props}
      >
        {/* Content row */}
        <div className="rds-tooltip__content">
          {icon !== undefined ? (
            <span className="rds-tooltip__icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}

          <span className="rds-tooltip__text">{children}</span>

          {onClose !== undefined ? (
            <button
              type="button"
              className="rds-tooltip__close"
              onClick={handleClose}
              aria-label="Cerrar"
            >
              <X size={20} strokeWidth={2} aria-hidden />
            </button>
          ) : null}
        </div>
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
