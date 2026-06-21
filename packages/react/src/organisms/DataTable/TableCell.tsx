import { forwardRef, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type TableCellAlign = 'start' | 'center' | 'end'

interface TableCellContentProps {
  /** Optional element rendered before the text block. */
  leading?: ReactNode
  /** Optional emphasized line above the main content. */
  title?: ReactNode
  /** Optional element rendered after the text block. */
  trailing?: ReactNode
  /** Logical alignment that remains correct in RTL layouts. */
  align?: TableCellAlign
}

export interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align' | 'title'>, TableCellContentProps {}

export interface TableHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align' | 'title'>, TableCellContentProps {}

function CellContent({
  leading,
  title,
  trailing,
  children,
}: TableCellContentProps & { children?: ReactNode }) {
  return (
    <div className="rds-table-cell__inner">
      {leading ? <span className="rds-table-cell__leading">{leading}</span> : null}
      <span className="rds-table-cell__content">
        {title ? <span className="rds-table-cell__title">{title}</span> : null}
        {children !== undefined ? <span className="rds-table-cell__value">{children}</span> : null}
      </span>
      {trailing ? <span className="rds-table-cell__trailing">{trailing}</span> : null}
    </div>
  )
}

/**
 * Native table data cell. It must be rendered inside a `tr` and `table`.
 * Interactive content is composed through slots and remains its own focus target.
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ leading, title, trailing, align = 'start', children, className, ...props }, ref) => (
    <td ref={ref} className={cn('rds-table-cell', className)} data-align={align} {...props}>
      <CellContent leading={leading} title={title} trailing={trailing}>
        {children}
      </CellContent>
    </td>
  ),
)

TableCell.displayName = 'TableCell'

/**
 * Native column or row header cell. Defaults to `scope="col"`.
 */
export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    { leading, title, trailing, align = 'start', children, className, scope = 'col', ...props },
    ref,
  ) => (
    <th
      ref={ref}
      className={cn('rds-table-cell', 'rds-table-header-cell', className)}
      data-align={align}
      scope={scope}
      {...props}
    >
      <CellContent leading={leading} title={title} trailing={trailing}>
        {children}
      </CellContent>
    </th>
  ),
)

TableHeaderCell.displayName = 'TableHeaderCell'
