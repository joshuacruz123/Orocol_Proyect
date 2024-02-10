import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { TokenDto } from 'src/dto/token.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
