import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadDto } from 'src/dto/novedad.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from '../../enums/rol.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { NovedadEntity } from 'src/entities/novedad.entity';

@ApiBearerAuth()
@ApiTags('Novedades de mineros')
@Controller('novedad')
export class NovedadController {

    constructor(private readonly novedadService: NovedadService) {}

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Post(':idTurno')
    async registrarNovedades(@Param('idTurno') idTurno: number,
        @Body() dto: NovedadDto,
    ): Promise<any> {
        return this.novedadService.registrarNovedad(idTurno, dto);
    }
    
    @RolDecorator(RolNombre.MINERO, RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':idNovedad')
    async consultarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number) {
        const novedad = await this.novedadService.consultarNovedad(idNovedad);
        return {
            ...novedad,
            fechaNovedad: this.formatDateForDatetimeLocal(novedad.fechaNovedad.toISOString())
        };
    }
    
    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idNovedad')
    async editarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number, @Body() dto: NovedadDto) {
        return await this.novedadService.editarNovedad(idNovedad, dto);
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
    // Método auxiliar para formatear fechas de fechaNovedad
}
