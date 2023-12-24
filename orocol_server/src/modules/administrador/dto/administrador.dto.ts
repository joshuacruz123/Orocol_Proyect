import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    @IsNotBlank({message: 'el cargo no puede estar vacío'})
    cargoAdmin?: string;
}