import { Usuarios } from "./user-interface";

export interface Productos{
    id?: number,
    nombreProducto: string,
    creadoPor:Usuarios,
    cantidad:number,
    fechaIngreso:Date,
    fechaModificacion:Date,
    modificadoPor:string
}