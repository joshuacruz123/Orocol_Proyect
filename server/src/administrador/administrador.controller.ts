import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { Administrador } from './administrador.entity';

@Controller('administrador')
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService) {}
    /*
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuariosService.findAll(); 
    }*/

    @Post()
    registrarAdministrador(@Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.registrarAdmin(cargoAdmin);
    }
    
    @Get(':idAdmin')
    verAdmin(idAdmin: number): Promise<Administrador> {
        return this.administradorService.consultarAdmin(idAdmin);
    } 
    
    @Put(':idAdmin')
    editarUsuario(@Param('idAdmin') idAdmin: number, @Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.editarAdmin(idAdmin, cargoAdmin);
    }

    @Get(':idAdmin')
    verNovedadMineros(idAdmin: number): Promise<Administrador> {
        return this.administradorService.verNoveradMinero(idAdmin);
    }

    @Get(':idAdmin')
    verMineros(idAdmin: number): Promise<Administrador> {
        return this.administradorService.consultarMineros(idAdmin);
    }

    @Post()
    registrarMineros(@Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.registrarMinero(cargoAdmin);
    }
    
    @Post()
    solicitarEdicionDoc(@Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.solicitarEditarDoc(cargoAdmin);
    }

    @Put(':idAdmin')
    editarMineros(@Param('idAdmin') idAdmin: number, @Body() cargoAdmin: Administrador): Promise<Administrador> {
        return this.administradorService.editarMinero(idAdmin, cargoAdmin);
    }

    /*
    @Delete(':idAdmin')
    eliminarUsuario(@Param('idAdmin') idAdmin: number): Promise<void> {
        return this.administradorService.delete(idAdmin);
    }*/
}
