import { IsNotEmpty, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class SolicitudDto {

    @IsNotEmpty()
    @IsNotBlank({message: 'La descripción no puede estar vacía'})
    @MaxLength(150, {message: 'descripción: longitud máxima de 150 caracteres'})
    descripcionSolicitud: string;
} 
