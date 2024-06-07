import { Controller, Get, UseGuards } from '@nestjs/common';
import { VentaService } from './venta.service';
import { RolNombre } from '../../enums/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Reportes de ventas')
@Controller('reportes')
export class ReportesVentasController {
   
    constructor(private readonly ventaService: VentaService) {}
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get() 
    async generarReporteVenta() {
        return await this.ventaService.generarReporteVenta();
    }
}
