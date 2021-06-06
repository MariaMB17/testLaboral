import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Organization')
export class Organization {
    @JsonProperty('id', Number)
    private _id: number = -1;

    @JsonProperty('descripcion', String)
    private _descripcion: string = '';

    constructor(data?: any) {}    
      // Atributos de Lectura/Escritura
    get id(): number {
        return this._id;
    }
    set id(id: number) {
      this._id = id;
    }
    get descripcion(): string {
    return this._descripcion;
    }
    set descripcion(descripcion: string) {
    this._descripcion = descripcion;
    }
}