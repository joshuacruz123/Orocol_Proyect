import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraDto } from 'src/dto/compra.dto';
import { EstadoCompraDto } from 'src/dto/enum.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

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
    @Post(':IdSalidaVenta')
    async insertarCompra(@Param('IdSalidaVenta') IdSalidaVenta: number,
        @Body() dto: CompraDto,
    ): Promise<any> {
        return this.compraService.insertarCompra(IdSalidaVenta, dto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdCliente')
    async editarNovedad(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: CompraDto) {
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
