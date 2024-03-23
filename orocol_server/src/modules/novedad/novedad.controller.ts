import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadDto } from 'src/dto/novedad.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from '../rol/rol.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';

@ApiBearerAuth()
@ApiTags('Novedades de mineros')
@Controller('novedad')
export class NovedadController {

    constructor(private readonly novedadService: NovedadService) {}

    @RolDecorator(RolNombre.MINERO, RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get()
    async consultarNovedades() {
        return await this.novedadService.consultarNovedades();
    } 

    @RolDecorator(RolNombre.MINERO, RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':idNovedad')
    async consultarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number) {
        return await this.novedadService.consultarNovedad(idNovedad);
    }

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Post(':IdMinero/:idAdmin')
    async registrarNovedades(@Param('IdMinero') IdMinero: number, @Param('idAdmin') idAdmin: number, 
        @Body() dto: NovedadDto,
    ): Promise<any> {
        return this.novedadService.registrarNovedad(IdMinero, idAdmin, dto);
    }
    
    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idNovedad')
    async editarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number, @Body() dto: NovedadDto) {
        return await this.novedadService.editarNovedad(idNovedad, dto);
    }  

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Delete(':idNovedad')
    async eliminarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number){
        return await this.novedadService.eliminarNovedad(idNovedad)
    } 
}
