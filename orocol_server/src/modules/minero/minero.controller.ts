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

    @Get(':IdCliente')
    async consultarMinero(@Param('IdCliente', ParseIntPipe) IdCliente: number) {
        return await this.mineroService.consultarMinero(IdCliente);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarMinero(@Body() dto: mineroDto) {
        return await this.mineroService.registrarMinero(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdCliente')
    async editarMinero(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: mineroDto) {
        return await this.mineroService.editarMinero(IdCliente, dto);
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

    @Get(':IdCliente')
    async consultarAsistencia(@Param('IdCliente', ParseIntPipe) IdCliente: number) {
        return await this.mineroService.consultarAsistencia(IdCliente);
    }
}
