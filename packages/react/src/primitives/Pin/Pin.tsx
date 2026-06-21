import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEventHandler,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

export type PinLength = 4 | 6

export interface PinProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'defaultValue'
  | 'inputMode'
  | 'maxLength'
  | 'onChange'
  | 'pattern'
  | 'size'
  | 'type'
  | 'value'
> {
  label: ReactNode
  length?: PinLength
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onComplete?: (value: string) => void
  error?: ReactNode
  containerClassName?: string
  visuallyHiddenLabel?: boolean
}

export interface PinSkeletonProps {
  length?: PinLength
  className?: string
}

function normalizePin(value: string, length: PinLength) {
  return value.replace(/\D/g, '').slice(0, length)
}

/**
 * Numeric PIN and one-time-code input rendered as individual visual cells while
 * preserving a single native input for paste, autofill, keyboard, and screen readers.
 */
export const Pin = forwardRef<HTMLInputElement, PinProps>(
  (
    {
      label,
      length = 4,
      value,
      defaultValue = '',
      onValueChange,
      onComplete,
      error,
      containerClassName,
      visuallyHiddenLabel = true,
      className,
      id: providedId,
      disabled,
      readOnly,
      required,
      autoComplete = 'one-time-code',
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useId()
    const inputId = providedId ?? `rds-pin-input-${generatedId}`
    const errorId = error ? `${inputId}-error` : undefined
    const inputRef = useRef<HTMLInputElement>(null)
    const lastCompletedValue = useRef<string | null>(null)
    const [uncontrolledValue, setUncontrolledValue] = useState(() =>
      normalizePin(defaultValue, length),
    )
    const [isFocused, setIsFocused] = useState(false)
    const isControlled = value !== undefined
    const resolvedValue = normalizePin(isControlled ? value : uncontrolledValue, length)
    const isInvalid = Boolean(error) || (ariaInvalid !== undefined && ariaInvalid !== false)
    const resolvedAriaInvalid = error ? true : ariaInvalid
    const activeIndex = Math.min(resolvedValue.length, length - 1)
    const descriptionId = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined

    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)

    useEffect(() => {
      if (resolvedValue.length === length && resolvedValue !== lastCompletedValue.current) {
        lastCompletedValue.current = resolvedValue
        onComplete?.(resolvedValue)
      } else if (resolvedValue.length < length) {
        lastCompletedValue.current = null
      }
    }, [length, onComplete, resolvedValue])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const nextValue = normalizePin(event.currentTarget.value, length)
      event.currentTarget.value = nextValue
      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }
      onValueChange?.(nextValue)
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setIsFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setIsFocused(false)
      onBlur?.(event)
    }

    return (
      <div
        className={cn('rds-pin-input-field', containerClassName)}
        data-length={length}
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <label
          htmlFor={inputId}
          className={cn('rds-pin-input-field__label', visuallyHiddenLabel && 'rds-visually-hidden')}
        >
          {label}
        </label>

        <div className="rds-pin-input-field__control">
          <input
            ref={inputRef}
            id={inputId}
            className={cn('rds-pin-input-field__input', className)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={autoComplete}
            value={resolvedValue}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={resolvedAriaInvalid}
            aria-describedby={descriptionId}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          <span className="rds-pin-input-field__cells" aria-hidden="true">
            {Array.from({ length }, (_, index) => (
              <span
                key={index}
                className="rds-pin-input-field__cell"
                data-active={
                  isFocused && !disabled && !readOnly && index === activeIndex ? true : undefined
                }
                data-filled={resolvedValue[index] !== undefined || undefined}
              >
                {resolvedValue[index] ?? ''}
              </span>
            ))}
          </span>
        </div>

        {error ? (
          <span id={errorId} className="rds-pin-input-field__error">
            {error}
          </span>
        ) : null}
      </div>
    )
  },
)

Pin.displayName = 'Pin'

/**
 * Non-interactive loading placeholder matching the PIN input geometry.
 */
export function PinSkeleton({ length = 4, className }: PinSkeletonProps) {
  return (
    <div
      className={cn('rds-pin-input-skeleton', className)}
      data-length={length}
      aria-hidden="true"
    >
      {Array.from({ length }, (_, index) => (
        <span key={index} className="rds-pin-input-skeleton__cell" />
      ))}
    </div>
  )
}
