import { EstadoUsuario } from 'src/modules/usuario/usuario.enum';
import { IsEnum } from 'class-validator';

export class InactivarUsuarioDto {
    @IsEnum(EstadoUsuario)
    estadoUsuario: EstadoUsuario;
}
