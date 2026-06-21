import { type ReactNode } from 'react'
import { type ThemeName } from '@rappi-ds/tokens'

interface ThemeProviderProps {
  theme?: ThemeName
  children: ReactNode
}

/**
 * Sets the active design system theme via the data-theme attribute.
 * Uses display:contents so it is invisible to flex/grid layout parents.
 * Import base.css and the selected theme CSS before using this provider.
 */
export function ThemeProvider({ theme = 'food', children }: ThemeProviderProps) {
  return (
    <div data-theme={theme} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
