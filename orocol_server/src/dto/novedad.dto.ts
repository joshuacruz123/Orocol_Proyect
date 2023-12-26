import { IsNotEmpty } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class NovedadDto {

    @IsNotBlank({message: 'la fecha no puede estar vacía'})
    fechaNovedad?: Date;

    @IsNotEmpty()
    @IsNotBlank({message: 'la descripción no puede estar vacía'})
    descripcion?: string;
} 
