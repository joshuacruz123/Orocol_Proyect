import { Controller, Get, Post, Put, Delete, Body, UsePipes, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from '../../dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    getAll() {
        return this.usuarioService.getall();
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

    @Delete(':idUsuario')
    async inactivarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number){
        return await this.usuarioService.inactivarUsuario(idUsuario);
    }
}
