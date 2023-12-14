import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';
import { Administrador } from '../administrador/administrador.entity';
import { Minero } from '../minero/minero.entity';
import { CompraService } from '../compra/compra.service';
import { ProductoService } from '../producto/producto.service';
 
@Injectable() 
export class VentaService {
    constructor( 
        @InjectRepository(EntradaVenta)
        private readonly entradaVentaRepository: Repository<EntradaVenta>,
        @InjectRepository(SalidaVenta)
        private readonly salidaVentaRepository: Repository<SalidaVenta>,
        @InjectRepository(Administrador)
        private readonly administradorRepository: Repository<Administrador>,
        @InjectRepository(Minero)
        private readonly mineroRepository: Repository<Minero>,
        private readonly compraServiceRepository: CompraService,
        private readonly productoServiceRepository: ProductoService,
    ) {}

  async insertarVentaMinero(entradaData: EntradaVenta): Promise<EntradaVenta> {
    return await this.entradaVentaRepository.save(entradaData);
  } 
  // Método para registrar las ventas de minero

  async consultarVenta(): Promise<EntradaVenta[]> {
    return await this.entradaVentaRepository.find();
  }
  // Método para consultar las ventas de mineros

  async insertarVentaAdministrador(salidaData: SalidaVenta): Promise<SalidaVenta> {
    return await this.salidaVentaRepository.save(salidaData);
  }
  // Método para registrar las ventas de administrador

  async consultarSalidaVenta(): Promise<SalidaVenta[]> {
    return await this.salidaVentaRepository.find();
  }
  // Método para consultar las ventas de administrador

  async editarVentaMinero(idGestionVenta: number, entradaData: EntradaVenta): Promise<EntradaVenta> {
    const venta = await this.entradaVentaRepository.findOne(idGestionVenta);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    return await this.entradaVentaRepository.save({ ...venta, ...entradaData });
  }
  // Método para editar las ventas minero

  async editarVentaAdministrador(idGestionVenta: number, salidaData: SalidaVenta): Promise<SalidaVenta> {
    const venta = await this.salidaVentaRepository.findOne(idGestionVenta);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    return await this.salidaVentaRepository.save({ ...venta, ...salidaData });
  } 
  // Método para editar las ventas administrador

  async inactivarVenta(idGestionVenta: number): Promise<void> {
    const venta = await this.entradaVentaRepository.findOne(idGestionVenta);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    venta.estadoVenta = 'Inactivo'; 
    await this.entradaVentaRepository.save(venta);
  } 
  // Método para inactivar las ventas

  async generarReporteVenta(): Promise<EntradaVenta[]> {
    return await this.entradaVentaRepository.find();
  }
  // Método para generar reportes de las ventas

}
 