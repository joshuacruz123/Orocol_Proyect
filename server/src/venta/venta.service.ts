import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaVenta } from './entradaventas.entity';

@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(EntradaVenta)
        private readonly entradaVentaRepository: Repository<EntradaVenta>,
    ) {}

    async registrarVenta(entradaData: EntradaVenta): Promise<EntradaVenta> {
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

    async verNoverVentaero(idGestionVenta: number): Promise<EntradaVenta> {
        const verNovMin = this.entradaVentaRepository.findOne(idGestionVenta);
        return verNovMin;
    }

    async registrarMinero(entradaData: EntradaVenta): Promise<EntradaVenta> {
        const nuevoMinero = this.entradaVentaRepository.create(entradaData);
        return this.entradaVentaRepository.save(nuevoMinero);
    }

    async consultarMineros(idGestionVenta: number): Promise<EntradaVenta> {
        const EntradaVenta = await this.entradaVentaRepository.findOne(idGestionVenta);
        return EntradaVenta;      
    }

    async solicitarEditarDoc(entradaData: EntradaVenta): Promise<EntradaVenta> {
        const solicitudMinero = this.entradaVentaRepository.create(entradaData);
        return this.entradaVentaRepository.save(solicitudMinero);
    }

    async editarMinero(idGestionVenta: number, entradaData: EntradaVenta): Promise<EntradaVenta> {
        await this.entradaVentaRepository.update(idGestionVenta, entradaData);
        return this.entradaVentaRepository.findOne(idGestionVenta);
    }

    async reactivarMinero(idGestionVenta: number, entradaData: EntradaVenta): Promise<EntradaVenta> {
        await this.entradaVentaRepository.update(idGestionVenta, entradaData);
        return this.entradaVentaRepository.findOne(idGestionVenta);
    }
}
 