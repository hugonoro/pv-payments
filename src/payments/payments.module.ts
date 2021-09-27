import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
