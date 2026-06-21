import { type MouseEvent } from 'react'
import { ChevronLeft, ChevronRight } from '@rappi-ds/icons'
import { IconButton } from '../Button'
import { cn } from '../../lib/cn'

export interface BreadcrumbItem {
  /** Visible text for this breadcrumb step. */
  label: string
  /**
   * URL for this step. When provided the item renders as an `<a>` tag.
   * Omit on the current page — the last item is never interactive.
   */
  href?: string
  /** Click handler for non-href ancestor items (renders as `<button>`). */
  onClick?: (e: MouseEvent) => void
}

export interface BreadcrumbProps {
  /**
   * Ordered list of steps. The **last item** is always the current page:
   * rendered non-interactively with `aria-current="page"`.
   * All previous items are rendered as links or buttons.
   */
  items: BreadcrumbItem[]
  /**
   * Handler for the back (‹) button shown when there are ≥ 2 items.
   * When omitted, falls back to the `onClick` of the second-to-last item.
   */
  onBack?: () => void
  className?: string
}

/**
 * Navigation landmark that shows the user's location within the page hierarchy.
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: 'Inicio', href: '/' },
 *     { label: 'Tiendas', href: '/stores' },
 *     { label: 'Mi tienda' },
 *   ]}
 *   onBack={() => router.back()}
 * />
 */
export function Breadcrumb({ items, onBack, className }: BreadcrumbProps) {
  if (items.length === 0) return null

  const hasBack = items.length > 1

  function handleBack() {
    if (onBack) {
      onBack()
      return
    }
    const prev = items[items.length - 2]
    prev?.onClick?.({} as MouseEvent)
  }

  return (
    <nav className={cn('rds-breadcrumb', className)} aria-label="Breadcrumb">
      {hasBack ? (
        <IconButton
          icon={<ChevronLeft size={16} strokeWidth={2} />}
          aria-label="Volver"
          appearance="secondary"
          size="sm"
          className="rds-breadcrumb__back"
          onClick={handleBack}
        />
      ) : null}

      <ol className="rds-breadcrumb__list" role="list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li key={index} className="rds-breadcrumb__item">
              {isCurrent ? (
                <span
                  className="rds-breadcrumb__link rds-breadcrumb__link--current"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href != null ? (
                <a
                  href={item.href}
                  className="rds-breadcrumb__link"
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="rds-breadcrumb__link"
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              )}

              {!isCurrent ? (
                <span className="rds-breadcrumb__separator" aria-hidden="true">
                  <ChevronRight size={12} strokeWidth={2} />
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
