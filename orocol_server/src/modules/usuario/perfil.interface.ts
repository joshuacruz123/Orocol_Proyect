import { AdministradorEntity } from "src/entities/administrador.entity";
import { MineroEntity } from "src/entities/minero.entity";
import { RolEntity } from "src/entities/rol.entity";
import { PerfilEntity } from "src/entities/perfil.entity";
import { EstadoUsuario } from "src/enums/usuario.enum";

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