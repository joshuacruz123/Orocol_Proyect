import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm'; //importante!!!
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Administrador } from './administrador.entity';
import { UsuarioMetodos } from '../usuarios/usuarios_metodos.interface';
import { Usuario } from '../usuarios/usuarios.entity';
import { Minero } from '../minero/minero.entity'
import { VentaService } from '../venta/venta.service'; // Importa la clase VentaService para asociación

@Injectable()
export class AdministradorService extends UsuariosService implements UsuarioMetodos {
    constructor(
        @InjectRepository(Administrador) private readonly administradorRepository: Repository<Administrador>,
        private readonly entityManager: EntityManager,
        @InjectRepository(Usuario) private readonly usuariosRepository: Repository<Usuario>,
        @InjectRepository(Minero) private readonly mineroRepository: Repository<Minero>,
        private readonly ventaServiceRepository: VentaService, // Inyecta VentaService
    )  {
        super(usuariosRepository, rolesRepository);
      }

    async registrarAdmin(cargoAdmin: Administrador): Promise<Administrador> {
        try {
            const nuevoUsuario = await this.registrarUsuario(cargoAdmin.usuario);
            const nuevoAdmin = this.administradorRepository.create({
                cargoAdmin: cargoAdmin.cargoAdmin,
                usuario: nuevoUsuario,
            });
            await this.administradorRepository.save(nuevoAdmin);

            return nuevoAdmin;
        } catch (error) {
            throw new BadRequestException('Error al insertar en la entidad Administrador: ' + error.message);
        }
    }
    // Método para registrar un nuevo admistrador

    async consultarAdmin(idAdmin: number): Promise<Administrador> {
        try {
            const admin = await this.administradorRepository.findOne(idAdmin, { relations: ['usuario'] });
            if (!admin) {
                throw new NotFoundException('Administrador no encontrado');
            }
            return admin;
        } catch (error) {
            throw new BadRequestException('Error al traer los datos de administrador: ' + error.message);
        }
    }
    // Método para visualizar administador

    async editarAdmin(idAdmin: number, cargoAdmin: Administrador): Promise<Administrador> {
        try {
            const admin = await this.administradorRepository.findOne(idAdmin, { relations: ['usuario'] });
            if (!admin) {
                throw new NotFoundException('Administrador no encontrado');
            }

            // Actualizar datos
            admin.cargoAdmin = cargoAdmin.cargoAdmin;
            admin.usuario = await this.editarUsuario(admin.usuario.idUsuario, cargoAdmin.usuario);

            // Guardar cambios
            await this.administradorRepository.save(admin);

            return admin;
        } catch (error) {
            throw new BadRequestException('Error al editar los datos de administrador: ' + error.message);
        }
    }
    // Método para editar administador

    async consultarAdministradores(): Promise<Administrador[]> {
        return await this.administradorRepository.find();
      }
    // Método para consultar administadores

      async consultarMineros(): Promise<Minero[]> {
        return await this.mineroRepository.find();
      }
    // Método para consultar mineros
    
      async registrarMinero(mineroData: Minero): Promise<Minero> {
        const nuevoUsuario = await this.registrarUsuario({
          nombreUsuario: mineroData.nombreUsuario,
          apellidosUsuario: mineroData.apellidosUsuario,
          correoUsuario: mineroData.correoUsuario,
          passwordUsuario: mineroData.passwordUsuario,
          estadoUsuario: mineroData.estadoUsuario,
          tipoRol: mineroData.tipoRol,
        });
        const nuevoMinero = this.mineroRepository.create({
          tipo_documento: mineroData.tipo_documento,
          numero_documento: mineroData.numero_documento,
          cambio_documento: mineroData.cambio_documento,
          telefono: mineroData.telefono,
          fecha_nacimiento: mineroData.fecha_nacimiento,
          direccion_vivienda: mineroData.direccion_vivienda,
          usuario: nuevoUsuario,
        });
        await this.mineroRepository.save(nuevoMinero);
        return nuevoMinero;
      } 
    // Método para registrar mineros
    
      async reactivarUsuario(idUsuario: number, usuarioData: Usuario): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findOne(idUsuario);
        if (!usuario || usuario.estadoRol !== 'inactivo') {
          throw new BadRequestException('El usuario no existe o no está inactivo.');
        }
        usuario.estadoRol = 'activo';
        await this.usuariosRepository.save(usuario);
        return usuario;
      }
    // Método para reactivar usuario

    /* async ejemploLlamadaVentaService() {
        // Puedes llamar a métodos de VentaService aquí
        const resultadoVenta = await this.ventaService.registrarVenta(entradaData);
        return resultadoVenta;
    }
    */ 
} 