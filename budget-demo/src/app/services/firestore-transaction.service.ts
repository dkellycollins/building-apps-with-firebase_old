import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter, switchMap } from 'rxjs/operators';
import { firestore, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly userService: UserService
  ) { }

  public get transactions$(): Observable<Array<TransactionModel>> {
    return this.userService.user$.pipe(
      filter(user => !!user),
      switchMap(user => this.firestore.collection<TransactionDto>('transactions', ref => ref.where('owner', '==', user.uid)).valueChanges()),
      map((collection) => {
        return collection.map(dto => {
          return {
            category: dto.category,
            amount: dto.amount,
            date: dto.date.toDate()
          };
        });
      })
    )
  }

  public async add(transaction: TransactionModel): Promise<void> {
    await this.firestore.collection<TransactionDto>('transactions').add({
      category: transaction.category,
      amount: transaction.amount,
      date: firestore.Timestamp.fromDate(transaction.date),
      owner: this.userService.getCurrentUser().uid
    });
  }
}

class TransactionDto {
  category: string;
  amount: number;
  date: firestore.Timestamp;
  owner: string;
}
