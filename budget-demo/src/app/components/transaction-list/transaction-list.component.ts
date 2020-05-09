import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from 'src/app/models/transaction.model';
import { MatDialog } from '@angular/material/dialog';
import { TransactionNewComponent } from '../transaction-new/transaction-new.component';
import { FirestoreTransactionService } from 'src/app/services/firestore-transaction.service';
import { ApiService } from 'src/app/services/api.service';
import { shareReplay, switchMap, map } from 'rxjs/operators';
import { TransactionImageComponent } from '../transaction-image/transaction-image.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  public transactions$: Observable<Array<TransactionModel>>;
  public transactionsTotal$: Observable<number>;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly dialog: MatDialog,
    private readonly apiService: ApiService
  ) { }

  public ngOnInit(): void {
    this.transactions$ = this.transactionService.transactions$;
    this.refreshTransactionsTotal();
  }

  public async createTransaction(): Promise<void> {
    const dialog = this.dialog.open(TransactionNewComponent);
    
    await dialog.afterClosed().toPromise();
    this.refreshTransactionsTotal();
  }

  public showTransaction(transaction: TransactionModel): void {
    this.dialog.open(TransactionImageComponent, {
      data: { transactionId: transaction.id }
    });
  }

  private refreshTransactionsTotal(): void {
    this.transactionsTotal$ = this.apiService.getTransactionsTotalForUser().pipe(
      map(response => response.transactionsTotal)
    );
  }
}
