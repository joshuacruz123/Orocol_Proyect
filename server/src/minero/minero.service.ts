import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Minero } from './minero.entity'; 
import { UsuarioMetodos } from '../usuarios/usuarios_metodos.interface';

@Injectable()
export class  MineroService extends UsuariosService implements UsuarioMetodos {
    constructor(
        @InjectRepository(Minero)
        private readonly mineroRepository: Repository<Minero>,
    ) {
        super(usuariosRepository, rolesRepository);
    }

    async registrarMinero(mineroData: Minero): Promise<Minero> {
        const nuevoMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(nuevoMinero); 
    }

    async consultarMinero(IdMinero: number): Promise<Minero> {
        const Minero = await this.mineroRepository.findOne(IdMinero);
        return Minero;      
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
 