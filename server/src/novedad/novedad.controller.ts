import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { Novedad } from './novedad.entity';

@Controller('novedad')
export class NovedadController {
    constructor(private readonly novedadService: NovedadService) {}
    /*
    @Get()
    findAll(): Promise<Novedad[]> {
        return this.novedadService.findAll(); 
    }*/

    @Post()
    registrarNovedad(@Body() cargoAdmin: Novedad): Promise<Novedad> {
        return this.novedadService.insertarNovedad(cargoAdmin);
    }
    
    @Get(':idNovedad')
    verNovedad(idNovedad: number): Promise<Novedad> {
        return this.novedadService.consultarNovedad(idNovedad);
    }
    
    @Put(':idNovedad')
    actualizarNovedad(@Param('idNovedad') idNovedad: number, @Body() cargoAdmin: Novedad): Promise<Novedad> {
        return this.novedadService.editarNovedad(idNovedad, cargoAdmin);
    }      
} 
