import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { ClienteEntity } from './cliente.entity';
import { EntradaVentaEntity } from '../venta/entradaventas.entity';
import { SalidaVentaEntity } from '../venta/salidaventas.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { ProductoService } from '../producto/producto.service';
import { MineroEntity } from '../minero/minero.entity';
import { MineroService } from '../minero/minero.service';
import { AdministradorEntity } from '../administrador/administrador.entity'; 
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioRepository } from '../usuario/usuario.repository'; 
import { EntradaDto } from 'src/dto/entrada.dto';
import { EstadoProducto } from '../producto/producto.enum';
import { AdministradorService } from '../administrador/administrador.service'; 
import { RolEntity } from '../rol/rol.entity';
import { RolRepository } from '../rol/rol.repository';
import { UsuarioService } from '../usuario/usuario.service'; 
import { CompraDto } from 'src/dto/compra.dto';
import { EstadoCompraDto } from 'src/dto/enum.dto';
import { VentaService } from '../venta/venta.service';
import { EstadoCompra } from './cliente.enum';

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
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository,
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
        const compra: ClienteEntity = await this.clienteRepository.findOne({
            where: {
                salidaVentas: { IdSalidaVenta: salidaVentas.IdSalidaVenta }
            },
            relations: ['salidaVentas.entrada.producto']    
        });
        if (!compra) {
            throw new NotFoundException(new MessageDto('No existe ese registro')); 
        }
        return compra;
    }
    // Método para consultar una compra 

    async insertarCompra(IdSalidaVenta: number, dto: CompraDto): Promise<any> {
        const salidaVenta: SalidaVentaEntity = await this.ventaService.consultarSalidaVenta(IdSalidaVenta);
        if (!salidaVenta) {
            throw new InternalServerErrorException(
              new MessageDto('No existe el detalle de la venta'),
            );
        }
        const compra: ClienteEntity = new ClienteEntity();
        compra.NombreCompleto = dto.NombreCompleto;
        compra.Empresa = dto.Empresa;
        compra.Pais = dto.Pais;
        compra.CiudadMunicipio = dto.CiudadMunicipio;
        compra.FechaExportacion = dto.FechaExportacion;
        compra.salidaVentas = salidaVenta;
        try { // Guardar en la base de datos
            await this.clienteRepository.save(compra);
            await this.salidaVentaRepository.save(salidaVenta);
            return new MessageDto(`Información de la de ${salidaVenta.entrada.producto.TipoOro} registrada`);
        } catch (error) {
            throw new InternalServerErrorException(
                new MessageDto(`Error al registrar la compra: ${error.message || error}`),
            );
        }
    }
    // Método para registrar las salidas de las ventas

    async editarCompra(IdCliente: number, dto: CompraDto): Promise<any> {
        const compra = await this.consultarCompra(IdCliente);
        if (!compra) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (compra !== compra) {
            throw new BadRequestException(new MessageDto('La venta ya existe'));
        }
        compra.NombreCompleto = dto.NombreCompleto || compra.NombreCompleto;
        compra.Empresa = dto.Empresa || compra.Empresa;
        compra.Pais = dto.Pais || compra.Pais;
        compra.CiudadMunicipio = dto.CiudadMunicipio || compra.CiudadMunicipio;
        compra.FechaExportacion = dto.FechaExportacion || compra.FechaExportacion;
        try {
            await this.clienteRepository.save(compra);
            return new MessageDto('Datos de la compra fueron actualizados exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la compra'));
        }
    }
    // Método para editar la salida de la venta

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
