import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecuperarPassDto } from 'src/dto/editar-password.dto';

@ApiTags('Recuperar contraseña')
@Controller('password')
export class PasswordController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Get(':correoUsuario')
    async consultarCorreosUsuario(@Param('correoUsuario') correoUsuario: string) {
        return await this.usuarioService.consultarCorreosUsuario(correoUsuario);
    }

    @Put('recuperarPass/:correoUsuario')
    async recuperarPassword(@Param('correoUsuario') correoUsuario: string, @Body() dto: RecuperarPassDto) {
        return await this.usuarioService.recuperarPassword(correoUsuario, dto);
    }
}