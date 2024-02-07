import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadDto } from 'src/dto/novedad.dto';

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

    @Post(':IdMinero')
    async registrarNovedades(@Param('IdMinero') IdMinero: number,
        @Body() dto: NovedadDto,
    ): Promise<any> {
        return this.novedadService.registrarNovedad(IdMinero, dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idNovedad')
    async editarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number, @Body() dto: NovedadDto) {
        return await this.novedadService.editarNovedad(idNovedad, dto);
    }  

    @Delete(':idNovedad')
    async eliminarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number){
        return await this.novedadService.eliminarNovedad(idNovedad)
    }
}
