/*Los archivos .service.ts son el modelo 
donde va a contener los datos y la lógica de negocios*/

//Para crear service:nest g service nombre --no-spec
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { Rol } from './rol.entity';
import { Administrador } from '../administrador/administrador.entity'
import { Minero } from 'src/minero/minero.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuariosRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private readonly rolesRepository: Repository<Rol>,
        @InjectRepository(Minero)
        private readonly mineroRepository: Repository<Minero>,
        @InjectRepository(Minero)
        private readonly administradorRepository: Repository<Administrador>,
    ) {}

    /*async findOne(idUsuario: number): Promise<Usuario> {
        // Obtiene un usuario por su ID
        const usuario = await this.usuariosRepository.findOne(idUsuario);
        // Si deseas obtener los roles del usuario, puedes hacerlo de la siguiente manera
        if (usuario) {
            usuario.roles = await this.rolesRepository.find({ where: { usuario: usuario } });
            // La propiedad 'roles' debe estar definida en la entidad Usuario
        }  
        return usuario;      
    }*/
    async registrarUsuario(usuarioData: Usuario): Promise<Usuario> {
        const nuevoUsuario = this.usuariosRepository.create(usuarioData);
        return this.usuariosRepository.save(nuevoUsuario);
    }

    async ingresarAlSistema(usuarioData: Usuario): Promise<Usuario> {
        const nuevoUsuario = this.usuariosRepository.create(usuarioData);
        return this.usuariosRepository.save(nuevoUsuario);
    } 

    async solicitarReactivacion(usuarioData: Usuario): Promise<Usuario> {
        const nuevoUsuario = this.usuariosRepository.create(usuarioData);
        return this.usuariosRepository.save(nuevoUsuario);
    }

    async editarUsuario(idUsuario: number, usuarioData: Usuario): Promise<Usuario> {
        await this.usuariosRepository.update(idUsuario, usuarioData);
        return this.usuariosRepository.findOne(idUsuario);
    }

    async inactivarUsuario(idUsuario: number): Promise<void> {
        await this.usuariosRepository.delete(idUsuario);
    }
}