import { forwardRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/* ─── Types ─── */

export interface CardActionProps {
  /** Main text label. */
  title: ReactNode
  /** Secondary text shown below the title. Hidden when `showDescription` is false. */
  description?: ReactNode
  /** Toggle the description line. @default true */
  showDescription?: boolean
  /**
   * Whether this card is in the selected state.
   * Selected → dark border (`--border-strong`).
   * @default false
   */
  selected?: boolean
  /**
   * Slot rendered on the left of the text content.
   * Pass design-system primitives (`Checkbox`, `Radio`, icons…) as **decorative**
   * mirrors of state — the card handles the click, not the slot control.
   * Pass `null` to render nothing.
   */
  leftSlot?: ReactNode
  /**
   * Slot rendered on the right of the card.
   * Pass `null` to render nothing.
   */
  rightSlot?: ReactNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

/* ─── CardAction ─── */

/**
 * Organism — selectable card for option lists, settings, and onboarding flows.
 *
 * Visual states:
 * - **Default**: `--surface`, `--border-non-opaque`
 * - **Hover** (CSS, when interactive): `--surface-mild`
 * - **Selected** (`selected={true}`): `--border-strong`
 *
 * Compose selection affordances via `leftSlot` / `rightSlot` using primitives
 * from this library. Slots are decorative when the card is interactive — do not
 * embed independently focusable controls without `readOnly` and `tabIndex={-1}`.
 *
 * @example
 * <CardAction
 *   title="Bogotá"
 *   description="Capital de Colombia"
 *   selected={selected}
 *   onClick={() => setSelected(!selected)}
 *   leftSlot={<Checkbox checked={selected} readOnly tabIndex={-1} aria-hidden />}
 * />
 */
export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  (
    {
      title,
      description,
      showDescription = true,
      selected = false,
      leftSlot,
      rightSlot,
      onClick,
      className,
      style,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-pressed={onClick ? selected : undefined}
        data-selected={selected || undefined}
        className={cn('rds-card-action', className)}
        style={style}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
      >
        <div className="rds-card-action__left">
          {leftSlot != null ? (
            <div className="rds-card-action__slot rds-card-action__slot--left">{leftSlot}</div>
          ) : null}

          <div className="rds-card-action__text">
            <span className="rds-card-action__title">{title}</span>
            {showDescription && description != null ? (
              <span className="rds-card-action__description">{description}</span>
            ) : null}
          </div>
        </div>

        {rightSlot != null ? (
          <div className="rds-card-action__slot rds-card-action__slot--right">{rightSlot}</div>
        ) : null}
      </div>
    )
  },
)

CardAction.displayName = 'CardAction'
