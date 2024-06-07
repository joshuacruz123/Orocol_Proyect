import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { SolicitudDto } from 'src/dto/solicitud.dto';
import { RolNombre } from '../../enums/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';

@ApiTags('Solicitudes para reactivación de usuario')
@Controller('solicitudes')
export class SolicitudesController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get()
    async consultarSolicitudes(): Promise<SolicitudEntity[]> {
        return await this.usuarioService.consultarSolicitudes();
    } 

    @Post(':correoUsuario')
    async crearSolicitudIngreso(@Param('correoUsuario') correoUsuario: string, @Body() dto: SolicitudDto) {
        return await this.usuarioService.crearSolicitudIngreso(correoUsuario, dto);
    }
}
