import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from './../../common/message.dto';
import { Rol } from './rol.entity';
import { CreateRolDto } from '../../dto/create-rol.dto';
import { RolRepository } from './rol.repository';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: RolRepository
    ) {}

    async getall(): Promise<Rol[]> {
        const roles = await this.rolRepository.find();
        if(!roles.length) throw new NotFoundException(new MessageDto('no hay roles en la lista'));
        return roles;
    }

    async create(dto: CreateRolDto): Promise<any> {
        const exists = await this.rolRepository.findOne({where: {tipoRol: dto.tipoRol}}); 
        if(exists) throw new BadRequestException(new MessageDto('ese rol ya existe'));
        await this.rolRepository.save(dto as Rol);
        return new MessageDto('rol creado');
    }
}
