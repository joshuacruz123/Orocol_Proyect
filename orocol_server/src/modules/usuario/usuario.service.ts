import { RolEntity } from './../rol/rol.entity';
import { MessageDto } from '../../dto/common/message.dto';
import { UsuarioEntity } from './usuario.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/modules/rol/rol.enum';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';
import { EstadoUsuario } from './usuario.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from 'src/auth/payload.interface';
import { TokenDto } from 'src/dto/token.dto';
import { PerfilEntity } from './perfil.entity';
import { PerfilDto } from 'src/dto/perfil.dto';
import { Repository } from 'typeorm';
// Importamos las librerias necesarias

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly jwtService: JwtService,
        @InjectRepository(PerfilEntity)
        private readonly perfilRepository: PerfilEntity,
    ) { }
    // Instanciamos la clase con el constructor

    async consultarUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios = await this.usuarioRepository.find();
        if (!usuarios.length) throw new NotFoundException(new MessageDto('No hay usuarios en la lista.'));
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
        return new MessageDto(`Usuario ${usuario.nombreUsuario} ${usuario.apellidosUsuario} inactivado`);
    }
    // Método para inactivar usuarios


    async ingresarAlSistema(dto: LoginUsuarioDto): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: { correoUsuario: dto.correoUsuario },
            relations: ['roles'],
        });
        if (!usuario) {
            throw new UnauthorizedException(new MessageDto('No existe ese usuario'));
        }
        if (usuario.estadoUsuario === EstadoUsuario.INACTIVO) {
            throw new BadRequestException(new MessageDto('El usuario ya no está activo en el sistema'));
        }
        const passwordOK = await compare(dto.passwordUsuario, usuario.passwordUsuario);
        if (!passwordOK) {
            throw new UnauthorizedException(new MessageDto('Correo o contraseña incorrecta'));
        }
        if (!usuario.roles || !usuario.roles.tipoRol) {
            throw new InternalServerErrorException(new MessageDto('Error al obtener el rol del usuario'))
        }
        const payload: PayloadInterface = {
            idUsuario: usuario.idUsuario,
            nombreUsuario: usuario.nombreUsuario,
            apellidosUsuario: usuario.apellidosUsuario,
            correoUsuario: usuario.correoUsuario,
            estadoUsuario: usuario.estadoUsuario,
            roles: [usuario.roles.tipoRol as RolNombre], // Accedemos directamente a la propiedad roles
        };
        try {
            const token = await this.jwtService.sign(payload);
            return { token };
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al iniciar sesión`))
        }
    }
    // Método para login de usuarios

    async refresh(dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        let payload: PayloadInterface; // Comprobar si el usuario tiene un rol específico
        if (usuario.roles && usuario.roles.tipoRol) {
            switch (usuario.roles.tipoRol) {
                case RolNombre.ADMINISTRADOR:
                    payload = {
                        idUsuario: usuario.idUsuario,
                        nombreUsuario: usuario.nombreUsuario,
                        apellidosUsuario: usuario.apellidosUsuario,
                        correoUsuario: usuario.correoUsuario,
                        estadoUsuario: usuario.estadoUsuario,
                        roles: {
                            tipoRol: usuario.roles.tipoRol,
                            cargoAdmin: usuario.administrador.cargoAdmin
                        }
                    };
                    break;
                case RolNombre.MINERO:
                    payload = {
                        idUsuario: usuario.idUsuario,
                        nombreUsuario: usuario.nombreUsuario,
                        apellidosUsuario: usuario.apellidosUsuario,
                        correoUsuario: usuario.correoUsuario,
                        estadoUsuario: usuario.estadoUsuario,
                        roles: {
                            tipoRol: usuario.roles.tipoRol,
                            tipo_documento: usuario.minero.tipo_documento,
                            numero_documento: usuario.minero.numero_documento,
                            telefono: usuario.minero.telefono,
                            fecha_nacimiento: usuario.fecha_nacimiento, 
                            direccion_vivienda: usuario.direccion_vivienda, 
                            cambio_documento: usuario.cambio_documento // cambio_documento
                        }
                    };
                    break;
                default: // Manejar otros roles o escenarios si es necesario
                    payload = {
                        idUsuario: usuario.idUsuario,
                        nombreUsuario: usuario.nombreUsuario,
                        apellidosUsuario: usuario.apellidosUsuario,
                        correoUsuario: usuario.correoUsuario,
                        estadoUsuario: usuario.estadoUsuario,
                        roles: []
                    };
                    break;
            }
        } else { // Si el usuario no tiene un rol específico, se asigna un arreglo vacío a roles
            payload = {
                idUsuario: usuario.idUsuario,
                nombreUsuario: usuario.nombreUsuario,
                apellidosUsuario: usuario.apellidosUsuario,
                correoUsuario: usuario.correoUsuario,
                estadoUsuario: usuario.estadoUsuario,
                roles: []
            };
        }
        const token = await this.jwtService.sign(payload);
        return { token };
    }
    // Método para encriptar datos del usuario al token

    async registrarPerfilUsuario(idUsuario: number, dto: PerfilDto): Promise<MessageDto> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { idUsuario } }); // Obtener la entrada de venta
        if (!usuario || usuario.estadoUsuario === EstadoUsuario.INACTIVO) {
            throw new NotFoundException('Usuario no disponible');
        }
        const perfil = new PerfilEntity();
        perfil.fotoPerfil = dto.fotoPerfil;
        perfil.usuario = usuario;
        try {
            await this.perfilRepository.save(perfil);
            return new MessageDto(`Foto de perfil de ${usuario.nombreUsuario} creado`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al crear el perfil: ${error.message || error}`))
        }
    }
    // Método para registrar perfil de usuario
}
