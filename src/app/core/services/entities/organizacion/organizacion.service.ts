import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, 
  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, Params } from '@angular/router';
import { Serializer } from '@Core/util/serializer';
import { ApiService } from '@Core/services/api.service';
import { AuthService } from '@Core/services/auth.service';
import { Organization } from '@Model/entities/organization/organization-model';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(
    private _apiService: ApiService,
    /*private _authService: AuthService,
    private _router: Router,*/
  ) { }

  public getListOrganizaciones(): Observable<Organization[]> {
    return this._apiService.get('/auth/organizacion').pipe(
      map((res: any) => {
        console.log(res.data)
        return this._getModels(res.data);
      })
    );
  }

  /** Convierte las respuestas de los servicios http a los modelos necesarios */
  private _getModels(list: any[]): Organization[] {
    if (!Array.isArray(list)) {
      return [];
    }
    //@ts-ignore
    return list.map((item: any) => Serializer.deserialize(item, Organization));
  }
}
