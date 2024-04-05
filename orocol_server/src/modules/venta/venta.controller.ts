import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
   
    constructor(private readonly ventaService: VentaService) {}
    
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get() 
    async consultarVentas() {
        return await this.ventaService.consultarVentas();
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Get(':idGestionVenta')
    async consultarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number) {
        return await this.ventaService.consultarVenta(idGestionVenta);
    }

    @RolDecorator(RolNombre.MINERO, RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':IdMinero/:tipoOro')
    async registrarVenta(
        @Param('IdMinero') IdMinero: number,
        @Param('tipoOro') tipoOro: string,
        @Body() entradaDto: EntradaDto,
    ): Promise<any> {
        return this.ventaService.registrarVenta(IdMinero, tipoOro, entradaDto);
    }

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':numero_documento/:tipoOro')
    async registrarVentaAdmin(
        @Param('numero_documento') numeroDocumento: number,
        @Param('tipoOro') tipoOro: string,
        @Body() entradaDto: EntradaDto,
    ): Promise<any> {
        return this.ventaService.registrarVentaAdmin(numeroDocumento, tipoOro, entradaDto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('entrada_venta/:idGestionVenta')
    async editarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EntradaDto) {
        return await this.ventaService.editarVenta(idGestionVenta, dto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('inactivar/:idGestionVenta')
    async desactivarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EstadoVentaDto){
        return await this.ventaService.desactivarVenta(idGestionVenta, dto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:idGestionVenta')
    async activarVenta(@Param('idGestionVenta', ParseIntPipe) idGestionVenta: number, @Body() dto: EstadoVentaDto){
        return await this.ventaService.activarVenta(idGestionVenta, dto);
    }
}
