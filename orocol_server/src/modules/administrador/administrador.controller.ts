import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorDto } from '../../dto/administrador.dto';

@Controller('administrador')
export class AdministradorController {

    constructor(private readonly administradorService: AdministradorService) {}

    @Get()
    async consultarAdministradores() {
        return await this.administradorService.consultarAdministradores();
    } 

    @Get(':idAdmin')
    async consultarAdmin(@Param('idAdmin', ParseIntPipe) idAdmin: number) {
        return await this.administradorService.consultarAdmin(idAdmin);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarAdmin(@Body() dto: AdministradorDto) {
        return await this.administradorService.registrarAdmin(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idAdmin')
    async editarAdmin(@Param('idAdmin', ParseIntPipe) idAdmin: number, @Body() dto: AdministradorDto) {
        return await this.administradorService.editarAdmin(idAdmin, dto);
    }

    /*
    @Delete(':idAdmin')
    async delete(@Param('idAdmin', ParseIntPipe) idAdmin: number){
        return await this.administradorService.delete(idAdmin) 
    } */
}
