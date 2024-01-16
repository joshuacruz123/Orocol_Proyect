import { RolEntity } from './../rol/rol.entity';
import { RolRepository } from './../rol/rol.repository';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { create } from 'domain';
import { MessageDto } from './../../common/message.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/modules/rol/rol.enum';
import { InactivarUsuarioDto } from 'src/dto/inactivar.dto';
import { EstadoUsuario } from './usuario.enum';
// Importamos las librerias necesarias
 
@Injectable()
export class UsuarioService {
 
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository
    ) {}
    // Instanciamos la clase con el constructor

    async consultarUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios = await this.usuarioRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
        return usuarios; 
    }
    // Método para consultar los usuarios

    async registrarUsuario(dto: CreateUsuarioDto): Promise<any> {
        const {correoUsuario} = dto;
        const exists = await this.usuarioRepository.findOne({where: [{correoUsuario: correoUsuario}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolAdministrador = await this.rolRepository.findOne({where: {tipoRol: RolNombre.ADMINISTRADOR}});
        const rolMinero = await this.rolRepository.findOne({where: {tipoRol: RolNombre.MINERO}});
        if(!rolAdministrador || !rolMinero) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const admin = this.usuarioRepository.create(dto);
        admin.roles = [rolAdministrador, rolMinero];
        await this.usuarioRepository.save(admin);
        return new MessageDto('Administador creado');
    } 
    // Método para registrar usuario

    async consultarUsuario(idUsuario: number): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: idUsuario } });
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return usuario;
    }
    // Método para consultar usuarios

    async editarUsuario(idUsuario: number, dto: CreateUsuarioDto): Promise<any> {
        const usuario = await this.consultarUsuario(idUsuario);
        if (!usuario) {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
        const existingUsuario = await this.usuarioRepository.findOne({ where: { nombreUsuario: dto.nombreUsuario } });
        if (existingUsuario && existingUsuario.idUsuario !== idUsuario) {
            throw new BadRequestException(new MessageDto('El nombre de usuario ya existe'));
        }
        usuario.nombreUsuario = dto.nombreUsuario || usuario.nombreUsuario;
        usuario.apellidosUsuario = dto.apellidosUsuario || usuario.apellidosUsuario;
        usuario.correoUsuario = dto.correoUsuario || usuario.correoUsuario;
        usuario.passwordUsuario = dto.passwordUsuario || usuario.passwordUsuario;
        await this.usuarioRepository.save(usuario);
        return new MessageDto(`Usuario ${usuario.nombreUsuario} actualizado`);
    }
    // Método para editar usuarios

    async inactivarUsuario(idUsuario: number, dto: InactivarUsuarioDto): Promise<any> {
        const usuario = await this.consultarUsuario(idUsuario);
        if (!usuario) {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
        if (usuario.estadoUsuario === EstadoUsuario.INACTIVO) {
            throw new BadRequestException(new MessageDto('El usuario ya está inactivo'));
        }
        usuario.estadoUsuario = EstadoUsuario.INACTIVO;
        await this.usuarioRepository.save(usuario);
        return new MessageDto(`Usuario ${usuario.nombreUsuario} inactivado`);
    }
    // Método para inactivar usuarios
}
