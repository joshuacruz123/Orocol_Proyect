import { AdministradorEntity } from "../administrador/administrador.entity";
import { MineroEntity } from "../minero/minero.entity";
import { RolEntity } from "../rol/rol.entity";
import { PerfilEntity } from "./perfil.entity";
import { EstadoUsuario } from "./usuario.enum";

export interface PerfilCompleto {
    idUsuario: number;
    nombreUsuario: string;
    apellidosUsuario: string;
    correoUsuario?: string;
    estadoUsuario?: EstadoUsuario;
    roles?: RolEntity;
    administrador?: AdministradorEntity;
    minero?: MineroEntity;
    perfil: PerfilEntity;
    fotoPerfilUrl: string;
  }