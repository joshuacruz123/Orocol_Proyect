import { CreateUsuarioDto } from 'src/dto/administrador.dto';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

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
}
