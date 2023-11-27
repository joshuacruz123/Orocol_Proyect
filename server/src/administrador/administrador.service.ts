import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Administrador } from './administrador.entity'; 

@Injectable() 
export class AdministradorService extends UsuariosService {
    constructor(
      @InjectRepository(Administrador)
      private readonly administradorRepository: Repository<Administrador>,
    ) {
      super(administradorRepository);
    }

    async registrarAdmin(cargoAdmin: Administrador): Promise<Administrador> {
        const nuevoAdmin = this.administradorRepository.create(cargoAdmin);
        return this.administradorRepository.save(nuevoAdmin);
    }
    
    async consultarAdmin(idAdmin: number): Promise<Administrador> {
        const administrador = await this.administradorRepository.findOne(idAdmin);
        return administrador;      
    }

    async editarAdmin(idAdmin: number, cargoAdmin: Administrador): Promise<Administrador> {
        await this.administradorRepository.update(idAdmin, cargoAdmin);
        return this.administradorRepository.findOne(idAdmin);
    }

    async verNoveradMinero(idAdmin: number): Promise<Administrador> {
        const verNovMin = this.administradorRepository.findOne(idAdmin);
        return verNovMin;
    }

    async registrarMinero(cargoAdmin: Administrador): Promise<Administrador> {
        const nuevoMinero = this.administradorRepository.create(cargoAdmin);
        return this.administradorRepository.save(nuevoMinero);
    }

    async consultarMineros(idAdmin: number): Promise<Administrador> {
        const administrador = await this.administradorRepository.findOne(idAdmin);
        return administrador;      
    }

    async solicitarEditarDoc(cargoAdmin: Administrador): Promise<Administrador> {
        const solicitudMinero = this.administradorRepository.create(cargoAdmin);
        return this.administradorRepository.save(solicitudMinero);
    }

    async editarMinero(idAdmin: number, cargoAdmin: Administrador): Promise<Administrador> {
        await this.administradorRepository.update(idAdmin, cargoAdmin);
        return this.administradorRepository.findOne(idAdmin);
    }

    async reactivarMinero(idAdmin: number, cargoAdmin: Administrador): Promise<Administrador> {
        await this.administradorRepository.update(idAdmin, cargoAdmin);
        return this.administradorRepository.findOne(idAdmin);
    }

}
 