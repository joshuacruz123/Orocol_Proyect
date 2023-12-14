export class Usuario {
    idUsuario?: number;
    nombreUsuario: string;
    apellidosUsuario: string;
    correoUsuario: string;
    passwordUsuario: string;

    constructor(nombreUsuario: string, apellidosUsuario: string, correoUsuario: string, passwordUsuario: string) {
        this.nombreUsuario = nombreUsuario;
        this.apellidosUsuario = apellidosUsuario;
        this.correoUsuario = correoUsuario;
        this.passwordUsuario = passwordUsuario;
    }
} //ng g class models/usuario