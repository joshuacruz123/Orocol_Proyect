import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { EntradaDto } from '../../dto/entrada.dto';
import { SalidaDto } from '../../dto/salida.dto';

@Controller('venta')
export class VentaController {
 
    constructor(private readonly ventaService: VentaService) {}

    @Get()
    async consultarVentas() {
        return await this.ventaService.consultarVentas();
    }
    
    @Get()
    async consultarSalidaVentas() {
        return await this.ventaService.consultarSalidaVentas();
    }

    @Get(':IdSalidaVenta')
    async consultarSalidaVenta(@Param('IdSalidaVenta', ParseIntPipe) IdSalidaVenta: number) {
        return await this.ventaService.consultarSalidaVenta(IdSalidaVenta);
    }
    
    @Get(':idGestionVenta')
    async consultarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number) {
        return await this.ventaService.consultarVenta(idGestionVenta);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async insertarVentaEntrada(@Body() dto: EntradaDto) {
        return await this.ventaService.insertarVentaEntrada(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async insertarVentaAdministrador(@Body() dto: SalidaDto) {
        return await this.ventaService.insertarVentaAdministrador(dto);
    }

    @Delete(':IdProducto')
    async inactivarVenta(@Param('IdProducto', ParseIntPipe) IdProducto: number){
        return await this.ventaService.inactivarVenta(IdProducto) 
    }
} 
