import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  /** Whether the toggle is in the on (checked) state. */
  checked?: boolean
  size?: ToggleSize
}

/**
 * Toggle switch control. Renders as a <button role="switch"> for native
 * keyboard and screen-reader support. Compose with a <label> at the callsite.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked = false, size = 'lg', disabled = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-size={size}
        data-checked={checked || undefined}
        className={cn('rds-toggle', className)}
        {...props}
      >
        <span className="rds-toggle__knob" />
      </button>
    )
  },
)

Toggle.displayName = 'Toggle'
