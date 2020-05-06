import { Component, OnInit } from '@angular/core';
import { LocalStorageTransactionService } from 'src/app/services/local-storage-transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreTransactionService } from 'src/app/services/firestore-transaction.service';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { FirestoreImageService } from 'src/app/services/firestore-image.service';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {

  public hasError: boolean;
  public form: FormGroup;

  constructor(
    private readonly transactionService: FirestoreTransactionService,
    private readonly imageService: FirestoreImageService,
    private readonly dialog: MatDialogRef<TransactionNewComponent>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category: '',
      date: new Date(),
      amount: 0,
      image: null
    });

    this.form.valueChanges.subscribe(console.log);
  }

  public cancel(): void {
    this.dialog.close(null);
  }

  public async submit(value: any): Promise<void> {
    this.hasError = false;
    try {
      const transactionId = await this.transactionService.add(value);

      const fileInput = value.image as FileInput;
      const file = fileInput.files[0];
      await this.imageService.upload(transactionId, file)

      this.dialog.close(null);
    }
    catch (e) {
      console.error(e);
      this.hasError = true;
    }
  }
}
