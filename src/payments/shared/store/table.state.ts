import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { FilterMetadata } from 'primeng/api';
import { ColumnDef } from '../models/table-config';

import * as TableActions from './table.actions';

export interface TableModel {
  columns: ColumnDef[];
  filters?: {
    [key: string]: FilterMetadata
  };
  limit: number;
  offset: number;
}

export interface TableStateModel {
  [key: string]: TableModel;
}

@State<TableStateModel>({
  name: 'tables',
  defaults: {}
})
@Injectable()
export class TableState {
  [key: string]: any

  static table(tableKey: string) {
    return createSelector([TableState], (state: TableState) => {
      return state[tableKey];
    });
  }

  static tableColumns(tableKey: string) {
    return createSelector([TableState], (state: TableState) => {
      return state[tableKey].columns;
    });
  }

  static tableOffset(tableKey: string) {
    return createSelector([TableState], (state: TableState) => {
      return state[tableKey].offset;
    });
  }

  static tableLimit(tableKey: string) {
    return createSelector([TableState], (state: TableState) => {
      return state[tableKey].limit;
    });
  }

  @Action(TableActions.InitTableState)
  initTable(ctx: StateContext<TableStateModel>, { payload }: TableActions.InitTableState) {
    const { defaults } = payload;
    ctx.setState(
      patch({
        [payload.tableKey]: defaults
      })
    );
  }

  @Action(TableActions.SetPaging)
  setPaging(ctx: StateContext<TableStateModel>, { payload }: TableActions.SetPaging) {
    ctx.setState(
      patch({
        [payload.tableKey]: patch({
          limit: payload.limit,
          offset: payload.offset
        })
      })
    );
  }
}
