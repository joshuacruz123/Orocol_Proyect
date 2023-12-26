import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraDto } from '../../dto/compra.dto';

@Controller('compra')
export class CompraController {
 
    constructor(private readonly compraService: CompraService) {}

    @Get()
    async consultarClientes() {
        return await this.compraService.consultarClientes();
    } 

    @Get(':IdCliente')
    async consultarCliente(@Param('IdCliente', ParseIntPipe) IdCliente: number) {
        return await this.compraService.consultarCliente(IdCliente);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async insertarCliente(@Body() dto: CompraDto) {
        return await this.compraService.insertarCliente(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdCliente')
    async editarCliente(@Param('IdCliente', ParseIntPipe) IdCliente: number, @Body() dto: CompraDto) {
        return await this.compraService.editarCliente(IdCliente, dto);
    }

    @Delete(':IdCliente')
    async anularCompra(@Param('IdCliente', ParseIntPipe) IdCliente: number){
        return await this.compraService.anularCompra(IdCliente) 
    }
} 
