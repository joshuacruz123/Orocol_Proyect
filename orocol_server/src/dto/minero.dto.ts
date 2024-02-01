import { IsEnum, IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { CambioDocumento, TipoDocumento } from "../modules/minero/minero.enum";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class mineroDto extends CreateUsuarioDto {

    @IsNotBlank({message: 'el tipo de documento no puede estar vacío'})
    @MaxLength(30, {message: 'apellido: longitud máxima de 30'})
    tipo_documento?: TipoDocumento;  

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el numero de documento debe tener 10 digitos'})
    numero_documento?: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el teléfono debe tener 10 digitos'})
    telefono: number;
 
    
    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    fecha_nacimiento?: Date;

    
    @IsNotBlank({message: 'La dirección no puede estar vacía'})
    @MaxLength(55, {message: 'direccion de vivienda: longitud máxima de 55'})
    direccion_vivienda?: string;

    @IsEnum(CambioDocumento)
    cambio_documento: CambioDocumento;
} 
