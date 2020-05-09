import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageImageService {

  constructor(
    private readonly fireStorage: AngularFireStorage,
    private readonly userService: UserService
  ) { }

  public async upload(transactionId: string, file: File): Promise<void> {
    const fullPath = this.getFullPath(transactionId);

    await this.fireStorage.ref(fullPath).put(file);
  }

  public getImageUrl(transactionId: string): Observable<string> {
    const fullPath = this.getFullPath(transactionId);

    return this.fireStorage.ref(fullPath).getDownloadURL();
  }

  private getFullPath(transactionId: string): string {
    const user = this.userService.getCurrentUser();
    return `users/${user.uid}/transactions/${transactionId}/defaultImage`;
  }
  
}