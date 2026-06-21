import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { ChevronDown, X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'
import { TextFieldSkeleton } from '../TextField'

export interface TextFieldPhoneCountry {
  code: string
  callingCode: string
  name: string
  flag?: ReactNode
}

export interface TextFieldPhoneProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'defaultValue' | 'size' | 'type' | 'value'
> {
  label: ReactNode
  countries: readonly TextFieldPhoneCountry[]
  countryCode: string
  onCountryChange?: (country: TextFieldPhoneCountry, event: ChangeEvent<HTMLSelectElement>) => void
  countrySelectLabel?: string
  countrySelectName?: string
  value?: string
  defaultValue?: string
  helperText?: ReactNode
  error?: ReactNode
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
  visuallyHiddenLabel?: boolean
}

export interface TextFieldPhoneSkeletonProps {
  showLabel?: boolean
  showHelperText?: boolean
  className?: string
}

function joinIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined
}

/**
 * International phone input with a native country selector, accessible label,
 * supporting text, validation feedback, and optional clear action.
 */
export const TextFieldPhone = forwardRef<HTMLInputElement, TextFieldPhoneProps>(
  (
    {
      label,
      countries,
      countryCode,
      onCountryChange,
      countrySelectLabel = 'Country calling code',
      countrySelectName,
      value,
      defaultValue = '',
      helperText,
      error,
      clearable = true,
      onClear,
      containerClassName,
      visuallyHiddenLabel = false,
      className,
      id: providedId,
      required,
      disabled,
      readOnly,
      onChange,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      inputMode = 'tel',
      autoComplete = 'tel-national',
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useId()
    const inputId = providedId ?? `rds-text-field-phone-${generatedId}`
    const selectId = `${inputId}-country`
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const inputRef = useRef<HTMLInputElement>(null)
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const isControlled = value !== undefined
    const resolvedValue = isControlled ? value : uncontrolledValue
    const selectedCountry = countries.find((country) => country.code === countryCode)
    const isInvalid = Boolean(error) || (ariaInvalid !== undefined && ariaInvalid !== false)
    const resolvedAriaInvalid = error ? true : ariaInvalid
    const descriptionId = joinIds(ariaDescribedBy, errorId ?? helperId)
    const showClear = clearable && resolvedValue.length > 0 && !disabled && !readOnly

    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      if (!isControlled) {
        setUncontrolledValue(event.target.value)
      }
      onChange?.(event)
    }

    function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
      const country = countries.find((option) => option.code === event.target.value)
      if (country) {
        onCountryChange?.(country, event)
      }
    }

    function handleClear() {
      if (!isControlled) {
        setUncontrolledValue('')
      }
      onClear?.()
      inputRef.current?.focus()
    }

    return (
      <div
        className={cn('rds-text-field-phone', containerClassName)}
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <label
          className={cn(
            'rds-text-field-phone__label',
            visuallyHiddenLabel && 'rds-visually-hidden',
          )}
          htmlFor={inputId}
        >
          {label}
          {required ? (
            <span className="rds-text-field-phone__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>

        <span className="rds-text-field-phone__control">
          <span className="rds-text-field-phone__country">
            <span className="rds-text-field-phone__flag" aria-hidden="true">
              {selectedCountry?.flag ?? selectedCountry?.code}
            </span>
            <span className="rds-text-field-phone__calling-code" aria-hidden="true">
              {selectedCountry?.callingCode}
            </span>
            <ChevronDown className="rds-text-field-phone__chevron" aria-hidden="true" />
            <select
              id={selectId}
              className="rds-text-field-phone__select"
              name={countrySelectName}
              value={countryCode}
              onChange={handleCountryChange}
              aria-label={countrySelectLabel}
              disabled={disabled || readOnly}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.callingCode})
                </option>
              ))}
            </select>
          </span>

          <input
            ref={inputRef}
            id={inputId}
            className={cn('rds-text-field-phone__input', className)}
            type="tel"
            inputMode={inputMode}
            autoComplete={autoComplete}
            value={resolvedValue}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={resolvedAriaInvalid}
            aria-describedby={descriptionId}
            onChange={handleInputChange}
            {...props}
          />

          {showClear ? (
            <button
              type="button"
              className="rds-text-field-phone__clear"
              aria-label="Clear phone number"
              onClick={handleClear}
            >
              <X aria-hidden="true" />
            </button>
          ) : null}
        </span>

        {error ? (
          <span id={errorId} className="rds-text-field-phone__message" data-error="true">
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} className="rds-text-field-phone__message">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)

TextFieldPhone.displayName = 'TextFieldPhone'

export function TextFieldPhoneSkeleton({
  showLabel = true,
  showHelperText = true,
  className,
}: TextFieldPhoneSkeletonProps) {
  return (
    <TextFieldSkeleton
      size="md"
      showLabel={showLabel}
      showHelperText={showHelperText}
      className={className}
    />
  )
}
