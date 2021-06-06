import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
//import { AuthService } from '@Core/services/auth.service';
//import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from '@Core/services/notify.service';
import { delay } from 'rxjs/operators';
//import { TabService } from 'src/app/layout/services/tab.service';
@Injectable({
  providedIn: 'root',
})
export class PermissionRouteGuard implements CanActivate {
  constructor(
    //private _authService: AuthService,
    //private _translateService: TranslateService,
    private _notifyService: NotifyService,
    private _router: Router,
    //private _tabService: TabService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    /*if (this._authService.userLogged && this._authService.isLoggedIn) {
      const findPermision = this._authService.userLogged.loginResultPermissions.find(
        (permission) => permission.readonly_permissionId === next.data?.id
      );

      if (findPermision) {
        return true;
      }
    }*/

    // if (!isAgreePermission) {
    const messageError = this._translateService.instant(
      'It is not possible to access this url'
    );
    this._notifyService.showNotification('warn', messageError);
    if (this._tabService.previusUrl !== null) return false;
    else
      return of(this._router.createUrlTree(['/'], { replaceUrl: true })).pipe(
        delay(500)
      );

    // return isAgreePermission;
  }
}
