import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministradorEntity } from './administrador.entity';
import { MessageDto } from 'src/common/message.dto';
import { AdministradorDto } from 'src/dto/administrador.dto';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { RolNombre } from '../rol/rol.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolEntity } from '../rol/rol.entity';
import { RolRepository } from '../rol/rol.repository';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { ActivarUsuarioDto } from 'src/dto/inactivar.dto';
import { EstadoUsuario } from '../usuario/usuario.enum';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(AdministradorEntity)
        private administradorRepository: Repository<AdministradorEntity>,
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository,
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
        const lista = await this.administradorRepository.find({
            relations: ['usuario'],
          });
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('No hay usuarios administradores'));
        }
        return lista;
    }

    async consultarAdministrador(idAdmin: number): Promise<AdministradorEntity> {
        const administrador = await this.administradorRepository.findOne({
            where: { idAdmin },
            relations: ['usuario.roles'],
        }); 
        if (!administrador) {
            throw new NotFoundException('Usuario administrador no encontrado');
        }
        return administrador;
    }

    async editarAdministrador(idAdmin: number, dto: AdministradorDto): Promise<any> {
        const administrador = await this.consultarAdministrador(idAdmin);
        if (!administrador)
            throw new NotFoundException(new MessageDto('No existe'));
        await this.usuarioService.editarUsuario(idAdmin, {
            nombreUsuario: dto.nombreUsuario, apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario, passwordUsuario: dto.passwordUsuario,
        });
        const exists = await this.administradorRepository.findOne({ where: { idAdmin } });
        if (exists && exists.idAdmin !== idAdmin) throw new BadRequestException(new MessageDto('ese administrador ya existe'));
        dto.cargoAdmin ? administrador.cargoAdmin = dto.cargoAdmin : administrador.cargoAdmin = administrador.cargoAdmin;
        try {
            // Guardar el administrador en la base de datos
            await this.administradorRepository.save(administrador);
            return new MessageDto('Los datos fueron editados exitosamente');
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
 