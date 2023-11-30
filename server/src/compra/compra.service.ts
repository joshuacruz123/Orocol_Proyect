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
        const nuevoCliente = this.clienteRepository.create(compraData);
        return this.clienteRepository.save(nuevoCliente);
    }
    
    async consultarCliente(IdCliente: number): Promise<Cliente> {
        const Cliente = await this.clienteRepository.findOne(IdCliente);
        return Cliente;      
    }

    async editarCliente(IdCliente: number, compraData: Cliente): Promise<Cliente> {
        await this.clienteRepository.update(IdCliente, compraData);
        return this.clienteRepository.findOne(IdCliente);
    }

    async anularCliente(IdCliente: number, compraData: Cliente): Promise<Cliente> {
        await this.clienteRepository.update(IdCliente, compraData);
        return this.clienteRepository.findOne(IdCliente);
    }


    async GenerarReporteCompra(IdCliente: number): Promise<Cliente> {
        const Cliente = await this.clienteRepository.findOne(IdCliente);
        return Cliente;      
    }

    /*
    async MostrarIndicadoresFinancierosMes(IdCliente: number): Promise<Cliente> {
        const Cliente = await this.clienteRepository.findOne(IdCliente);
        return Cliente;      
    } */
}
