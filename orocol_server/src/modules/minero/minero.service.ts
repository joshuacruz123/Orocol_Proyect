import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Minero } from './minero.entity';
import { mineroDto } from '../../dto/minero.dto';
import { TurnoDto } from '../../dto/turno.dto';
import { TurnoMinero } from './turno.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Repository } from 'typeorm'; // Repository<>

@Injectable()
export class MineroService extends UsuarioService {
    constructor(
        @InjectRepository(Minero)
        protected readonly mineroRepository: Repository<Minero>,
        @InjectRepository(TurnoMinero)
        protected readonly turnoRepository: Repository<TurnoMinero>,
        @InjectRepository(Rol)
        protected readonly rolRepository: Repository<Rol>,
        @InjectRepository(Usuario)
        protected readonly usuarioRepository: Repository<Usuario>, 
    ) { 
        super(rolRepository, usuarioRepository);
    }

    async consultarMineros(): Promise<Minero[]> {
        const list = await this.mineroRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async consultarMinero(IdMinero: number): Promise<Minero> {
        const minero = await this.mineroRepository.findOne({ where: { IdMinero: IdMinero } });
        if (!minero) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return minero;
    } 

    async registrarMinero(dto: mineroDto): Promise<any> {
        const { tipo_documento, numero_documento, telefono, fecha_nacimiento, direccion_vivienda } = dto;
        const exists = await this.mineroRepository.findOne({ where: [{ tipo_documento: tipo_documento }, { numero_documento: numero_documento }, { telefono: telefono }, { fecha_nacimiento: fecha_nacimiento }, { direccion_vivienda: direccion_vivienda }] });
        if (exists) throw new BadRequestException(new MessageDto('ese tipo_documento ya existe'));
        const minero = this.mineroRepository.create(dto);
        await this.mineroRepository.save(minero);
        return new MessageDto(`Compra de ${minero.tipo_documento} creada`);
    }

    async editarMinero(IdMinero: number, dto: mineroDto): Promise<any> {
        const minero = await this.consultarMinero(IdMinero);
        if (!minero)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.mineroRepository.findOne({ where: { IdMinero: IdMinero } });
        if (exists && exists.IdMinero !== IdMinero) throw new BadRequestException(new MessageDto('ese minero ya existe'));
        dto.tipo_documento ? minero.tipo_documento = dto.tipo_documento : minero.tipo_documento = minero.tipo_documento;
        dto.numero_documento ? minero.numero_documento = dto.numero_documento : minero.numero_documento = minero.numero_documento;
        dto.telefono ? minero.telefono = dto.telefono : minero.telefono = minero.telefono;
        dto.fecha_nacimiento ? minero.fecha_nacimiento = dto.fecha_nacimiento : minero.fecha_nacimiento = minero.fecha_nacimiento;
        dto.direccion_vivienda ? minero.direccion_vivienda = dto.direccion_vivienda : minero.direccion_vivienda = minero.direccion_vivienda;
        await this.mineroRepository.save(minero);
        return new MessageDto(`Compra de ${minero.tipo_documento} actualizada`);
    }
    // Método para  

    /*
    async delete(IdMinero: number): Promise<any> {
        const minero = await this.consultarMinero(IdMinero);
        await this.mineroRepository.delete(IdMinero);
        return new MessageDto(`Compra de ${minero.tipo_documento} eliminada`);
    }
    // Método para 

    async resSolicitudEditarDoc(mineroData: Minero): Promise<Minero> {
        const solicitudMinero = this.mineroRepository.create(mineroData);
        return this.mineroRepository.save(solicitudMinero);
    }
    // Método para responder solicitud de administrador */

    async registrarAsistencia(turnoData: TurnoDto): Promise<any> {
        const { FechaTurno, Asistencia, AsignacionTareas } = turnoData;
        const exists = await this.turnoRepository.findOne({ where: [{ FechaTurno: FechaTurno }, { Asistencia: Asistencia }, { AsignacionTareas: AsignacionTareas }] });
        if (exists) throw new BadRequestException(new MessageDto('ese tipo_documento ya existe'));
        const minero = this.turnoRepository.create(turnoData);
        await this.turnoRepository.save(minero);
        return new MessageDto(`Turno registrado con exito`);
    }
    // Método para registrar asistencia

    async verAsistencias(): Promise<TurnoMinero[]> {
        const list = await this.turnoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async consultarAsistencia(idTurno: number): Promise<TurnoMinero> {
        const turno = await this.turnoRepository.findOne({ where: { idTurno: idTurno } });
        if (!turno) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return turno;
    } 
}