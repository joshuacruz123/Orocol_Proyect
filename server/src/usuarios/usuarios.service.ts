/*Los archivos .service.ts son el modelo 
donde va a contener los datos y la lógica de negocios*/

//Para crear service:nest g service nombre --no-spec
import { Injectable } from '@nestjs/common';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { UsuarioMetodos } from './usuarios_metodos.interface';
import { Minero } from 'src/minero/minero.entity';

@Injectable()
export class UsuariosService implements UsuarioMetodos {
    private readonly usuariosRepository: Repository<Usuario>;
    private readonly rolesRepository: Repository<Rol>;
    private readonly mineroRepository: Repository<Minero>;

    constructor(
        @InjectRepository(Usuario)
        usuariosRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        rolesRepository: Repository<Rol>,
        @InjectRepository(Minero)
        mineroRepository: Repository<Minero>,
    ) {
        this.usuariosRepository = usuariosRepository;
        this.rolesRepository = rolesRepository;
        this.mineroRepository = mineroRepository;
    }

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