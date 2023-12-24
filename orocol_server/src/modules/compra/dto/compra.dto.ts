import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    NombreCompleto?: string;

    @IsNotBlank({message: 'La empresa no puede estar vacía'})
    Empresa?: string;

    @IsNotBlank({message: 'El pais no puede estar vacío'})
    Pais?: string;

    @IsNotBlank({message: 'El La ciudad-municipio no puede estar vacío'})
    CiudadMunicipio?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el precio debe de ser al menos de 10 €'})
    FechaExportacion?: Date;
} 