import {
  createContext,
  forwardRef,
  useContext,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

interface RadioGroupContextValue {
  name: string
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {}

export interface RadioGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  name: string
  legend: ReactNode
  visuallyHiddenLegend?: boolean
}

/**
 * Native radio input for mutually exclusive choices.
 * Compose it with a visible label and place related radios inside RadioGroup.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, name, ...props }, ref) => {
    const group = useContext(RadioGroupContext)

    return (
      <span className="rds-radio-control">
        <input
          ref={ref}
          type="radio"
          name={name ?? group?.name}
          className={cn('rds-radio', className)}
          {...props}
        />
        <span className="rds-radio__indicator" aria-hidden="true" />
      </span>
    )
  },
)

Radio.displayName = 'Radio'

/**
 * Semantic fieldset for a related set of radio inputs.
 * Supplies a shared name and accessible legend to descendant Radio controls.
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ name, legend, visuallyHiddenLegend = false, className, children, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ name }}>
      <fieldset ref={ref} className={cn('rds-radio-group', className)} {...props}>
        <legend
          className={cn('rds-radio-group__legend', visuallyHiddenLegend && 'rds-visually-hidden')}
        >
          {legend}
        </legend>
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  ),
)

RadioGroup.displayName = 'RadioGroup'
