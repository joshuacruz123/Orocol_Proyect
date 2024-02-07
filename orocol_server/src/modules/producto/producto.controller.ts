import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from '../../dto/producto.dto';
import { EstadoProductoDto } from 'src/dto/enum.dto';

@Controller('producto')
export class ProductoController {
 
    constructor(private readonly productoService: ProductoService) {}

    @Get()
    async consultarProductos() {
        return await this.productoService.consultarProductos();
    } 

    @Get(':IdProducto')
    async consultarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number) {
        return await this.productoService.consultarProducto(IdProducto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async insertarProducto(@Body() dto: ProductoDto) {
        return await this.productoService.insertarProducto(dto);
    } 

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('desactivar/:IdProducto')
    async desactivarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number, @Body() dto: EstadoProductoDto){
        return await this.productoService.desactivarProducto(IdProducto, dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:IdProducto')
    async activarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number, @Body() dto: EstadoProductoDto){
        return await this.productoService.activarProducto(IdProducto, dto);
    }
}
