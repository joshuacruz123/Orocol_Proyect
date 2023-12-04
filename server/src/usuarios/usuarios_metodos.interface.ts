// usuario-operaciones.interface.ts
import { Usuario } from './usuarios.entity';

export interface UsuarioMetodos {
  registrarUsuario(usuarioData: Usuario): Promise<Usuario>;
  ingresarAlSistema(usuarioData: Usuario): Promise<Usuario>;
  solicitarReactivacion(usuarioData: Usuario): Promise<Usuario>;
  inactivarUsuario(idUsuario: number, usuarioData: Usuario): Promise<Usuario>;
} 