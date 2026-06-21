import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type MutableRefObject,
} from 'react'
import { ChevronLeft, Search as SearchIcon, X } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

export type SearchSize = 'lg' | 'sm'

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Visual size. Default `lg`. */
  size?: SearchSize
  /** Replaces the search icon with a back-arrow pill (e.g. for nested screens). */
  showBackButton?: boolean
  /** Called when the back-button pill is clicked. */
  onBack?: () => void
  /**
   * Called when the clear button is clicked or Escape is pressed while the
   * input has a value. In controlled mode the consumer must reset `value`.
   */
  onClear?: () => void
  /** Placeholder text shown when the input is empty. Default `"Buscar"`. */
  placeholder?: string
  /** Extra className applied to the outer wrapper div. */
  containerClassName?: string
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      size = 'lg',
      showBackButton = false,
      onBack,
      onClear,
      placeholder = 'Buscar',
      containerClassName,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      disabled,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(String(defaultValue ?? ''))
    const [isFocused, setIsFocused] = useState(false)
    const internalRef = useRef<HTMLInputElement>(null)

    const effectiveValue = isControlled ? String(value ?? '') : internalValue
    const hasValue = Boolean(effectiveValue)

    // Merge the forwarded ref with our internal one so we can imperatively focus/clear.
    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        ;(internalRef as MutableRefObject<HTMLInputElement | null>).current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node
      },
      [ref],
    )

    const focusInput = () => internalRef.current?.focus()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    }

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('')
      } else {
        onClear?.()
      }
      focusInput()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && hasValue) {
        e.preventDefault()
        handleClear()
      }
      onKeyDown?.(e)
    }

    const handleContainerClick = () => focusInput()

    const handleBackClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onBack?.()
    }

    return (
      <div
        className={cn('rds-search', containerClassName)}
        data-size={size}
        data-focused={isFocused || undefined}
        data-has-value={hasValue || undefined}
        data-has-back-button={showBackButton || undefined}
        data-disabled={disabled || undefined}
        onClick={handleContainerClick}
        role="presentation"
      >
        {showBackButton ? (
          <button
            type="button"
            className="rds-search__back"
            onClick={handleBackClick}
            aria-label="Volver"
            disabled={disabled}
          >
            <ChevronLeft
              className="rds-search__back-icon"
              size={24}
              strokeWidth={2}
              aria-hidden
            />
          </button>
        ) : (
          <span className="rds-search__icon" aria-hidden="true">
            <SearchIcon size={24} strokeWidth={2} />
          </span>
        )}

        <input
          ref={setRef}
          type="text"
          className={cn('rds-search__input', className)}
          placeholder={placeholder}
          value={effectiveValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label={ariaLabel ?? placeholder ?? 'Buscar'}
          {...props}
        />

        {hasValue && !disabled ? (
          <button
            type="button"
            className="rds-search__clear"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <X size={16} strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </div>
    )
  },
)

Search.displayName = 'Search'
