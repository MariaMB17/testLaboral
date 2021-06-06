import { Component, 
  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serializer } from '@Core/util/serializer';
import { debounceTime, delay } from 'rxjs/operators';
import { User } from '@Model/security/user/user-model';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from '@Services/security/user.service';
import { NotifyService } from '@Core/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { preventSpecialKey } from '@Shared/helpers/prevent-special-key';
import { Organization } from '@Model/entities/organization/organization-model';
import { OrganizacionService } from '@Services/entities/organizacion/organizacion.service';
import * as moment from 'moment';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public noVisible: boolean = false
  public showLoadBar: boolean = false;
  public disabledBtnEliminar: boolean =  true;
  public optionOrnanizacion: Organization[] = [];
  //@ts-ignore
  public user = new User();
  public userFormErrors: any = {
    nombres: {},
    cedula: {},
    fechaNacimiento: {},
    email: {},
    organizacion: {}
  };

  public formControlUser: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,    
    private _userService: UserService,
    private _notifyService: NotifyService,
    private _organizacionService: OrganizacionService,
  ) {
    this.formControlUser = this._formBuilder.group({
      nombres:['', [Validators.required]],
      cedula: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      organizacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
    this.formControlUser.controls.fechaNacimiento.disable();
    this.formControlUser.valueChanges.subscribe((value) => {
      this._onLoginFormValuesChanged(value);
    });
   }   

  ngOnInit(): void {
    /**Se limpia la variable donde se almacenara la
     * lista de organizaciones
     */
    this.optionOrnanizacion = []
    /**
     * Se ejecuta el endPoint para listar las
     * organizaciones disponibles
     */
    this._organizacionService.getListOrganizaciones()
    .subscribe(
      (organization: Organization[]) => {
        this.optionOrnanizacion = organization
      })
  }

  private _onLoginFormValuesChanged(value: any): void {
    console.log(this.userFormErrors)
    for (const field in this.userFormErrors) {
      if (!this.userFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.userFormErrors[field] = {};
      // Get the control
      const control = this.formControlUser.get(field);
      if (control && control.dirty && !control.valid) {
        this.userFormErrors[field] = control.errors;
      }
    }
  }
  /**
   * @name asignarFechaNacimiento
   * @MatDatepickerInputEvent evento
   * @type Tipo de evento a ejecutar
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite asignar el valor
   * de la fecha de nacimiento al usuario
   */

   asignarFechaNacimiento(type: string, event: MatDatepickerInputEvent<Date>) {
    //@ts-ignore
    this.user.fechaNacimiento = moment(event.value).format('YYYY-MM-DD')
  }

  /**
   * @name changeInput
   * @param  KeyboardEvent y key dle modelo
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite determinar si los
   * caracteres de entrada son valido
   */
  public changeInputNombres(evt: KeyboardEvent, key: string): void {
    if (preventSpecialKey(evt)) return;
    //@ts-ignore
    const value = evt.target.value
    const patt = new RegExp(/^[A-Za-z\s]+$/g);
    if(!patt.test(value)) { 
      /* 
       * Remueve los numeros
       */
      this.formControlUser.patchValue({
        nombres: value.replace(/\d+$/g,''),
      });       
    }
    //@ts-ignore
    if (this.user[key] !== value) {
      //@ts-ignore
      this.user[key] = value
    }
  }

  /**
   * @name changeInput
   * @param  KeyboardEvent y key del modelo
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite determinar si los
   * caracteres de entrada son valido
   */
   public changeInput(evt: KeyboardEvent, key: string): void {
    if (preventSpecialKey(evt)) return;
    //@ts-ignore
    const value = evt.target.value
    //@ts-ignore
    if (this.user[key] !== value) {
      //@ts-ignore
      this.user[key] = value
      if(key === 'cedula' && value !== '') {
        this.showLoadBar = true
        this._userService.buscarPorCedula(value)
          .pipe(debounceTime(100))
          .subscribe((user: User) => {
            //@ts-ignore
            if(user.length > 0) {
              //@ts-ignore
              this.user = user[0]
              this.formControlUser.patchValue({
                nombres:this.user.nombres,
                fechaNacimiento: this.user.fechaNacimiento,
                telefono: this.user.telefono,
                organizacion: this.user.organizacionId,
                email: this.user.email
              })
              this.disabledBtnEliminar = false;
            } else {
              const newUser = new User()
              //@ts-ignore
              this.user = Serializer.deserialize(newUser, User)
              this.user.cedula = value
              this.formControlUser.patchValue({
                cedula:value
              })
              this.disabledBtnEliminar = true;
            }
            this.showLoadBar = false
          })
      }
    }
  }

  /**
   * @name changeOrganizacion
   * @MatSelectChange evento
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite asignar el valor
   * de la organizacion al modelo usuario
   */
  changeOrganizacion(evt: MatSelectChange) {
    this.user.organizacionId = evt?.value || 0 
  }  

  /**
   * @name save
   * @version 1.0
   * @author Maria Alvarez
   * @description Permite guardar o editar
   * la data del usuario
   * cuando usuario.id !== -1 se
   * editara la data, de lo contrario
   * sera un usuario nuevo
   */
  save(){
    this.showLoadBar = true
    this.disabledBtnEliminar = true
    if (this.formControlUser.valid) {
      if(this.user.id === -1) {
        let messageTimeSave = 'Error al guardar el usuario'
        let type = 'warn';
        this._userService.save(this.user)
          .subscribe((resp)=>{
            if(resp?.status === 'ok') {
              let type = 'success'
              messageTimeSave = resp.message  
              // se asigna lo que retorna la data al modelo de usuario           
              const newUser = Serializer.deserialize(resp.data, User) 
              //@ts-ignore
              this.user = newUser
              // se asignan los valores al formControl
              this.formControlUser.patchValue({
                nombres:this.user.nombres,
                cedula: this.user.cedula,
                telefono: this.user.telefono,
                organizacion: this.user.organizacionId,
                email: this.user.email
              })
              // se activa el boton eliminar
              this.disabledBtnEliminar = false
            }
            //Se mustra el mensaje
            this._notifyService.showNotification(type, messageTimeSave);
            //Se oculata la barra loading
            this.showLoadBar = false
            this.disabledBtnEliminar = false
          })
      } else {
        let messageTimeSave = 'Error al modificar el usuario'
        let type = 'warn';
        this._userService.update(this.user)
        .subscribe((resp)=>{
          if(resp?.status === 'ok') {
            messageTimeSave = resp.message 
            type = 'success'; 
            // se asigna lo que retorna la data al modelo de usuario           
            const newUser = Serializer.deserialize(resp.data, User) 
            //@ts-ignore
            this.user = newUser
            // se asignan los valores al formControl
            this.formControlUser.patchValue({
              nombres:this.user.nombres,
              cedula: this.user.cedula,
              telefono: this.user.telefono,
              organizacion: this.user.organizacionId,
              email: this.user.email
            })
            // se activa el boton eliminar
            this.disabledBtnEliminar = false
          }
           //Se mustra el mensaje
           this._notifyService.showNotification(type, messageTimeSave);
           //Se oculata la barra loading
           this.showLoadBar = false
           this.disabledBtnEliminar = false
        })
  
      }
    } else {
      this._notifyService.showNotification('warn', 'Debe llenar todos los campos requeridos');
      this.showLoadBar = false
      this.disabledBtnEliminar = false
    }    
  }

  /**
   * @name delete
   * @version 1.0
   * @author Maria Alvarez
   * @description Metodo que permite eliminar un usuario
   * en especifico
   */
  delete() {
    this.showLoadBar = true
    let messageTimeSave = 'Error al intenatr eliminar el usuario'
    let type = 'warn';
    if (this.user?.id) {
      this._userService.delete(this.user.id)
      .subscribe((resp) => {
        if(resp?.status === 'ok') {
          type = 'success';
          messageTimeSave = resp.message  
          this.cancelar()
          // se activa el boton eliminar
          this.disabledBtnEliminar = true
        }
        //Se mustra el mensaje
        this._notifyService.showNotification(type, messageTimeSave);
        this.showLoadBar = false
      })
    }
  }

  /**
   * @name cancelar
   * @author Maria Alvarez
   * @version 1.0
   * @description Metodo que permite resetear los valores del
   * formulario
   */
  cancelar(){        
    // se limpian el fomControl
    this.formControlUser.reset()
    // se inicializa modelo
    const newUser = new User()
    //@ts-ignore
    this.user = Serializer.deserialize(newUser, User)
    //Se limpian los errores
    /*Object.keys(this.formControlUser.controls)
    .forEach(key => {
      this.formControlUser.get(key)?.setErrors(null)
    })*/
  }

  /**
   * @name regresar
   * @author Maria Alvarez
   * @version 1.0
   * @description metodo para regresar al login
   */
  Regresar(){
    this._router.navigate(['/auth/login']);    
  }

}
