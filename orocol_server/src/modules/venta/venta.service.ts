import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';
import { EntradaDto } from '../../dto/entrada.dto';
import { SalidaDto } from '../../dto/salida.dto';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { Minero } from '../minero/minero.entity';
import { TurnoMinero } from '../minero/turno.entity';
import { Producto } from '../producto/producto.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { MineroService } from '../minero/minero.service';
import { ProductoService } from '../producto/producto.service';
import { ProductoDto } from 'src/dto/producto.dto';

@Injectable()
export class VentaService extends MineroService {
    constructor(
        @InjectRepository(EntradaVenta)
        protected readonly entradaVentaRepository: Repository<EntradaVenta>,
        @InjectRepository(SalidaVenta)
        protected readonly salidaVentaRepository: Repository<SalidaVenta>,
        @InjectRepository(Producto) protected readonly productoRepository: Repository<Producto>,
        protected readonly productoService: ProductoService,
        @InjectRepository(Minero) protected readonly mineroRepository: Repository<Minero>,
        protected readonly mineroService: MineroService,
        @InjectRepository(TurnoMinero) protected readonly turnoRepository: Repository<TurnoMinero>,
        @InjectRepository(Rol) protected readonly rolRepository: Repository<Rol>,
        @InjectRepository(Usuario) protected readonly usuarioRepository: Repository<Usuario>,
        protected readonly usuarioService: UsuarioService,
    ) {
        super(mineroRepository, turnoRepository, rolRepository, usuarioRepository, usuarioService);
    }

    async insertarVentaEntrada(dto: EntradaDto): Promise<any> {
        const productoDto: ProductoDto = {
            TipoOro: dto.TipoOro,
        };
        await this.productoService.insertarProducto(productoDto);
        const entrada = this.entradaVentaRepository.create(dto);
        await this.entradaVentaRepository.save(entrada);
    }
    // Método para registrar las ventas de entrada

    async consultarSalidaVentas(): Promise<SalidaVenta[]> {
        return await this.salidaVentaRepository.find();
    }
    // Método para consultar las ventas de salida  

    async consultarVentas(): Promise<EntradaVenta[]> {
        const mineros: Minero[] = await this.consultarMineros();
        const productos: Producto[] = await this.productoService.consultarProductos();
        const listaEntrada = mineros.filter(
            minero => minero instanceof EntradaVenta
        ) as unknown as EntradaVenta[];
        const listaProducto = productos.filter(
            producto => producto instanceof EntradaVenta
        ) as unknown as EntradaVenta[];
        const lista: EntradaVenta[] = [...listaEntrada, ...listaProducto];
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('La lista de ventas está vacía'));
        }
        return lista;
    }
    // Método para consultar las ventas de entrada

    async consultarVenta(idGestionVenta: number): Promise<EntradaVenta> {
        const minero: Minero = await this.consultarMinero(idGestionVenta);
        const producto: Producto = await this.productoService.consultarProducto(idGestionVenta);
        if (!minero || !producto) {
            throw new NotFoundException(new MessageDto('No se encontró el minero o el producto'));
        }
        const entradaVenta: EntradaVenta = await this.entradaVentaRepository.findOne({
            where: {
                Mineros: { IdMinero: minero.IdMinero },
                Productos: { IdProducto: producto.IdProducto }
            },
            relations: ['Mineros', 'Productos']
            
        });
        if (!entradaVenta) {
            throw new NotFoundException(new MessageDto('No hay ningún registro en la lista')); 
        }
        return entradaVenta;
    }

    async consultarSalidaVenta(IdSalidaVenta: number): Promise<SalidaVenta> {
        const entrada: EntradaVenta = await this.consultarVenta(IdSalidaVenta);
        const salida = await this.salidaVentaRepository.findOne({ where: { IdSalidaVenta: entrada.idGestionVenta } });
        if (!salida) {
            throw new NotFoundException(new MessageDto('No existe la salida de la venta'));
        }
        return salida;
    }

    async insertarVentaAdministrador(dto: SalidaDto): Promise<any> {
        const exists = await this.consultarSalidaVenta(dto.PesogrOro);
        if (exists) throw new BadRequestException(new MessageDto('ese peso ya existe'));
        const venta = this.salidaVentaRepository.create(dto);
        await this.salidaVentaRepository.save(venta);
        return new MessageDto(`venta ${venta.PesogrOro} creado`);
    }
    // Método para registrar las ventas de venta

    async findById(IdSalidaVenta: number): Promise<SalidaVenta> {
        const venta = await this.salidaVentaRepository.findOne({ where: { IdSalidaVenta: IdSalidaVenta } });
        if (!venta) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return venta;
    }

    async inactivarVenta(idAdmin: number): Promise<any> {
        const venta = await this.findById(idAdmin);
        await this.salidaVentaRepository.delete(idAdmin);
        return new MessageDto(`venta ${venta.PesogrOro} eliminado`);
    }
    // Método para inactivar las ventas  

    async generarReporteVenta(): Promise<EntradaVenta[]> {
        const mineros: Minero[] = await this.consultarMineros();
        const productos: Producto[] = await this.productoService.consultarProductos();
        const salidas: SalidaVenta[] = await this.consultarSalidaVentas();
        const listaEntrada = mineros.filter(
            minero => minero instanceof EntradaVenta
        ) as unknown as EntradaVenta[];
        const listaProducto = productos.filter(
            producto => producto instanceof EntradaVenta
        ) as unknown as EntradaVenta[];
        const listaSalida = salidas.filter(
            salida => salida instanceof EntradaVenta
        ) as unknown as EntradaVenta[];
        const lista: EntradaVenta[] = [...listaEntrada, ...listaProducto, ...listaSalida];
        return lista;
    }
}
 