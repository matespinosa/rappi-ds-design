import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type CardTableLayout = 'two-columns' | 'stacked'
export type CardTableDensity = 'default' | 'compact'

export interface CardTableField {
  id: string
  label: ReactNode
  value: ReactNode
  /** Makes a value visually stronger without encoding a business state. */
  emphasis?: 'standard' | 'strong'
}

export interface CardTableProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Dedicated leading region for row selection. */
  selectionControl?: ReactNode
  title: ReactNode
  titleAdornment?: ReactNode
  meta?: ReactNode
  status?: ReactNode
  fields?: readonly CardTableField[]
  /** Explicit controls only. At most two actions are rendered. */
  actions?: readonly ReactNode[]
  layout?: CardTableLayout
  density?: CardTableDensity
}

/**
 * Presentational mobile representation of one data row.
 * It is intentionally not clickable; actions must be explicit controls.
 */
export const CardTable = forwardRef<HTMLElement, CardTableProps>(function CardTable(
  {
    selectionControl,
    title,
    titleAdornment,
    meta,
    status,
    fields = [],
    actions = [],
    layout = 'two-columns',
    density = 'default',
    className,
    ...props
  },
  ref,
) {
  const visibleActions = actions.filter(Boolean).slice(0, 2)

  return (
    <article
      ref={ref}
      className={cn('rds-card-table', className)}
      data-layout={layout}
      data-density={density}
      {...props}
    >
      <header
        className="rds-card-table__header"
        data-has-selection={selectionControl ? 'true' : undefined}
      >
        {selectionControl ? (
          <span className="rds-card-table__selection">{selectionControl}</span>
        ) : null}
        <div className="rds-card-table__heading">
          <div className="rds-card-table__title-row">
            <span className="rds-card-table__title">{title}</span>
            {titleAdornment ? (
              <span className="rds-card-table__title-adornment">{titleAdornment}</span>
            ) : null}
          </div>
          {meta ? <div className="rds-card-table__meta">{meta}</div> : null}
        </div>
        {visibleActions.length ? (
          <div className="rds-card-table__actions">
            {visibleActions.map((action, index) => (
              <span className="rds-card-table__action" key={index}>
                {action}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {status ? <div className="rds-card-table__status">{status}</div> : null}

      {fields.length ? (
        <dl className="rds-card-table__fields">
          {fields.map((field) => (
            <div className="rds-card-table__field" key={field.id}>
              <dt className="rds-card-table__label">{field.label}</dt>
              <dd className="rds-card-table__value" data-emphasis={field.emphasis ?? 'standard'}>
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
})

CardTable.displayName = 'CardTable'
