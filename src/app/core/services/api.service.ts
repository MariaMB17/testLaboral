import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, of, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotifyService } from './notify.service';
import { KeyStorage, StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiUrl: string = environment.server;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _notifyService: NotifyService,
    private _storageService: StorageService,
    private _authService: AuthService
  ) {}

  /**
   * 
   * @param url 
   * @param params Se pasa un objeto con los parametros
   * que se necesitan para realizar la petición y estos pueden
   * ser de tipo string, numerico o booleano
   * @returns Un registro en especifico segun los parametros
   * @description Permite hacer la peticion al servidor
   * para retornar un registro o varios registros en 
   * especifico
   */
  public get(
    url: string
  ): Observable<any> {
    return this._httpClient
      .get<any>(this._apiUrl + url)
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  /**
   * 
   * @param url Correponde a la url del endPoint
   * @param body 
   * @param params Corresponde al JSON que contiene 
   * la data qeu sera guardada
   * @returns Retorna un objeto donde se puede observar si 
   * se guardo con exito la data, en caso que no se haya guardado
   * retorna un objeto especificando los errores y la propiedad especifica
   * del JSON donde esta el error
   */
  public post(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .post<any>(this._apiUrl + url, body, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  /**
   * 
   * @param url Correponde a la url del endPoint
   * @param body 
   * @returns 
   */
  public put(url: string, body: any): Observable<any> {
    return this._httpClient
      .put<any>(this._apiUrl + url, body)
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  /**
   * 
   * @param url Correponde a la url del endPoint
   * @param params correponde al id del registro que se desea borrar
   * @returns 
   */
  public deleteByParams(
    url: string
  ): Observable<any> {
    return this._httpClient
      .request<any>('delete', this._apiUrl + url)
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  /*public loginWithCredentials(
    user: string,
    password: string,
    rememberUser: boolean
  ): Observable<boolean> {
    return this.get('/Login/LoginBrickControl', { user, password }).pipe(
      map((res: BusinessResult) => {
        this._processLogin(res, false, rememberUser);
        return res['isSuccess'];
      })
    );
  }*/

  public loginGuard(): Observable<boolean | UrlTree> {
    if (this._authService.isLoggedIn) {
      return of(true);
    } else /*if (this._storageService.getValue(KeyStorage.TOKEN)) {
      return this.loginByApiKey();
    } else*/ {
      this.logout();
      return of(this._router.parseUrl('/auth/login'));
    }
  }

  /*public loginByApiKey(): Observable<boolean> {
    if (this._networkService.connectionStatus === StatusConnection.ONLINE) {
      return this.get('/Login/LoginBrickControlByApiKey').pipe(
        map((res: BusinessResult) => {
          this._processLogin(res, true, false);
          return res['isSuccess'];
        })
      );
    } else {
      return of(false);
    }
  }*/

  /**
   * @name logout
   * @return {void}
   */
  public logout(): void {}

  private _handleError(_parent: ApiService, error: any): Observable<never> {
    this._notifyService.showNotification('error', 'server response error');
    if (
      (error.status === 401 || error.status === 400) &&
      error.url &&
      !error.url.endsWith('/login')
    ) {}
    return throwError(error);
  }

  private _toStringParams(params: Object): HttpParams {
    let refactoParams: { [key: string]: string } = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        refactoParams[key] = value.toString();
      } else {
        refactoParams[key] = value;
      }
    });

    return new HttpParams({ fromObject: refactoParams });
  }

  private async _processLogin() {}
}
