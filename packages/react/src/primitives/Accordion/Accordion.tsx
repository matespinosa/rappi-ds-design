import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { ChevronDown } from '@rappi-ds/icons'
import { cn } from '../../lib/cn'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Label shown in the header trigger. */
  title: ReactNode
  /** Optional supporting text below the title. */
  subtitle?: ReactNode
  /** Optional icon anchored to the left of the header. */
  icon?: ReactNode
  /**
   * Optional content placed between the text group and the chevron.
   * If the slot contains interactive elements, call `event.stopPropagation()`
   * on their handlers to prevent toggling the accordion.
   */
  slotRight?: ReactNode
  /** Panel body — revealed when the accordion is open. */
  children?: ReactNode

  /** Uncontrolled: initial open state. Default `false`. */
  defaultOpen?: boolean
  /** Controlled: open state. Pair with `onOpenChange`. */
  open?: boolean
  /** Called when the accordion opens or closes. */
  onOpenChange?: (open: boolean) => void

  disabled?: boolean
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      subtitle,
      icon,
      slotRight,
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      disabled = false,
      id: providedId,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const id = providedId ?? `rds-accordion-${generatedId}`
    const triggerId = `${id}-trigger`
    const contentId = `${id}-content`

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen

    const toggle = () => {
      if (disabled) return
      const next = !isOpen
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    }

    const handleSlotRightClick = (e: MouseEvent) => {
      // Prevent slotRight clicks from toggling the accordion
      e.stopPropagation()
    }

    return (
      <div
        ref={ref}
        className={cn('rds-accordion', className)}
        data-open={isOpen || undefined}
        data-disabled={disabled || undefined}
        {...props}
      >
        <button
          id={triggerId}
          type="button"
          className="rds-accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={contentId}
          disabled={disabled}
          onClick={toggle}
        >
          {icon ? (
            <span className="rds-accordion__icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}

          <span className="rds-accordion__text">
            <span className="rds-accordion__title">{title}</span>
            {subtitle ? (
              <span className="rds-accordion__subtitle">{subtitle}</span>
            ) : null}
          </span>

          {slotRight ? (
            <div
              className="rds-accordion__slot-right"
              onClick={handleSlotRightClick}
            >
              {slotRight}
            </div>
          ) : null}

          <span className="rds-accordion__chevron-pill" aria-hidden="true">
            <ChevronDown
              className="rds-accordion__chevron-icon"
              size={16}
              strokeWidth={2}
            />
          </span>
        </button>

        <div
          id={contentId}
          className="rds-accordion__body"
          role="region"
          aria-labelledby={triggerId}
        >
          <div className="rds-accordion__content">{children}</div>
        </div>
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'
