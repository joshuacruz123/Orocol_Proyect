import { ProductoDto } from '../../dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Repository } from 'typeorm'; 

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        protected readonly productoRepository: Repository<ProductoEntity>
    ) { } 

    async consultarProductos(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(IdProducto: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { IdProducto }});
        if (!producto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
    }

    async consultarProducto(IdProducto: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { IdProducto: IdProducto } });
        return producto;
    }

    async insertarProducto(dto: ProductoDto): Promise<any> {
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto(`producto ${producto.TipoOro} creado`);
    }

    async editarProducto(IdProducto: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(IdProducto);
        if (!producto)
            throw new NotFoundException(new MessageDto('no existe'));
        dto.TipoOro ? producto.TipoOro = dto.TipoOro : producto.TipoOro = producto.TipoOro;
        await this.productoRepository.save(producto);
        return new MessageDto(`producto ${producto.TipoOro} actualizado`);
    }

    async anularProducto(IdProducto: number): Promise<any> {
        const producto = await this.findById(IdProducto);
        await this.productoRepository.delete(IdProducto);
        return new MessageDto(`producto ${producto.TipoOro} eliminado`);
    }
}
