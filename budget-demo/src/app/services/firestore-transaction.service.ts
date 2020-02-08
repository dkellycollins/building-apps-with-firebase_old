import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {

  constructor(
    private readonly firestore: AngularFirestore
  ) { }

  public get transactions$(): Observable<Array<TransactionModel>> {
    return this.firestore.collection<TransactionDto>('transactions')
      .valueChanges()
      .pipe(
        map((collection) => {
          return collection.map(dto => {
            return {
              category: dto.category,
              amount: dto.amount,
              date: dto.date.toDate()
            };
          });
        }) 
      );
  }

  public async add(transaction: TransactionModel): Promise<void> {
    await this.firestore.collection<TransactionDto>('transactions').add({
      category: transaction.category,
      amount: transaction.amount,
      date: firestore.Timestamp.fromDate(transaction.date)
    });
  }
}

class TransactionDto {
  category: string;
  amount: number;
  date: firestore.Timestamp
}
