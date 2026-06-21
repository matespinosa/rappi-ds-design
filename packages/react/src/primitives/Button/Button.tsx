import { forwardRef, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type ButtonAppearance = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type ButtonIconPlacement =
  | { startIcon?: ReactNode; endIcon?: never }
  | { startIcon?: never; endIcon?: ReactNode }
  | { startIcon?: undefined; endIcon?: undefined }

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonIconPlacement & {
    appearance?: ButtonAppearance
    size?: ButtonSize
    loading?: boolean
  }

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  appearance?: ButtonAppearance
  size?: ButtonSize
  loading?: boolean
  icon: ReactElement
  'aria-label': string
}

interface ButtonContentProps {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

function ButtonContent({ children, icon, iconPosition = 'start' }: ButtonContentProps) {
  return (
    <span className="rds-button__content">
      {icon && iconPosition === 'start' ? (
        <span className="rds-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="rds-button__label">{children}</span>
      {icon && iconPosition === 'end' ? (
        <span className="rds-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </span>
  )
}

function LoadingIndicator() {
  return <span className="rds-button__spinner" aria-hidden="true" />
}

/**
 * Triggers an action using the Merchants design-system button treatment.
 * Browser interaction states are CSS-driven; use `loading` only for asynchronous actions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      appearance = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      className,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        className={cn('rds-button', className)}
        data-appearance={appearance}
        data-size={size}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        <ButtonContent icon={startIcon ?? endIcon} iconPosition={endIcon ? 'end' : 'start'}>
          {children}
        </ButtonContent>
        {loading ? <LoadingIndicator /> : null}
      </button>
    )
  },
)

Button.displayName = 'Button'

/**
 * Compact icon-only action. An explicit `aria-label` is required because no visible label exists.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      appearance = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        className={cn('rds-button', 'rds-icon-button', className)}
        data-appearance={appearance}
        data-size={size}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        <span className="rds-button__content" aria-hidden="true">
          <span className="rds-button__icon">{icon}</span>
        </span>
        {loading ? <LoadingIndicator /> : null}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
