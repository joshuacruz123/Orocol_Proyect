import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Administrador } from './administrador.entity'; 
import { UsuarioMetodos } from '../usuarios/usuarios_metodos.interface';
import { VentaService } from '../venta/venta.service'; // Importa la clase VentaService para asociación
 
@Injectable()
export class AdministradorService extends UsuariosService implements UsuarioMetodos {
    constructor(
        @InjectRepository(Administrador) 
        private readonly administradorRepository: Repository<Administrador>,
        private readonly ventaServiceRepository: VentaService, // Inyecta VentaService
    ) {
    super(usuariosRepository, rolesRepository);  
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

    /* async ejemploLlamadaVentaService() {
        // Puedes llamar a métodos de VentaService aquí
        const resultadoVenta = await this.ventaService.registrarVenta(entradaData);
        return resultadoVenta;
    }
    */
}
 