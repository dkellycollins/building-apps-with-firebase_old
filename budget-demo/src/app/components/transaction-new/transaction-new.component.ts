import { Component, OnInit } from '@angular/core';
import { LocalStorageTransactionService } from 'src/app/services/local-storage-transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly transactionService: LocalStorageTransactionService,
    private readonly dialog: MatDialogRef<TransactionNewComponent>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: '',
      date: new Date(),
      amount: 0
    });
  }

  public cancel(): void {
    this.dialog.close(null);
  }

  public submit(value: any): void {
    this.transactionService.add(value);
    this.dialog.close(null);
  }

}
