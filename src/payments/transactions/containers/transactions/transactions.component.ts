import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ColumnDef } from '../../../shared/models/table-config';
import { TableState } from '../../../shared/store/table.state';

import * as TableActions from './../../../shared/store/table.actions';

import {
  PagedTransactions,
  Transaction,
  TransactionsService
} from '../../../shared/services/transactions/transactions.service';
import { columnDef } from './transactions.config';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Select(TableState.tableColumns('transactions')) tableColumns$!: Observable<ColumnDef[]>;
  @Select(TableState.tableLimit('transactions')) tableLimit$!: Observable<number>;
  @Select(TableState.tableOffset('transactions')) tableOffset$!: Observable<number>;

  transactions: Transaction[] = [];

  loading: boolean = true;

  constructor(private store: Store,
              private transactionsService: TransactionsService) {
  }

  ngOnInit(): void {
    this.initTable();
    this.transactionsService.getAllPaymentTransactions()
      .subscribe(data => {
        this.transactions = data.items;
        this.loading = false;
      });
  }

  initTable() {
    const tableState = this.store.selectSnapshot(TableState.table('transactions'));
    if (!tableState) {
      this.store.dispatch(new TableActions.InitTableState({
        tableKey: 'transactions',
        defaults: {
          columns: columnDef,
          limit: 5,
          offset: 0
        }
      }));
    }
  }
}
