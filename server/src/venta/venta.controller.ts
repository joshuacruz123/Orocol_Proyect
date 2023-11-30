import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { VentaService } from './venta.service';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';

@Controller('venta')
export class VentaController {
    constructor(private readonly ventaService: VentaService) {}
    /*
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuariosService.findAll(); 
    }*/

    @Post()
    registrarVenta(@Body() ventaData: EntradaVenta): Promise<EntradaVenta> {
        return this.ventaService.insertarVenta(ventaData);
    }
    
    @Get(':idGestionVenta')
    verVenta(idGestionVenta: number): Promise<EntradaVenta> {
        return this.ventaService.consultarVenta(idGestionVenta);
    }
    
    @Put(':idGestionVenta')
    actualizarVenta(@Param('idGestionVenta') idGestionVenta: number, @Body() ventaData: EntradaVenta): Promise<EntradaVenta> {
        return this.ventaService.editarVenta(idGestionVenta, ventaData);
    }

    @Put(':idGestionVenta')
    anularVentas(@Param('idGestionVenta') idGestionVenta: number, @Body() ventaData: EntradaVenta): Promise<EntradaVenta> {
        return this.ventaService.anularVenta(idGestionVenta, ventaData);
    }

    @Get()
    generarReportesVentas(): Promise<EntradaVenta[]> {
        return this.ventaService.generarReporteVenta(); 
    }
    /*
    @Delete(':idGestionVenta')
    eliminarUsuario(@Param('idGestionVenta') idGestionVenta: number): Promise<void> {
        return this.ventaService.delete(idGestionVenta);
    }*/
}
