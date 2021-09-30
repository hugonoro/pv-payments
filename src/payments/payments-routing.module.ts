import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';
import { AppGuard } from './shared/guards/app.guard';

const routes: Routes = [
  {
    path: 'transactions',
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {
}
