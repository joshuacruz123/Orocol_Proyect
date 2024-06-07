import { RolEntity } from 'src/entities/rol.entity';
import { MessageDto } from '../../dto/common/message.dto';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/enums/rol.enum';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';
import { EstadoUsuario } from '../../enums/usuario.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { PayloadInterface } from 'src/auth/payload.interface';
import { TokenDto } from 'src/dto/token.dto';
import { PerfilEntity } from 'src/entities/perfil.entity';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { PerfilDto } from 'src/dto/perfil.dto';
import { Repository } from 'typeorm';
import { PasswordDto, RecuperarPassDto } from 'src/dto/editar-password.dto';
import * as fs from 'fs';
import { SolicitudDto } from 'src/dto/solicitud.dto';
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
        @InjectRepository(SolicitudEntity)
        private readonly solicitudRepository: Repository<SolicitudEntity>,
    ) { }
    // Instanciamos la clase con el constructor

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

    async refresh(dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        let otrosCampos;
        if (usuario['roles'][0] === RolNombre.ADMINISTRADOR) {
            otrosCampos = {
                idAdmin: usuario['idAdmin']
            }
        } else if (usuario['roles'][0] === RolNombre.MINERO) {
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
        return { token };
    }
    // Método para refrescar token caducado del usuario

    async consultarCorreosUsuario(correoUsuario: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { correoUsuario: correoUsuario },
            select: ['correoUsuario']
        });
        if (!usuario) {
            throw new NotFoundException(new MessageDto('No existe ese correo en el sistema'));
        }
        return usuario;
    }
    // Método para consultar los correod de los usuarios

    async recuperarPassword(correoUsuario: string, dto: RecuperarPassDto): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({ where: { correoUsuario } });
        if (!usuario) {
            throw new NotFoundException(new MessageDto('No se encontró el correo electrónico'));
        }
        usuario.passwordUsuario = dto.passwordNuevo;
        try {
            await this.usuarioRepository.save(usuario);
            return new MessageDto('La contraseña ha sido actualizada exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al cambiar la contraseña'));
        }
    }
    // Método para recuperar la contraseña del usuario

    async editarPassword(idUsuario: number, dto: PasswordDto): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: idUsuario } });
        if (!usuario) {
            throw new NotFoundException(new MessageDto('No se encontró el usuario'));
        } /*
        console.log('Correo:', usuario.correoUsuario);
        console.log('Anterior: ', dto.passwordAnterior, ', Nuevo: ', dto.passwordNuevo); */
        const passwordValido = await compare(dto.passwordAnterior, usuario.passwordUsuario);
        if (!passwordValido) {
            throw new UnauthorizedException(new MessageDto('La contraseña anterior no es correcta'));
        }
        usuario.passwordUsuario = dto.passwordNuevo;
        try {
            await this.usuarioRepository.save(usuario);
            return new MessageDto('La contraseña ha sido actualizada exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al cambiar la contraseña'));
        }
    }
    // Método para editar la contraseña del usuario

    /*
    Gestionar perfil propio de usuario
    */
    async subirFotoPerfil(idUsuario: number, fotoPerfil: Express.Multer.File, dto: PerfilDto): Promise<MessageDto> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
            where: { idUsuario },
            relations: ['perfil'],
        });
        if (!usuario || usuario.estadoUsuario === EstadoUsuario.INACTIVO) {
            throw new NotFoundException('Usuario no disponible');
        } // Verificar si el usuario ya tiene un perfil
        if (!fotoPerfil || !fotoPerfil.originalname) {
            throw new BadRequestException('No se proporcionó una imagen válida');
        }
        if (usuario.perfil) { // Eliminar la foto de perfil anterior
            try {
                fs.unlinkSync(`.${usuario.perfil.fotoPerfil}`);
                const fotoPerfilPath = `/uploads/${idUsuario}_${fotoPerfil.originalname}`;
                fs.writeFileSync(`.${fotoPerfilPath}`, fotoPerfil.buffer);
            } catch (error) { 
                console.error(`Error al editar la foto de perfil: ${error.message}`);
            }
            usuario.perfil.fotoPerfil = `/uploads/${idUsuario}_${fotoPerfil.originalname}`;
            await this.perfilRepository.save(usuario.perfil);
            return new MessageDto('Foto de perfil actualizada');
        } 
        const fotoPerfilPath = `/uploads/${idUsuario}_${fotoPerfil.originalname}`;
        try {
            fs.writeFileSync(`.${fotoPerfilPath}`, fotoPerfil.buffer); // Guardar la imagen en el servidor
        } catch (error) {
            throw new InternalServerErrorException(`Error al guardar la foto de perfil: ${error.message || error}`);
        } // Crear el perfil
        const perfil = new PerfilEntity();
        perfil.fotoPerfil = fotoPerfilPath;
        perfil.usuario = usuario;
        try {
            await this.perfilRepository.save(perfil);
            return new MessageDto(`Foto de perfil creada`);
        } catch (error) {
            throw new InternalServerErrorException(`Error al crear el perfil: ${error.message || error}`);
        }
    }
    // Método para subir o editar foto de perfil de usuario

    async consultarPerfil(idUsuario: number): Promise<{ usuario: UsuarioEntity; fotoPerfilUrl: string }> {
        const usuario = await this.usuarioRepository.findOne({
            where: { idUsuario },
            select: ['idUsuario', 'nombreUsuario', 'apellidosUsuario'],
            relations: ['perfil'],
        });
        let fotoPerfilUrl = null;
        if (usuario.perfil && usuario.perfil.fotoPerfil){
            fotoPerfilUrl = `${process.env.PERFIL_URL}${usuario.perfil.fotoPerfil}`;
        }
        return {usuario, fotoPerfilUrl};
    }   
    // Método para consultar el perfil del usuario

    /*
    Gestionar solicitudes de ingreso al sistema
    */
    async crearSolicitudIngreso(correoUsuario: string, dto: SolicitudDto): Promise<MessageDto> {
        const usuario = await this.usuarioRepository.findOne({ where: { correoUsuario } });
        if (!usuario) {
            throw new NotFoundException('No se encontró el correo en el sistema');
        }
        if (usuario.estadoUsuario === EstadoUsuario.ACTIVO) {
            throw new BadRequestException(new MessageDto('El usuario se encuentra activo'));
        }
        const solicitud = new SolicitudEntity();
        solicitud.descripcionSolicitud = dto.descripcionSolicitud;
        solicitud.usuario = usuario;
        try {
            await this.solicitudRepository.save(solicitud);
            return new MessageDto('Tu solicitud fue registrada exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al crear la solicitud.'));
        }
    }
    // Método para registrar los turnos

    async consultarSolicitudes(): Promise<SolicitudEntity[]> {
        const solicitudes = await this.solicitudRepository.find({ relations: ['usuario'] });
        if (!solicitudes.length) {
            throw new NotFoundException(new MessageDto('No hay solicitudes de ingreso'));
        }
        return solicitudes;
    }
    // Método para consultar solicitudes de ingreso de usuarios
}
