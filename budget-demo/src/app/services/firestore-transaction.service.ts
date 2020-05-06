import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter, switchMap } from 'rxjs/operators';
import { firestore, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

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
      switchMap(user => this.firestore.collection<TransactionDto>('transactions', ref => ref.where('owner', '==', user.uid)).valueChanges({ idField: 'id' })),
      map((collection) => {
        console.log(collection);
        return collection.map(dto => {
          return {
            id: dto.id,
            category: dto.category,
            amount: dto.amount,
            date: dto.date.toDate()
          };
        });
      })
    )
  }

  public async add(transaction: TransactionModel): Promise<string> {
    const document = await this.firestore.collection<TransactionDto>('transactions').add({
      category: transaction.category,
      amount: transaction.amount,
      date: firestore.Timestamp.fromDate(transaction.date),
      owner: this.user$.getValue().uid
    });
    return document.id;
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
  id?: string;
  category: string;
  amount: number;
  date: firestore.Timestamp;
  owner: string;
}
