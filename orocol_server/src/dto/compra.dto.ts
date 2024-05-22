import { IsDateString, IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CompraDto {

    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    @MaxLength(60, {message: 'nombre: longitud máxima de 60'})
    NombreCompleto: string;

    @IsNotBlank({message: 'La empresa no puede estar vacía'})
    @MaxLength(70, {message: 'nombre: longitud máxima de 60'})
    Empresa: string;

    @IsNotBlank({message: 'El pais no puede estar vacío'})
    @MaxLength(55, {message: 'nombre: longitud máxima de 60'})
    Pais: string;

    @IsNotBlank({message: 'El La ciudad-municipio no puede estar vacío'})
    @MaxLength(80, {message: 'nombre: longitud máxima de 60'})
    CiudadMunicipio: string;

    @IsNotEmpty({ message: 'El La fecha no puede estar vacía' })
    @IsDateString({ message: 'FechaExportacion debe ser una fecha válida' })
    FechaExportacion: string;

    @IsNumber({}, { message: 'El peso del oro debe ser un número' })
    @IsNotEmpty({ message: 'El peso del oro no puede estar vacío' })
    @Min(1, { message: 'el peso debe de ser al menos de 1 gramo' })
    PesogrOro: number;
} 

export class DateRangeDto {
    @IsDateString({ message: 'FechaExportacion debe ser una fecha válida' })
    startDate: string;
  
    @IsDateString({ message: 'FechaExportacion debe ser una fecha válida' })
    endDate: string;
  }