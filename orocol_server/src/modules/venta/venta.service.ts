import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { MessageDto } from 'src/dto/common/message.dto';
import { EntradaVentaEntity } from 'src/entities/entradaventas.entity';
import { SalidaVentaEntity } from 'src/entities/salidaventas.entity';
import { ProductoEntity } from 'src/entities/producto.entity';
import { ProductoService } from '../producto/producto.service';
import { MineroEntity } from 'src/entities/minero.entity';
import { MineroService } from '../minero/minero.service';
import { AdministradorEntity } from 'src/entities/administrador.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { EntradaDto } from 'src/dto/entrada.dto';
import { EstadoProducto } from '../../enums/producto.enum';
import { AdministradorService } from '../administrador/administrador.service';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { EstadoVentaDto } from 'src/dto/enum.dto';
import { EstadoVenta } from 'src/enums/venta.enum';

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
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly usuarioService: UsuarioService,
    ) { }

    async registrarVenta(IdMinero: number, TipoOro: string, dto: EntradaDto): Promise<any> {
        try {
            const minero = await this.mineroRepository.findOne({ where: { IdMinero } });
            const producto = await this.productoRepository.findOne({ where: { TipoOro: TipoOro } });
            if (!minero) {
                throw new NotFoundException('Usuario no encontrado');
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

    async registrarVentaAdmin(numero_documento: number, TipoOro: string, dto: EntradaDto): Promise<any> {
        try {
            const minero = await this.mineroRepository.findOne({ where: { numero_documento } });
            const producto = await this.productoRepository.findOne({ where: { TipoOro: TipoOro } });
            if (!minero) {
                throw new NotFoundException('No existe el usuario');
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
    // Método para registrar las ventas de entrada por administrador

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
        const entradaVenta = await this.entradaVentaRepository.findOne({
            where: { idGestionVenta },
            relations: ['minero.usuario', 'producto']
        });
        if (!entradaVenta) {
            throw new NotFoundException(new MessageDto('No existe ese registro'));
        }
        return entradaVenta;
    }
    // Método para consultar la venta de entrada

    async editarVent(idGestionVenta: number, entradaDto: EntradaDto): Promise<EntradaVentaEntity> {
        const venta = await this.entradaVentaRepository.findOne({ where: {idGestionVenta}});
        if (!venta) {
            throw new NotFoundException('Venta no encontrada');
        } // Actualizar los campos de la venta con los datos del DTO
        venta.fechaExtraccionOro = new Date (entradaDto.fechaExtraccionOro);
        venta.precioOro = entradaDto.precioOro;
        venta.cantidad = entradaDto.cantidad;

        // Guardar los cambios en la base de datos
        await this.entradaVentaRepository.save(venta);

        return venta;
    }
    async editarVenta(idGestionVenta: number, entradaDto: EntradaDto): Promise<any> {
        const venta = await this.consultarVenta(idGestionVenta);
        if (!venta) {
            throw new NotFoundException(new MessageDto('No existe la venta'));
        }
        if (idGestionVenta !== idGestionVenta) {
            throw new BadRequestException(new MessageDto('Esa venta ya existe'));
        }
        entradaDto.fechaExtraccionOro ? venta.fechaExtraccionOro = new Date(entradaDto.fechaExtraccionOro) : venta.fechaExtraccionOro;
        entradaDto.precioOro ? venta.precioOro = entradaDto.precioOro : venta.precioOro;
        entradaDto.cantidad ? venta.cantidad = entradaDto.cantidad : venta.cantidad;
        try {
            await this.entradaVentaRepository.save(venta);
            return new MessageDto(`Los datos de la venta de ${venta.producto.TipoOro} editados`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la información'));
        } 
    }
    // Método para editar la venta

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


    async generarReporteVenta(): Promise<EntradaVentaEntity[]> {
        const reporte = await this.entradaVentaRepository.find({
            relations: ['minero.usuario', 'producto', 'salida']
        });
        return reporte;
    }
    // Método para generar reportes de las ventas 

    async calcularIngresosVentas() {
        const ventas = await this.entradaVentaRepository.find();
    
        // Agrupar y sumar las cantidades por fecha de extracción de oro
        const indicadoresAgrupados = ventas.reduce((acc, venta) => {
            let fechaExtraccionOro: Date;
            if (venta.fechaExtraccionOro instanceof Date) {
                fechaExtraccionOro = venta.fechaExtraccionOro;
            } else {
                fechaExtraccionOro = new Date(venta.fechaExtraccionOro);
            }
    
            if (isNaN(fechaExtraccionOro.getTime())) {
                throw new Error(`Invalid date: ${venta.fechaExtraccionOro}`);
            }
    
            const fecha = fechaExtraccionOro.toISOString().split('T')[0];
            if (!acc[fecha]) {
                acc[fecha] = 0;
            }
            
            // Aquí se suma la cantidad de la venta actual a la fecha correspondiente
            acc[fecha] += Number(venta.cantidad);
            return acc;
        }, {});
    
        // Convertir el objeto de acumulación a un arreglo de resultados
        return Object.keys(indicadoresAgrupados).map(fecha => ({
            fecha,
            valorTotal: indicadoresAgrupados[fecha],
        }));
    }   
    // Método para generar indicadores financieros de las ventas
}
