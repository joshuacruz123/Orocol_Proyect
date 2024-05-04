import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SolicitudEntity } from './solicitud.entity';
import { SolicitudDto } from 'src/dto/solicitud.dto';

@ApiTags('Solicitudes para reactivación de usuario')
@Controller('solicitudes')
export class SolicitudesController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
    async consultarMineros(): Promise<SolicitudEntity[]> {
        return await this.usuarioService.consultarSolicitudes();
    } 

    @Post(':correoUsuario')
    async crearSolicitudIngreso(@Param('correoUsuario') correoUsuario: string, @Body() dto: SolicitudDto) {
        return await this.usuarioService.crearSolicitudIngreso(correoUsuario, dto);
    }
}
