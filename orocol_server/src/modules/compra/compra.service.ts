import { CompraDto } from './dto/compra.dto';
import { ClienteRepository } from './compra.repository';
import { Cliente } from './cliente.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class CompraService {

    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: ClienteRepository
    ) { }

    async getAll(): Promise<Cliente[]> {
        const list = await this.clienteRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(IdCliente: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({ where: { IdCliente: IdCliente } });
        if (!cliente) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return cliente;
    }

    async findByNombreCompleto(NombreCompleto: string): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({ where: { NombreCompleto: NombreCompleto } });
        return cliente;
    }

    async create(dto: CompraDto): Promise<any> {
        const { NombreCompleto, Empresa, Pais, CiudadMunicipio, FechaExportacion } = dto;
        const exists = await this.clienteRepository.findOne({ where: [{ NombreCompleto: NombreCompleto }, { Empresa: Empresa }, { Pais: Pais }, { CiudadMunicipio: CiudadMunicipio }, { FechaExportacion: FechaExportacion }] });
        if (exists) throw new BadRequestException(new MessageDto('ese NombreCompleto ya existe'));
        const cliente = this.clienteRepository.create(dto);
        await this.clienteRepository.save(cliente);
        return new MessageDto(`Compra de ${cliente.NombreCompleto} creada`);
    }

    async update(IdCliente: number, dto: CompraDto): Promise<any> {
        const cliente = await this.findById(IdCliente);
        if (!cliente)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombreCompleto(dto.NombreCompleto);
        if (exists && exists.IdCliente !== IdCliente) throw new BadRequestException(new MessageDto('ese Cliente ya existe'));
        dto.NombreCompleto ? cliente.NombreCompleto = dto.NombreCompleto : cliente.NombreCompleto = cliente.NombreCompleto;
        dto.Empresa ? cliente.Empresa = dto.Empresa : cliente.Empresa = cliente.Empresa;
        dto.Pais ? cliente.Pais = dto.Pais : cliente.Pais = cliente.Pais;
        dto.CiudadMunicipio ? cliente.CiudadMunicipio = dto.CiudadMunicipio : cliente.CiudadMunicipio = cliente.CiudadMunicipio;
        dto.FechaExportacion ? cliente.FechaExportacion = dto.FechaExportacion : cliente.FechaExportacion = cliente.FechaExportacion;
        await this.clienteRepository.save(cliente);
        return new MessageDto(`Compra de ${cliente.NombreCompleto} actualizada`);
    }


    async delete(IdCliente: number): Promise<any> {
        const cliente = await this.findById(IdCliente);
        await this.clienteRepository.delete(IdCliente);
        return new MessageDto(`Compra de ${cliente.NombreCompleto} eliminada`);
    }
    // Método para 
} 