import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '@Core/services/auth.service'
import { StorageService, KeyStorage } from '@Core/services/storage.service'

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  constructor(
    private _router : Router,
    private _authService: AuthService,
    private _storageService: StorageService
  ) { }

  public loginGuard(): Observable<boolean | UrlTree> {
    if (this._authService.isLoggedIn) {
      return of(true);
    //} else if (this._storageService.getValue(KeyStorage.TOKEN)) {
      //return this.loginByApiKey();
    } else {
      this.logout();
      return of(this._router.parseUrl('/auth/login'));
    }
  }

  logout() {
    this._storageService.setValue(KeyStorage.TOKEN, false);
    this._router.navigate(['auth/login']);
  }
}
