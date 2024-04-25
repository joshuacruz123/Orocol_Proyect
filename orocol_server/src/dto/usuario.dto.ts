import { IsEmail, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class UsuarioDto {
 
    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    @MaxLength(60, {message: 'nombre: longitud máxima de 60'})
    nombreUsuario: string;

    @MaxLength(60, {message: 'apellido: longitud máxima de 60'})
    apellidosUsuario: string;

    @IsEmail({message: 'Tiene que ser un correo electronico valido'}) 
    @IsNotBlank({message: 'el correo no puede estar vacío'})
    @MaxLength(70, {message: 'correo: longitud máxima de 70'})
    correoUsuario: string;

    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    @MaxLength(60, {message: 'contraseña: longitud máxima de 60'})
    passwordUsuario: string;
} 

export class EditarUsuarioDto {
 
    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    @MaxLength(60, {message: 'nombre: longitud máxima de 60'})
    nombreUsuario: string;

    @MaxLength(60, {message: 'apellido: longitud máxima de 60'})
    apellidosUsuario: string;

    @IsEmail({message: 'Tiene que ser un correo electronico valido'}) 
    @IsNotBlank({message: 'el correo no puede estar vacío'})
    @MaxLength(70, {message: 'correo: longitud máxima de 70'})
    correoUsuario: string;
}