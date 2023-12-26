import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from '../../dto/producto.dto';

@Controller('producto')
export class ProductoController {
 
    constructor(private readonly compraService: ProductoService) {}

    @Get()
    async consultarProductos() {
        return await this.compraService.consultarProductos();
    } 

    @Get(':TipoOro')
    async consultarProducto(@Param('TipoOro', ParseIntPipe) TipoOro: string) {
        return await this.compraService.consultarProducto(TipoOro);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async insertarProducto(@Body() dto: ProductoDto) {
        return await this.compraService.insertarProducto(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdProducto')
    async editarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number, @Body() dto: ProductoDto) {
        return await this.compraService.editarProducto(IdProducto, dto);
    }

    @Delete(':IdProducto')
    async anularProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number){
        return await this.compraService.anularProducto(IdProducto) 
    }
}
