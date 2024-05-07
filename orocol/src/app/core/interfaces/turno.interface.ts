import { MineroInterface } from '../../core/interfaces/minero.interface';
import { NovedadInterface } from '../../core/interfaces/novedad.interface';

export interface TurnoInterface {
    idTurno: number;
    FechaTurno: Date;
    Asistencia: string;
    AsignacionTareas: string;
    minero: MineroInterface;
    novedad: NovedadInterface;
}