import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class EntradaDto {

    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    fechaExtraccionOro: Date;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank({message: 'El precio no puede estar vacío'})
    precioOro: number;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank({message: 'La cantidad de oro no puede estar vacía'})
    cantidad: number;
}  
