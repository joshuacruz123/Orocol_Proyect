import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from '../producto/producto.entity';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}
    // 

    @Post()
    async registrarProducto(@Body() productoData: Producto): Promise<Producto> {
        return this.productoService.insertarProducto(productoData);
    }
    // Método para controlar   
    
    @Get(':IdProducto')
    async verProducto(@Param('IdProducto') IdProducto: number): Promise<Producto> {
        try {
            return await this.productoService.consultarProducto(IdProducto);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar  
    
    @Put(':IdProducto')
    async actualizarProducto(@Param('IdProducto') IdProducto: number, @Body() productoData: Producto): Promise<Producto> {
        try {
            return await this.productoService.editarProducto(IdProducto, productoData);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar   
    
    @Put('/inactivar/:IdProducto')
    async inactivarProducto(@Param('IdProducto') IdProducto: number): Promise<string> {
        try {
            await this.productoService.anularProducto(IdProducto);
            return 'El producto ahora es inactiva en el sistema.';
        } catch (error) {
            return `Error al inactivar producto: ${error.message}`;
        }
    } 
    // Método para controlar  

    /*
    @Delete(':IdProducto')
    eliminarproducto(@Param('IdProducto') IdProducto: number): Promise<void> {
        return this.productoService.delete(IdProducto);
    }*/

}
