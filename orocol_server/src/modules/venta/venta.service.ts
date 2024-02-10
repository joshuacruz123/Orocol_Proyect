import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EntradaVentaEntity } from './entradaventas.entity';
import { SalidaVentaEntity } from './salidaventas.entity';
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
import { SalidaDto } from 'src/dto/salida.dto';
import { EstadoVentaDto } from 'src/dto/enum.dto';
import { EstadoVenta } from './venta.enum';

@Injectable()
export class VentaService {
     
    constructor( 
        @InjectRepository(EntradaVentaEntity)
        private readonly entradaVentaRepository: Repository<EntradaVentaEntity>,
        @InjectRepository(SalidaVentaEntity)
        private readonly salidaVentaRepository: Repository<SalidaVentaEntity>,
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
    
    async registrarVenta(numero_documento: number, tipoOro: string, dto: EntradaDto): Promise<any> {
        try {
            const minero = await this.mineroRepository.findOne({ where: { numero_documento } });
            const producto = await this.productoRepository.findOne({ where: { TipoOro: tipoOro } });
            if (!minero) {
                throw new NotFoundException('Minero no encontrado');
            }
            if (!producto || producto.estadoProducto === EstadoProducto.INACTIVO) {
                throw new NotFoundException('Producto no encontrado o no disponible');
            }
            const nuevaVenta = this.entradaVentaRepository.create({
                ...dto,
                minero,
                producto,
            });
            nuevaVenta.minero = minero;
            nuevaVenta.producto = producto;
            await this.entradaVentaRepository.save(nuevaVenta);
            return new MessageDto(`Venta de ${producto.TipoOro} registrada.`);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(new MessageDto(`Error al registrar la venta`));
        }
    }
    // Método para registrar las ventas de entrada

    async consultarVentas(): Promise<EntradaVentaEntity[]> {
        const ventas = await this.entradaVentaRepository.find({
            relations: ['minero.usuario', 'producto']
        });

        if (!ventas || ventas.length === 0) {
            throw new NotFoundException(new MessageDto('No hay ventas registradas'));
        }

        return ventas;
    }
    // Método para consultar las ventas de entrada 

    async consultarVenta(idGestionVenta: number): Promise<EntradaVentaEntity> {
        const minero: MineroEntity = await this.mineroService.consultarMinero(idGestionVenta);
        const producto: ProductoEntity = await this.productoService.consultarProducto(idGestionVenta);
        if (!minero || !producto) {
            throw new NotFoundException(new MessageDto('No se encontró el minero o el producto'));
        }
        const entradaVenta: EntradaVentaEntity = await this.entradaVentaRepository.findOne({
            where: {
                minero: { IdMinero: minero.IdMinero },
                producto: { IdProducto: producto.IdProducto }
            },
            relations: ['minero.usuario', 'producto']    
        });
        if (!entradaVenta) {
            throw new NotFoundException(new MessageDto('No existe ese registro')); 
        }
        return entradaVenta;
    }
    // Método para consultar la venta de entrada

    async editarVenta(idGestionVenta: number, dto: EntradaDto): Promise<any> {
        const venta = await this.consultarVenta(idGestionVenta);
        if (!venta) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (venta !== venta) {
            throw new BadRequestException(new MessageDto('La venta ya existe'));
        }
        venta.fechaExtraccionOro = dto.fechaExtraccionOro || venta.fechaExtraccionOro;
        venta.precioOro = dto.precioOro || venta.precioOro;
        venta.cantidad = dto.cantidad || venta.cantidad;
        try {
            await this.entradaVentaRepository.save(venta);
            return new MessageDto('Datos de la venta editados exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la venta'));
        }
    }
    // Método para editar la salida de la venta

    async desactivarVenta(idGestionVenta: number, dto: EstadoVentaDto): Promise<any> {
        const venta = await this.consultarVenta(idGestionVenta);
        if (!venta) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (venta.estadoVenta === EstadoVenta.INACTIVO) {
            throw new BadRequestException(new MessageDto('La venta ya está inactiva'));
        }
        venta.estadoVenta = EstadoVenta.INACTIVO;
        await this.entradaVentaRepository.save(venta);
        return new MessageDto(`Venta inactivada`);
    }
    // Método para inactivar ventas

