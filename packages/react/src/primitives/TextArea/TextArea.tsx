import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  /** Visible label rendered above the control. */
  label: ReactNode
  /** Helper text rendered below the control in neutral state. */
  helperText?: ReactNode
  /** Error message. When provided activates the invalid visual state. */
  error?: ReactNode
  /** Hides the label visually while keeping it accessible. */
  visuallyHiddenLabel?: boolean
  /**
   * When provided a clear button (×) is shown while the field has a value
   * and is not disabled or readOnly. Caller is responsible for clearing
   * the value in this handler.
   */
  onClear?: () => void
  /** Extra class applied to the outer wrapper div. */
  containerClassName?: string
}

export interface TextAreaSkeletonProps {
  showLabel?: boolean
  showHelperText?: boolean
  className?: string
}

function joinIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined
}

/**
 * Multi-line text input with label, helper/error text, and optional clear button.
 * Mirrors the TextField API — compose at the callsite, keep business logic outside.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      visuallyHiddenLabel = false,
      onClear,
      containerClassName,
      className,
      id: providedId,
      required,
      disabled,
      readOnly,
      value,
      defaultValue,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = providedId ?? `rds-text-area-${generatedId}`
    const helperId = helperText ? `${textareaId}-helper` : undefined
    const errorId = error ? `${textareaId}-error` : undefined
    const isInvalid = Boolean(error) || (ariaInvalid !== undefined && ariaInvalid !== false)
    const resolvedAriaInvalid = error ? true : ariaInvalid
    const descriptionId = joinIds(ariaDescribedBy, errorId ?? helperId)

    const hasValue = value !== undefined ? String(value).length > 0 : defaultValue !== undefined
    const showClear = Boolean(onClear) && hasValue && !disabled && !readOnly

    return (
      <div
        className={cn('rds-text-area', containerClassName)}
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <label
          htmlFor={textareaId}
          className={cn('rds-text-area__label', visuallyHiddenLabel && 'rds-visually-hidden')}
        >
          {label}
          {required ? (
            <span className="rds-text-area__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>

        <div className="rds-text-area__control">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn('rds-text-area__input', className)}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={resolvedAriaInvalid}
            aria-describedby={descriptionId}
            {...props}
          />

          {showClear ? (
            <button
              type="button"
              className="rds-text-area__clear"
              onClick={onClear}
              aria-label="Limpiar"
              tabIndex={-1}
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {error ? (
          <span id={errorId} className="rds-text-area__message" data-error="true">
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} className="rds-text-area__message">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'

/**
 * Non-interactive skeleton placeholder matching TextArea geometry.
 * Renders no textarea, no focusable elements, and is hidden from assistive tech.
 */
export function TextAreaSkeleton({
  showLabel = true,
  showHelperText = true,
  className,
}: TextAreaSkeletonProps) {
  return (
    <div className={cn('rds-text-area-skeleton', className)} aria-hidden="true">
      {showLabel ? <span className="rds-text-area-skeleton__label" /> : null}
      <span className="rds-text-area-skeleton__control" />
      {showHelperText ? <span className="rds-text-area-skeleton__helper" /> : null}
    </div>
  )
}
