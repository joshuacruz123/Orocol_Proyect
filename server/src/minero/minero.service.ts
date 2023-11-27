import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Minero } from './minero.entity'; 

@Injectable()
export class MineroService extends UsuariosService {
    constructor(
        @InjectRepository(Minero)
        private readonly mineroRepository: Repository<Minero>,
    ) {
        super(mineroRepository);
    }

    async registrarMinero(mineroData: Minero): Promise<Minero> {
        const nuevoMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(nuevoMinero); 
    }

    async consultarMinero(IdMinero: number): Promise<Minero> {
        const administrador = await this.mineroRepository.findOne(IdMinero);
        return administrador;      
    }

    async editarMinero(IdMinero: number, mineroData: Minero): Promise<Minero> {
        await this.mineroRepository.update(IdMinero, mineroData);
        return this.mineroRepository.findOne(IdMinero);
    }

    async resSolicitudEditarDoc(mineroData: Minero): Promise<Minero> {
        const solicitudMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(solicitudMinero);
    }

    async registrarAsistencia(mineroData: Minero): Promise<Minero> {
        const solicitudMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(solicitudMinero);
    }

    async registrarNovedad(mineroData: Minero): Promise<Minero> {
        const nuevoMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(nuevoMinero); 
    }
}
