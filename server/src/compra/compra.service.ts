import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../compra/cliente.entity';

@Injectable() 
export class CompraService {
    constructor( 
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {} 
 
    async insertarCliente(compraData: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(nuevoCliente);
    }
    // Método para registrar una nueva compra
    
    async consultarCliente(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
      }
    // Método para consultar las compras
 
    async editarCliente(IdCliente: number, compraData: Cliente): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne(IdCliente);
        if (!cliente) {
          throw new NotFoundException('producto no encontrado');
        } 
    
        return await this.clienteRepository.save({ ...cliente, ...compraData });
    }
    // Método para editar las compras

    async anularCompra(IdCliente: number): Promise<void> {
        const compra = await this.clienteRepository.findOne(IdCliente);
        if (!compra) {
          throw new NotFoundException('Compra no encontrada');
        }
    
        compra.estadoCompra = 'Terminado'; 
        await this.clienteRepository.save(compra);
      } 
    
    // Método para anular las compras

    async GenerarReporteCompra(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }
    // Método para generar reporte de las compras

    /*
    async MostrarIndicadoresFinancierosMes(IdCliente: number): Promise<Cliente> {
        const Cliente = await this.clienteRepository.findOne(IdCliente);
        return Cliente;      
    }
    // Método para generar indicadores financieros de las compras */
}
