import { UsuarioInterface } from "./usuario.interface";

export interface MineroInterface extends UsuarioInterface {
    IdMinero?: number;
    tipo_documento: string;
    numero_documento: null;
    telefono: null;
    fecha_nacimiento: null;
    direccion_vivienda: string;
    cambio_documento: string;
}