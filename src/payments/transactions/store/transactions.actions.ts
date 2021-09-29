export class GetAllPaymentTransactions {
  static readonly type = '[Transactions] Get All Payment Transactions';

  constructor(public payload: any) {
  }
}

export class SetTransactionStatusFilter {
  static readonly type = '[Transactions] Set Status Filter';

  constructor(public payload: string) {
  }
}
