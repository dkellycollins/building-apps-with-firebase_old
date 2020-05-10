import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {

  }

  public getTransactionsTotalForUser(): Observable<TransactionsTotalResponse> {
    const url = `${environment.functions.api}/getTransactionsTotalForUser`;

    return this.userService.user$.pipe(
      filter(user => !!user),
      take(1),
      switchMap(user => this.httpClient.get<TransactionsTotalResponse>(url, { params: { userUid: user.uid }}))
    );
  }
}

export interface TransactionsTotalResponse {
  transactionsTotal: number;
}