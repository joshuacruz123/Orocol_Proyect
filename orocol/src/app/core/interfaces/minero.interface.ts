import { UsuarioInterface } from "./usuario.interface";

export interface MineroInterface extends UsuarioInterface {
    IdMinero?: number;
    tipo_documento: string;
    numero_documento: number;
    telefono: string;
    fecha_nacimiento: Date;
    direccion_vivienda: string;
    cambio_documento: string;
}