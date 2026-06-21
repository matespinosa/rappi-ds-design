import { forwardRef, type HTMLAttributes } from 'react'
import { ChevronLeft, ChevronRight } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page, 1-indexed. */
  page: number
  /** Total number of pages. */
  totalPages: number
  /** Called when the user selects a new page. */
  onPageChange?: (page: number) => void
}

// ─── Page-list algorithm ──────────────────────────────────────────────────────
//
// Returns the sequence of items to render between the prev/next chevrons.
// When total ≤ 7 all pages are shown. Beyond that, up to three visible
// windows are produced, separated by '...' sentinels:
//
//   near start : [1, 2, 3, '...', total]
//   middle     : [1, '...', p-1, p, p+1, '...', total]
//   near end   : [1, '...', total-2, total-1, total]

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, '...', total]
  }
  if (current >= total - 2) {
    return [1, '...', total - 2, total - 1, total]
  }
  return [1, '...', current - 1, current, current + 1, '...', total]
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, totalPages, onPageChange, className, ...props },
  ref,
) {
  const pages = getPages(page, totalPages)
  const canPrev = page > 1
  const canNext = page < totalPages

  const go = (target: number) => {
    if (target !== page && target >= 1 && target <= totalPages) {
      onPageChange?.(target)
    }
  }

  return (
    <nav
      ref={ref}
      aria-label="Paginación"
      className={cn('rds-pagination', className)}
      {...props}
    >
      {/* Prev */}
      <button
        type="button"
        className="rds-pagination__item"
        data-type="nav"
        onClick={() => go(page - 1)}
        disabled={!canPrev}
        aria-label="Página anterior"
      >
        <ChevronLeft size={20} strokeWidth={2} aria-hidden />
      </button>

      {/* Pages + ellipsis */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="rds-pagination__item"
            data-type="ellipsis"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className="rds-pagination__item"
            onClick={() => go(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Página ${p}`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        className="rds-pagination__item"
        data-type="nav"
        onClick={() => go(page + 1)}
        disabled={!canNext}
        aria-label="Página siguiente"
      >
        <ChevronRight size={20} strokeWidth={2} aria-hidden />
      </button>
    </nav>
  )
})

Pagination.displayName = 'Pagination'
