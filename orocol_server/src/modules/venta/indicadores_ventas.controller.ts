import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { EntradaDto } from 'src/dto/entrada.dto';
import { EstadoVentaDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Indicadores financieros de ventas')
@Controller('indicadores/ventas')
export class IndicadoresVentasController {

    constructor(private readonly ventaService: VentaService) { }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get()
    async conseguirIndicadores() {
        return this.ventaService.calcularIngresosVentas();
    } /*
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('volumen-total-oro')
    async obtenerVolumenTotalOro(): Promise<{ total: number }> {
        const total = await this.compraService.calcularVolumenTotalOro();
        return { total };
    } */
}