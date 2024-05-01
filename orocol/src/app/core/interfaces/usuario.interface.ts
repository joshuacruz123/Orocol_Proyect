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

export interface PasswordInterface {
    passwordAnterior: string;
    passwordNuevo: string;
}