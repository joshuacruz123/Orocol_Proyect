import { TokenDto } from 'src/dto/token.dto';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { NuevoUsuarioDto } from 'src/dto/nuevo-usuario.dto';
import { AuthService } from './auth.service';
import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    consultarUsuarios() {
        return this.authService.consultarUsuarios();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('minero')
    registrarUsuario(@Body() dto: NuevoUsuarioDto) {
        return this.authService.registrarUsuario(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idUsuario')
    async editarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: CreateUsuarioDto) {
        return await this.authService.editarUsuario(idUsuario, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('login')
    ingrrsarAlSistema(@Body() dto: LoginUsuarioDto) {
        return this.authService.ingrrsarAlSistema(dto);
    }

    @Post('refresh')
    refresh(@Body() dto: TokenDto) {
        return this.authService.refresh(dto);
    }
}
