import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type CardElevation = 'flat' | 'raised' | 'floating'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the drop-shadow level.
   * - flat:     no shadow, border only (default)
   * - raised:   subtle shadow — cards on a surface (0 5px 10px …0.04)
   * - floating: stronger shadow — cards that hover above content (0 6px 14px …0.08)
   */
  elevation?: CardElevation
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevation = 'flat', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('rds-card', className)}
      data-elevation={elevation}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'
