import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from '../../dto/producto.dto';

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
    @Put(':IdProducto')
    async editarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number, @Body() dto: ProductoDto) {
        return await this.productoService.editarProducto(IdProducto, dto);
    }

    @Delete(':IdProducto')
    async anularProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number){
        return await this.productoService.anularProducto(IdProducto) 
    }
}
