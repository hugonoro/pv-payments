import { TableModel } from './table.state';

export class InitTableState {
  static readonly type = '[Table] Init Table State';

  constructor(public payload: { tableKey: string, defaults: TableModel }) {
  }
}

export class SetPaging {
  static readonly type = '[Table] Set Paging';

  constructor(public payload: { tableKey: string, limit: number, offset: number }) {
  }
}
