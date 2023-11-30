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

    async insertarCliente(entradaData: Cliente): Promise<Cliente> {
        const nuevoCliente = this.clienteRepository.create(entradaData);
        return this.clienteRepository.save(nuevoCliente);
    }
    
    async consultarCliente(IdCliente: number): Promise<Cliente> {
        const Cliente = await this.clienteRepository.findOne(IdCliente);
        return Cliente;      
    }

    async editarCliente(IdCliente: number, entradaData: Cliente): Promise<Cliente> {
        await this.clienteRepository.update(IdCliente, entradaData);
        return this.clienteRepository.findOne(IdCliente);
    }

    async anularCliente(IdCliente: number, entradaData: Cliente): Promise<Cliente> {
        await this.clienteRepository.update(IdCliente, entradaData);
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
