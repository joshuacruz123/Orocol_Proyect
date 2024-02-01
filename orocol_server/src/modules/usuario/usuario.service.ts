import { RolEntity } from './../rol/rol.entity';
import { RolRepository } from './../rol/rol.repository';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { create } from 'domain';
import { MessageDto } from './../../common/message.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/modules/rol/rol.enum';
import { InactivarUsuarioDto } from 'src/dto/inactivar.dto';
import { EstadoUsuario } from './usuario.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from 'src/auth/payload.interface';
import { TokenDto } from 'src/dto/token.dto';
import { AdministradorEntity } from '../administrador/administrador.entity';
import { AdministradorDto } from 'src/dto/administrador.dto';
// Importamos las librerias necesarias
 
@Injectable()
export class UsuarioService {
 
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository,
        private readonly jwtService: JwtService
    ) {}
    // Instanciamos la clase con el constructor
    
    async registrarUsuarioAdministrador(dto: AdministradorDto): Promise<UsuarioEntity> {
        const {correoUsuario} = dto;
        const exists = await this.usuarioRepository.findOne({where: {correoUsuario: correoUsuario}});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const nuevoUsuario = new UsuarioEntity();
        nuevoUsuario.nombreUsuario = dto.nombreUsuario;
        nuevoUsuario.apellidosUsuario = dto.apellidosUsuario;
        nuevoUsuario.correoUsuario = dto.correoUsuario;
        nuevoUsuario.passwordUsuario = dto.passwordUsuario; // Crear el rol 'Administrador'
        const rolAdministrador = await this.rolRepository.findOne({
          where: { tipoRol: RolNombre.ADMINISTRADOR },
        });
        if (!rolAdministrador) { // lanzar un error si el rol no existe
            throw new BadRequestException(new MessageDto('El rol de administrador no existe.'));
        }
        nuevoUsuario.roles = rolAdministrador; // Crear la entidad Administrador y asociarla al usuario
        const nuevoAdministrador = new AdministradorEntity();
        nuevoAdministrador.cargoAdmin = dto.cargoAdmin;
        nuevoAdministrador.usuario = nuevoUsuario;
        nuevoUsuario.administrador = nuevoAdministrador; // Guardar el usuario y la entidad relacionada
        await this.usuarioRepository.save(nuevoUsuario);
        return nuevoUsuario;  
    }


    async consultarUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios = await this.usuarioRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('No hay usuarios en la lista.'));
        return usuarios; 
    }
    // Método para consultar los usuarios

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
        return this.usuarioRepository.save(usuario);
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

    /* async ingresarAlSistema(dto: LoginUsuarioDto): Promise<any> {
        const {correoUsuario} = dto;
        const usuario = await this.usuarioRepository.findOne({where: {correoUsuario: correoUsuario}}); 
        if(!usuario) return new UnauthorizedException(new MessageDto('no existe el usuario'));
        const passwordOK = await compare(dto.passwordUsuario, usuario.passwordUsuario);
        if(!passwordOK) return new UnauthorizedException(new MessageDto('contraseña errónea'));
        const payload: PayloadInterface = {
            idUsuario: usuario.idUsuario,
            correoUsuario: usuario.correoUsuario,
            roles: usuario.roles.map(rol => rol.tipoRol as RolNombre)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
    // Método para login de usuarios */

    async refresh(dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        const payload: PayloadInterface = {
            idUsuario: usuario[`idUsuario`],
            correoUsuario: usuario[`correoUsuario`],
            roles: usuario[`roles`]
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
}