    async activarVenta(idGestionVenta: number, dto: EstadoVentaDto): Promise<any> {
        const venta = await this.consultarVenta(idGestionVenta);
        if (!venta) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (venta.estadoVenta === EstadoVenta.ACTIVO) {
            throw new BadRequestException(new MessageDto('La venta ya está activa'));
        }
        venta.estadoVenta = EstadoVenta.ACTIVO;
        await this.entradaVentaRepository.save(venta);
        return new MessageDto(`Venta reactivada con exito`);
    }
    // Método para reactivar las ventas

    async consultarSalidaVentas(): Promise<SalidaVentaEntity[]> {
        const salida = await this.salidaVentaRepository.find({
            relations: ['entrada.producto']
        });

        if (!salida || salida.length === 0) {
            throw new NotFoundException(new MessageDto('No hay detalle de ventas registrados'));
        }

        return salida;
    }
    // Método para consultar las ventas de salida 

    async consultarSalidaVenta(IdSalidaVenta: number): Promise<SalidaVentaEntity> {
        const entrada: EntradaVentaEntity = await this.consultarVenta(IdSalidaVenta);
        if (!entrada) {
            throw new NotFoundException(new MessageDto('No se encontró la venta'));
        }
        const salidaVenta: SalidaVentaEntity = await this.salidaVentaRepository.findOne({
            where: {
                entrada: { idGestionVenta: entrada.idGestionVenta }
            },
            relations: ['entrada']    
        });
        if (!salidaVenta) {
            throw new NotFoundException(new MessageDto('No existe ese registro')); 
        }
        return salidaVenta;
    }
    // Método para consultar la salida de la venta
    
    async registrarSalidaVenta(idGestionVenta: number, idAdmin: number, dto: SalidaDto): Promise<any> {
        const entradaVenta: EntradaVentaEntity = await this.consultarVenta(idGestionVenta); // Obtener la entrada de venta 
        const administrador: AdministradorEntity = await this.administradorRepository.findOne({ where: {idAdmin}}); // Obtener el administrador
        if (!entradaVenta || !administrador) {
            throw new InternalServerErrorException(
              new MessageDto('Entrada de venta o administrador no encontrados'),
            );
        }
        if (!entradaVenta || entradaVenta.estadoVenta === EstadoVenta.INACTIVO) {
            throw new NotFoundException('Venta no encontrada o no disponible');
        }
        const salidaVenta: SalidaVentaEntity = new SalidaVentaEntity(); // Crear instancia de SalidaVentaEntity
        salidaVenta.PesogrOro = dto.PesogrOro;
        salidaVenta.administrador = administrador;
        entradaVenta.salida = salidaVenta; // Asignar la salida de venta a la entrada de venta
        try { // Guardar en la base de datos
            await this.salidaVentaRepository.save(salidaVenta);
            await this.entradaVentaRepository.save(entradaVenta);
            return new MessageDto(`Información del detalle venta de ${entradaVenta.producto.TipoOro} registrada`);
        } catch (error) {
            throw new InternalServerErrorException(
                new MessageDto(`Error al registrar la venta: ${error.message || error}`),
            );
        }
    }
    // Método para registrar las salidas de las ventas

    async editarSalidaVenta(IdSalidaVenta: number, dto: SalidaDto): Promise<any> {
        const salidaVenta = await this.consultarSalidaVenta(IdSalidaVenta);
        if (!salidaVenta) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (salidaVenta !== salidaVenta) {
            throw new BadRequestException(new MessageDto('La venta ya existe'));
        }
        salidaVenta.PesogrOro = dto.PesogrOro || salidaVenta.PesogrOro;
        try {
            await this.salidaVentaRepository.save(salidaVenta);
            return new MessageDto('Detalle de la venta editado exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la venta'));
        }
    }
    // Método para editar la salida de la venta

    async generarReporteVenta(): Promise<EntradaVentaEntity[]> {
        const reporte = await this.entradaVentaRepository.find({
            relations: ['minero.usuario', 'producto', 'salida']
        });
        return reporte;
    }
    // Método para generar reportes de las ventas 

    /*
    async generarIndicadoresFinancieros(): Promise<> {
        
    }
    // Método para generar indicadores financieros
    */
}
