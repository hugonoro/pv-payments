import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PagedTransactions {
  items: Transaction[];
  pageSize: number;
  totalNumberOfItems: number;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  createdAt: Date;
}

export enum TransactionStatus {
  CAPTURED,
  COMPLETED,
  CREATED,
  FAILED,
  SETTLED
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllPaymentTransactions(params?: HttpParams): Observable<PagedTransactions> {
    return this.httpClient.get<PagedTransactions>('http://localhost:4200/api/payments', { params });
  }
}
