export interface ColumnDef {
  field: string;
  header: string;
  width?: number;
  type: 'number' | 'date' | 'text' | 'enum'
}
