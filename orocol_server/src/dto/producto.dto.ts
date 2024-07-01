import { Max, IsInt, Min } from 'class-validator';

export class ProductoDto {
    @IsInt({ message: 'El valor de quilates debe ser un número entero' })
    @Min(1, { message: 'El valor de quilates debe ser al menos 1' })
    @Max(24, { message: 'El valor de quilates no puede ser mayor a 24' })
    valorQuilates: number;
}