import { Controller, Get, Post, Body, Put, Param, NotFoundException } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { Administrador } from './administrador.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { Minero } from '../minero/minero.entity';

@Controller('administrador')
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) {}
    
    @Post()
    async registrarAdministrador(@Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.registrarAdmin(cargoAdmin);
    }

    @Get(':idAdmin')
    async verAdmin(@Param('idAdmin') idAdmin: number): Promise<Administrador> {
        try {
            return await this.administradorService.consultarAdmin(idAdmin);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Put(':idAdmin')
    async editarUsuario(@Param('idAdmin') idAdmin: number, @Body() cargoAdmin: Administrador): Promise<Administrador> {
        try {
            return await this.administradorService.editarAdmin(idAdmin, cargoAdmin);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    /*
    @Post()
    solicitarEdicionDoc(@Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.solicitarEditarDoc(cargoAdmin);
    } */

    @Get()
    async consultarAdministradores(): Promise<Administrador[]> {
        return this.administradorService.consultarAdministradores();
    }

    @Get('mineros')
    async consultarMineros(): Promise<Minero[]> {
        return this.administradorService.consultarMineros();
    }

    @Post('registrar-minero')
    async registrarMinero(@Body() mineroData: Minero): Promise<Minero> {
        return this.administradorService.registrarMinero(mineroData);
    }

    @Put('reactivar-usuario/:idUsuario')
    async reactivarUsuario(@Param('idUsuario') idUsuario: number, @Body() usuarioData: Usuario): Promise<Usuario> {
        return this.administradorService.reactivarUsuario(idUsuario, usuarioData);
    }
}
