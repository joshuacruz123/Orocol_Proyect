import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraDto } from 'src/dto/compra.dto';
import { EstadoCompraDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Clientes y compras')
@Controller('compra')
export class CompraController {

    constructor(private readonly compraService: CompraService) {}

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async consultarCompras() {
        return await this.compraService.consultarCompras();
    } 
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':IdCliente')
    async consultarCompra(@Param('IdCliente', ParseIntPipe) IdCliente: number) {
        return await this.compraService.consultarCompra(IdCliente);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Post(':idGestionVenta/:idAdmin')
    async registrarCompra(@Param('idGestionVenta') idGestionVenta: number, @Param('idAdmin') idAdmin: number,
        @Body() dto: CompraDto,
    ): Promise<any> {
        return this.compraService.registrarCompra(idGestionVenta, idAdmin, dto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdCliente')
    async editarCompra(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: CompraDto) {
        return await this.compraService.editarCompra(IdCliente, dto);
    }  

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('compra/:IdCliente')
    async terminarCompra(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: EstadoCompraDto){
        return await this.compraService.terminarCompra(IdCliente, dto);
    }
}
