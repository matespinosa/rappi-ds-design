import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type TagIntent =
  | 'standard'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'suggestion'
  | 'ai'

export type TagVariant = 'solid' | 'pastel' | 'outline' | 'ghost'

export type TagSize = 'sm' | 'md'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  /** Semantic intent that drives the color palette. Default: `'standard'`. */
  intent?: TagIntent
  /** Visual treatment applied on top of the intent palette. Default: `'pastel'`. */
  variant?: TagVariant
  /** Height variant: `'sm'` = 16 px, `'md'` = 24 px. Default: `'md'`. */
  size?: TagSize
  /** Element rendered to the left of the label (icon, emoji, …). */
  startIcon?: ReactNode
  /** Element rendered to the right of the label (icon, dismiss affordance, …). */
  endIcon?: ReactNode
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      intent = 'standard',
      variant = 'pastel',
      size = 'md',
      startIcon,
      endIcon,
      className,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn('rds-tag', className)}
      data-intent={intent}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {startIcon ? (
        <span className="rds-tag__icon" aria-hidden="true">
          {startIcon}
        </span>
      ) : null}
      <span className="rds-tag__label">{children}</span>
      {endIcon ? (
        <span className="rds-tag__icon" aria-hidden="true">
          {endIcon}
        </span>
      ) : null}
    </span>
  ),
)

Tag.displayName = 'Tag'
