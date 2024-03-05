import { UsuarioInterface } from "./usuario.interface";

export interface AdministradorInterface extends UsuarioInterface {
    idAdmin: number;
    cargoAdmin: string;
}