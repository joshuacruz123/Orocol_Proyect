import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

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
}
