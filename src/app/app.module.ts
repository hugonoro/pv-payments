import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthModule } from '../auth/auth.module';
import { AuthState } from '../auth/store/auth.state';
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
    AuthModule,
    PaymentsModule,
    ToastModule,
    NgxsModule.forRoot([AuthState], ngxsConfig),
    NgxsStoragePluginModule.forRoot({
        key: [
          AuthState,
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
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
