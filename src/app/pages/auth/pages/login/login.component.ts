import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@Core/services/auth.service'
import { UserService } from '@Services/security/user.service';
import { NotifyService } from '@Core/services/notify.service';
import { KeyStorage, StorageService } from '@Core/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public noVisible: boolean = false
  public showLoadBar: boolean = false;
  public loginFormErrors: any = {
    email: {},
    password: {},
  };

  constructor(
    private _router: Router,
    private _authService: AuthService,    
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _notifyService: NotifyService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberUser: [true],
    });
    this.loginForm.valueChanges.subscribe(() => {
      this._onLoginFormValuesChanged();
    });
   }

  ngOnInit(): void {}

  private _onLoginFormValuesChanged(): void {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.loginFormErrors[field] = {};
      // Get the control
      const control = this.loginForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  /**
   * @name login
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite loguear al usuario en
   * la aplicacion, si existe se redirecciona al
   * dashboard, si no, pasa al modulo de registrar
   * usuario
   */
  public login(): void {
    this.showLoadBar = true;
    const data = this.loginForm.value
    console.log(this.loginForm.value)
    this._userService
      .login(this.loginForm.value)
      .subscribe((resp: any) => {
        if(resp?.access_token) {
          this._authService.isLoggedIn = true;
          this._storageService.setValue(KeyStorage.IS_LOGGED_IN, true);
          if (data.rememberUser === true) {
            this._storageService.setValue(
              KeyStorage.TOKEN, resp.access_token);
          }
          this._router.navigate(['dashboards/grafica']);
        } else {
          this._notifyService.showNotification('warn', 'No se pudo iniciar sesion');
          this._router.navigate(['auth/login']);
        }
      })
  }

  /**
   * @name registerUser
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite registrar redireccionar
   * al modulo de registro de usuario, para la creación
   * del mismo
   */
  public registerUser(): void {
    this._router.navigate(['/security/users']);

  }
}
