import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { MineroService } from './minero.service';
import { mineroDto } from '../../dto/minero.dto';
import { TurnoDto } from '../../dto/turno.dto';

@Controller('minero')
export class MineroController {
 
    constructor(private readonly mineroService: MineroService) {}

    @Get()
    async consultarMineros() {
        return await this.mineroService.consultarMineros();
    } 

    @Get(':IdMinero')
    async consultarMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number) {
        return await this.mineroService.consultarMinero(IdMinero);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarMinero(@Body() dto: mineroDto) {
        return await this.mineroService.registrarMinero(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdMinero')
    async editarMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number, @Body() dto: mineroDto) {
        return await this.mineroService.editarMinero(IdMinero, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarAsistencia(@Body() dto: TurnoDto) {
        return await this.mineroService.registrarAsistencia(dto);
    }

    @Get()
    async verAsistencias() {
        return await this.mineroService.verAsistencias();
    } 

    @Get(':idTurno')
    async consultarAsistencia(@Param('idTurno', ParseIntPipe) idTurno: number) {
        return await this.mineroService.consultarAsistencia(idTurno);
    }
}
