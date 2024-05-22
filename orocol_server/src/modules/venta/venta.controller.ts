import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VentaService } from './venta.service';
import { EntradaDto } from 'src/dto/entrada.dto';
import { EstadoVentaDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Ventas')
@Controller('venta')
export class VentaController {

    constructor(private readonly ventaService: VentaService) { }

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async consultarVentas() {
        return await this.ventaService.consultarVentas();
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Get(':idGestionVenta')
    async consultarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number) {
        return await this.ventaService.consultarVenta(idGestionVenta);
    }

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':IdMinero/:TipoOro')
    async registrarVenta(
        @Param('IdMinero') IdMinero: number,
        @Param('TipoOro') TipoOro: string,
        @Body() entradaDto: EntradaDto,
    ): Promise<any> {
        return this.ventaService.registrarVenta(IdMinero, TipoOro, entradaDto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':numero_documento/admin/:TipoOro')
    async registrarVentaAdmin(
        @Param('numero_documento') numero_documento: number,
        @Param('TipoOro') TipoOro: string,
        @Body() entradaDto: EntradaDto,
    ): Promise<any> {
        console.log("Numero doc:", numero_documento);
        return this.ventaService.registrarVentaAdmin(numero_documento, TipoOro, entradaDto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(':idGestionVenta')
    async editarVenta(
      @Param('idGestionVenta') idGestionVenta: number,
      @Body() entradaDto: EntradaDto,
    ) {
      return this.ventaService.editarVenta(idGestionVenta, entradaDto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put('inactivar/:idGestionVenta')
    async desactivarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EstadoVentaDto) {
        return await this.ventaService.desactivarVenta(idGestionVenta, dto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put('activar/:idGestionVenta')
    async activarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EstadoVentaDto) {
        return await this.ventaService.activarVenta(idGestionVenta, dto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get('indicadores')
    async conseguirIndicadores() {
        return this.ventaService.calcularIngresosVentas();
    }
}
