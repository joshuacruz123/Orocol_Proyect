import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministradorEntity } from './administrador.entity';
import { MessageDto } from 'src/common/message.dto';
import { AdministradorDto } from 'src/dto/administrador.dto';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(AdministradorEntity)
        private administradorRepository: Repository<AdministradorEntity>,
        private readonly usuarioService: UsuarioService, // Inyecta la instancia de UsuarioService
    ) { }

    async consultarAdministradores(): Promise<AdministradorEntity[]> {
        const lista = await this.administradorRepository.find({ relations: ['Usuarios'] });
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('No hay usuarios administradors'));
        }
        return lista;
    }

    async consultarAdministrador(idAdmin: number): Promise<AdministradorEntity> {
        const administrador = await this.administradorRepository.findOne({
            where: { idAdmin: idAdmin },
            relations: ['Usuarios.roles'],
        }); 
        if (!administrador) {
            throw new NotFoundException('Usuario administrador no encontrado');
        }
        return administrador;
    }


    async registrarAdministrador(dto: AdministradorDto): Promise<any> {
        const AdministradorDto: CreateUsuarioDto = {
            nombreUsuario: dto.nombreUsuario,
            apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario,
            passwordUsuario: dto.passwordUsuario,
        }; // Registrar el usuario usuarioistrador utilizando UsuarioService
        const usuario = await this.usuarioService.registrarUsuario(AdministradorDto);
        const administrador = this.administradorRepository.create({
            cargoAdmin: dto.cargoAdmin,
            Usuarios: usuario, // Asociar el usuario usuarioistrador al administrador
        });
        try {
            // Guardar el administrador en la base de datos
            await this.administradorRepository.save(administrador);
            return new MessageDto(`Usuario ${usuario.nombreUsuario} registrado.`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al guardar el usuario'));
        }
    }


    async editarAdministrador(idAdmin: number, dto: AdministradorDto): Promise<any> {
        const administrador = await this.consultarAdministrador(idAdmin);
        if (!administrador)
            throw new NotFoundException(new MessageDto('no existe'));
        await this.usuarioService.editarUsuario(idAdmin, {
            nombreUsuario: dto.nombreUsuario, apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario, passwordUsuario: dto.passwordUsuario,
        });
        const exists = await this.administradorRepository.findOne({ where: { idAdmin: idAdmin } });
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
}
 