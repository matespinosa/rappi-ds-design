import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
  Button,
  CardTable,
  Checkbox,
  DataTable,
  Tag,
  Toggle,
  type DataTableColumn,
} from '@rappi-ds/react'

interface Merchant {
  id: string
  name: string
  owner: string
  status: 'Activa' | 'Pausada'
  sales: string
}

const merchants: Merchant[] = [
  {
    id: '1',
    name: 'Tienda Centro',
    owner: 'María Fernanda Rodríguez',
    status: 'Activa',
    sales: '$42.000',
  },
  {
    id: '2',
    name: 'Tienda Norte con un nombre deliberadamente largo',
    owner: 'Carlos Gómez',
    status: 'Pausada',
    sales: '$18.500',
  },
  {
    id: '3',
    name: 'Tienda Sur',
    owner: 'Andrea Ruiz',
    status: 'Activa',
    sales: '$76.200',
  },
]

const columns: DataTableColumn<Merchant>[] = [
  {
    id: 'name',
    header: 'Comercio',
    renderCell: (row) => row.name,
    mobileRole: 'title',
    width: '32%',
  },
  {
    id: 'owner',
    header: 'Responsable',
    renderCell: (row) => row.owner,
    mobileRole: 'field',
    mobileLabel: 'Responsable',
  },
  {
    id: 'status',
    header: 'Estado',
    align: 'center',
    renderCell: (row) => (
      <Tag intent={row.status === 'Activa' ? 'positive' : 'warning'}>{row.status}</Tag>
    ),
    mobileRole: 'status',
  },
  {
    id: 'sales',
    header: 'Ventas',
    align: 'end',
    renderCell: (row) => row.sales,
    mobileRole: 'field',
    mobileValueEmphasis: 'strong',
  },
  {
    id: 'availability',
    header: 'Disponible',
    align: 'center',
    renderCell: (row) => <Toggle size="sm" aria-label={`Cambiar disponibilidad de ${row.name}`} />,
    mobileRole: 'action',
  },
]

const meta: Meta<typeof DataTable> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Responsive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(1)
    return (
      <DataTable
        rows={merchants}
        columns={columns}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.name}
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        isRowSelectable={(row) => row.id !== '2'}
        pagination={{ page, totalPages: 8, onPageChange: setPage }}
      />
    )
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <DataTable
        rows={[]}
        columns={columns}
        getRowId={(row) => row.id}
        state={{ status: 'loading', rows: 3 }}
      />
      <DataTable
        rows={[]}
        columns={columns}
        getRowId={(row) => row.id}
        state={{ status: 'empty' }}
      />
      <DataTable
        rows={[]}
        columns={columns}
        getRowId={(row) => row.id}
        state={{
          status: 'error',
          content: (
            <div style={{ padding: 24, textAlign: 'center' }}>
              No fue posible cargar los comercios. <Button size="sm">Reintentar</Button>
            </div>
          ),
        }}
      />
    </div>
  ),
}

export const CardTableMatrix: Story = {
  render: () => (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(280px, 383px))', gap: 24 }}
    >
      {(['two-columns', 'stacked'] as const).flatMap((layout) =>
        (['default', 'compact'] as const).map((density) => (
          <CardTable
            key={`${layout}-${density}`}
            selectionControl={<Checkbox aria-label={`Seleccionar ${layout} ${density}`} />}
            title={`${layout} / ${density}`}
            titleAdornment={<Tag size="sm">Pro</Tag>}
            meta="ID 10482"
            status={<Tag intent="positive">Activa</Tag>}
            fields={[
              { id: 'owner', label: 'Responsable', value: 'María Fernanda Rodríguez' },
              { id: 'sales', label: 'Ventas', value: '$42.000', emphasis: 'strong' },
            ]}
            actions={[
              <Button key="edit" size="xs" appearance="tertiary">
                Editar
              </Button>,
            ]}
            layout={layout}
            density={density}
          />
        )),
      )}
    </div>
  ),
}
