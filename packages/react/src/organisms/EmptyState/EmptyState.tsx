import { forwardRef, type ReactNode } from 'react'
import { Unplug } from '@rappi-ds/icons'
import { Button } from '../../primitives/Button'
import { cn } from '../../lib/cn'

/* ─── Types ─── */

export type EmptyStateSize = 'md' | 'lg'

export interface EmptyStateProps {
  /**
   * Main heading text.
   * @default "Algo ocurrió"
   */
  title?: ReactNode
  /**
   * Supporting description below the title.
   * @default "Se produjo un error, vuelve a intentarlo."
   */
  description?: ReactNode
  /**
   * `'md'` — compact (48 px icon, body-lg title, caption description).
   * `'lg'` — full-page (144 px icon, h2 title, body description). Text renders ABOVE the icon.
   * @default "md"
   */
  size?: EmptyStateSize
  /**
   * Renders skeleton loading placeholders instead of real content.
   * @default false
   */
  skeleton?: boolean
  /**
   * Icon rendered inside the circle illustration.
   * Defaults to `<Unplug />` (disconnect icon).
   * Pass `null` to render no icon.
   */
  icon?: ReactNode
  /**
   * Whether to show the action button.
   * @default true
   */
  showAction?: boolean
  /**
   * Custom action element. When omitted a secondary "Reintentar" button is rendered.
   */
  action?: ReactNode
  /**
   * Label for the default action button. Only used when `action` is not provided.
   * @default "Reintentar"
   */
  actionLabel?: string
  /** Click handler for the default action button. */
  onAction?: () => void
  className?: string
}

/* ─── EmptyState ─── */

/**
 * Organism — full-surface empty / error state with icon, copy, and an optional CTA.
 *
 * Two sizes:
 * - `md`: compact, icon on top, small typography. For cards, sections, list states.
 * - `lg`: full-page, text on top + large illustration circle. For whole-screen errors.
 *
 * Both sizes support a `skeleton` prop that swaps all content for loading placeholders.
 *
 * @example
 * // Section-level error (medium)
 * <EmptyState
 *   title="No hay pedidos"
 *   description="Aún no tienes pedidos activos."
 *   onAction={refetch}
 *   actionLabel="Actualizar"
 * />
 *
 * @example
 * // Full-page error (large)
 * <EmptyState
 *   size="lg"
 *   title="Algo ocurrió"
 *   description="Se produjo un error, vuelve a intentarlo."
 *   onAction={retry}
 * />
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title = 'Algo ocurrió',
      description = 'Se produjo un error, vuelve a intentarlo.',
      size = 'md',
      skeleton = false,
      icon,
      showAction = true,
      action,
      actionLabel = 'Reintentar',
      onAction,
      className,
    },
    ref,
  ) => {
    const isLg = size === 'lg'

    /* Default icon — size scales with circle */
    const defaultIcon =
      icon !== undefined ? icon : <Unplug size={isLg ? 56 : 24} strokeWidth={1.5} />

    /* Action slot */
    const actionSlot = action ?? (
      showAction ? (
        skeleton ? (
          <span className="rds-empty-state__action-skeleton" aria-hidden="true" />
        ) : (
          <Button
            appearance="secondary"
            size="sm"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )
      ) : null
    )

    return (
      <div
        ref={ref}
        className={cn('rds-empty-state', className)}
        data-size={size}
        data-skeleton={skeleton || undefined}
      >
        {/* ── lg: text block ABOVE the illustration ── */}
        {isLg ? (
          <div className="rds-empty-state__text">
            {skeleton ? (
              <>
                <span className="rds-empty-state__skeleton-title" aria-hidden="true" />
                <span className="rds-empty-state__skeleton-desc" aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="rds-empty-state__title rds-empty-state__title--lg">
                  {title}
                </span>
                <span className="rds-empty-state__description rds-empty-state__description--lg">
                  {description}
                </span>
              </>
            )}
          </div>
        ) : null}

        {/* ── Circle illustration ── */}
        <div className="rds-empty-state__circle" aria-hidden="true">
          {defaultIcon}
        </div>

        {/* ── md: text block BELOW the illustration ── */}
        {!isLg ? (
          <div className="rds-empty-state__text">
            {skeleton ? (
              <>
                <span className="rds-empty-state__skeleton-title" aria-hidden="true" />
                <span className="rds-empty-state__skeleton-desc" aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="rds-empty-state__title">{title}</span>
                <span className="rds-empty-state__description">{description}</span>
              </>
            )}
          </div>
        ) : null}

        {/* ── Action ── */}
        {actionSlot ? (
          <div className="rds-empty-state__action">{actionSlot}</div>
        ) : null}
      </div>
    )
  },
)

EmptyState.displayName = 'EmptyState'
