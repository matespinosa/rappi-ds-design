import {
  forwardRef,
  useState,
  useCallback,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { ChevronLeft, ChevronRight } from '@rappi-ds/icons'
import { Button } from '../Button'
import { cn } from '../../lib/cn'

// ─── Types ───────────────────────────────────────────────────────────────────

export type CalendarVariant = 'single' | 'double'

export interface CalendarRange {
  start: Date | null
  end: Date | null
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant?: CalendarVariant
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  rangeValue?: CalendarRange
  defaultRangeValue?: CalendarRange
  onRangeChange?: (range: CalendarRange) => void
  defaultMonth?: Date
  minDate?: Date
  maxDate?: Date
  onConfirm?: (date: Date | null) => void
  onApply?: (range: CalendarRange) => void
  onCancel?: () => void
  confirmLabel?: string
  applyLabel?: string
  cancelLabel?: string
}

// ─── Date utilities ───────────────────────────────────────────────────────────

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const MONTHS_ABBR = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date())
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function getMonthGrid(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1)
  // Convert Sunday=0 to Monday=0 system
  const dow = (firstDay.getDay() + 6) % 7
  const gridStart = new Date(year, month, 1 - dow)

  const grid: Date[][] = []
  for (let row = 0; row < 6; row++) {
    const week: Date[] = []
    for (let col = 0; col < 7; col++) {
      const dayOffset = row * 7 + col
      week.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + dayOffset))
    }
    grid.push(week)
  }
  return grid
}

function formatRangeText(range: CalendarRange): string {
  if (!range.start) return '—'
  const fmt = (d: Date) => `${MONTHS_ABBR[d.getMonth()]} ${d.getDate()}`
  if (!range.end) return fmt(range.start)
  return `${fmt(range.start)} – ${fmt(range.end)}`
}

// ─── Day state ────────────────────────────────────────────────────────────────

type DayState =
  | 'default'
  | 'today'
  | 'selected'
  | 'range-start'
  | 'range-end'
  | 'in-range'
  | 'range-preview'
  | 'disabled'
  | 'outside-month'

function getDayState(
  date: Date,
  viewMonth: number,
  variant: CalendarVariant,
  selectedDate: Date | null,
  range: CalendarRange,
  hoverDate: Date | null,
  minDate?: Date,
  maxDate?: Date,
): DayState {
  // Outside current month
  if (date.getMonth() !== viewMonth) return 'outside-month'

  const stripped = stripTime(date)

  // Disabled (minDate / maxDate)
  if (minDate && stripped < stripTime(minDate)) return 'disabled'
  if (maxDate && stripped > stripTime(maxDate)) return 'disabled'

  if (variant === 'single') {
    if (selectedDate && isSameDay(date, selectedDate)) return 'selected'
    if (isToday(date)) return 'today'
    return 'default'
  }

  // Double / range mode
  const { start, end } = range

  if (start && isSameDay(date, start)) {
    // It's the start date
    if (end || (hoverDate && hoverDate > start)) return 'range-start'
    return 'selected'
  }

  if (end && isSameDay(date, end)) return 'range-end'

  if (start && end && stripped > stripTime(start) && stripped < stripTime(end)) {
    return 'in-range'
  }

  // Hover preview
  if (start && !end && hoverDate) {
    const strippedStart = stripTime(start)
    const strippedHover = stripTime(hoverDate)
    if (isSameDay(date, hoverDate)) return 'range-preview'
    if (
      strippedHover > strippedStart &&
      stripped > strippedStart &&
      stripped < strippedHover
    ) {
      return 'range-preview'
    }
    if (
      strippedHover < strippedStart &&
      stripped < strippedStart &&
      stripped > strippedHover
    ) {
      return 'range-preview'
    }
  }

  if (isToday(date)) return 'today'
  return 'default'
}

// ─── MonthPanel (internal) ────────────────────────────────────────────────────

interface MonthPanelProps {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
  selectedDate: Date | null
  range: CalendarRange
  hoverDate: Date | null
  onDayClick: (date: Date) => void
  onDayEnter: (date: Date) => void
  onDayLeave: () => void
  variant: CalendarVariant
  minDate?: Date
  maxDate?: Date
  showPrev?: boolean
  showNext?: boolean
}

