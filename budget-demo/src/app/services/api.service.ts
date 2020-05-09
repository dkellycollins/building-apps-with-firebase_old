import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly auth: AngularFireAuth
  ) {

  }

  public getTotalForUser(): Observable<{ totalAmount: number}> {
    return this.user$.pipe(
      filter(user => !!user),
      switchMap(user => this.httpClient.get<{ totalAmount: number }>(environment.functions.api, { params: { userUid: user.uid }}))
    );
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