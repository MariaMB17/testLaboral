import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, 
  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, Params } from '@angular/router';
import { Serializer } from '@Core/util/serializer';
import { ApiService } from '@Core/services/api.service';
import { AuthService } from '@Core/services/auth.service';
import { User } from '@Model/security/user/user-model';
import { Any } from 'json2typescript';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _apiService: ApiService,
    /*private _authService: AuthService,
    private _router: Router,*/
  ) { }

  public login(data:any): Observable<any> {
    return this._apiService.post('/auth/login', data)
  }
  /**
   * @name save
   * @author Maria Alvarez
   * @version 1.0
   * @param data Correponde al modelo de usuario
   * que contiene los datos que seran guardados
   * @returns Un objeto con un mesaje de error o
   * exito, la data que se guardo
   */
  public save(data: User): Observable<any> {
    let body = this._convertSerializeModel(data)
    return this._apiService.post('/auth/userstest', body)
  }

  public update(data: User): Observable<any> {
    let id = data.id
    let body = this._convertSerializeModel(data)
    return this._apiService.put('/auth/userstest/'+id, body)
  }

  /**
   * 
   * @param user modelo de la data user
   * @returns el modelo user deserializado,
   * sin el _
   */
  private _convertSerializeModel(user: User): any {
    return Serializer.serialize(
      user instanceof User
        ? user
        : Serializer.deserialize(user, User)
    );
  }

  /**
   * @name delete
   * @author Maria Alvarez
   * @version 1.0
   * @returns Un objeto con un mesaje de error o
   * exito, la data que se guardo
   */
   public delete(id: number): Observable<any> {
    return this._apiService.deleteByParams('/auth/userstest/'+id );
  }

  /**
   * @name delete
   * @author Maria Alvarez
   * @version 1.0
   * @returns Un objeto con un mesaje de error o
   * exito, la data que se guardo
   */
   public buscarPorCedula(cedula: string): Observable<User>  {
    return this._apiService
      .get('/auth/userstest/search/'+cedula)
      .pipe(
        map((res: any) => {
          //@ts-ignore
          let user: User = null;
          console.log(user)
          if (res.status === 'ok') {
            //@ts-ignore
            user = Serializer.deserialize(res.data, User);
          }
          return user;
        })
      );
  }
}
