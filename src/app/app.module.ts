import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaymentsModule } from '../payments/payments.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaymentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
