import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Check, ChevronDown } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

export interface SelectOption {
  value: string
  label: string
  /** Element rendered on the left side of the option (icon, flag, avatar…). Also shown in the trigger when this option is selected. */
  startElement?: ReactNode
  /** Element rendered on the right side of the option (badge, tag, secondary text…). */
  endElement?: ReactNode
  /** Prevents this option from being selected. */
  disabled?: boolean
}

export type SelectSize = 'md' | 'sm'

export type SelectSelectionIndicator = 'check' | 'radio' | 'checkbox'

export interface SelectProps {
  /** Options displayed in the dropdown. */
  options?: SelectOption[]
  /** Controlled selected value. */
  value?: string
  /** Called with the new value when the user selects an option. */
  onChange?: (value: string) => void
  /** Visible label rendered above the trigger. */
  label?: ReactNode
  /** Placeholder shown when no value is selected. */
  placeholder?: string
  size?: SelectSize
  disabled?: boolean
  readOnly?: boolean
  /** Marks the field as invalid and applies the error border. */
  invalid?: boolean
  /** Renders the skeleton loading state. Overrides all other states. */
  skeleton?: boolean
  /** Helper text rendered below the trigger. */
  helperText?: ReactNode
  /** Error message rendered below the trigger and activates `invalid`. */
  error?: ReactNode
  /** Forwarded to the trigger `<button>` as `id`. */
  id?: string
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
  /**
   * Renders a selection indicator in each option row:
   * - `'check'`: checkmark on the **right** of the selected option only.
   * - `'radio'`: radio circle on the **left** of every option, filled for the selected one.
   * - `'checkbox'`: checkbox on the **left** of every option, checked for the selected one.
   */
  selectionIndicator?: SelectSelectionIndicator
}

export interface SelectSkeletonProps {
  size?: SelectSize
  showLabel?: boolean
  className?: string
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') ref(node)
      else (ref as React.MutableRefObject<T | null>).current = node
    })
  }
}

function nextEnabledIndex(options: SelectOption[], from: number, direction: 1 | -1): number {
  let i = from + direction
  while (i >= 0 && i < options.length) {
    if (!options[i]?.disabled) return i
    i += direction
  }
  return from
}

