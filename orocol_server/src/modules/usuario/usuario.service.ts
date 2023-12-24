import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Rol } from './../rol/rol.entity';
import { RolRepository } from './../rol/rol.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { create } from 'domain';
import { MessageDto } from './../../common/message.dto';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/modules/rol/rol.enum';
// Importa las dependencias y archivos necesarios

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: RolRepository,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: UsuarioRepository
    ) { }
    // Llama a los repositorios 

    async getall(): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepository.find();
        if (!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
        return usuarios;
    }
    // Método para  

    async registrarUsuario(dto: CreateUsuarioDto): Promise<any> {
        const { nombreUsuario, apellidosUsuario, correoUsuario } = dto;
        const exists = await this.usuarioRepository.findOne({ where: [{ nombreUsuario: nombreUsuario }, { apellidosUsuario: apellidosUsuario }, { correoUsuario: correoUsuario }] });
        if (exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolAdmin = await this.rolRepository.findOne({ where: { tipoRol: RolNombre.ADMINISTRADOR } });
        const rolMin = await this.rolRepository.findOne({ where: { tipoRol: RolNombre.MINERO } });
        if (!rolAdmin || !rolMin) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const admin = this.usuarioRepository.create(dto);
        admin.roles = [rolAdmin, rolMin];
        await this.usuarioRepository.save(admin);
        return new MessageDto('admin creado');
    }
    // Método para  

    async consultarUsuario(idUsuario: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: idUsuario } });
        //const usuario = await this.usuarioRepository.findOne(1);
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return usuario;
    }
    // Método para  

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
        // Comentado por precaución ya que puede no estar definido en el DTO
        // usuario.estadoUsuario = dto.estadoUsuario || usuario.estadoUsuario;
        await this.usuarioRepository.save(usuario);
        return new MessageDto(`Usuario ${usuario.nombreUsuario} actualizado`);
    }
    // Método para  

    async inactivarUsuario(idUsuario: number): Promise<any> {
        const usuario = await this.consultarUsuario(idUsuario);
        await this.usuarioRepository.delete(idUsuario); 
        return new MessageDto(`Usuario ${usuario.nombreUsuario} inactivado`);
    } 
    // Método para     
}