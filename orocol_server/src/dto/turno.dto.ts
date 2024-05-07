import { IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { Asistencia } from "../modules/minero/turno.enum";

export class TurnoDto {
    
    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    FechaTurno: Date;


    @IsNotBlank({message: 'La asistencia no puede estar vacía'})
    Asistencia: Asistencia;  

    @IsNotBlank({message: 'La dirección no puede estar vacía'})
    @MaxLength(255, {message: 'nombre: longitud máxima de 255'})
    AsignacionTareas: string;
} 