/**
 * Accessible custom select/combobox. Keeps focus on the trigger while the
 * listbox is open, navigating options via arrow keys and aria-activedescendant.
 * Compose with a <label> or pass the `label` prop.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      value,
      onChange,
      label,
      placeholder = 'Selecciona una opción',
      size = 'md',
      disabled = false,
      readOnly = false,
      invalid = false,
      skeleton = false,
      helperText,
      error,
      id: providedId,
      className,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      selectionIndicator,
    },
    forwardedRef,
  ) => {
    const generatedId = useId()
    const triggerId = providedId ?? `rds-select-${generatedId}`
    const listboxId = `${triggerId}-listbox`
    const labelId = label ? `${triggerId}-label` : undefined
    const helperId = helperText ? `${triggerId}-helper` : undefined
    const errorId = error ? `${triggerId}-error` : undefined
    const isInvalid = Boolean(error) || invalid

    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const triggerRef = useRef<HTMLButtonElement>(null)

    const selectedOption = options.find((o) => o.value === value)

    const openDropdown = useCallback(() => {
      if (disabled || readOnly) return
      let idx = options.findIndex((o) => o.value === value)
      if (idx < 0) idx = options.findIndex((o) => !o.disabled)
      setActiveIndex(idx >= 0 ? idx : 0)
      setIsOpen(true)
    }, [disabled, readOnly, options, value])

    const closeDropdown = useCallback(() => {
      setIsOpen(false)
      setActiveIndex(-1)
    }, [])

    const selectOption = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return
        onChange?.(option.value)
        closeDropdown()
        triggerRef.current?.focus()
      },
      [onChange, closeDropdown],
    )

    function handleTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      switch (e.key) {
        case 'Enter':
        case ' ': {
          e.preventDefault()
          if (isOpen) {
            const active = options[activeIndex]
            if (active && !active.disabled) {
              selectOption(active)
            } else {
              closeDropdown()
            }
          } else {
            openDropdown()
          }
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          if (!isOpen) {
            openDropdown()
          } else {
            setActiveIndex((i) => nextEnabledIndex(options, i, 1))
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (!isOpen) {
            openDropdown()
          } else {
            setActiveIndex((i) => nextEnabledIndex(options, i, -1))
          }
          break
        }
        case 'Escape':
        case 'Tab': {
          closeDropdown()
          break
        }
      }
    }

    function handleTriggerBlur(e: React.FocusEvent<HTMLButtonElement>) {
      const listbox = document.getElementById(listboxId)
      if (!listbox?.contains(e.relatedTarget)) {
        closeDropdown()
      }
    }

    const activeOptionId =
      isOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined

    const descriptionId = [ariaDescribedBy, errorId ?? helperId].filter(Boolean).join(' ') || undefined

    if (skeleton) {
      return <SelectSkeleton size={size} showLabel={Boolean(label)} className={className} />
    }

    const showLeftIndicator =
      selectionIndicator === 'radio' || selectionIndicator === 'checkbox'

    return (
      <div
        className={cn('rds-select', className)}
        data-size={size}
        data-open={isOpen || undefined}
        data-invalid={isInvalid || undefined}
        data-readonly={readOnly || undefined}
        data-disabled={disabled || undefined}
      >
        {label ? (
          <label
            id={labelId}
            htmlFor={triggerId}
            className="rds-select__label"
          >
            {label}
          </label>
        ) : null}

        <button
          ref={mergeRefs(triggerRef, forwardedRef)}
          id={triggerId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-labelledby={labelId}
          aria-label={ariaLabel}
          aria-activedescendant={activeOptionId}
          aria-describedby={descriptionId}
          aria-invalid={isInvalid || undefined}
          disabled={disabled}
          className="rds-select__trigger"
          onClick={() => (isOpen ? closeDropdown() : openDropdown())}
          onKeyDown={handleTriggerKeyDown}
          onBlur={handleTriggerBlur}
        >
          <span className="rds-select__value">
            {selectedOption?.startElement ? (
              <span className="rds-select__value-start" aria-hidden="true">
                {selectedOption.startElement}
              </span>
            ) : null}
            {selectedOption ? (
              <span className="rds-select__value-text" data-filled>
                {selectedOption.label}
              </span>
            ) : (
              <span className="rds-select__value-text" data-placeholder>
                {placeholder}
              </span>
            )}
          </span>

          {!readOnly ? (
            <span className="rds-select__chevron" aria-hidden="true">
              <ChevronDown size={24} strokeWidth={1.5} />
            </span>
          ) : null}
        </button>

        {isOpen && !readOnly ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={typeof label === 'string' ? label : undefined}
            className="rds-select__dropdown"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled || undefined}
                data-active={index === activeIndex || undefined}
                data-disabled={option.disabled || undefined}
                className="rds-select__option"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectOption(option)}
                onMouseEnter={() => !option.disabled && setActiveIndex(index)}
              >
                {/* Left indicator: radio or checkbox */}
                {showLeftIndicator ? (
                  <span
                    className="rds-select__option-indicator"
                    data-type={selectionIndicator}
                    data-selected={option.value === value || undefined}
                    aria-hidden="true"
                  />
                ) : null}

                {/* Left slot */}
                {option.startElement ? (
                  <span className="rds-select__option-start" aria-hidden="true">
                    {option.startElement}
                  </span>
                ) : null}

                {/* Label */}
                <span className="rds-select__option-label">{option.label}</span>

                {/* Right slot */}
                {option.endElement ? (
                  <span className="rds-select__option-end" aria-hidden="true">
                    {option.endElement}
                  </span>
                ) : null}

                {/* Right indicator: check (selected option only) */}
                {selectionIndicator === 'check' && option.value === value ? (
                  <span
                    className="rds-select__option-indicator"
                    data-type="check"
                    aria-hidden="true"
                  >
                    <Check size={16} strokeWidth={2} />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {error ? (
          <span id={errorId} className="rds-select__message" data-error>
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} className="rds-select__message">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'

/**
 * Non-interactive skeleton placeholder matching Select geometry.
 */
export function SelectSkeleton({ size = 'md', showLabel = true, className }: SelectSkeletonProps) {
  return (
    <div className={cn('rds-select-skeleton', className)} data-size={size} aria-hidden="true">
      {showLabel ? <span className="rds-select-skeleton__label" /> : null}
      <span className="rds-select-skeleton__trigger" />
    </div>
  )
}
