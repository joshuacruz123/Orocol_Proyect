import { RolNombre } from "src/modules/rol/rol.enum";

export interface PayloadInterface {
    idUsuario: number;
    nombreUsuario: string;
    apellidosUsuario: string;
    correoUsuario: string;
    estadoUsuario: string;
    roles: AdministradorPayload | MineroPayload | RolNombre[];
} 

export interface AdministradorPayload {
    tipoRol: RolNombre.ADMINISTRADOR;
    cargoAdmin: string;
}

export interface MineroPayload {
    tipoRol: RolNombre.MINERO;
    tipo_documento: string;
    numero_documento: number;
    telefono: number;
    fecha_nacimiento: Date;
    direccion_vivienda: string;
    cambio_documento: string;
}