import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  constructor(
    private readonly auth: AngularFireAuth
  ) {

  }

  public get user$(): Observable<User> {
    return this.userSource$.asObservable();
  }

  public getCurrentUser(): User {
    return this._userSource$.getValue();
  }

  private _userSource$: BehaviorSubject<User>;
  private get userSource$(): BehaviorSubject<User> {
    if (!this._userSource$) {
      this._userSource$ = new BehaviorSubject<User>(undefined);
      this.auth.user.subscribe(this._userSource$);
    }
    return this._userSource$;
  }
}