import { AdministradorDto } from '../../dto/administrador.dto';
import { AdministradorRepository } from './administrador.repository';
import { Administrador } from './administrador.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { Rol } from './../rol/rol.entity';
import { RolRepository } from './../rol/rol.repository';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioRepository } from '../usuario/usuario.repository';

@Injectable()
export class AdministradorService extends UsuarioService {

    constructor(
        @InjectRepository(Administrador)
        private readonly administradorRepository: AdministradorRepository,
        @InjectRepository(Rol)
        protected readonly rolRepository: RolRepository,
        @InjectRepository(Usuario)
        protected readonly usuarioRepository: UsuarioRepository, 
    ) { 
        super(rolRepository, usuarioRepository);
    }

    async consultarAdministradores(): Promise<Administrador[]> {
        const list = await this.administradorRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async consultarAdmin(idAdmin: number): Promise<Administrador> {
        const administrador = await this.administradorRepository.findOne({ where: { idAdmin: idAdmin } });
        if (!administrador) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return administrador;
    }

    async findBycargoAdmin(cargoAdmin: string): Promise<Administrador> {
        const administrador = await this.administradorRepository.findOne({ where: { cargoAdmin: cargoAdmin } });
        return administrador;
    }

    async registrarAdmin(dto: AdministradorDto): Promise<any> {
        const exists = await this.findBycargoAdmin(dto.cargoAdmin);
        if (exists) throw new BadRequestException(new MessageDto('ese cargoAdmin ya existe'));
        const administrador = this.administradorRepository.create(dto);
        await this.administradorRepository.save(administrador);
        return new MessageDto(`administrador ${administrador.cargoAdmin} creado`);
    }

    async editarAdmin(idAdmin: number, dto: AdministradorDto): Promise<any> {
        const administrador = await this.consultarAdmin(idAdmin);
        if (!administrador)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findBycargoAdmin(dto.cargoAdmin);
        if (exists && exists.idAdmin !== idAdmin) throw new BadRequestException(new MessageDto('ese administrador ya existe'));
        dto.cargoAdmin ? administrador.cargoAdmin = dto.cargoAdmin : administrador.cargoAdmin = administrador.cargoAdmin;
        await this.administradorRepository.save(administrador);
        return new MessageDto(`administrador ${administrador.cargoAdmin} actualizado`);
    }
    // Método para 
}