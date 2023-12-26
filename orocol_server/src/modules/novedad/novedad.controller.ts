import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadDto } from '../../dto/novedad.dto';

@Controller('novedad')
export class NovedadController {
 
    constructor(private readonly novedadService: NovedadService) {}

    @Get()
    async consultarNovedades() {
        return await this.novedadService.consultarNovedades();
    } 

    @Get(':idNovedad')
    async consultarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number) {
        return await this.novedadService.consultarNovedad(idNovedad);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarNovedad(@Body() dto: NovedadDto) {
        return await this.novedadService.registrarNovedad(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idNovedad')
    async editarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number, @Body() dto: NovedadDto) {
        return await this.novedadService.editarNovedad(idNovedad, dto);
    }
}
