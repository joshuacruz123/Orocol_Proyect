import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Minero } from './minero.entity'; 
import { UsuarioMetodos } from '../usuarios/usuarios_metodos.interface';
import { VentaService } from '../venta/venta.service'; 

@Injectable() 
export class  MineroService extends UsuariosService implements UsuarioMetodos {
    constructor(
        @InjectRepository(Minero)
        private readonly mineroRepository: Repository<Minero>,
        private readonly ventaServiceRepository: VentaService,
    ) { 
        super(usuariosRepository, rolesRepository);
    }

    async registrarMinero(mineroData: Minero): Promise<Minero> {
            try {
                const nuevoUsuario = await this.registrarUsuario(mineroData.usuario);
                const nuevoMinero = this.mineroRepository.create({
                    mineroData: mineroData.mineroData,
                    usuario: nuevoUsuario,
                });
                await this.mineroRepository.save(nuevoMinero);

                return nuevoMinero;
            } catch (error) {
                throw new BadRequestException('Error al insertar en la entidad minero: ' + error.message);
        }
    }
    // Método para registrar un nuevo minero

    async consultarMinero(IdMinero: number): Promise<Minero> {
        try {
            const admin = await this.mineroRepository.findOne(IdMinero, { relations: ['usuario'] });
            if (!admin) {
                throw new NotFoundException('Minero no encontrado');
            }
            return admin;
        } catch (error) {
            throw new BadRequestException('Error al traer los datos de minero: ' + error.message);
        } 
    }
    // Método para consultar minero

    async editarMinero(IdMinero: number, mineroData: Minero): Promise<Minero> {
        try {
            const minero = await this.mineroRepository.findOne(IdMinero, { relations: ['usuario'] });
            if (!minero) {
                throw new NotFoundException('Minero no encontrado');
            }

            // Actualizar datos
            minero.mineroData = mineroData.mineroData;
            minero.usuario = await this.editarUsuario(minero.usuario.idUsuario, mineroData.usuario);

            // Guardar cambios
            await this.mineroRepository.save(minero);

            return minero;
        } catch (error) {
            throw new BadRequestException('Error al editar los datos de minero: ' + error.message);
        }
    }
    // Método para editar minero


    /* async resSolicitudEditarDoc(mineroData: Minero): Promise<Minero> {
        const solicitudMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(solicitudMinero);
    }
    // Método para responder solicitud de administrador 
 
    async registrarAsistencia(mineroData: Minero): Promise<Minero> {
        const solicitudMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(solicitudMinero);
    }
    // Método para registrar asistencia

    async registrarNovedad(mineroData: Minero): Promise<Minero> {
        const nuevoMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(nuevoMinero); 
    } 
    // Método para registrar novedad minero*/
}
 