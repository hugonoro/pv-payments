import { ColumnDef } from '../../../shared/models/table-config';

export const columnDef: ColumnDef[] = [
  {
    field: 'id',
    header: 'ID',
    type: 'text'
  },
  {
    field: 'amount',
    header: 'Amount',
    type: 'number'
  },
  {
    field: 'currency',
    header: 'Currency',
    type: 'text'
  },
  {
    field: 'description',
    header: 'Description',
    type: 'text'
  },
  {
    field: 'status',
    header: 'Status',
    type: 'enum'
  },
  {
    field: 'createdAt',
    header: 'Created At',
    type: 'date'
  },
]
