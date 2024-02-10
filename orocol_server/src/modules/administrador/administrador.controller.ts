import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorDto } from '../../dto/administrador.dto';
import { InactivarUsuarioDto } from 'src/dto/enum.dto'; //
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

@Controller('administrador')
export class AdministradorController {

    constructor(private readonly administradorService: AdministradorService) {}

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async consultarAdministradores() {
        return await this.administradorService.consultarAdministradores();
    } 
    /*
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) */
    @Get(':idAdmin')
    async consultarAdministrador(@Param('idAdmin', ParseIntPipe) idAdmin: number) {
        return await this.administradorService.consultarAdministrador(idAdmin);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarUsuarioAdministrador(@Body() dto: AdministradorDto) {
        return await this.administradorService.registrarUsuarioAdministrador(dto);
    } 
    /*
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) */
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idAdmin')
    async editarAdministrador(@Param('idAdmin', ParseIntPipe) idAdmin: number, @Body() dto: AdministradorDto) {
        return await this.administradorService.editarAdministrador(idAdmin, dto);
    }
    /*
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) */
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:idUsuario')
    async activarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: InactivarUsuarioDto){
        return await this.administradorService.activarUsuario(idUsuario, dto);
    }
}
