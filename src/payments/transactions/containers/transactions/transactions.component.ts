import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnDef } from '../../../shared/models/table-config';
import { columnDef } from './transactions.config';

import { PagedTransactions, TransactionsService } from '../../../shared/services/transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions$: Observable<PagedTransactions> = new Observable<PagedTransactions>();
  tableColumns: ColumnDef[] = columnDef;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactions$ = this.transactionsService.getAllPaymentTransactions();
  }

}
