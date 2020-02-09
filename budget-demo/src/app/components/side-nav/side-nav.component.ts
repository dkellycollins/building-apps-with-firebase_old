import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User, auth } from 'firebase';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(
    private readonly angularFireAuth: AngularFireAuth
  ) { }

  public user$: Observable<User>;

  public ngOnInit(): void {
    this.user$ = this.angularFireAuth.user;
  }

  public login(): void {
    this.angularFireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  public logout(): void {
    this.angularFireAuth.auth.signOut();
  }

}
