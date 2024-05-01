import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministradorEntity } from './administrador.entity';
import { MessageDto } from 'src/dto/common/message.dto';
import { AdministradorDto, EditarAdministradorDto } from 'src/dto/administrador.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { RolNombre } from '../rol/rol.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolEntity } from '../rol/rol.entity';
import { ActivarUsuarioDto } from 'src/dto/enum.dto';
import { EstadoUsuario } from '../usuario/usuario.enum';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(AdministradorEntity)
        private administradorRepository: Repository<AdministradorEntity>,
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly usuarioService: UsuarioService, // Inyecta la instancia de UsuarioService
    ) { }

    
    async registrarUsuarioAdministrador(dto: AdministradorDto): Promise<MessageDto> {
        const rolAdmin = await this.rolRepository.findOne({ where: { tipoRol: RolNombre.ADMINISTRADOR} });
        if(!rolAdmin) throw new BadRequestException(new MessageDto('El rol de administrador no existe.'));
        const {correoUsuario} = dto;
        const exists = await this.usuarioRepository.findOne({ where: {correoUsuario: correoUsuario} });
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const nuevoUsuario = new UsuarioEntity();
        nuevoUsuario.nombreUsuario = dto.nombreUsuario;
        nuevoUsuario.apellidosUsuario = dto.apellidosUsuario;
        nuevoUsuario.correoUsuario = dto.correoUsuario;
        nuevoUsuario.passwordUsuario = dto.passwordUsuario;
        nuevoUsuario.roles = rolAdmin;
        const nuevoAdmin = new AdministradorEntity();
        nuevoAdmin.cargoAdmin = dto.cargoAdmin;
        nuevoAdmin.usuario = nuevoUsuario;
        try {
            await this.usuarioRepository.save(nuevoUsuario);
            await this.administradorRepository.save(nuevoAdmin);
            return new MessageDto(`Usuario ${nuevoUsuario.nombreUsuario} ${nuevoUsuario.apellidosUsuario} registrado.`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al registrar usuario`))
        }
    }
    // Método para registrar usuario administrador
      
    async consultarAdministradores(): Promise<AdministradorEntity[]> {
        const lista = await this.administradorRepository.find({ relations: ['usuario', 'usuario.perfil'] });
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('No hay usuarios administradores'));
        }
        return lista.map(administrador => {
            if (administrador.usuario.perfil) {
                administrador.usuario.perfil.fotoPerfil = `${process.env.PERFIL_URL}${administrador.usuario.perfil.fotoPerfil}`;
            }
            return administrador;
        });
    } 
    // Método para consultar usuarios administradores

    async consultarAdministrador(idAdmin: number): Promise<AdministradorEntity> {
        const administrador = await this.administradorRepository.findOne({
            where: { idAdmin },
            relations: ['usuario.roles', 'usuario.perfil'],
        }); 
        if (!administrador) {
            throw new NotFoundException('Usuario administrador no encontrado');
        }
        return administrador;
    }
    // Método para consultar un usuario administrador

    async editarAdministrador(idAdmin: number, dto: EditarAdministradorDto): Promise<any> {
        const administrador = await this.consultarAdministrador(idAdmin);
        if (!administrador) {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
        if (idAdmin !== idAdmin) {
            throw new BadRequestException(new MessageDto('El usuario ya existe'));
        }
        dto.nombreUsuario ? administrador.usuario.nombreUsuario = dto.nombreUsuario : administrador.usuario.nombreUsuario;
        dto.apellidosUsuario ? administrador.usuario.apellidosUsuario = dto.apellidosUsuario : administrador.usuario.apellidosUsuario;
        dto.correoUsuario ? administrador.usuario.correoUsuario = dto.correoUsuario : administrador.usuario.correoUsuario;
        dto.cargoAdmin ? administrador.cargoAdmin = dto.cargoAdmin : administrador.cargoAdmin;
        try {
            // Guardar el administrador en la base de datos
            await this.administradorRepository.save(administrador);
            return new MessageDto(`Los datos del usuario ${administrador.usuario.nombreUsuario} fueron editados exitosamente`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la información'));
        } 
    }
    // Método para editar usuario administrador 

    async activarUsuario(idUsuario: number, dto: ActivarUsuarioDto): Promise<any> {
        const usuario = await this.usuarioService.consultarUsuario(idUsuario);
        if (!usuario) {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
        if (usuario.estadoUsuario === EstadoUsuario.ACTIVO) {
            throw new BadRequestException(new MessageDto('El usuario ya está activo'));
        }
        usuario.estadoUsuario = EstadoUsuario.ACTIVO;
        await this.usuarioRepository.save(usuario);
        return new MessageDto(`Usuario ${usuario.nombreUsuario} ${usuario.apellidosUsuario} activado`);
    }
    // Método para reactivar usuarios 
}
  