import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';
import { EntradaVentaRepository } from './venta.repository';
import { SalidaVentaRepository } from './venta.repository';
import { EntradaDto } from '../../dto/entrada.dto';
import { SalidaDto } from '../../dto/salida.dto';

@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(EntradaVenta)
        private entradaVentaRepository: EntradaVentaRepository,
        @InjectRepository(SalidaVenta)
        private salidaVentaRepository: SalidaVentaRepository
    ) { }

    async insertarVentaEntrada(dto: EntradaDto): Promise<any> {
        const { fechaExtraccionOro, precioOro, cantidad } = dto;
        const exists = await this.entradaVentaRepository.findOne({ where: [{ fechaExtraccionOro: fechaExtraccionOro }, { precioOro: precioOro }, { cantidad: cantidad }] });
        if (exists) throw new BadRequestException(new MessageDto('ese fechaExtraccionOro ya existe'));
        const entrada = this.entradaVentaRepository.create(dto);
        await this.entradaVentaRepository.save(entrada);
        return new MessageDto(`Compra de ${entrada.fechaExtraccionOro} creada`);
    }
    // Método para registrar las ventas de entrada
    
      async consultarVentas(): Promise<EntradaVenta[]> {
        return await this.entradaVentaRepository.find();
      }
      // Método para consultar las ventas de entrada

    async consultarSalidaVenta(IdSalidaVenta: number): Promise<SalidaDto> {
      const venta = await this.salidaVentaRepository.findOne({ where: { IdSalidaVenta: IdSalidaVenta } });
      return venta;
    }

    async consultarVenta(idGestionVenta: number): Promise<EntradaDto> {
      const venta = await this.entradaVentaRepository.findOne({ where: { idGestionVenta: idGestionVenta } });
      return venta;
  }
    
      async insertarVentaAdministrador(dto: SalidaDto): Promise<any> {
        const exists = await this.consultarSalidaVenta(dto.PesogrOro);
        if (exists) throw new BadRequestException(new MessageDto('ese peso ya existe'));
        const venta = this.salidaVentaRepository.create(dto);
        await this.salidaVentaRepository.save(venta);
        return new MessageDto(`venta ${venta.PesogrOro} creado`);
    }
    // Método para registrar las ventas de venta
    
      async consultarSalidaVentas(): Promise<SalidaVenta[]> {
        return await this.salidaVentaRepository.find();
      }
      // Método para consultar las ventas de venta

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
        return await this.entradaVentaRepository.find();
      }
      // Método para generar reportes de las ventas
}
