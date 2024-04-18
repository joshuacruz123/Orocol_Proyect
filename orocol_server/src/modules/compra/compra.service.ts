import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/dto/common/message.dto';
import { ClienteEntity } from './cliente.entity';
import { EntradaVentaEntity } from '../venta/entradaventas.entity';
import { SalidaVentaEntity } from '../venta/salidaventas.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { ProductoService } from '../producto/producto.service';
import { MineroEntity } from '../minero/minero.entity';
import { MineroService } from '../minero/minero.service';
import { AdministradorEntity } from '../administrador/administrador.entity'; 
import { UsuarioEntity } from '../usuario/usuario.entity';
import { EntradaDto } from 'src/dto/entrada.dto';
import { EstadoProducto } from '../producto/producto.enum';
import { AdministradorService } from '../administrador/administrador.service'; 
import { RolEntity } from '../rol/rol.entity';
import { UsuarioService } from '../usuario/usuario.service'; 
import { CompraDto } from 'src/dto/compra.dto';
import { EstadoCompraDto } from 'src/dto/enum.dto';
import { VentaService } from '../venta/venta.service';
import { EstadoCompra } from './cliente.enum';
import { EstadoVenta } from '../venta/venta.enum';

@Injectable()
export class CompraService {

    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>,
        @InjectRepository(EntradaVentaEntity)
        private readonly entradaVentaRepository: Repository<EntradaVentaEntity>,
        @InjectRepository(SalidaVentaEntity)
        private readonly salidaVentaRepository: Repository<SalidaVentaEntity>,
        private readonly ventaService: VentaService,
        @InjectRepository(ProductoEntity) private readonly productoRepository: Repository<ProductoEntity>,
        private readonly productoService: ProductoService,
        @InjectRepository(MineroEntity) 
        private readonly mineroRepository: Repository<MineroEntity>,
        private readonly mineroService: MineroService,
        @InjectRepository(AdministradorEntity)
        private administradorRepository: Repository<AdministradorEntity>,
        private readonly administradorService: AdministradorService,
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly usuarioService: UsuarioService,
    ) { }

    async consultarCompras(): Promise<ClienteEntity[]> {
        const compras = await this.clienteRepository.find({
            relations: ['salidaVentas.entrada.producto']
        });
        if (!compras || compras.length === 0) {
            throw new NotFoundException(new MessageDto('No hay compras registradas'));
        }
        return compras;
    }
    // Método para consultar las compras
    
    async consultarCompra(IdCliente: number): Promise<ClienteEntity> {
        const salidaVentas: SalidaVentaEntity = await this.ventaService.consultarSalidaVenta(IdCliente);
        if (!salidaVentas) {
            throw new NotFoundException(new MessageDto('No se encontró el minero o el producto'));
        }
        const compra = await this.clienteRepository.findOne({
            where: {IdCliente},
            relations: ['salidaVentas.entrada.producto']    
        });
        if (!compra) {
            throw new NotFoundException(new MessageDto('No existe ese registro')); 
        }
        return compra;
    }
    // Método para consultar una compra 

    async registrarCompra(idGestionVenta: number, idAdmin: number, dto: CompraDto): Promise<MessageDto> {
        const entradaVenta: EntradaVentaEntity = await this.entradaVentaRepository.findOne({ where: {idGestionVenta}}); // Obtener la entrada de venta
        const administrador: AdministradorEntity = await this.administradorRepository.findOne({ where: {idAdmin}}); 
        if (!entradaVenta || entradaVenta.estadoVenta === EstadoVenta.INACTIVO) {
            throw new NotFoundException('Venta no encontrada o no disponible');
        }
        if (!administrador) {
            throw new InternalServerErrorException(
              new MessageDto('Administrador no encontrado'),
            );
        }
        const nuevaSalida = new SalidaVentaEntity();
        nuevaSalida.PesogrOro = dto.PesogrOro;
        nuevaSalida.administrador = administrador;
        nuevaSalida.entrada = entradaVenta;
        const nuevaCompra = new ClienteEntity();
        nuevaCompra.NombreCompleto = dto.NombreCompleto;
        nuevaCompra.Empresa = dto.Empresa;
        nuevaCompra.Pais = dto.Pais;
        nuevaCompra.CiudadMunicipio = dto.CiudadMunicipio;
        nuevaCompra.FechaExportacion = new Date (dto.FechaExportacion);
        nuevaCompra.salidaVentas = nuevaSalida;
        try {
            await this.salidaVentaRepository.save(nuevaSalida);
            await this.clienteRepository.save(nuevaCompra);
            return new MessageDto(`Compra de ${nuevaCompra.NombreCompleto} registrada.`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al registrar compra: ${error.message || error}`))
        }
    }
    // Método para registrar las salidas de las ventas
    
    async editarCompra(IdCliente: number, dto: CompraDto): Promise<any> {
        const compra = await this.consultarCompra(IdCliente);
        if (!compra) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (IdCliente !== IdCliente) {
            throw new BadRequestException(new MessageDto('Esa compra ya existe'));
        }
        dto.NombreCompleto ? compra.NombreCompleto = dto.NombreCompleto : compra.NombreCompleto;
        dto.Empresa ? compra.Empresa = dto.Empresa : compra.Empresa;
        dto.Pais ? compra.Pais = dto.Pais : compra.Pais;
        dto.CiudadMunicipio ? compra.CiudadMunicipio = dto.CiudadMunicipio : compra.CiudadMunicipio;
        dto.FechaExportacion ? compra.FechaExportacion = new Date(dto.FechaExportacion) : compra.FechaExportacion;
        dto.PesogrOro ? compra.salidaVentas.PesogrOro = dto.PesogrOro : compra.salidaVentas.PesogrOro;
        try {
            // Guardar el compra en la base de datos
            await this.clienteRepository.save(compra);
            return new MessageDto(`Los datos de la venta de ${compra.salidaVentas.entrada.producto.TipoOro} editados`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la información'));
        } 
    }
    // Método para editar la compra de la venta

    async terminarCompra(IdCliente: number, dto: EstadoCompraDto): Promise<any> {
        const compra = await this.consultarCompra(IdCliente);
        if (!compra) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (compra.estadoCompra === EstadoCompra.INACTIVO) {
            throw new BadRequestException(new MessageDto('La venta ya está inactiva'));
        }
        compra.estadoCompra = EstadoCompra.INACTIVO;
        await this.clienteRepository.save(compra);
        return new MessageDto(`Compra terminada`);
    }
    // Método para inactivar ventas
} 
