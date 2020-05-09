import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from 'src/app/models/transaction.model';
import { MatDialog } from '@angular/material/dialog';
import { TransactionNewComponent } from '../transaction-new/transaction-new.component';
import { FirestoreTransactionService } from 'src/app/services/firestore-transaction.service';
import { TransactionImageComponent } from '../transaction-image/transaction-image.component';
import { shareReplay, switchMap, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  public totalAmount$: Observable<number>;
  public transactions$: Observable<Array<TransactionModel>>;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly functionsService: ApiService,
    private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.transactions$ = this.transactionService.transactions$.pipe(
      shareReplay(1)
    );
    this.totalAmount$ = this.transactions$.pipe(
      switchMap(() => this.functionsService.getTotalForUser()),
      map(response => response.totalAmount)
    );
  }

  public showTransaction(transaction: TransactionModel): void {
    this.dialog.open(TransactionImageComponent, {
      data: { transactionId: transaction.id }
    });
  }

  public createTransaction(): void {
    this.dialog.open(TransactionNewComponent);
  }

}
