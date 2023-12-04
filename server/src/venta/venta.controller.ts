import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { VentaService } from './venta.service';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';

@Controller('venta')
export class VentaController { 
  constructor(private readonly ventaService: VentaService) {}

  @Post('/minero')
  async registrarVentaMinero(@Body() ventaData: EntradaVenta): Promise<string> {
    try {
      await this.ventaService.insertarVentaMinero(ventaData);
      return 'Registro en la tabla EntradaVenta exitosa.';
    } catch (error) {
      return `Error al insertar en la entidad EntradaVenta: ${error.message}`;
    }
  } 

  @Get('/minero')
  async verVentaMinero(): Promise<EntradaVenta[]> {
    try {
      return await this.ventaService.consultarVenta();
    } catch (error) {
      return `Error al conseguir los registros: ${error.message}`;
    }
  }

  @Post('/administrador')
  async registrarVentaAdministrador(@Body() salidaData: SalidaVenta): Promise<string> {
    try {
      await this.ventaService.insertarVentaAdministrador(salidaData);
      return 'Registro en la tabla SalidaVenta exitosa.';
    } catch (error) {
      return `Error al insertar en la entidad SalidaVenta: ${error.message}`;
    }
  }

  @Get('/administrador')
  async verVentaAdministrador(): Promise<SalidaVenta[]> {
    try {
      return await this.ventaService.consultarSalidaVenta();
    } catch (error) {
      return `Error al conseguir los registros: ${error.message}`;
    }
  }

  @Put('/minero/:idGestionVenta')
  async actualizarVentaMinero(
    @Param('idGestionVenta') idGestionVenta: number,
    @Body() ventaData: EntradaVenta,
  ): Promise<EntradaVenta | string> {
    try {
      const venta = await this.ventaService.editarVentaMinero(idGestionVenta, ventaData);
      return venta || 'No se encontró la venta.';
    } catch (error) {
      return `Error al editar tus datos: ${error.message}`;
    }
  }

  @Put('/administrador/:idGestionVenta')
  async actualizarVentaAdministrador(
    @Param('idGestionVenta') idGestionVenta: number,
    @Body() salidaData: SalidaVenta,
  ): Promise<SalidaVenta | string> {
    try {
      const venta = await this.ventaService.editarVentaAdministrador(idGestionVenta, salidaData);
      return venta || 'No se encontró la venta.';
    } catch (error) {
      return `Error al editar tus datos: ${error.message}`;
    }
  }

  @Put('/inactivar/:idGestionVenta')
  async inactivarVenta(@Param('idGestionVenta') idGestionVenta: number): Promise<string> {
    try {
      await this.ventaService.inactivarVenta(idGestionVenta);
      return 'La venta ahora es inactiva en el sistema.';
    } catch (error) {
      return `Error al inactivar venta: ${error.message}`;
    }
  } 

  @Get('/reporte')
  async generarReportesVentas(): Promise<EntradaVenta[] | string> {
    try {
      return await this.ventaService.generarReporteVenta();
    } catch (error) {
      return `Error al conseguir los registros: ${error.message}`;
    }
  }
}
