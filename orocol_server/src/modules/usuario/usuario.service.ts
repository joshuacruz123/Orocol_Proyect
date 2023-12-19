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

@Injectable()
export class UsuarioService {
 
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: RolRepository,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: UsuarioRepository
    ) {}

    async getall(): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
        return usuarios;
    }

    async registrarUsuario(dto: CreateUsuarioDto): Promise<any> { 
        const {nombreUsuario, apellidosUsuario, correoUsuario} = dto;
        const exists = await this.usuarioRepository.findOne({where: [{nombreUsuario: nombreUsuario}, {apellidosUsuario: apellidosUsuario}, {correoUsuario: correoUsuario}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolAdmin = await this.rolRepository.findOne({where: {tipoRol: RolNombre.ADMINISTRADOR}});
        const rolMin = await this.rolRepository.findOne({where: {tipoRol: RolNombre.MINERO}});
        if(!rolAdmin || !rolMin) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const admin = this.usuarioRepository.create(dto);
        admin.roles = [rolAdmin, rolMin];
        await this.usuarioRepository.save(admin);
        return new MessageDto('admin creado');
    }
}
