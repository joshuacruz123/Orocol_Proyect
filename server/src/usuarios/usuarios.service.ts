/*Los archivos .service.ts son el modelo 
donde va a contener los datos y la lógica de negocios*/

//Para crear service:nest g service nombre --no-spec
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { UsuarioMetodos } from './usuarios_metodos.interface';
import { Minero } from 'src/minero/minero.entity';

@Injectable()
export class UsuariosService implements UsuarioMetodos { 
    private readonly mineroRepository: Repository<Minero>;
 
    constructor(
        @InjectRepository(Usuario) private readonly usuariosRepository: Repository<Usuario>,
        @InjectRepository(Rol) private readonly rolesRepository: Repository<Rol>,
        @InjectRepository(Minero)
        mineroRepository: Repository<Minero>,
    ) {
        this.usuariosRepository = usuariosRepository;
        this.rolesRepository = rolesRepository;
        this.mineroRepository = mineroRepository;
    }

    async registrarUsuario(usuarioData: Usuario): Promise<Usuario> {
        try {
            const nuevoUsuario = this.usuariosRepository.create(usuarioData);
            const nuevoRol = this.rolesRepository.create({
                tipoRol: usuarioData.tipoRol,
                estadoRol: usuarioData.estadoRol,
            });

            nuevoUsuario.rol = nuevoRol;
            await this.usuariosRepository.save(nuevoUsuario);

            return nuevoUsuario;
        } catch (error) {
            throw new BadRequestException('Error al insertar en la entidad Usuarios y Rol: ' + error.message);
        }
    }

    async ingresarAlSistema(idUsuario: number, usuarioData: Usuario): Promise<Usuario | null> {
        const usuario = await this.usuariosRepository.findOne({
            where: { idUsuario, correoUsuario: usuarioData.correoUsuario, passwordUsuario: usuarioData.passwordUsuario },
            relations: ['rol'],
        });

        if (usuario && usuario.rol.estadoRol === 'activo') {
            return usuario;
        } else {
            return null;
        }
    }

    async inactivarUsuario(idUsuario: number): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findOne(idUsuario, { relations: ['rol'] });

        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        usuario.rol.estadoRol = 'inactivo';
        await this.usuariosRepository.save(usuario);

        return usuario;
    }
 
    /* 
    async solicitarReactivacion(usuarioData: Usuario): Promise<Usuario> {
        const nuevoUsuario = this.usuariosRepository.create(usuarioData);
        return this.usuariosRepository.save(nuevoUsuario);
    }
    */
}