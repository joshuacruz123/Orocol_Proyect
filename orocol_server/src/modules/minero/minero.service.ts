import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Minero } from './minero.entity';
import { mineroDto } from '../../dto/minero.dto';
import { TurnoDto } from '../../dto/turno.dto';
import { TurnoMinero } from './turno.entity';
import { Rol } from './../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Repository } from 'typeorm'; // Repository<>
import { RolNombre } from '../rol/rol.enum';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';

@Injectable()
export class MineroService extends UsuarioService {
    constructor(
        @InjectRepository(Minero) protected readonly mineroRepository: Repository<Minero>,
        @InjectRepository(TurnoMinero) protected readonly turnoRepository: Repository<TurnoMinero>,
        @InjectRepository(Rol) protected readonly rolRepository: Repository<Rol>,
        @InjectRepository(Usuario) protected readonly usuarioRepository: Repository<Usuario>, 
        protected readonly usuarioService: UsuarioService,
    ) { 
        super(rolRepository, usuarioRepository);
    }

    async consultarMineros(): Promise<Minero[]> {
        const usuariosConRoles: Usuario[] = await this.consultarUsuarios(); 
        const minerosConvertidos = usuariosConRoles.filter(
            usuario => usuario instanceof Minero
        ) as unknown as Minero[];
        if (!minerosConvertidos.length) {
            throw new NotFoundException(new MessageDto('La lista de mineros está vacía'));
        }
        return minerosConvertidos;
    }

    async consultarMinero(IdMinero: number): Promise<Minero> {
        const usuario: Usuario = await this.consultarUsuario(IdMinero);
        if (!usuario.roles.some((rol) => rol.tipoRol === RolNombre.MINERO)) {
            throw new NotFoundException(new MessageDto('El usuario no es un minero'));
        }
        const minero = await this.mineroRepository.findOne({ where: { IdMinero: usuario.idUsuario } });
        if (!minero) {
            throw new NotFoundException(new MessageDto('No existe el minero'));
        }
        return minero;
    }

    async registrarMinero(dto: mineroDto): Promise<any> {
        const { tipo_documento, numero_documento, telefono, fecha_nacimiento, direccion_vivienda } = dto;
        const exists = await this.mineroRepository.findOne({ where: [{ tipo_documento: tipo_documento }, { numero_documento: numero_documento }, { telefono: telefono }, { fecha_nacimiento: fecha_nacimiento }, { direccion_vivienda: direccion_vivienda }] });
        if (exists) throw new BadRequestException(new MessageDto('ese minero ya existe'));
        const usuarioDto: CreateUsuarioDto = {
            nombreUsuario: dto.nombreUsuario,
            apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario,
            passwordUsuario: dto.passwordUsuario,
        };
        await this.usuarioService.registrarUsuario(usuarioDto);
        const minero = this.mineroRepository.create(dto);
        await this.mineroRepository.save(minero);
    }

    async editarMinero(IdMinero: number, dto: mineroDto): Promise<any> {
        const minero = await this.consultarMinero(IdMinero);
        if (!minero)
            throw new NotFoundException(new MessageDto('no existe'));
            await this.usuarioService.editarUsuario(IdMinero, {
                nombreUsuario: dto.nombreUsuario, apellidosUsuario: dto.apellidosUsuario, 
                correoUsuario: dto.correoUsuario, passwordUsuario: dto.passwordUsuario,
            });
        const exists = await this.mineroRepository.findOne({ where: { IdMinero: IdMinero } });
        if (exists && exists.IdMinero !== IdMinero) throw new BadRequestException(new MessageDto('ese minero ya existe'));
        dto.tipo_documento ? minero.tipo_documento = dto.tipo_documento : minero.tipo_documento = minero.tipo_documento;
        dto.numero_documento ? minero.numero_documento = dto.numero_documento : minero.numero_documento = minero.numero_documento;
        dto.telefono ? minero.telefono = dto.telefono : minero.telefono = minero.telefono;
        dto.fecha_nacimiento ? minero.fecha_nacimiento = dto.fecha_nacimiento : minero.fecha_nacimiento = minero.fecha_nacimiento;
        dto.direccion_vivienda ? minero.direccion_vivienda = dto.direccion_vivienda : minero.direccion_vivienda = minero.direccion_vivienda;
        await this.mineroRepository.save(minero);
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
    // Método para responder solicitud de turno */

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
        const verMineros: Minero[] = await this.consultarMineros(); 
        const turnos = verMineros.filter(
            minero => minero instanceof TurnoMinero
        ) as unknown as TurnoMinero[];
        if (!turnos.length) {
            throw new NotFoundException(new MessageDto('La lista de turnos está vacía'));
        }
        return turnos; 
    } /* 
    async verAsistencias(): Promise<TurnoMinero[]> {
        const usuariosConRoles: Usuario[] = await this.consultarUsuarios(); 
        const administradoresConvertidos = usuariosConRoles.filter(
            usuario => usuario instanceof Administrador
        ) as unknown as Administrador[];
        if (!administradoresConvertidos.length) {
            throw new NotFoundException(new MessageDto('La lista de administradores está vacía'));
        }
        return administradoresConvertidos;
    }
    */

    async consultarAsistencia(idTurno: number): Promise<TurnoMinero> {
        const minero: Minero = await this.consultarMinero(idTurno);
        if (!minero) {
            throw new NotFoundException(new MessageDto('El minero existe'));
        }
        const turno = await this.turnoRepository.findOne({ where: { idTurno: minero.IdMinero } });
        if (!turno) {
            throw new NotFoundException(new MessageDto('No existe el turno'));
        }
        return turno;
    }  
} 