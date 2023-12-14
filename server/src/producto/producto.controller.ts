import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from '../producto/producto.entity';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}
    // Trae el servicio de ProductoService

    @Post()
    async registrarProducto(@Body() productoData: Producto): Promise<Producto> {
        return this.productoService.insertarProducto(productoData);
    }
    // Método para controlar registro de los productos 
    
    @Get(':IdProducto')
    async verProducto(@Param('IdProducto') IdProducto: number): Promise<Producto> {
        try {
            return await this.productoService.consultarProducto(IdProducto);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar consulta de los productos 
    
    @Put(':IdProducto')
    async actualizarProducto(@Param('IdProducto') IdProducto: number, @Body() productoData: Producto): Promise<Producto> {
        try {
            return await this.productoService.editarProducto(IdProducto, productoData);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar edición de los productos 
    
    @Put('/inactivar/:IdProducto')
    async inactivarProducto(@Param('IdProducto') IdProducto: number): Promise<string> {
        try {
            await this.productoService.anularProducto(IdProducto);
            return 'El producto ahora es inactiva en el sistema.';
        } catch (error) {
            return `Error al inactivar producto: ${error.message}`;
        } 
    } 
    // Método para controlar inactivación de los productos

}
