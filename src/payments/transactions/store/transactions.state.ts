import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Transaction, TransactionsService } from '../../shared/services/transactions/transactions.service';

import * as TransactionsActions from './transactions.actions';

export interface TransactionsStateModel {
  transactions: Transaction[];
  totalNumberOfTransactions: number;
  isLoading: boolean;
  filter?: any;
}

@State<TransactionsStateModel>({
  name: 'transactions',
  defaults: {
    transactions: [],
    totalNumberOfTransactions: 0,
    isLoading: false,
    filter: ''
  }
})

@Injectable()
export class TransactionsState {
  @Selector()
  static transactions(state: TransactionsStateModel) {
    return state.transactions;
  }

  @Selector()
  static totalNumberOfTransactions(state: TransactionsStateModel) {
    return state.totalNumberOfTransactions;
  }

  @Selector()
  static isLoading(state: TransactionsStateModel) {
    return state.isLoading;
  }

  @Selector()
  static filter(state: TransactionsStateModel) {
    return state.filter;
  }

  constructor(private transactionsService: TransactionsService) {
  }

  @Action(TransactionsActions.GetAllPaymentTransactions, { cancelUncompleted: true })
  getAllTransactions(ctx: StateContext<TransactionsStateModel>, { payload }: TransactionsActions.GetAllPaymentTransactions) {
    ctx.patchState({ isLoading: true });
    return this.transactionsService.getAllPaymentTransactions(payload)
      .pipe(
        tap(response => {
          ctx.patchState({
            transactions: response.items,
            totalNumberOfTransactions: response.totalNumberOfItems,
            isLoading: false
          });
        }),
        catchError(error => {
          ctx.patchState({ isLoading: false });
          return throwError(error);
        })
      );
  }

  @Action(TransactionsActions.SetTransactionStatusFilter)
  setStatusFilter(ctx: StateContext<TransactionsStateModel>, { payload }: TransactionsActions.SetTransactionStatusFilter) {
    ctx.patchState({ filter: payload });
  }
}
