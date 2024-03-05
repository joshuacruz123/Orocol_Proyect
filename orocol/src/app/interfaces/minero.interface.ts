import { UsuarioInterface } from "./usuario.interface";

export interface MineroInterface extends UsuarioInterface {
    IdMinero: number;
    tipo_documento: string;
    numero_documento: number;
    cambio_documento: string;
    telefono: number;
    fecha_nacimiento: Date;
    direccion_vivienda: string;
}