import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';
import { CompraService } from '../compra/compra.service';
import { ProductoService } from '../producto/producto.service'
import { NovedadService } from '../novedad/novedad.service'
 
@Injectable() 
export class VentaService {
    constructor( 
        @InjectRepository(EntradaVenta)
        private readonly entradaVentaRepository: Repository<EntradaVenta>,
        private readonly compraServiceRepository: CompraService,
        private readonly productoServiceRepository: ProductoService,
        private readonly novedadServiceRepository: NovedadService,
    ) {}

    async insertarVenta(entradaData: EntradaVenta): Promise<EntradaVenta> {
        const nuevoVenta = this.entradaVentaRepository.create(entradaData);
        return this.entradaVentaRepository.save(nuevoVenta);
    }
    
    async consultarVenta(idGestionVenta: number): Promise<EntradaVenta> {
        const EntradaVenta = await this.entradaVentaRepository.findOne(idGestionVenta);
        return EntradaVenta;      
    }

    async editarVenta(idGestionVenta: number, entradaData: EntradaVenta): Promise<EntradaVenta> {
        await this.entradaVentaRepository.update(idGestionVenta, entradaData);
        return this.entradaVentaRepository.findOne(idGestionVenta);
    }

    async anularVenta(idGestionVenta: number, entradaData: EntradaVenta): Promise<EntradaVenta> {
        await this.entradaVentaRepository.update(idGestionVenta, entradaData);
        return this.entradaVentaRepository.findOne(idGestionVenta);
    }

    async generarReporteVenta(idGestionVenta: number): Promise<EntradaVenta> {
        const EntradaVenta = await this.entradaVentaRepository.findOne(idGestionVenta);
        return EntradaVenta;      
    }

    /*
    async MostrarIndicadoresFinancierosMes(idGestionVenta: number): Promise<EntradaVenta> {
        const EntradaVenta = await this.entradaVentaRepository.findOne(idGestionVenta);
        return EntradaVenta;      
    } */
}
 