import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from 'src/app/models/transaction.model';
import { MatDialog } from '@angular/material/dialog';
import { TransactionNewComponent } from '../transaction-new/transaction-new.component';
import { FirestoreTransactionService } from 'src/app/services/firestore-transaction.service';
import { TransactionImageComponent } from '../transaction-image/transaction-image.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  public transactions$: Observable<Array<TransactionModel>>;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.transactions$ = this.transactionService.transactions$;
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
