import { Component, OnInit, Input, Inject } from "@angular/core";
import { FirestorageImageService } from 'src/app/services/firestorage-image.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-image',
  templateUrl: './transaction-image.component.html',
  styleUrls: ['./transaction-image.component.css']
})
export class TransactionImageComponent implements OnInit {

  public imageUrl$: Observable<string>;

  constructor(
    private readonly imageService: FirestorageImageService,
    private readonly dialog: MatDialogRef<TransactionImageComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { transactionId: string }
  ) { }

  public ngOnInit(): void {
    this.imageUrl$ = this.imageService.getImageUrl(this.data.transactionId);
  }

  public cancel(): void {
    this.dialog.close();
  }
}