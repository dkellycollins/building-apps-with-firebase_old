import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreImageService {

  constructor(
    private readonly fireStorage: AngularFireStorage
  ) { }

  public async upload(transactionId: string, file: File): Promise<void> {
    const path = `transactions/${transactionId}/receipt`;
    await this.fireStorage.ref(path).put(file);
  }

  public getImageUrl(transactionId: string): Observable<string> {
    const path = `transactions/${transactionId}/receipt`;
    return this.fireStorage.ref(path).getDownloadURL();
  }
  
}
