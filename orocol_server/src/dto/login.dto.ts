import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginUsuarioDto {

    @IsNotBlank({message: 'el correo no puede estar vacío'})
    @MaxLength(10, {message: 'Correo: longitud máxima de 10'})
    correoUsuario: string;

    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    passwordUsuario: string; 
}