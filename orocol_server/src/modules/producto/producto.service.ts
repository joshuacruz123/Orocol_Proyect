import { ProductoDto } from '../../dto/producto.dto';
import { ProductoRepository } from './producto.repository';
import { Producto } from './producto.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductoService {
    

    constructor(
        @InjectRepository(Producto)
        private productoRepository: ProductoRepository
    ) { }

    async consultarProductos(): Promise<Producto[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(IdProducto: number): Promise<Producto> {
        const producto = await this.productoRepository.findOne({ where: { IdProducto }});
        if (!producto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
    }

    async consultarProducto(TipoOro: string): Promise<Producto> {
        const producto = await this.productoRepository.findOne({ where: { TipoOro: TipoOro } });
        return producto;
    }

    async insertarProducto(dto: ProductoDto): Promise<any> {
        const exists = await this.consultarProducto(dto.TipoOro);
        if (exists) throw new BadRequestException(new MessageDto('ese TipoOro ya existe'));
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto(`producto ${producto.TipoOro} creado`);
    }

    async editarProducto(IdProducto: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(IdProducto);
        if (!producto)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.consultarProducto(dto.TipoOro);
        if (exists && exists.IdProducto !== IdProducto) throw new BadRequestException(new MessageDto('ese producto ya existe'));
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
