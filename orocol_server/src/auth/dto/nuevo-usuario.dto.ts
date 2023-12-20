import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class NuevoUsuarioDto {

    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    @MaxLength(50, {message: 'nombre: longitud máxima de 50'})
    nombreUsuario: string;

    @IsNotBlank({message: 'el apellido puede estar vacío'})
    @MaxLength(50, {message: 'apellido: longitud máxima de 50'})
    apellidosUsuario: string;

    @IsEmail()
    correoUsuario: string;

    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    passwordUsuario: string;
} 