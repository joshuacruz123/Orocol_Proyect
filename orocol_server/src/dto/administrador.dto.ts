import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { CreateUsuarioDto } from "./create-usuario.dto";
import { MaxLength } from "class-validator";

export class AdministradorDto extends CreateUsuarioDto{
    @IsNotBlank({ message: 'el cargo no puede estar vacío' })
    @MaxLength(60, {message: 'cargo: longitud máxima de 60'})
    cargoAdmin: string;
} 
