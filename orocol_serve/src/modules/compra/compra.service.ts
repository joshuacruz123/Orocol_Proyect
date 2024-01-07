import { CompraDto } from '../../dto/compra.dto';
import { Cliente } from './cliente.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Repository } from 'typeorm';
import { VentaService } from '../venta/venta.service';
import { EntradaVenta } from '../venta/entradaventas.entity';
import { SalidaVenta } from '../venta/salidaventas.entity';
import { Minero } from '../minero/minero.entity';
import { MineroService } from '../minero/minero.service';
import { TurnoMinero } from '../minero/turno.entity';
import { Producto } from '../producto/producto.entity';
import { ProductoService } from '../producto/producto.service';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class CompraService extends VentaService{

    constructor( 
        @InjectRepository(Cliente)
        protected readonly clienteRepository: Repository<Cliente>,
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
    ) { super(
            entradaVentaRepository, 
            salidaVentaRepository, 
            productoRepository, 
            productoService, 
            mineroRepository,
            mineroService, 
            turnoRepository, 
            rolRepository, 
            usuarioRepository, 
            usuarioService
            ); } 

        async consultarClientes(): Promise<Cliente[]> {
            const salidas: SalidaVenta[] = await this.consultarSalidaVentas();
            const productos: Producto[] = await this.productoService.consultarProductos();
            const listaSalida = salidas.filter(
                salida => salida instanceof Cliente
            ) as unknown as Cliente[];
            const listaProducto = productos.filter(
                producto => producto instanceof Cliente
            ) as unknown as Cliente[];
            const lista: Cliente[] = [...listaSalida, ...listaProducto];
            if (!lista.length) {
                throw new NotFoundException(new MessageDto('La lista de ventas está vacía'));
            }
            return lista;
        } 

    async consultarCliente(IdCliente: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({ where: { IdCliente: IdCliente } });
        if (!cliente) {
            throw new NotFoundException(new MessageDto('No se encontró el la compra del producto'));
        }
        return cliente;
    }

    async insertarCliente(dto: CompraDto): Promise<any> {
        const { NombreCompleto, Empresa, Pais, CiudadMunicipio, FechaExportacion } = dto;
        const exists = await this.clienteRepository.findOne({ where: [{ NombreCompleto: NombreCompleto }, { Empresa: Empresa }, { Pais: Pais }, { CiudadMunicipio: CiudadMunicipio }, { FechaExportacion: FechaExportacion }] });
        if (exists) throw new BadRequestException(new MessageDto('ese NombreCompleto ya existe'));
        const cliente = this.clienteRepository.create(dto);
        await this.clienteRepository.save(cliente);
        return new MessageDto(`Compra de ${cliente.NombreCompleto} creada`);
    }

    async editarCliente(IdCliente: number, dto: CompraDto): Promise<any> {
        const cliente = await this.consultarCliente(IdCliente);
        if (!cliente)
            throw new NotFoundException(new MessageDto('no existe'));
        dto.NombreCompleto ? cliente.NombreCompleto = dto.NombreCompleto : cliente.NombreCompleto = cliente.NombreCompleto;
        dto.Empresa ? cliente.Empresa = dto.Empresa : cliente.Empresa = cliente.Empresa;
        dto.Pais ? cliente.Pais = dto.Pais : cliente.Pais = cliente.Pais;
        dto.CiudadMunicipio ? cliente.CiudadMunicipio = dto.CiudadMunicipio : cliente.CiudadMunicipio = cliente.CiudadMunicipio;
        dto.FechaExportacion ? cliente.FechaExportacion = dto.FechaExportacion : cliente.FechaExportacion = cliente.FechaExportacion;
        await this.clienteRepository.save(cliente);
        return new MessageDto(`Compra de ${cliente.NombreCompleto} actualizada`);
    }


    async anularCompra(IdCliente: number): Promise<any> {
        const cliente = await this.consultarCliente(IdCliente);
        await this.clienteRepository.delete(IdCliente);
        return new MessageDto(`Compra de ${cliente.NombreCompleto} eliminada`);
    }
    

    async generarReporteClientesCompras(): Promise<Cliente[]> {
        const salidas: SalidaVenta[] = await this.consultarSalidaVentas();
        const productos: Producto[] = await this.productoService.consultarProductos();
        const listaSalida = salidas.filter(
            salida => salida instanceof Cliente
        ) as unknown as Cliente[];
        const listaProducto = productos.filter(
            producto => producto instanceof Cliente
        ) as unknown as Cliente[];
        const lista: Cliente[] = [...listaSalida, ...listaProducto];
        return lista;
    } 
    // Método para 
} 