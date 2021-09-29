import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { PaymentsModule } from '../payments/payments.module';
import { TableState } from '../payments/shared/store/table.state';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ngxsConfig } from './ngxs.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PaymentsModule,
    NgxsModule.forRoot([], ngxsConfig),
    NgxsStoragePluginModule.forRoot({
        key: [
          TableState
        ]
      }
    ),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Payments Store'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
