import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Minero } from '../minero/minero.entity'; 
import { Novedad } from '../novedad/novedad.entity';

@Injectable() 
export class NovedadService {
    constructor(
        @InjectRepository(Novedad)
        private readonly novedadRepository: Repository<Novedad>,
    ) {}

    async insertarNovedad(novedadData: Novedad): Promise<Novedad> {
        const nuevoNovedad = this.novedadRepository.create(novedadData);
        return this.novedadRepository.save(nuevoNovedad);
    }
    
    async consultarNovedad(idNovedad: number): Promise<Novedad> {
        const Novedad = await this.novedadRepository.findOne(idNovedad);
        return Novedad;      
    }

    async editarNovedad(idNovedad: number, novedadData: Novedad): Promise<Novedad> {
        await this.novedadRepository.update(idNovedad, novedadData);
        return this.novedadRepository.findOne(idNovedad);
    }
}
