import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { TableState } from '../shared/store/table.state';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './containers/transactions/transactions.component';


@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule,
    NgxsModule.forFeature([TableState])
  ]
})
export class TransactionsModule { }
