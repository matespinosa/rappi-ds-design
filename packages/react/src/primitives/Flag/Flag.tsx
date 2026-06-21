import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { flagAssets } from './flagAssets'

export type FlagCountry = keyof typeof flagAssets

export interface FlagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  country?: FlagCountry
  decorative?: boolean
}

const countryNames: Record<FlagCountry, string> = {
  ARG: 'Argentina',
  BRA: 'Brazil',
  CL: 'Chile',
  COL: 'Colombia',
  CR: 'Costa Rica',
  EC: 'Ecuador',
  ESP: 'Spain',
  MEX: 'Mexico',
  PE: 'Peru',
  URG: 'Uruguay',
}

/**
 * Displays a country flag from the Rappi market set.
 * Use `decorative` when adjacent text or a parent control already names the country.
 */
export const Flag = forwardRef<HTMLSpanElement, FlagProps>(
  ({ country = 'COL', decorative = false, className, 'aria-label': ariaLabel, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('rds-flag', className)}
      {...props}
      data-country={country}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : (ariaLabel ?? countryNames[country])}
    >
      <img className="rds-flag__image" src={flagAssets[country]} alt="" />
    </span>
  ),
)

Flag.displayName = 'Flag'
