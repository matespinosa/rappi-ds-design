import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type TextFieldSize = 'sm' | 'md'

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'size'
> {
  label: ReactNode
  fieldSize?: TextFieldSize
  helperText?: ReactNode
  error?: ReactNode
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  containerClassName?: string
  visuallyHiddenLabel?: boolean
}

export interface TextFieldSkeletonProps {
  size?: TextFieldSize
  showLabel?: boolean
  showHelperText?: boolean
  className?: string
}

function joinIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined
}

/**
 * Accessible single-line text input with label, supporting text, error messaging,
 * native disabled/readOnly states, and composable adornments.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      fieldSize = 'md',
      helperText,
      error,
      startAdornment,
      endAdornment,
      containerClassName,
      visuallyHiddenLabel = false,
      className,
      id: providedId,
      required,
      disabled,
      readOnly,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = providedId ?? `rds-text-field-${generatedId}`
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const isInvalid = Boolean(error) || (ariaInvalid !== undefined && ariaInvalid !== false)
    const resolvedAriaInvalid = error ? true : ariaInvalid
    const descriptionId = joinIds(ariaDescribedBy, errorId ?? helperId)

    return (
      <div
        className={cn('rds-text-field', containerClassName)}
        data-size={fieldSize}
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <label
          className={cn('rds-text-field__label', visuallyHiddenLabel && 'rds-visually-hidden')}
          htmlFor={inputId}
        >
          {label}
          {required ? (
            <span className="rds-text-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>

        <span className="rds-text-field__control">
          {startAdornment ? (
            <span className="rds-text-field__adornment" data-position="start">
              {startAdornment}
            </span>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            className={cn('rds-text-field__input', className)}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={resolvedAriaInvalid}
            aria-describedby={descriptionId}
            {...props}
          />

          {endAdornment ? (
            <span className="rds-text-field__adornment" data-position="end">
              {endAdornment}
            </span>
          ) : null}
        </span>

        {error ? (
          <span id={errorId} className="rds-text-field__message" data-error="true">
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} className="rds-text-field__message">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)

TextField.displayName = 'TextField'

/**
 * Non-interactive loading placeholder matching TextField geometry.
 * It intentionally renders no input semantics or focusable elements.
 */
export function TextFieldSkeleton({
  size = 'md',
  showLabel = true,
  showHelperText = true,
  className,
}: TextFieldSkeletonProps) {
  return (
    <div className={cn('rds-text-field-skeleton', className)} data-size={size} aria-hidden="true">
      {showLabel ? <span className="rds-text-field-skeleton__label" /> : null}
      <span className="rds-text-field-skeleton__control" />
      {showHelperText ? <span className="rds-text-field-skeleton__helper" /> : null}
    </div>
  )
}
