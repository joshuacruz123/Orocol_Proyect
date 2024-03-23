import { UsuarioService } from './usuario.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { TokenDto } from 'src/dto/token.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PerfilDto } from 'src/dto/perfil.dto';
import { UsuarioDto } from 'src/dto/usuario.dto';

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

    @Get()
    async consultarUsuarios() {
        return await this.usuarioService.consultarUsuarios();
    }

    @Put('recuperarPass/:correoUsuario')
    async recuperarPassword(@Param('correoUsuario', ParseIntPipe) correoUsuario: string, @Body() dto: UsuarioDto) {
        return await this.usuarioService.recuperarPassword(correoUsuario, dto);
    } 
 
    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('perfil/:idUsuario')
    registrarFotoPerfil(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: PerfilDto) {
        return this.usuarioService.registrarFotoPerfil(idUsuario, dto);
    } 

    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('perfil/:idUsuario')
    async consultarPerfil(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return await this.usuarioService.consultarPerfil(idUsuario);
    }

    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('perfil/:idUsuario')
    async editarFotoPerfil(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: PerfilDto) {
        return await this.usuarioService.editarFotoPerfil(idUsuario, dto);
    }  
}
