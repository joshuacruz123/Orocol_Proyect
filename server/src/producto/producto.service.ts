import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) {}

    async insertarProducto(productoData: Producto): Promise<Producto> {
        const nuevoProducto = this.productoRepository.create(productoData);
        return this.productoRepository.save(nuevoProducto);
    }
    
    async consultarProducto(IdProducto: number): Promise<Producto> {
        const Producto = await this.productoRepository.findOne(IdProducto);
        return Producto;      
    }

    async editarProducto(IdProducto: number, productoData: Producto): Promise<Producto> {
        await this.productoRepository.update(IdProducto, productoData);
        return this.productoRepository.findOne(IdProducto);
    }

    async anularProducto(IdProducto: number, productoData: Producto): Promise<Producto> {
        await this.productoRepository.update(IdProducto, productoData);
        return this.productoRepository.findOne(IdProducto);
    }

    /*
    async MostrarIndicadoresFinancierosMes(IdProducto: number): Promise<Producto> {
        const Producto = await this.productoRepository.findOne(IdProducto);
        return Producto;      
    } */
}
