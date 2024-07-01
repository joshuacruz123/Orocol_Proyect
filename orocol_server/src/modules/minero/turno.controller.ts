import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MineroService } from './minero.service';
import { TurnoDto } from '../../dto/turno.dto';
import { RolNombre } from '../../enums/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TurnoMineroEntity } from 'src/entities/turno.entity';

@ApiBearerAuth()
@ApiTags('Turnos de mineros')
@Controller('turno')
export class TurnoController {

    constructor(private readonly mineroService: MineroService) {}
   
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async consultarTurnosHoyYAnteriores() {
        const turnosPorFecha = await this.mineroService.consultarTurnosPorFecha();
        return {
            hoy: this.formatTurnos(turnosPorFecha.hoy),
            anteriores: this.formatTurnos(turnosPorFecha.anteriores)
        }
    }

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':IdMinero')
    async consultarTurnosMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number) {
        const minero = await this.mineroService.consultarTurnosMinero(IdMinero);
        return {
            ...minero,
            turno: this.formatTurnos(minero.turno) // Transforma las fechas
        };
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':idTurno/consultar')
    async consultarTurno(@Param('idTurno', ParseIntPipe) idTurno: number) {
        const turno = await this.mineroService.consultarTurno(idTurno);
        return {
            ...turno,
            FechaTurno: this.formatDateForDatetimeLocal(turno.FechaTurno.toISOString()) // Transformar la fecha
        };
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

    // Inicio métodos auxiliares para formatear fechas de FechaTurno
    private formatTurnos(turnos: TurnoMineroEntity[]): any[] {
        return turnos.map(turno => ({
            ...turno,
            FechaTurno: this.formatDateForDatetimeLocal(turno.FechaTurno.toISOString())
        }));
    }

    private formatDateForDatetimeLocal(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    // Fin dar formato correcto a FechaTurno
}
