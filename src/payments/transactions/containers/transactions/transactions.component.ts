import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../shared/services/transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: any;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.getAllPaymentTransactions()
      .subscribe( paymentList => this.transactions = paymentList)
  }

}
