import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginUsuarioDto {

    @IsNotBlank({message: 'el correo no puede estar vacío'})
    @MaxLength(60, {message: 'Correo: longitud máxima de 60'})
    correoUsuario: string;

    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    passwordUsuario: string; 
}