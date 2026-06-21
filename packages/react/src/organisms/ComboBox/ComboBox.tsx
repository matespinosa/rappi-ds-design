import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronDown, X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

/* ─── Types ─── */

export interface ComboBoxOption {
  value: string
  label: string
  /** Decorative icon rendered on the left of each dropdown item (24×24). */
  icon?: ReactNode
  disabled?: boolean
}

export type ComboBoxSize = 'lg' | 'sm'

export interface ComboBoxProps {
  /** All available options. Filtered internally by `inputValue` when uncontrolled. */
  options?: ComboBoxOption[]
  /**
   * Currently selected values (multi-select).
   * An empty array means "nothing selected".
   */
  value?: string[]
  /** Called whenever the selection changes. */
  onChange?: (values: string[]) => void
  /**
   * Controlled search text. When provided, filtering is delegated to the consumer
   * (useful for async / server-side search). When omitted, ComboBox filters internally.
   */
  inputValue?: string
  onInputChange?: (value: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  /** Marks the field as visually invalid (red border). Overridden when `error` is set. */
  invalid?: boolean
  /** Icon rendered on the left of the input field (24×24). */
  leftIcon?: ReactNode
  /**
   * `'lg'` — desktop, 56 px height, 16 px font (body-lg).
   * `'sm'` — mobile, 44 px height, 14 px font (body-md).
   */
  size?: ComboBoxSize
  required?: boolean
  /**
   * Show a clear (×) button when the input has text.
   * @default true
   */
  clearable?: boolean
  /** Called when the user clicks the clear button. */
  onClear?: () => void
  /** Renders the skeleton loading state — overrides all other states. */
  skeleton?: boolean
  id?: string
  className?: string
  'aria-label'?: string
}

export interface ComboBoxSkeletonProps {
  size?: ComboBoxSize
  showLabel?: boolean
  showHelper?: boolean
  className?: string
}

/* ─── Helpers ─── */

function nextEnabledIndex(opts: ComboBoxOption[], from: number, direction: 1 | -1): number {
  let i = from + direction
  while (i >= 0 && i < opts.length) {
    if (!opts[i]?.disabled) return i
    i += direction
  }
  return from
}

/* ─── ComboBox ─── */

/**
 * Organism: text input that filters a list of options and supports multi-selection.
 *
 * Differs from `Select` in that the trigger is an editable `<input>` rather than
 * a button — the dropdown opens on focus and options are filtered as the user types.
 *
 * ARIA: `role="combobox"` + `aria-expanded` + `aria-activedescendant` pattern
 * (ARIA 1.2 list autocomplete with manual selection).
 *
 * @example
 * <ComboBox
 *   label="Ciudad"
 *   placeholder="Buscar ciudad…"
 *   options={cities}
 *   value={selected}
 *   onChange={setSelected}
 * />
 */
export const ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  (
    {
      options = [],
      value = [],
      onChange,
      inputValue: controlledInput,
      onInputChange,
      label,
      placeholder = 'Buscar…',
      helperText,
      error,
      disabled = false,
      invalid = false,
      leftIcon,
      size = 'lg',
      required = false,
      clearable = true,
      onClear,
      skeleton = false,
      id: providedId,
      className,
      'aria-label': ariaLabel,
    },
    forwardedRef,
  ) => {
    const generatedId = useId()
    const fieldId = providedId ?? `rds-combobox-${generatedId}`
    const listboxId = `${fieldId}-listbox`
    const labelId = label ? `${fieldId}-label` : undefined
    const helperId = helperText ? `${fieldId}-helper` : undefined
    const errorId = error ? `${fieldId}-error` : undefined

    const isInvalid = Boolean(error) || invalid

    const [isOpen, setIsOpen] = useState(false)
    const [internalInput, setInternalInput] = useState('')
    const [activeIndex, setActiveIndex] = useState(-1)

    const inputRef = useRef<HTMLInputElement>(null)

    // Controlled vs uncontrolled input text
    const query = controlledInput !== undefined ? controlledInput : internalInput

    // Filter options by query (skipped when consumer controls inputValue)
    const filteredOptions =
      controlledInput !== undefined
        ? options
        : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))

    const openDropdown = useCallback(() => {
      if (disabled) return
      setIsOpen(true)
      setActiveIndex(-1)
    }, [disabled])

    const closeDropdown = useCallback(() => {
      setIsOpen(false)
      setActiveIndex(-1)
    }, [])

    const toggleOption = useCallback(
      (option: ComboBoxOption) => {
        if (option.disabled) return
        const next = value.includes(option.value)
          ? value.filter((v) => v !== option.value)
          : [...value, option.value]
        onChange?.(next)
      },
      [value, onChange],
    )

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      const text = e.target.value
      if (controlledInput === undefined) setInternalInput(text)
      onInputChange?.(text)
      if (!isOpen) openDropdown()
      setActiveIndex(-1)
    }

    function handleClear() {
      if (controlledInput === undefined) setInternalInput('')
      onInputChange?.('')
      onClear?.()
      inputRef.current?.focus()
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          if (!isOpen) {
            openDropdown()
          } else {
            setActiveIndex((i) =>
              i < 0 ? firstEnabledIndex(filteredOptions) : nextEnabledIndex(filteredOptions, i, 1),
            )
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (isOpen) {
            setActiveIndex((i) => (i <= 0 ? 0 : nextEnabledIndex(filteredOptions, i, -1)))
          }
          break
        }
        case 'Enter':
        case ' ': {
          if (!isOpen) {
            e.preventDefault()
            openDropdown()
          } else if (activeIndex >= 0) {
            e.preventDefault()
            const active = filteredOptions[activeIndex]
            if (active) toggleOption(active)
          }
          break
        }
        case 'Escape': {
          closeDropdown()
          break
        }
        case 'Tab': {
          closeDropdown()
          break
        }
      }
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      // Keep open if focus moves to the listbox (mousedown on option)
      const listbox = document.getElementById(listboxId)
      if (!listbox?.contains(e.relatedTarget)) {
        closeDropdown()
      }
    }

    const activeOptionId =
      isOpen && activeIndex >= 0
        ? `${listboxId}-option-${activeIndex}`
        : undefined

    const descriptionId = [errorId ?? helperId].filter(Boolean).join(' ') || undefined

    const showClear = clearable && query.length > 0 && !disabled

    if (skeleton) {
      return (
        <ComboBoxSkeleton
          size={size}
          showLabel={Boolean(label)}
          className={className}
        />
      )
    }

    return (
      <div
        className={cn('rds-combobox', className)}
        data-size={size}
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        data-open={isOpen || undefined}
      >
        {/* Label */}
        {label ? (
          <label
            id={labelId}
            htmlFor={fieldId}
            className="rds-combobox__label"
          >
            {label}
            {required ? (
              <span className="rds-combobox__required" aria-hidden="true">
                {' '}*
              </span>
            ) : null}
          </label>
        ) : null}

        {/* Input field wrapper */}
        <div className="rds-combobox__field" data-open={isOpen || undefined}>
          {/* Left icon slot */}
          {leftIcon ? (
            <span className="rds-combobox__left-icon" aria-hidden="true">
              {leftIcon}
            </span>
          ) : null}

          {/* Text input — the real combobox */}
          <input
            ref={(node) => {
              ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
              if (typeof forwardedRef === 'function') forwardedRef(node)
              else if (forwardedRef)
                (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            id={fieldId}
            type="text"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            aria-labelledby={labelId}
            aria-label={ariaLabel}
            aria-describedby={descriptionId}
            aria-invalid={isInvalid || undefined}
            aria-required={required || undefined}
            aria-autocomplete="list"
            aria-multiselectable={true}
            autoComplete="off"
            disabled={disabled}
            placeholder={placeholder}
            value={query}
            className="rds-combobox__input"
            onFocus={openDropdown}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />

          {/* Clear button */}
          {showClear ? (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              className="rds-combobox__clear"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <X size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : null}

          {/* Chevron */}
          <span className="rds-combobox__chevron" aria-hidden="true">
            <ChevronDown size={20} strokeWidth={1.5} />
          </span>
        </div>

        {/* Dropdown */}
        {isOpen ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-label={label ?? ariaLabel}
            className="rds-combobox__dropdown"
          >
            {filteredOptions.length === 0 ? (
              <li className="rds-combobox__empty" role="option" aria-selected="false">
                Sin resultados
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = value.includes(option.value)
                return (
                  <li
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    data-active={index === activeIndex || undefined}
                    data-disabled={option.disabled || undefined}
                    className="rds-combobox__option"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => toggleOption(option)}
                    onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                  >
                    {/* Checkbox indicator */}
                    <span
                      className="rds-combobox__option-check"
                      data-selected={isSelected || undefined}
                      aria-hidden="true"
                    />

                    {/* Option icon */}
                    {option.icon ? (
                      <span className="rds-combobox__option-icon" aria-hidden="true">
                        {option.icon}
                      </span>
                    ) : null}

                    {/* Label */}
                    <span className="rds-combobox__option-label">{option.label}</span>
                  </li>
                )
              })
            )}
          </ul>
        ) : null}

        {/* Helper / error message */}
        {error ? (
          <span id={errorId} className="rds-combobox__message" data-error>
            {error}
          </span>
        ) : helperText ? (
          <span id={helperId} className="rds-combobox__message">
            {helperText}
          </span>
        ) : null}
      </div>
    )
  },
)

ComboBox.displayName = 'ComboBox'

/* ─── Helpers ─── */

function firstEnabledIndex(opts: ComboBoxOption[]): number {
  return opts.findIndex((o) => !o.disabled)
}

/* ─── Skeleton ─── */

export function ComboBoxSkeleton({
  size = 'lg',
  showLabel = true,
  showHelper = false,
  className,
}: ComboBoxSkeletonProps) {
  return (
    <div
      className={cn('rds-combobox-skeleton', className)}
      data-size={size}
      aria-hidden="true"
    >
      {showLabel ? <span className="rds-combobox-skeleton__label" /> : null}
      <span className="rds-combobox-skeleton__field" />
      {showHelper ? <span className="rds-combobox-skeleton__helper" /> : null}
    </div>
  )
}

ComboBoxSkeleton.displayName = 'ComboBoxSkeleton'
