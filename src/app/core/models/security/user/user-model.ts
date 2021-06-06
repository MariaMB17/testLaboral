import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '@Core/services/converter.service';

@JsonObject('User')
export class User{
    @JsonProperty('id', Number)
    private _id: number = -1;

    @JsonProperty('cedula', String)
    private _cedula: string= '';

    @JsonProperty('nombres', String)
    private _nombres: string = '';    

    @JsonProperty('fechaNacimiento', DateConverter)
    //@ts-ignore
    private _fechaNacimiento: Date = null;

    @JsonProperty('email', String)
    private _email: string = '';

    @JsonProperty('telefono', String)
    private _telefono: string = '';

    @JsonProperty('organizacionId', Number)
    private _organizacionId: number = 0;

    

    constructor(data?: any) {}  
      // Atributos de Lectura/Escritura
    get id(): number {
        return this._id;
    }
    set id(id: number) {
      this._id = id;
    }

    get cedula(): string {
        return this._cedula;
    }
    set cedula(cedula: string) {
        this._cedula = cedula;
    }

    get nombres(): string {
    return this._nombres;
    }
    set nombres(nombres: string) {
    this._nombres = nombres;
    }  

    get fechaNacimiento(): Date { return this._fechaNacimiento; }
    set fechaNacimiento(fechaNacimiento: Date) {
        this._fechaNacimiento = fechaNacimiento;
    }  

    get email(): string { return this._email;}
    set email(email: string) {
        this._email = email;
    }

    get telefono(): string { return this._telefono;}
    set telefono(telefono: string) {
        this._telefono = telefono;
    }

    get organizacionId(): number { return this._organizacionId;}
    set organizacionId(organizacionId: number) {
        this._organizacionId = organizacionId;
    }
}