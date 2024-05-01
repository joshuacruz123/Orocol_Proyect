import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { UsuarioDto, EditarUsuarioDto } from "./usuario.dto";
import { MaxLength } from "class-validator";

export class AdministradorDto extends UsuarioDto{
    @IsNotBlank({ message: 'el cargo no puede estar vacío' })
    @MaxLength(60, {message: 'cargo: longitud máxima de 60'})
    cargoAdmin: string;
} 

export class EditarAdministradorDto extends EditarUsuarioDto {
    @IsNotBlank({ message: 'el cargo no puede estar vacío' })
    @MaxLength(60, {message: 'cargo: longitud máxima de 60'})
    cargoAdmin: string;
}