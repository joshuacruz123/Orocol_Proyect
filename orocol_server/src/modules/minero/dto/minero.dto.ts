import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { TipoDocumento } from "../minero.enum";

export class mineroDto {

    @IsNotBlank({message: 'el tipo de documento no puede estar vacío'})
    tipo_documento?: TipoDocumento;  
    
    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el precio debe de ser al menos de 10'})
    numero_documento?: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el teléfono debe de ser al menos de 10'})
    telefono: number;

    
    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    fecha_nacimiento?: Date;

    
    @IsNotBlank({message: 'La dirección no puede estar vacía'})
    direccion_vivienda?: string;
} 
