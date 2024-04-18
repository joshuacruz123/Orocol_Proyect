import { IsDateString, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class EntradaDto {

    @IsNotEmpty({ message: 'El La fecha no puede estar vacía' })
    @IsDateString({ message: 'La fecha debe ser una fecha válida' })
    fechaExtraccionOro: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsNotEmpty({ message: 'El precio no puede estar vacío' })
    @Min(2, { message: 'el peso debe de ser al menos de dos números' })
    precioOro: number;

    @IsNumber({}, { message: 'La cantidad de oro debe ser un número' })
    @IsNotEmpty({ message: 'La cantidad de oro no puede estar vacía' })
    @Min(1, { message: 'La cantidd debe de ser al menos de 1' })
    cantidad: number;
}  
