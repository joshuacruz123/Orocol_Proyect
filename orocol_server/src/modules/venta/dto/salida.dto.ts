import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class SalidaDto {

    @IsNumber()
    @IsNotEmpty()
    @Min(1, {message: 'el peso debe de ser al menos de 1 gramo'})
    PesogrOro?: number;
} 