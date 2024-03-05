export class LoginUsuarioDto {
 
    correoUsuario: string;
    passwordUsuario: string; 

    constructor(correoUsuario: string, passwordUsuario: string) {
        this.correoUsuario = correoUsuario;
        this.passwordUsuario = passwordUsuario;
    }
}