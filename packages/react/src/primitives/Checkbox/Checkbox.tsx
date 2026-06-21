import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from 'react'
import { cn } from '../../lib/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Renders the mixed-selection state. Sets the DOM .indeterminate property
   * and adds the data-indeterminate attribute for CSS targeting.
   */
  indeterminate?: boolean
}

/**
 * Native checkbox control with support for the indeterminate state.
 * Compose with a <label> and optional helper/error text at the callsite;
 * do not embed business logic inside this primitive.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, className, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null)

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        ;(internalRef as React.MutableRefObject<HTMLInputElement | null>).current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      },
      [forwardedRef],
    )

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    return (
      <input
        ref={setRefs}
        type="checkbox"
        className={cn('rds-checkbox', className)}
        data-indeterminate={indeterminate || undefined}
        {...props}
      />
    )
  },
)

Checkbox.displayName = 'Checkbox'
