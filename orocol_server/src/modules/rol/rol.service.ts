import { CreateRolDto } from 'src/dto/rol.dto';
import { MessageDto } from '../../dto/common/message.dto';
import { RolEntity } from './rol.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
 
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>
    ) {}

    async getall(): Promise<RolEntity[]> {
        const roles = await this.rolRepository.find();
        if(!roles.length) throw new NotFoundException(new MessageDto('no hay roles en la lista'));
        return roles;
    }  

   async create(dto: CreateRolDto): Promise<any> {
        const exists = await this.rolRepository.findOne({where: {tipoRol: dto.tipoRol}});
        if(exists) throw new BadRequestException(new MessageDto('ese rol ya existe'));
        await this.rolRepository.save(dto as RolEntity);
        return new MessageDto('rol creado');
    } 
}
