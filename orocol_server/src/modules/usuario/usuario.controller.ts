import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InactivarUsuarioDto } from 'src/dto/inactivar.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    consultarUsuarios() {
        return this.usuarioService.consultarUsuarios();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    registrarUsuario(@Body() dto: CreateUsuarioDto) {
        return this.usuarioService.registrarUsuario(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idUsuario')
    async editarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: CreateUsuarioDto) {
        return await this.usuarioService.editarUsuario(idUsuario, dto);
    }

    @Put(':idUsuario')
    async inactivarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: InactivarUsuarioDto){
        return await this.usuarioService.inactivarUsuario(idUsuario, dto);
    }
}
