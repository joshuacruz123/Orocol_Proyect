import { Controller, Get, Param, ParseIntPipe, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { RolNombre } from '../../enums/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Salida de la ventas')
@Controller('salida')
export class SalidaVentaController {
   
    constructor(private readonly ventaService: VentaService) {}
    
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get() 
    async consultarSalidaVentas() {
        return await this.ventaService.consultarSalidaVentas();
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Get(':IdSalidaVenta')
    async consultarSalidaVenta(@Param('IdSalidaVenta', ParseIntPipe) IdSalidaVenta: number) {
        return await this.ventaService.consultarSalidaVenta(IdSalidaVenta);
    }
}
 