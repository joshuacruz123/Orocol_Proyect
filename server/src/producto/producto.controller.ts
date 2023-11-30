import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from '../producto/producto.entity';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}
    /*
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuariosService.findAll(); 
    }*/

    @Post()
    registrarProducto(@Body() productoData: Producto): Promise<Producto> {
        return this.productoService.insertarProducto(productoData);
    }
    
    @Get(':IdProducto')
    verProducto(IdProducto: number): Promise<Producto> {
        return this.productoService.consultarProducto(IdProducto);
    } 
    
    @Put(':IdProducto')
    editarUsuario(@Param('IdProducto') IdProducto: number, @Body() productoData: Producto): Promise<Producto> {
        return this.productoService.editarProducto(IdProducto, productoData);
    }

    @Put(':IdProducto')
    inactivarProducto(@Param('IdProducto') IdProducto: number, @Body() productoData: Producto): Promise<Producto> {
        return this.productoService.anularProducto(IdProducto, productoData);
    }

    /*
    @Delete(':IdProducto')
    eliminarUsuario(@Param('IdProducto') IdProducto: number): Promise<void> {
        return this.productoService.delete(IdProducto);
    }*/

}
