import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MineroEntity } from './minero.entity';
import { MessageDto } from 'src/common/message.dto';
import { mineroDto } from 'src/dto/minero.dto';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { RolNombre } from '../rol/rol.enum';
import { RolEntity } from '../rol/rol.entity';
import { RolRepository } from '../rol/rol.repository';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { TurnoMineroEntity } from './turno.entity';
import { TurnoDto } from 'src/dto/turno.dto';

@Injectable()
export class MineroService {
    constructor(
        @InjectRepository(MineroEntity)
        private mineroRepository: Repository<MineroEntity>,
        @InjectRepository(TurnoMineroEntity)
        private turnoRepository: Repository<TurnoMineroEntity>,
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioService: UsuarioService,
    ) { }

    async consultarMineros(): Promise<MineroEntity[]> {
        const lista = await this.mineroRepository.find({ relations: ['usuario'] });
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('No hay usuarios mineros'));
        }
        return lista; 
    } 

    async consultarMinero(IdMinero: number): Promise<MineroEntity> {
        const minero = await this.mineroRepository.findOne({
            where: { IdMinero: IdMinero },
            relations: ['usuario.roles'],
        }); 
        if (!minero) {
            throw new NotFoundException(`Usuario minero con ID ${IdMinero} no encontrado`);
        }
        return minero;
    } 


    async registrarUsuarioMinero(dto: mineroDto): Promise<MessageDto> {
        const rolAdmin = await this.rolRepository.findOne({ where: { tipoRol: RolNombre.MINERO} });
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
        const nuevoMinero = new MineroEntity();
        nuevoMinero.tipo_documento = dto.tipo_documento,
        nuevoMinero.numero_documento = dto.numero_documento,
        nuevoMinero.cambio_documento = dto.cambio_documento,
        nuevoMinero.telefono = dto.telefono,
        nuevoMinero.fecha_nacimiento = dto.fecha_nacimiento,
        nuevoMinero.direccion_vivienda = dto.direccion_vivienda,
        nuevoMinero.usuario = nuevoUsuario;
        try {
            await this.usuarioRepository.save(nuevoUsuario);
            await this.mineroRepository.save(nuevoMinero);
            return new MessageDto(`Usuario ${nuevoUsuario.nombreUsuario} ${nuevoUsuario.apellidosUsuario} registrado.`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al registrar usuario`))
        }
    }
    // Método para registrar usuario administrador


    async editarMinero(IdMinero: number, dto: mineroDto): Promise<any> {
        const minero = await this.consultarMinero(IdMinero);
        if (!minero)
            throw new NotFoundException(new MessageDto('no existe'));
        await this.usuarioService.editarUsuario(IdMinero, {
            nombreUsuario: dto.nombreUsuario, apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario, passwordUsuario: dto.passwordUsuario,
        });
        const exists = await this.mineroRepository.findOne({ where: { IdMinero } });
        if (exists && exists.IdMinero !== IdMinero) throw new BadRequestException(new MessageDto('ese minero ya existe'));
        dto.tipo_documento ? minero.tipo_documento = dto.tipo_documento : minero.tipo_documento = minero.tipo_documento;
        dto.numero_documento ? minero.numero_documento = dto.numero_documento : minero.numero_documento = minero.numero_documento;
        dto.telefono ? minero.telefono = dto.telefono : minero.telefono = minero.telefono;
        dto.fecha_nacimiento ? minero.fecha_nacimiento = dto.fecha_nacimiento : minero.fecha_nacimiento = minero.fecha_nacimiento;
        dto.direccion_vivienda ? minero.direccion_vivienda = dto.direccion_vivienda : minero.direccion_vivienda = minero.direccion_vivienda;
        try {
            // Guardar el minero en la base de datos
            await this.mineroRepository.save(minero);
            return new MessageDto('Datos del usuario editados exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la información'));
        }
    } 
    // Método para editar usuario minero   

    async registrarTurnos(IdMinero: number, dto: TurnoDto): Promise<any> {
        const minero: MineroEntity = await this.consultarMinero(IdMinero);
        if (!minero) {
            throw new InternalServerErrorException(
              new MessageDto('Ese usuario no existe'),
            );
        }
        const turno: TurnoMineroEntity = new TurnoMineroEntity();
        turno.FechaTurno = dto.FechaTurno;
        turno.Asistencia = dto.Asistencia;
        turno.AsignacionTareas = dto.AsignacionTareas;
        turno.minero = minero;
        try { // Guardar en la base de datos
            await this.turnoRepository.save(turno);
            await this.mineroRepository.save(minero);
            return new MessageDto(`Turno de ${minero.usuario} registrado`);
        } catch (error) {
            throw new InternalServerErrorException(
                new MessageDto(`Error al registrar el turno: ${error.message || error}`),
            );
        }
    }
    // Método para registrar las salidas de las turnos

    async consultarTurnos(): Promise<TurnoMineroEntity[]> {
        const turnos = await this.turnoRepository.find({
            relations: ['minero.usuario']
        });
        if (!turnos || turnos.length === 0) {
            throw new NotFoundException(new MessageDto('No hay turnos registrados en el sistema'));
        }
        return turnos;
    }
    // Método para consultar las turnos
    
    async consultarTurno(idTurno: number): Promise<TurnoMineroEntity> {
        const minero: MineroEntity = await this.consultarMinero(idTurno);
        if (!minero) {
            throw new NotFoundException(new MessageDto('No se encontró el minero al usuario'));
        }
        const turno: TurnoMineroEntity = await this.turnoRepository.findOne({
            where: {
                minero: { IdMinero: minero.IdMinero }
            },
            relations: ['minero.usuario']    
        });
        if (!turno) {
            throw new NotFoundException(new MessageDto('No existe ese registro')); 
        }
        return turno;
    }
    // Método para consultar una turno

    async editarTurno(idTurno: number, dto: TurnoDto): Promise<any> {
        const turno = await this.consultarTurno(idTurno);
        if (!turno) {
            throw new NotFoundException(new MessageDto('No existe el turno'));
        }
        if (turno !== turno) {
            throw new BadRequestException(new MessageDto('El turno ya existe'));
        }
        turno.FechaTurno = dto.FechaTurno;
        turno.Asistencia = dto.Asistencia;
        turno.AsignacionTareas = dto.AsignacionTareas;
        try {
            await this.turnoRepository.save(turno);
            return new MessageDto('Datos del turno actualizados exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la turno'));
        }
    }
    // Método para editar el turno del usuario minero
}