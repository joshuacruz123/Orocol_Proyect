import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Novedad } from './novedad.entity';
import { NovedadRepository } from './novedad.repository';
import { NovedadDto } from './dto/novedad.dto';

@Injectable()
export class NovedadService {
    constructor(
        @InjectRepository(Novedad)
        private novedadRepository: NovedadRepository
    ) { }
    
    async findById(idNovedad: number): Promise<Novedad> {
        const novedad = await this.novedadRepository.findOne({ where: { idNovedad: idNovedad } });
        if (!novedad) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return novedad;
    }

    async consultarnovedad(idNovedad: number): Promise<Novedad> {
        const novedad = await this.novedadRepository.findOne({ where: { idNovedad: idNovedad } });
        if (!novedad) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return novedad;
    }
    // Método para consultar novedad novedad 

    async registrarNovedad(dto: NovedadDto): Promise<any> {
        const { fechaNovedad, descripcion } = dto;
        const exists = await this.novedadRepository.findOne({ where: [{ fechaNovedad: fechaNovedad }, { descripcion: descripcion }] });
        if (exists) throw new BadRequestException(new MessageDto('ese fechaNovedad ya existe'));
        const novedad = this.novedadRepository.create(dto);
        await this.novedadRepository.save(novedad);
        return new MessageDto(`Compra de ${novedad.fechaNovedad} creada`);
    }
    // Método para registrar novedad novedad

    async update(idNovedad: number, dto: NovedadDto): Promise<any> {
        const novedad = await this.findById(idNovedad);
        if (!novedad)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.novedadRepository.findOne({ where: { idNovedad: idNovedad } });
        if (exists && exists.idNovedad !== idNovedad) throw new BadRequestException(new MessageDto('ese novedad ya existe'));
        dto.fechaNovedad ? novedad.fechaNovedad = dto.fechaNovedad : novedad.fechaNovedad = novedad.fechaNovedad;
        dto.descripcion ? novedad.descripcion = dto.descripcion : novedad.descripcion = novedad.descripcion;
        await this.novedadRepository.save(novedad);
        return new MessageDto(`Compra de ${novedad.fechaNovedad} actualizada`);
    }
    // Método para editar novedad novedad
} 