import { UsuarioInterface } from "./usuario.interface";

export interface SolicitudInterface extends UsuarioInterface {
    idSolicitud: number;
    descripcionSolicitud: string; 
}