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
    // Repositorio(s) para manipular las entidades  

    async insertarProducto(productoData: Producto): Promise<Producto> {
        return await this.productoRepository.save(productoData);
    }
    // Método para registrar un nuevo producto
    
    
    async consultarProducto(): Promise<Producto[]> {
        return await this.productoRepository.find();
      }
    // Método para consultar producto

    async editarProducto(IdProducto: number, productoData: Producto): Promise<Producto> {
        const producto = await this.productoRepository.findOne(IdProducto);
        if (!producto) {
          throw new NotFoundException('producto no encontrado');
        }
    
        return await this.productoRepository.save({ ...producto, ...productoData });
    }
    // Método para editar producto

    async anularProducto(IdProducto: number): Promise<void> {
        const producto = await this.productoRepository.findOne(IdProducto);
        if (!producto) {
          throw new NotFoundException('Producto no encontrado');
        }
    
        producto.estadoProducto = 'No disponible'; 
        await this.productoRepository.save(producto);
    } 
    // Método para inactivar producto
}
