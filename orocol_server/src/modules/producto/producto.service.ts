import { ProductoDto } from '../../dto/producto.dto';
import { ProductoEntity } from 'src/entities/producto.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/dto/common/message.dto';
import { EstadoProductoDto } from 'src/dto/enum.dto';
import { Repository } from 'typeorm'; 
import { EstadoProducto } from 'src/enums/producto.enum';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>
    ) { } 

    async consultarProductos(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }
    // Método para consultar productos

    async consultarProducto(IdProducto: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { IdProducto: IdProducto } });
        if (!producto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
    }
    // Método para consultar producto

    async insertarProducto(dto: ProductoDto): Promise<any> {
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto ${producto.TipoOro} creado`);
    }
    // Método para registrar productos

    async desactivarProducto(IdProducto: number, dto: EstadoProductoDto): Promise<any> {
        const producto = await this.consultarProducto(IdProducto);
        if (!producto) {
            throw new NotFoundException(new MessageDto('No existe el producto'));
        }
        if (producto.estadoProducto === EstadoProducto.INACTIVO) {
            throw new BadRequestException(new MessageDto('El producto ya está inactivo'));
        }
        producto.estadoProducto = EstadoProducto.INACTIVO;
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto de ${producto.TipoOro} inactivado`);
    }
    // Método para inactivar productos

    async activarProducto(IdProducto: number, dto: EstadoProductoDto): Promise<any> {
        const producto = await this.consultarProducto(IdProducto);
        if (!producto) {
            throw new NotFoundException(new MessageDto('No existe el producto'));
        }
        if (producto.estadoProducto === EstadoProducto.ACTIVO) {
            throw new BadRequestException(new MessageDto('El producto ya está activo'));
        }
        producto.estadoProducto = EstadoProducto.ACTIVO;
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto de ${producto.TipoOro} activado`);
    }
    // Método para reactivar productos
}
