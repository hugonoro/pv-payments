import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TRANSACTIONS_TABLE_KEY } from '../../../constants';
import { ColumnDef } from '../../../shared/models/table-config';
import { TableState } from '../../../shared/store/table.state';
import { TransactionsState } from '../../store/transactions.state';

import * as TableActions from './../../../shared/store/table.actions';
import * as TransactionsActions from './../../store/transactions.actions';

import { Transaction, TransactionStatus } from '../../../shared/services/transactions/transactions.service';
import { columnDef } from './transactions.config';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Select(TransactionsState.transactions) transactions$!: Observable<Transaction[]>;
  @Select(TransactionsState.totalNumberOfTransactions) totalNumberOfTransactions$!: Observable<number>;
  @Select(TransactionsState.isLoading) isLoading$!: Observable<boolean>;

  @Select(TableState.tableColumns(TRANSACTIONS_TABLE_KEY)) tableColumns$!: Observable<ColumnDef[]>;
  @Select(TableState.tableLimit(TRANSACTIONS_TABLE_KEY)) tableLimit$!: Observable<number>;
  @Select(TableState.tableOffset(TRANSACTIONS_TABLE_KEY)) tableOffset$!: Observable<number>;

  statusOptions: SelectItem [] = [];
  statusOptionsFiltered: SelectItem[] = [];
  statusFilter: FormControl = new FormControl();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initTable();
    this.populateStatusFilter();
    this.loadTableData();
  }

  initTable() {
    const tableState = this.store.selectSnapshot(TableState.table(TRANSACTIONS_TABLE_KEY));
    if (!tableState) {
      this.store.dispatch(new TableActions.InitTableState({
        tableKey: TRANSACTIONS_TABLE_KEY,
        defaults: {
          columns: columnDef,
          limit: 5,
          offset: 0
        }
      }));
    }
  }

  populateStatusFilter() {
    this.statusOptions = Object.values(TransactionStatus)
      .filter(value => typeof value === 'string')
      .map(value => ( { value } ));
  }

  loadTableData() {
    const { limit, offset } = this.store.selectSnapshot(TableState.table(TRANSACTIONS_TABLE_KEY));
    const filter = this.store.selectSnapshot(TransactionsState.filter);

    this.store.dispatch(new TransactionsActions.GetAllPaymentTransactions({
      page: offset / limit,
      size: limit,
      ...( filter ? { status: filter } : null )
    }));
  }

  onPaging(event: any) {
    this.store.dispatch(new TableActions.SetPaging({
      tableKey: TRANSACTIONS_TABLE_KEY,
      limit: event.rows,
      offset: event.first
    }));
    this.loadTableData();
  }

  onSearch(event: any) {
    this.statusOptionsFiltered = [...this.statusOptions.filter(item => item.value.includes(event.query))];
  }

  onSelect(event: any) {
    this.store.dispatch(new TableActions.SetPaging({ tableKey: TRANSACTIONS_TABLE_KEY, limit: 5, offset: 0 }));
    this.store.dispatch(new TransactionsActions.SetTransactionStatusFilter(event.value));
    this.loadTableData();
  }

  onClear() {
    this.store.dispatch(new TransactionsActions.SetTransactionStatusFilter(''));
    this.loadTableData();
  }
}

