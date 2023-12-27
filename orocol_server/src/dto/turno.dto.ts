import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { Asistencia } from "../modules/minero/turno.enum";

export class TurnoDto {
    
    @IsNotBlank({message: 'La fecha no puede estar vacía'})
    FechaTurno?: Date;


    @IsNotBlank({message: 'el tipo de documento no puede estar vacío'})
    Asistencia?: Asistencia;  


    @IsNotBlank({message: 'La dirección no puede estar vacía'})
    AsignacionTareas?: string;
} 