import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    @IsNotBlank({message: 'el tipo de oro no puede estar vacío'})
    @MaxLength(60, {message: 'Tipo de oro: longitud máxima de 60'})
    TipoOro?: string;
} 