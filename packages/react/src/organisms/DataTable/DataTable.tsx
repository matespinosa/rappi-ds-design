import { useId, type CSSProperties, type ReactNode } from 'react'
import { Checkbox } from '../../primitives/Checkbox'
import { Pagination } from '../Pagination'
import { cn } from '../../lib/cn'
import {
  CardTable,
  type CardTableDensity,
  type CardTableField,
  type CardTableLayout,
} from './CardTable'
import { TableCell, TableHeaderCell, type TableCellAlign } from './TableCell'

export type DataTableMobileRole = 'title' | 'meta' | 'status' | 'field' | 'action' | 'hidden'

export interface DataTableColumn<T> {
  id: string
  header: ReactNode
  renderCell: (row: T) => ReactNode
  align?: TableCellAlign
  width?: CSSProperties['width']
  mobileRole?: DataTableMobileRole
  /** Mobile field label. Defaults to `header`. */
  mobileLabel?: ReactNode
  mobileValueEmphasis?: 'standard' | 'strong'
}

export type DataTableState =
  | { status: 'ready' }
  | { status: 'loading'; rows?: number; label?: string }
  | { status: 'empty'; title?: ReactNode; description?: ReactNode; content?: ReactNode }
  | { status: 'error'; title?: ReactNode; description?: ReactNode; content?: ReactNode }

export interface DataTablePagination {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface DataTableProps<T> {
  rows: readonly T[]
  columns: readonly DataTableColumn<T>[]
  getRowId: (row: T) => string
  getRowLabel?: (row: T, index: number) => string
  selectedRowIds?: readonly string[]
  onSelectionChange?: (selectedRowIds: string[]) => void
  isRowSelectable?: (row: T) => boolean
  pagination?: DataTablePagination
  state?: DataTableState
  mobileLayout?: CardTableLayout
  mobileDensity?: CardTableDensity
  /** Accessible name for the native table. */
  ariaLabel?: string
  /** Optional visible or screen-reader caption for the native table. */
  caption?: ReactNode
  className?: string
}

function normalizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-')
}

function DataTableStateContent({
  state,
}: {
  state: Exclude<DataTableState, { status: 'ready' } | { status: 'loading' }>
}) {
  if (state.content) return <>{state.content}</>

  const title =
    state.title ??
    (state.status === 'empty' ? 'No hay datos para mostrar' : 'No pudimos cargar los datos')
  const description =
    state.description ??
    (state.status === 'empty'
      ? 'Ajusta los filtros o vuelve más tarde.'
      : 'Intenta nuevamente en unos momentos.')

  return (
    <div className="rds-data-table__state" role={state.status === 'error' ? 'alert' : 'status'}>
      <span className="rds-data-table__state-title">{title}</span>
      <span className="rds-data-table__state-description">{description}</span>
    </div>
  )
}

function DataTableLoading({ rows, label }: { rows: number; label: string }) {
  return (
    <div className="rds-data-table__loading" role="status" aria-label={label}>
      {Array.from({ length: rows }, (_, index) => (
        <span className="rds-data-table__skeleton-row" aria-hidden="true" key={index}>
          <span className="rds-data-table__skeleton-line" />
          <span className="rds-data-table__skeleton-line" />
          <span className="rds-data-table__skeleton-line" />
        </span>
      ))}
    </div>
  )
}

/**
 * Responsive data display. It renders one semantic table for desktop and derives
 * a presentational CardTable per row below 768px from the same column definitions.
 */
