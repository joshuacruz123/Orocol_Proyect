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
        return await this.novedadRepository.save(nuevoNovedad);
    }
    // Método para 

    async consultarNovedad(): Promise<Novedad[]> {
        return await this.novedadRepository.find();
      }
    // Método para

    async editarNovedad(idNovedad: number, novedadData: Novedad): Promise<Novedad> {
        await this.novedadRepository.update(idNovedad, novedadData);
        return this.novedadRepository.findOne(idNovedad);
    }
    async editarNovedad(idNovedad: number, novedadData: Novedad): Promise<Novedad> {
        const novedad = await this.novedadRepository.findOne(idNovedad);
        if (!novedad) {
          throw new NotFoundException('producto no encontrado');
        } 
    
        return await this.novedadRepository.save({ ...novedad, ...novedadData });
    }
    // Método para
}
