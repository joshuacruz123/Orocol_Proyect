import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { EntradaDto } from 'src/dto/entrada.dto';
import { EstadoVentaDto } from 'src/dto/enum.dto';
import { SalidaDto } from 'src/dto/salida.dto';

@Controller('venta')
export class VentaController {
   
    constructor(private readonly ventaService: VentaService) {}
    
    @Get() 
    async consultarVentas() {
        return await this.ventaService.consultarVentas();
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Get(':idGestionVenta')
    async consultarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number) {
        return await this.ventaService.consultarVenta(idGestionVenta);
    }

    @Post(':numero_documento/:tipoOro')
    async registrarVenta(
        @Param('numero_documento') numeroDocumento: number,
        @Param('tipoOro') tipoOro: string,
        @Body() entradaDto: EntradaDto,
    ): Promise<any> {
        return this.ventaService.registrarVenta(numeroDocumento, tipoOro, entradaDto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('entrada_venta/:idGestionVenta')
    async editarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EntradaDto) {
        return await this.ventaService.editarVenta(idGestionVenta, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('inactivar/:idGestionVenta')
    async desactivarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EstadoVentaDto){
        return await this.ventaService.desactivarVenta(idGestionVenta, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:idGestionVenta')
    async activarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EstadoVentaDto){
        return await this.ventaService.activarVenta(idGestionVenta, dto);
    }
    
    @Get('salida') 
    async consultarSalidaVentas() {
        return await this.ventaService.consultarSalidaVentas();
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Get('salida/:IdSalidaVenta')
    async consultarSalidaVenta(@Param('IdSalidaVenta', ParseIntPipe) IdSalidaVenta: number) {
        return await this.ventaService.consultarSalidaVenta(IdSalidaVenta);
    }

    @Post(':idGestionVenta/salida/:idAdmin')
    async registrarSalidaVenta(@Param('idGestionVenta') idGestionVenta: number,
        @Param('idAdmin') idAdmin: number,
        @Body() dto: SalidaDto,
    ): Promise<any> {
        return this.ventaService.registrarSalidaVenta(idGestionVenta, idAdmin, dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('salida_venta/:IdSalidaVenta')
    async editarSalidaVenta(@Param('IdSalidaVenta', ParseIntPipe) IdSalidaVenta: number, @Body() dto: SalidaDto) {
        return await this.ventaService.editarSalidaVenta(IdSalidaVenta, dto);
    }

    @Get('reportes')
    async generarReporteVenta() {
        return await this.ventaService.generarReporteVenta();
    }
}
