export interface UsuarioInterface {
    usuario: {
        idUsuario: number;
        nombreUsuario: string;
        apellidosUsuario: string;
        correoUsuario: string;
        passwordUsuario: string;
        estadoUsuario?: string;
        perfil?: {
            idPerfil?: number,
            fotoPerfil?: string;
        }
    }
}