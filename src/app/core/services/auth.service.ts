import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  public get isLoggedIn(): boolean {
    return this._isLoggedIn$.getValue();
  }

  public set isLoggedIn(isLoggedIn) {
    this._isLoggedIn$.next(isLoggedIn);
  }
}
