import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionListComponent },
  { path: '**', redirectTo: 'transactions'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
