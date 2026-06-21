import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { BadgeNumber } from '../BadgeNumber'

export type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Controls how the chip looks when selected.
 * - filled: dark background, inverse label (filter chip)
 * - outline: stronger border, same background (tab chip)
 */
export type ChipVariant = 'filled' | 'outline'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  size?: ChipSize
  variant?: ChipVariant
  selected?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  /** Renders a BadgeNumber at the trailing edge. Pass a count or short string. */
  badge?: number | string
  shadow?: boolean
}

/**
 * Interactive pill used for filters, tags, and tab-like selections.
 * Renders as a <button> with aria-pressed; override role="tab" + aria-selected
 * at the callsite when building a tab group.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      children,
      size = 'md',
      variant = 'filled',
      selected = false,
      startIcon,
      endIcon,
      badge,
      shadow = false,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn('rds-chip', className)}
        data-size={size}
        data-variant={variant}
        data-selected={selected || undefined}
        data-shadow={shadow || undefined}
        aria-pressed={selected}
        disabled={disabled}
        {...props}
      >
        {startIcon && (
          <span className="rds-chip__icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span className="rds-chip__label">{children}</span>
        {endIcon && (
          <span className="rds-chip__icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
        {badge != null && (
          <span className="rds-chip__badge" aria-hidden="true">
            <BadgeNumber value={badge} size="xs" appearance="accent" />
          </span>
        )}
      </button>
    )
  },
)

Chip.displayName = 'Chip'
