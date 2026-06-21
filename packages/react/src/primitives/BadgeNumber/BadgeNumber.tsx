import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeNumberAppearance = 'accent' | 'light' | 'dark'
export type BadgeNumberSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface BadgeNumberProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  appearance?: BadgeNumberAppearance
  size?: BadgeNumberSize
  value?: ReactNode
  showValue?: boolean
}

/**
 * Displays a compact numeric notification or an empty status dot.
 * Use an accessible label when the badge communicates information not repeated nearby.
 */
export const BadgeNumber = forwardRef<HTMLSpanElement, BadgeNumberProps>(
  (
    { appearance = 'accent', size = 'xs', value = 2, showValue = true, className, ...props },
    ref,
  ) => {
    const hasValue = showValue && value !== null && value !== undefined && value !== ''

    return (
      <span
        ref={ref}
        className={cn('rds-badge-number', className)}
        data-appearance={appearance}
        data-size={size}
        data-empty={!hasValue || undefined}
        {...props}
      >
        {hasValue ? <span className="rds-badge-number__value">{value}</span> : null}
      </span>
    )
  },
)

BadgeNumber.displayName = 'BadgeNumber'
