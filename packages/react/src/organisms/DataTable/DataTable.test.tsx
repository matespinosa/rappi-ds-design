// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardTable } from './CardTable'
import { DataTable, type DataTableColumn } from './DataTable'
import { TableCell, TableHeaderCell } from './TableCell'

interface Merchant {
  id: string
  name: string
  city: string
  status: string
  amount: string
  selectable?: boolean
}

const rows: Merchant[] = [
  {
    id: 'merchant-1',
    name: 'Tienda Centro',
    city: 'Bogotá',
    status: 'Activa',
    amount: '$42.000',
  },
  {
    id: 'merchant-2',
    name: 'Tienda Norte',
    city: 'Medellín',
    status: 'Pausada',
    amount: '$18.000',
    selectable: false,
  },
]

const columns: DataTableColumn<Merchant>[] = [
  {
    id: 'name',
    header: 'Comercio',
    renderCell: (row) => row.name,
    mobileRole: 'title',
  },
  {
    id: 'city',
    header: 'Ciudad',
    renderCell: (row) => row.city,
    mobileRole: 'meta',
  },
  {
    id: 'status',
    header: 'Estado',
    renderCell: (row) => row.status,
    mobileRole: 'status',
  },
  {
    id: 'amount',
    header: 'Ventas',
    renderCell: (row) => row.amount,
    align: 'end',
    mobileRole: 'field',
    mobileValueEmphasis: 'strong',
  },
]

afterEach(cleanup)

describe('TableCell', () => {
  it('preserves native table semantics and slot content', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell id="name-header">Name</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell headers="name-header" leading="L" title="Secondary" trailing="T">
              Value
            </TableCell>
          </tr>
        </tbody>
      </table>,
    )

    expect(screen.getByRole('columnheader', { name: 'Name' }).getAttribute('scope')).toBe('col')
    const cell = screen.getByRole('cell')
    expect(cell.tagName).toBe('TD')
    expect(cell.getAttribute('headers')).toBe('name-header')
    expect(cell.textContent).toContain('LSecondaryValueT')
  })
})

describe('CardTable', () => {
  it.each([
    ['two-columns', 'default'],
    ['two-columns', 'compact'],
    ['stacked', 'default'],
    ['stacked', 'compact'],
  ] as const)('renders %s / %s without becoming interactive', (layout, density) => {
    render(
      <CardTable
        aria-label={`${layout}-${density}`}
        title="Tienda"
        layout={layout}
        density={density}
        fields={[{ id: 'city', label: 'Ciudad', value: 'Bogotá' }]}
      />,
    )

    const card = screen.getByRole('article', { name: `${layout}-${density}` })
    expect(card.getAttribute('data-layout')).toBe(layout)
    expect(card.getAttribute('data-density')).toBe(density)
    expect(card.getAttribute('tabindex')).toBeNull()
    expect(within(card).getByText('Ciudad').tagName).toBe('DT')
    expect(within(card).getByText('Bogotá').tagName).toBe('DD')
  })

  it('renders at most two explicit actions', () => {
    render(
      <CardTable
        title="Tienda"
        selectionControl={<input type="checkbox" aria-label="Seleccionar tienda" />}
        actions={[
          <button key="one">One</button>,
          <button key="two">Two</button>,
          <button key="three">Three</button>,
        ]}
      />,
    )

    expect(screen.getByRole('checkbox', { name: 'Seleccionar tienda' })).toBeTruthy()
    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.queryByRole('button', { name: 'Three' })).toBeNull()
  })

  it('renders selection before heading and outside the action region', () => {
    const { container } = render(
      <CardTable
        title="Tienda"
        selectionControl={<input type="checkbox" aria-label="Seleccionar tienda" />}
        actions={[<button key="edit">Editar</button>]}
      />,
    )

    const header = container.querySelector('.rds-card-table__header') as HTMLElement
    const selection = container.querySelector('.rds-card-table__selection') as HTMLElement
    const heading = container.querySelector('.rds-card-table__heading') as HTMLElement
    const actions = container.querySelector('.rds-card-table__actions') as HTMLElement

    expect(Array.from(header.children)).toEqual([selection, heading, actions])
    expect(within(selection).getByRole('checkbox')).toBeTruthy()
    expect(within(actions).queryByRole('checkbox')).toBeNull()
  })
})

