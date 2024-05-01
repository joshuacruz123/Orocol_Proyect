import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class PasswordDto {
    
    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    @MaxLength(60, {message: 'contraseña: longitud máxima de 60'})
    passwordAnterior: string;
    
    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    @MaxLength(60, {message: 'contraseña: longitud máxima de 60'})
    passwordNuevo: string;
} 

export class RecuperarPassDto {
    
    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    @MaxLength(60, {message: 'contraseña: longitud máxima de 60'})
    passwordNuevo: string;
}