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
import { UsuarioDto } from 'src/dto/usuario.dto';
// Importamos los archivos necesarios

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly jwtService: JwtService,
        @InjectRepository(PerfilEntity)
        private readonly perfilRepository: Repository<PerfilEntity>,
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

    /*
    Inicio de sesión de los usuarios usuario
    */
    async ingresarAlSistema(dto: LoginUsuarioDto): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: { correoUsuario: dto.correoUsuario },
            relations: ['roles', 'administrador', 'minero'],
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
        let camposEspecificos;
        if (usuario.roles.tipoRol === RolNombre.ADMINISTRADOR && usuario.administrador) {
            camposEspecificos = {
                idAdmin: usuario.administrador.idAdmin,
            };
        } else if (usuario.roles.tipoRol === RolNombre.MINERO && usuario.minero) {
            camposEspecificos = {
                IdMinero: usuario.minero.IdMinero,
            };
        } else {
            throw new InternalServerErrorException(new MessageDto('Error al obtener los datos específicos del usuario'));
        }
        const payload: PayloadInterface = {
            idUsuario: usuario.idUsuario,
            roles: [usuario.roles.tipoRol as RolNombre],
            ...camposEspecificos, // Agregar campos específicos según el tipo de usuario
        };
        try {
            const token = await this.jwtService.sign(payload);
            return { token };
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al iniciar sesión`))
        }
    }
    // Método para login de usuarios

    async refresh (dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        let otrosCampos;
        if(usuario['roles'][0] === RolNombre.ADMINISTRADOR){
            otrosCampos = {
                idAdmin: usuario['idAdmin']
            }
        } else if(usuario['roles'][0] === RolNombre.MINERO){
            otrosCampos = {
                IdMinero: usuario['IdMinero']
            }
        }
        const payload: PayloadInterface = {
            idUsuario: usuario['idUsuario'],
            roles: usuario['roles'],
            ...otrosCampos,
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }    
    // Método para refrescar el token del usuario
    

    async recuperarPassword (correoUsuario: string, dto: UsuarioDto): Promise<any> {
        const correo = await this.usuarioRepository.findOne({
            where: { correoUsuario },
        });
        if (!correo) {
            throw new NotFoundException(new MessageDto('No existe esa contraseña'));
        }
        correo.passwordUsuario = dto.passwordUsuario;
        try {
            await this.usuarioRepository.save(correo);
            return new MessageDto('Tu contraseña fue actualizada exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al cambiar la contraseña'));
        }
    }    
    // Método para recuperar la contraseña del usuario del usuario

    /*
    Gestionar perfil propio de usuario
    */
    async registrarFotoPerfil (idUsuario: number, dto: PerfilDto): Promise<MessageDto> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { idUsuario } }); // Obtener la entrada de venta
        if (!usuario || usuario.estadoUsuario === EstadoUsuario.INACTIVO) {
            throw new NotFoundException('Usuario no disponible');
        }
        const {fotoPerfil} = dto;
        const exists = await this.perfilRepository.findOne({ where: {fotoPerfil: fotoPerfil} });
        if(exists) throw new BadRequestException(new MessageDto('ese perfil ya existe'));
        const perfil = new PerfilEntity();
        perfil.fotoPerfil = dto.fotoPerfil;
        perfil.usuario = usuario;
        try {
            await this.perfilRepository.save(perfil);
            return new MessageDto(`Foto de perfil creada`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al crear el perfil: ${error.message || error}`))
        }
    }
    // Método para registrar perfil de usuario

    async consultarPerfil(idUsuario: number): Promise<UsuarioEntity> {
        const perfil = await this.usuarioRepository.findOne({
            where: { idUsuario },
            relations: ['perfil'],
        });
        return perfil;
    }
    // Método para consultar el perfil del usuario 

    async editarFotoPerfil(idUsuario: number, dto: PerfilDto): Promise<any> {
        const perfil = await this.consultarPerfil(idUsuario);
        if (!perfil) {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
        if (perfil !== perfil) {
            throw new BadRequestException(new MessageDto('El perfil ya existe'));
        }
        perfil.perfil.fotoPerfil = dto.fotoPerfil;
        try {
            await this.usuarioRepository.save(perfil);
            return new MessageDto('Tu foto de perfil fue actualizada exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al cambiar la foto'));
        }
    }
    // Método para editar la foto de perfil del usuario
}
