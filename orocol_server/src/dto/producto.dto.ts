import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    @IsNotBlank({message: 'el tipo de oro no puede estar vacío'})
    TipoOro?: string;
} 