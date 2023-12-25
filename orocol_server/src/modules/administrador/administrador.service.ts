/* 

*/
import { AdministradorDto } from './dto/administrador.dto';
import { AdministradorRepository } from './administrador.repository';
import { Administrador } from './administrador.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class AdministradorService {

    constructor(
        @InjectRepository(Administrador)
        private administradorRepository: AdministradorRepository
    ) { }

    async getAll(): Promise<Administrador[]> {
        const list = await this.administradorRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(idAdmin: number): Promise<Administrador> {
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

    async create(dto: AdministradorDto): Promise<any> {
        const exists = await this.findBycargoAdmin(dto.cargoAdmin);
        if (exists) throw new BadRequestException(new MessageDto('ese cargoAdmin ya existe'));
        const administrador = this.administradorRepository.create(dto);
        await this.administradorRepository.save(administrador);
        return new MessageDto(`administrador ${administrador.cargoAdmin} creado`);
    }

    async update(idAdmin: number, dto: AdministradorDto): Promise<any> {
        const administrador = await this.findById(idAdmin);
        if (!administrador)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findBycargoAdmin(dto.cargoAdmin);
        if (exists && exists.idAdmin !== idAdmin) throw new BadRequestException(new MessageDto('ese administrador ya existe'));
        dto.cargoAdmin ? administrador.cargoAdmin = dto.cargoAdmin : administrador.cargoAdmin = administrador.cargoAdmin;
        await this.administradorRepository.save(administrador);
        return new MessageDto(`administrador ${administrador.cargoAdmin} actualizado`);
    }

    async delete(idAdmin: number): Promise<any> {
        const administrador = await this.findById(idAdmin);
        await this.administradorRepository.delete(idAdmin);
        return new MessageDto(`administrador ${administrador.cargoAdmin} eliminado`);
    }
    // Método para 
}