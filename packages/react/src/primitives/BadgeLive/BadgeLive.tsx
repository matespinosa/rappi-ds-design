import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type BadgeLiveStatus = 'active' | 'inactive' | 'closed' | 'suspended'

export interface BadgeLiveProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeLiveStatus
  animated?: boolean
}

/**
 * Compact dot indicator for store operating status.
 * Provide an aria-label when nearby text does not already describe the status.
 */
export const BadgeLive = forwardRef<HTMLSpanElement, BadgeLiveProps>(
  ({ status, animated = false, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('rds-badge-live', className)}
        data-status={status}
        data-animated={animated || undefined}
        role="img"
        {...props}
      />
    )
  },
)

BadgeLive.displayName = 'BadgeLive'
