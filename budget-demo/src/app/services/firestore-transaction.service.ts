import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter, first, switchMap, tap } from 'rxjs/operators';
import { firestore, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTransactionService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly auth: AngularFireAuth
  ) { }

  public get transactions$(): Observable<Array<TransactionModel>> {
    return this.user$.pipe(
      filter(user => !!user),
      tap(console.log),
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
      owner: this.user$.getValue().uid
    });
  }

  private _user$: BehaviorSubject<User>;
  private get user$(): BehaviorSubject<User> {
    if (!this._user$) {
      this._user$ = new BehaviorSubject<User>(undefined);
      this.auth.user.subscribe(this._user$);
    }
    return this._user$;
  }
}

class TransactionDto {
  category: string;
  amount: number;
  date: firestore.Timestamp;
  owner: string;
}
