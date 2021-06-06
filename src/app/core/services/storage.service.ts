import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setValue(
    key: KeyStorage | string,
    val: any
  ): void {
    localStorage.setItem(key, JSON.stringify(val));
  }
  /**
   * getValue
   */
  public getValue(
    key: KeyStorage | string,
    defaultVal?: any
  ): any {
    let result: any;
    const value: any = localStorage[key]
      ? JSON.parse(localStorage[key])
      : defaultVal || false;
    result = value;
    return result;
  }
}
export enum KeyStorage {
  TOKEN = 'token',
  EMAIL = 'email',
  DATE_LAST_LOGIN = 'date_last_login',
  USER_DATA = 'user_data',
  IS_LOGGED_IN = 'is_logged_in',
  IS_SHOW_CHAT = 'is_show_chat'
}
