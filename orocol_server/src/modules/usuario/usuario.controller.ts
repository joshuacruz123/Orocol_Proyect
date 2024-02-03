import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InactivarUsuarioDto } from 'src/dto/inactivar.dto';
import { RolNombre } from '../rol/rol.enum';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { TokenDto } from 'src/dto/token.dto';
import { AdministradorDto } from 'src/dto/administrador.dto';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    consultarUsuarios() {
        return this.usuarioService.consultarUsuarios();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idUsuario')
    async inactivarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: InactivarUsuarioDto){
        return await this.usuarioService.inactivarUsuario(idUsuario, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('login')
    ingresarAlSistema(@Body() dto: LoginUsuarioDto) {
        return this.usuarioService.ingresarAlSistema(dto);
    }

    @Post('refresh')
    refresh(@Body() dto: TokenDto) {
        return this.usuarioService.refresh(dto);
    }
}
