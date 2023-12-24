import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class EntradaDto {

    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    fechaExtraccionOro?: Date;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el precio debe de ser al menos de 10 $'})
    precioOro?: number;

    @IsNumber()
    @IsNotEmpty()
    @Max(10, {message: 'La cantidad de Oro debe de ser maximo de 10'})
    cantidad?: number;
} 