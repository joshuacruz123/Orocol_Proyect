import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraDto } from 'src/dto/compra.dto';
import { EstadoCompraDto } from 'src/dto/enum.dto';

@Controller('compra')
export class CompraController {

    constructor(private readonly compraService: CompraService) {}

    @Get()
    async consultarCompras() {
        return await this.compraService.consultarCompras();
    } 

    @Get(':IdCliente')
    async consultarCompra(@Param('IdCliente', ParseIntPipe) IdCliente: number) {
        return await this.compraService.consultarCompra(IdCliente);
    }

    @Post(':IdSalidaVenta')
    async insertarCompra(@Param('IdSalidaVenta') IdSalidaVenta: number,
        @Body() dto: CompraDto,
    ): Promise<any> {
        return this.compraService.insertarCompra(IdSalidaVenta, dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdCliente')
    async editarNovedad(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: CompraDto) {
        return await this.compraService.editarCompra(IdCliente, dto);
    }  

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('compra/:IdCliente')
    async terminarCompra(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: EstadoCompraDto){
        return await this.compraService.terminarCompra(IdCliente, dto);
    }
}
