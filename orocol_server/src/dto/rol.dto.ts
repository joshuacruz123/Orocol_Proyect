import { RolNombre } from '../enums/rol.enum';
import { IsEnum } from "class-validator";

export class CreateRolDto {

    @IsEnum(RolNombre, {message: 'el rol sólo puede ser Minero o Administrador'})
    tipoRol: RolNombre;
}  