describe('DataTable', () => {
  it('renders native headers with explicit cell associations', () => {
    render(<DataTable rows={rows} columns={columns} getRowId={(row) => row.id} />)

    const table = screen.getByRole('table', { name: 'Tabla de datos' })
    expect(within(table).getAllByRole('columnheader')).toHaveLength(columns.length)
    const firstDataCell = within(table).getAllByRole('cell')[0]
    expect(firstDataCell.getAttribute('headers')).toContain('name')
  })

  it('maps mobile roles consistently into CardTable anatomy', () => {
    const { container } = render(
      <DataTable rows={[rows[0]]} columns={columns} getRowId={(row) => row.id} />,
    )

    const mobile = container.querySelector('.rds-data-table__mobile') as HTMLElement
    expect(within(mobile).getByText('Tienda Centro')).toBeTruthy()
    expect(within(mobile).getByText('Bogotá')).toBeTruthy()
    expect(within(mobile).getByText('Activa')).toBeTruthy()
    expect(within(mobile).getByText('Ventas').tagName).toBe('DT')
    expect(within(mobile).getByText('$42.000').tagName).toBe('DD')
  })

  it('keeps mobile selection separate from actions and disables non-selectable rows', () => {
    const actionColumns: DataTableColumn<Merchant>[] = [
      ...columns,
      {
        id: 'action',
        header: 'Acción',
        renderCell: (row) => <button aria-label={`Editar ${row.name}`}>Editar</button>,
        mobileRole: 'action',
      },
    ]
    const { container } = render(
      <DataTable
        rows={rows}
        columns={actionColumns}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        selectedRowIds={[]}
        onSelectionChange={() => undefined}
        isRowSelectable={(row) => row.selectable !== false}
      />,
    )

    const cards = Array.from(container.querySelectorAll('.rds-card-table'))
    const firstSelection = cards[0].querySelector('.rds-card-table__selection') as HTMLElement
    const firstActions = cards[0].querySelector('.rds-card-table__actions') as HTMLElement
    const secondSelection = cards[1].querySelector('.rds-card-table__selection') as HTMLElement

    expect(within(firstSelection).getByRole('checkbox')).toBeTruthy()
    expect(within(firstActions).queryByRole('checkbox')).toBeNull()
    expect(within(firstActions).getByRole('button', { name: 'Editar Tienda Centro' })).toBeTruthy()
    expect(
      (
        within(secondSelection).getByRole('checkbox', {
          name: 'Seleccionar Tienda Norte',
        }) as HTMLInputElement
      ).disabled,
    ).toBe(true)
  })

  it('selects only selectable rows on the current page and preserves external IDs', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    render(
      <DataTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        selectedRowIds={['external-row']}
        onSelectionChange={onSelectionChange}
        isRowSelectable={(row) => row.selectable !== false}
      />,
    )

    const table = screen.getByRole('table')
    await user.click(
      within(table).getByRole('checkbox', {
        name: 'Seleccionar todas las filas de esta página',
      }),
    )

    expect(onSelectionChange).toHaveBeenCalledWith(['external-row', 'merchant-1'])
    expect(
      (
        within(table).getByRole('checkbox', {
          name: 'Seleccionar Tienda Norte',
        }) as HTMLInputElement
      ).disabled,
    ).toBe(true)
  })

  it('exposes the indeterminate page-selection state', () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        selectedRowIds={['merchant-1']}
        onSelectionChange={() => undefined}
      />,
    )

    const selectAll = within(screen.getByRole('table')).getByRole('checkbox', {
      name: 'Seleccionar todas las filas de esta página',
    }) as HTMLInputElement
    expect(selectAll.indeterminate).toBe(true)
    expect(selectAll.getAttribute('data-indeterminate')).toBe('true')
  })

  it('keeps pagination controlled and does not change row data', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <DataTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={{ page: 1, totalPages: 3, onPageChange }}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Página 2' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
    expect(screen.getAllByText('Tienda Centro').length).toBeGreaterThan(0)
  })

  it.each(['loading', 'empty', 'error'] as const)('renders the typed %s state', (status) => {
    const state =
      status === 'loading'
        ? ({ status, label: 'Cargando comercios' } as const)
        : ({ status, title: `${status} title`, description: `${status} description` } as const)
    const { container } = render(
      <DataTable rows={rows} columns={columns} getRowId={(row) => row.id} state={state} />,
    )

    expect(container.querySelector('.rds-data-table')?.getAttribute('data-state')).toBe(status)
    if (status === 'loading') {
      expect(screen.getAllByRole('status', { name: 'Cargando comercios' })).toHaveLength(2)
    } else {
      expect(screen.getAllByText(`${status} title`)).toHaveLength(2)
    }
  })
})
