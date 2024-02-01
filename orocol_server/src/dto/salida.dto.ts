import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class SalidaDto {

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank({message: 'El peso del oro no puede estar vacío'})
    @Min(1, {message: 'el peso debe de ser al menos de 1 gramo'})
    PesogrOro?: number;
}  