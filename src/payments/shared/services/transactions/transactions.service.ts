import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllPaymentTransactions(params?: HttpParams): Observable<any> {
    return this.httpClient.get('http://localhost:4200/api/payments')
  }
}
