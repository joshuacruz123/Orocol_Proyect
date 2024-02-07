import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorDto } from '../../dto/administrador.dto';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';

@Controller('administrador')
export class AdministradorController {

    constructor(private readonly administradorService: AdministradorService) {}

    @Get()
    async consultarAdministradores() {
        return await this.administradorService.consultarAdministradores();
    } 

    @Get(':idAdmin')
    async consultarAdministrador(@Param('idAdmin', ParseIntPipe) idAdmin: number) {
        return await this.administradorService.consultarAdministrador(idAdmin);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarUsuarioAdministrador(@Body() dto: AdministradorDto) {
        return await this.administradorService.registrarUsuarioAdministrador(dto);
    } 
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idAdmin')
    async editarAdministrador(@Param('idAdmin', ParseIntPipe) idAdmin: number, @Body() dto: AdministradorDto) {
        return await this.administradorService.editarAdministrador(idAdmin, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:idUsuario')
    async activarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: InactivarUsuarioDto){
        return await this.administradorService.activarUsuario(idUsuario, dto);
    }
    /*
    @Delete(':idAdmin')
    async delete(@Param('idAdmin', ParseIntPipe) idAdmin: number){
        return await this.administradorService.delete(idAdmin) 
    } */
}
