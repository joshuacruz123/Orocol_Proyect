import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MineroService } from './minero.service';
import { TurnoDto } from '../../dto/turno.dto';
import { RolNombre } from '../../enums/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Turnos de mineros')
@Controller('turno')
export class TurnoController {

    constructor(private readonly mineroService: MineroService) {}
/*
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) */
    @Get()
    async consultarTurnosHoyYAnteriores() {
        return await this.mineroService.consultarTurnosPorFecha();
    }

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':IdMinero')
    async consultarTurnosMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number) {
        return await this.mineroService.consultarTurnosMinero(IdMinero);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':idTurno/consultar')
    async consultarTurno(@Param('idTurno', ParseIntPipe) idTurno: number) {
        return await this.mineroService.consultarTurno(idTurno);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post(':numeroDocumento/registrar')
    async registrarTurno(@Param('numeroDocumento', ParseIntPipe) numeroDocumento: number,
        @Body() turnoDto: TurnoDto) {
        return await this.mineroService.registrarTurnoMinero(numeroDocumento, turnoDto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR) 
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idTurno')
    async editarTurno(@Param('idTurno', ParseIntPipe) idTurno: number, @Body() dto: TurnoDto) {
        return await this.mineroService.editarTurno(idTurno, dto);
    }
}
