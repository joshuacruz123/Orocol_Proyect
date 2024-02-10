import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { SalidaDto } from 'src/dto/salida.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

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

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':idGestionVenta/salida/:idAdmin')
    async registrarSalidaVenta(@Param('idGestionVenta') idGestionVenta: number,
        @Param('idAdmin') idAdmin: number,
        @Body() dto: SalidaDto,
    ): Promise<any> {
        return this.ventaService.registrarSalidaVenta(idGestionVenta, idAdmin, dto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdSalidaVenta')
    async editarSalidaVenta(@Param('IdSalidaVenta', ParseIntPipe) IdSalidaVenta: number, @Body() dto: SalidaDto) {
        return await this.ventaService.editarSalidaVenta(IdSalidaVenta, dto);
    }
}