export function DataTable<T>({
  rows,
  columns,
  getRowId,
  getRowLabel = (_, index) => `fila ${index + 1}`,
  selectedRowIds = [],
  onSelectionChange,
  isRowSelectable = () => true,
  pagination,
  state = { status: 'ready' },
  mobileLayout = 'two-columns',
  mobileDensity = 'default',
  ariaLabel = 'Tabla de datos',
  caption,
  className,
}: DataTableProps<T>) {
  const instanceId = normalizeId(useId())
  const selectionEnabled = Boolean(onSelectionChange)
  const selected = new Set(selectedRowIds)
  const selectableRows = rows.filter(isRowSelectable)
  const selectableIds = selectableRows.map(getRowId)
  const selectedOnPage = selectableIds.filter((id) => selected.has(id))
  const allSelected = selectableIds.length > 0 && selectedOnPage.length === selectableIds.length
  const someSelected = selectedOnPage.length > 0 && !allSelected

  const changeRowSelection = (row: T, checked: boolean) => {
    const next = new Set(selectedRowIds)
    const rowId = getRowId(row)
    if (checked) next.add(rowId)
    else next.delete(rowId)
    onSelectionChange?.(Array.from(next))
  }

  const changePageSelection = (checked: boolean) => {
    const next = new Set(selectedRowIds)
    selectableIds.forEach((id) => {
      if (checked) next.add(id)
      else next.delete(id)
    })
    onSelectionChange?.(Array.from(next))
  }

  const renderMobileCard = (row: T, rowIndex: number) => {
    const byRole = (role: DataTableMobileRole) =>
      columns.filter((column) => (column.mobileRole ?? 'field') === role)
    const titleColumn = byRole('title')[0]
    const metaColumns = byRole('meta')
    const statusColumns = byRole('status')
    const actionColumns = byRole('action')
    const fieldColumns = byRole('field')
    const rowId = getRowId(row)
    const selectable = isRowSelectable(row)
    const title = titleColumn?.renderCell(row) ?? rowId
    const fields: CardTableField[] = fieldColumns.map((column) => ({
      id: column.id,
      label: column.mobileLabel ?? column.header,
      value: column.renderCell(row),
      emphasis: column.mobileValueEmphasis,
    }))
    const actions = actionColumns.map((column) => column.renderCell(row))
    const selectionControl = selectionEnabled ? (
      <Checkbox
        checked={selected.has(rowId)}
        disabled={!selectable}
        onChange={(event) => changeRowSelection(row, event.currentTarget.checked)}
        aria-label={`Seleccionar ${getRowLabel(row, rowIndex)}`}
      />
    ) : null

    return (
      <CardTable
        key={rowId}
        selectionControl={selectionControl}
        title={title}
        meta={metaColumns.map((column) => (
          <span key={column.id}>{column.renderCell(row)}</span>
        ))}
        status={statusColumns.map((column) => (
          <span key={column.id}>{column.renderCell(row)}</span>
        ))}
        fields={fields}
        actions={actions}
        layout={mobileLayout}
        density={mobileDensity}
        aria-label={getRowLabel(row, rowIndex)}
      />
    )
  }

  const loadingRows = state.status === 'loading' ? (state.rows ?? 3) : 0
  const stateContent =
    state.status === 'empty' || state.status === 'error' ? (
      <DataTableStateContent state={state} />
    ) : null

  return (
    <section
      className={cn('rds-data-table', className)}
      data-state={state.status}
      aria-busy={state.status === 'loading' || undefined}
    >
      <div className="rds-data-table__desktop">
        <div className="rds-data-table__table-frame">
          <table className="rds-data-table__table" aria-label={caption ? undefined : ariaLabel}>
            {caption ? <caption>{caption}</caption> : null}
            <colgroup>
              {selectionEnabled ? <col className="rds-data-table__selection-column" /> : null}
              {columns.map((column) => (
                <col key={column.id} style={{ width: column.width }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {selectionEnabled ? (
                  <TableHeaderCell className="rds-data-table__selection-cell" align="center">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      disabled={selectableIds.length === 0}
                      onChange={(event) => changePageSelection(event.currentTarget.checked)}
                      aria-label="Seleccionar todas las filas de esta página"
                    />
                  </TableHeaderCell>
                ) : null}
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.id}
                    id={`${instanceId}-${normalizeId(column.id)}`}
                    align={column.align}
                  >
                    {column.header}
                  </TableHeaderCell>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.status === 'ready'
                ? rows.map((row, rowIndex) => {
                    const rowId = getRowId(row)
                    const selectable = isRowSelectable(row)
                    return (
                      <tr key={rowId}>
                        {selectionEnabled ? (
                          <TableCell className="rds-data-table__selection-cell" align="center">
                            <Checkbox
                              checked={selected.has(rowId)}
                              disabled={!selectable}
                              onChange={(event) =>
                                changeRowSelection(row, event.currentTarget.checked)
                              }
                              aria-label={`Seleccionar ${getRowLabel(row, rowIndex)}`}
                            />
                          </TableCell>
                        ) : null}
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            headers={`${instanceId}-${normalizeId(column.id)}`}
                            align={column.align}
                          >
                            {column.renderCell(row)}
                          </TableCell>
                        ))}
                      </tr>
                    )
                  })
                : null}
              {state.status === 'loading' ? (
                <tr>
                  <td colSpan={columns.length + (selectionEnabled ? 1 : 0)}>
                    <DataTableLoading rows={loadingRows} label={state.label ?? 'Cargando datos'} />
                  </td>
                </tr>
              ) : null}
              {stateContent ? (
                <tr>
                  <td colSpan={columns.length + (selectionEnabled ? 1 : 0)}>{stateContent}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rds-data-table__mobile">
        {state.status === 'ready' ? rows.map(renderMobileCard) : null}
        {state.status === 'loading' ? (
          <DataTableLoading rows={loadingRows} label={state.label ?? 'Cargando datos'} />
        ) : null}
        {stateContent}
      </div>

      {pagination && state.status !== 'loading' ? (
        <div className="rds-data-table__pagination">
          <Pagination {...pagination} />
        </div>
      ) : null}
    </section>
  )
}
