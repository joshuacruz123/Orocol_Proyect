export class UsuarioDto {
 
    correoUsuario: string;
    passwordUsuario: string; 

    constructor(correoUsuario: string, passwordUsuario: string) {
        this.correoUsuario = correoUsuario;
        this.passwordUsuario = passwordUsuario;
    }
}