function MonthPanel({
  year,
  month,
  onPrev,
  onNext,
  selectedDate,
  range,
  hoverDate,
  onDayClick,
  onDayEnter,
  onDayLeave,
  variant,
  minDate,
  maxDate,
  showPrev = true,
  showNext = true,
}: MonthPanelProps) {
  const grid = getMonthGrid(year, month)

  const handleDayKeyDown = (e: KeyboardEvent<HTMLDivElement>, date: Date, state: DayState) => {
    if (state === 'disabled' || state === 'outside-month') return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onDayClick(date)
    }
  }

  const handleDayClick = (e: MouseEvent<HTMLDivElement>, date: Date, state: DayState) => {
    if (state === 'disabled' || state === 'outside-month') return
    e.preventDefault()
    onDayClick(date)
  }

  return (
    <div className="rds-calendar__panel" role="grid" aria-label={`${MONTHS[month]} ${year}`}>
      {/* Navigation */}
      <div className="rds-calendar__nav" role="row">
        {showPrev ? (
          <button
            type="button"
            className="rds-calendar__nav-btn"
            onClick={onPrev}
            aria-label="Mes anterior"
          >
            <ChevronLeft size={24} aria-hidden />
          </button>
        ) : (
          <span className="rds-calendar__nav-btn" aria-hidden="true" style={{ visibility: 'hidden' }} />
        )}
        <span className="rds-calendar__month-title" aria-live="polite">
          {MONTHS[month]} {year}
        </span>
        {showNext ? (
          <button
            type="button"
            className="rds-calendar__nav-btn"
            onClick={onNext}
            aria-label="Mes siguiente"
          >
            <ChevronRight size={24} aria-hidden />
          </button>
        ) : (
          <span className="rds-calendar__nav-btn" aria-hidden="true" style={{ visibility: 'hidden' }} />
        )}
      </div>

      {/* Week header */}
      <div className="rds-calendar__week-header" role="row">
        {WEEK_DAYS.map((day, i) => (
          <div
            key={i}
            className="rds-calendar__week-header-cell"
            role="columnheader"
            aria-label={['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'][i]}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {grid.map((week, wi) => (
        <div key={wi} className="rds-calendar__week" role="row">
          {week.map((date, di) => {
            const state = getDayState(
              date,
              month,
              variant,
              selectedDate,
              range,
              hoverDate,
              minDate,
              maxDate,
            )
            const isDisabledOrOutside = state === 'disabled' || state === 'outside-month'
            const isSelected =
              state === 'selected' ||
              state === 'range-start' ||
              state === 'range-end'

            return (
              <div
                key={di}
                role="gridcell"
                className="rds-calendar__day"
                data-state={state}
                aria-selected={isSelected || undefined}
                aria-disabled={state === 'disabled' || undefined}
                tabIndex={isDisabledOrOutside ? -1 : 0}
                onClick={(e) => handleDayClick(e, date, state)}
                onKeyDown={(e) => handleDayKeyDown(e, date, state)}
                onMouseEnter={() => !isDisabledOrOutside && onDayEnter(date)}
                onMouseLeave={onDayLeave}
              >
                <span className="rds-calendar__day-inner">
                  {date.getDate()}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      variant = 'single',
      value,
      defaultValue = null,
      onChange,
      rangeValue,
      defaultRangeValue,
      onRangeChange,
      defaultMonth,
      minDate,
      maxDate,
      onConfirm,
      onApply,
      onCancel,
      confirmLabel = 'Seleccionar',
      applyLabel = 'Seleccionar',
      cancelLabel = 'Cancelar',
      className,
      ...props
    },
    ref,
  ) => {
    const isDouble = variant === 'double'

    // ── Controlled/uncontrolled single value ──
    const isControlledSingle = value !== undefined
    const [internalDate, setInternalDate] = useState<Date | null>(defaultValue)
    const selectedDate = isControlledSingle ? value : internalDate

    // ── Controlled/uncontrolled range value ──
    const isControlledRange = rangeValue !== undefined
    const [internalRange, setInternalRange] = useState<CalendarRange>(
      defaultRangeValue ?? { start: null, end: null },
    )
    const range = isControlledRange ? rangeValue : internalRange

    // ── View month state ──
    const getInitialViewMonth = (): Date => {
      if (defaultMonth) return new Date(defaultMonth.getFullYear(), defaultMonth.getMonth(), 1)
      if (!isDouble && selectedDate) return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      if (isDouble && range.start) return new Date(range.start.getFullYear(), range.start.getMonth(), 1)
      return new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }

    const [viewMonth, setViewMonth] = useState<Date>(getInitialViewMonth)
    const [hoverDate, setHoverDate] = useState<Date | null>(null)

    // ── Navigation ──
    const handlePrev = useCallback(() => {
      setViewMonth((prev) => addMonths(prev, -1))
    }, [])

    const handleNext = useCallback(() => {
      setViewMonth((prev) => addMonths(prev, 1))
    }, [])

    // ── Day click ──
    const handleDayClick = useCallback(
      (date: Date) => {
        if (!isDouble) {
          // Single mode
          if (!isControlledSingle) setInternalDate(date)
          onChange?.(date)
        } else {
          // Range mode
          const { start, end } = range
          let newRange: CalendarRange

          if (!start || (start && end)) {
            // Start fresh selection
            newRange = { start: date, end: null }
          } else {
            // Have start, no end — set end if >= start, else restart
            const strippedStart = stripTime(start)
            const strippedDate = stripTime(date)
            if (strippedDate >= strippedStart) {
              newRange = { start, end: date }
            } else {
              newRange = { start: date, end: null }
            }
          }

          if (!isControlledRange) setInternalRange(newRange)
          onRangeChange?.(newRange)
        }
      },
      [isDouble, isControlledSingle, isControlledRange, onChange, onRangeChange, range],
    )

    const handleDayEnter = useCallback((date: Date) => {
      setHoverDate(date)
    }, [])

    const handleDayLeave = useCallback(() => {
      setHoverDate(null)
    }, [])

    // ── Computed second panel month ──
    const nextViewMonth = addMonths(viewMonth, 1)

    // ── Shared panel props ──
    const sharedPanelProps = {
      selectedDate,
      range,
      hoverDate,
      onDayClick: handleDayClick,
      onDayEnter: handleDayEnter,
      onDayLeave: handleDayLeave,
      variant,
      minDate,
      maxDate,
    }

    return (
      <div
        ref={ref}
        className={cn('rds-calendar', className)}
        role="application"
        aria-label={isDouble ? 'Selector de rango de fechas' : 'Selector de fecha'}
        data-variant={variant}
        {...props}
      >
        {!isDouble ? (
          /* ── Single layout ── */
          <div className="rds-calendar__inner">
            <MonthPanel
              {...sharedPanelProps}
              year={viewMonth.getFullYear()}
              month={viewMonth.getMonth()}
              onPrev={handlePrev}
              onNext={handleNext}
            />
            <div className="rds-calendar__footer">
              <Button
                appearance="secondary"
                onClick={() => onConfirm?.(selectedDate ?? null)}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        ) : (
          /* ── Double layout ── */
          <>
            <div className="rds-calendar__panels">
              <MonthPanel
                {...sharedPanelProps}
                year={viewMonth.getFullYear()}
                month={viewMonth.getMonth()}
                onPrev={handlePrev}
                onNext={handleNext}
                showNext={false}
              />
              <div className="rds-calendar__divider-v" aria-hidden="true" />
              <MonthPanel
                {...sharedPanelProps}
                year={nextViewMonth.getFullYear()}
                month={nextViewMonth.getMonth()}
                onPrev={handlePrev}
                onNext={handleNext}
                showPrev={false}
              />
            </div>
            <div className="rds-calendar__divider-h" aria-hidden="true" />
            <div className="rds-calendar__footer">
              <span className="rds-calendar__range-text" aria-live="polite">
                {formatRangeText(range)}
              </span>
              <Button
                appearance="secondary"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
              <Button
                appearance="primary"
                onClick={() => onApply?.(range)}
              >
                {applyLabel}
              </Button>
            </div>
          </>
        )}
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'
