import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { Novedad } from './novedad.entity';

@Controller('novedad')
export class NovedadController {
    constructor(private readonly novedadService: NovedadService) {} 

    @Post()
    registrarNovedad(@Body() cargoAdmin: Novedad): Promise<Novedad> {
        return this.novedadService.insertarNovedad(cargoAdmin);
    }
    // Método para controlar registro de la novedad de minero
    
    @Get(':idNovedad')
    verNovedad(idNovedad: number): Promise<Novedad> {
        return this.novedadService.consultarNovedad(idNovedad);
    }
    // Método para controlar consulta de la novedad de minero
    
    @Put(':idNovedad')
    actualizarNovedad(@Param('idNovedad') idNovedad: number, @Body() cargoAdmin: Novedad): Promise<Novedad> {
        return this.novedadService.editarNovedad(idNovedad, cargoAdmin);
    }  
    // Método para controlar actualización de la novedad de minero     
}   