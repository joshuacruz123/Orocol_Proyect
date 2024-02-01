import { IsNotEmpty, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class NovedadDto {

    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    fechaNovedad?: Date;

    @IsNotEmpty()
    @IsNotBlank({message: 'La descripción no puede estar vacía'})
    @MaxLength(400, {message: 'descripción: longitud máxima de 400'})
    descripcion?: string;
} 
