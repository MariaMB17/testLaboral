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
  TOKEN = 'token'
}
