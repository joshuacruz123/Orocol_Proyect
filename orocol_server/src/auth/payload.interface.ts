import { RolNombre } from "src/modules/rol/rol.enum";

export interface PayloadInterface {
    idUsuario: number;
    correoUsuario: string;
    roles: AdministradorPayload | MineroPayload | RolNombre[];
} 

export interface AdministradorPayload {
    tipoRol: RolNombre.ADMINISTRADOR;
    idAdmin: number;
}

export interface MineroPayload {
    tipoRol: RolNombre.MINERO;
    IdMinero: number;
}