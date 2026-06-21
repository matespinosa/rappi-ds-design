import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

/* ─── Context ─── */

interface SegmentedControlContextValue {
  value: string
  onChange: (value: string) => void
  baseId: string
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null)

function useSegmentedControlContext(componentName: string) {
  const ctx = useContext(SegmentedControlContext)
  if (!ctx) throw new Error(`<${componentName}> must be used inside <SegmentedControl>`)
  return ctx
}

/* ─── Types ─── */

export interface SegmentedControlProps {
  /** Controlled selected value. */
  value: string
  /** Called when a new option is selected. */
  onChange: (value: string) => void
  children: ReactNode
  /** Accessible label for the control group (required for screen readers). */
  'aria-label': string
  className?: string
}

export interface SegmentedOptionProps {
  value: string
  children: ReactNode
  /** Icon rendered before the label text. */
  startIcon?: ReactNode
  /** Icon rendered after the label text. */
  endIcon?: ReactNode
  disabled?: boolean
  className?: string
}

/* ─── SegmentedControl ─── */

/**
 * Single-select pill-shaped control for switching between a small set of views
 * or filters (2–4 options).
 *
 * The active selection is shown via a sliding "thumb" that animates between
 * options using CSS transitions.
 *
 * Implements the ARIA `radiogroup` + `radio` pattern with roving tabindex
 * and arrow-key navigation.
 *
 * @example
 * <SegmentedControl value={view} onChange={setView} aria-label="Vista de pedidos">
 *   <SegmentedOption value="day">Hoy</SegmentedOption>
 *   <SegmentedOption value="week">Semana</SegmentedOption>
 *   <SegmentedOption value="month">Mes</SegmentedOption>
 * </SegmentedControl>
 */
export function SegmentedControl({
  value,
  onChange,
  children,
  'aria-label': ariaLabel,
  className,
}: SegmentedControlProps) {
  const baseId = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const isMountedRef = useRef(false)

  // Move the thumb to match the selected option position.
  // useLayoutEffect runs synchronously before paint so the initial
  // position is set without a visible transition.
  useLayoutEffect(() => {
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!track || !thumb) return

    const selected = track.querySelector<HTMLButtonElement>('[role="radio"][data-selected]')
    if (!selected) return

    if (!isMountedRef.current) {
      // First render — position instantly, no slide animation
      thumb.style.transition = 'none'
      thumb.style.left = `${selected.offsetLeft}px`
      thumb.style.width = `${selected.offsetWidth}px`
      // Force a reflow so the "no transition" state is committed before
      // re-enabling transition for future changes
      thumb.getBoundingClientRect()
      thumb.style.transition = ''
      isMountedRef.current = true
    } else {
      thumb.style.left = `${selected.offsetLeft}px`
      thumb.style.width = `${selected.offsetWidth}px`
    }
  }, [value])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!trackRef.current) return

      const options = Array.from(
        trackRef.current.querySelectorAll<HTMLButtonElement>(
          '[role="radio"]:not([disabled])',
        ),
      )
      if (!options.length) return

      const currentIndex = options.findIndex((o) => o === document.activeElement)

      let nextIndex: number | null = null
      if (e.key === 'ArrowRight') {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % options.length
      } else if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1
      } else if (e.key === 'Home') {
        nextIndex = 0
      } else if (e.key === 'End') {
        nextIndex = options.length - 1
      }

      if (nextIndex !== null) {
        e.preventDefault()
        options[nextIndex].focus()
        options[nextIndex].click()
      }
    },
    [],
  )

  return (
    <SegmentedControlContext.Provider value={{ value, onChange, baseId }}>
      <div
        ref={trackRef}
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn('rds-segmented-control', className)}
        onKeyDown={handleKeyDown}
      >
        {/* Animated thumb — slides under the selected option */}
        <span ref={thumbRef} className="rds-segmented-control__thumb" aria-hidden="true" />
        {children}
      </div>
    </SegmentedControlContext.Provider>
  )
}

SegmentedControl.displayName = 'SegmentedControl'

/* ─── SegmentedOption ─── */

export function SegmentedOption({
  value,
  children,
  startIcon,
  endIcon,
  disabled = false,
  className,
}: SegmentedOptionProps) {
  const { value: activeValue, onChange, baseId } = useSegmentedControlContext('SegmentedOption')
  const isSelected = value === activeValue

  return (
    <button
      type="button"
      id={`${baseId}-option-${value}`}
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
      tabIndex={isSelected ? 0 : -1}
      className={cn('rds-segmented-option', className)}
      data-selected={isSelected || undefined}
      data-disabled={disabled || undefined}
      onClick={() => !disabled && onChange(value)}
    >
      {startIcon ? (
        <span className="rds-segmented-option__icon" aria-hidden="true">
          {startIcon}
        </span>
      ) : null}
      <span className="rds-segmented-option__label">{children}</span>
      {endIcon ? (
        <span className="rds-segmented-option__icon" aria-hidden="true">
          {endIcon}
        </span>
      ) : null}
    </button>
  )
}

SegmentedOption.displayName = 'SegmentedOption'
