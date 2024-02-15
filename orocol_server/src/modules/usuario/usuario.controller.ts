import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { TokenDto } from 'src/dto/token.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PerfilDto } from 'src/dto/perfil.dto';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @ApiBearerAuth()
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

    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('perfil/:idUsuario')
    registrarPerfilUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: PerfilDto) {
        return this.usuarioService.registrarPerfilUsuario(idUsuario, dto);
    }
}
