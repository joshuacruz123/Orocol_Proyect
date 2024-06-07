import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MineroEntity } from 'src/entities/minero.entity';
import { MessageDto } from 'src/dto/common/message.dto';
import { EditarMineroDto, mineroDto } from 'src/dto/minero.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { RolNombre } from 'src/enums/rol.enum';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { TurnoMineroEntity } from 'src/entities/turno.entity';
import { TurnoDto } from 'src/dto/turno.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class MineroService {
    constructor(
        @InjectRepository(MineroEntity)
        private mineroRepository: Repository<MineroEntity>,
        @InjectRepository(TurnoMineroEntity)
        private turnoRepository: Repository<TurnoMineroEntity>,
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly usuarioService: UsuarioService, // Inyecta la instancia de UsuarioService
        private readonly mailService: MailService,
    ) { }

    async consultarMineros(): Promise<MineroEntity[]> {
        const lista = await this.mineroRepository.find({ relations: ['usuario', 'usuario.perfil'] });
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('No hay usuarios mineros'));
        }
        return lista.map(minero => {
            if (minero.usuario.perfil) {
                minero.usuario.perfil.fotoPerfil = `${process.env.PERFIL_URL}${minero.usuario.perfil.fotoPerfil}`;
            }
            return minero;
        });
    }
    // Método para consultar usuarios mineros

    async consultarMinero(IdMinero: number): Promise<MineroEntity> {
        const minero = await this.mineroRepository
            .createQueryBuilder('minero')
            .leftJoinAndSelect('minero.usuario', 'usuario')
            .leftJoinAndSelect('usuario.roles', 'roles')
            .where('minero.IdMinero = :IdMinero', { IdMinero })
            .select([
                'minero',
                'usuario.idUsuario',
                'usuario.nombreUsuario',
                'usuario.apellidosUsuario',
                'usuario.correoUsuario',
                'usuario.estadoUsuario'
            ])
            .getOne();
        if (!minero) {
            throw new NotFoundException(`Usuario minero con ID ${IdMinero} no encontrado`);
        }
        return minero;
    }
    // Método para consultar un usuario minero

    async registrarUsuarioMinero(dto: mineroDto): Promise<MessageDto> {
        const rolAdmin = await this.rolRepository.findOne({ where: { tipoRol: RolNombre.MINERO } });
        if (!rolAdmin) throw new BadRequestException(new MessageDto('El rol de administrador no existe.'));
        const { correoUsuario } = dto;
        const exists = await this.usuarioRepository.findOne({ where: { correoUsuario: correoUsuario } });
        if (exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
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
            await this.mailService.enviarCorreosRegistro(correoUsuario, nuevoUsuario.nombreUsuario); // Envío al correo
            await this.usuarioRepository.save(nuevoUsuario);
            await this.mineroRepository.save(nuevoMinero);
            return new MessageDto(`Usuario ${nuevoUsuario.nombreUsuario} ${nuevoUsuario.apellidosUsuario} registrado.`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto(`Error al registrar usuario`))
        }
    }
    // Método para registrar usuario administrador

    async editarMinero(IdMinero: number, dto: EditarMineroDto): Promise<any> {
        const minero = await this.consultarMinero(IdMinero);
        if (!minero) {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
        if (IdMinero !== IdMinero) {
            throw new BadRequestException(new MessageDto('El usuario ya existe'));
        }
        minero.usuario.nombreUsuario = dto.nombreUsuario ?? minero.usuario.nombreUsuario;
        minero.usuario.apellidosUsuario = dto.apellidosUsuario ?? minero.usuario.apellidosUsuario;
        minero.usuario.correoUsuario = dto.correoUsuario ?? minero.usuario.correoUsuario;
        minero.tipo_documento = dto.tipo_documento ?? minero.tipo_documento;
        minero.numero_documento = dto.numero_documento ?? minero.numero_documento;
        minero.cambio_documento = dto.cambio_documento ?? minero.cambio_documento;
        minero.telefono = dto.telefono ?? minero.telefono;
        minero.fecha_nacimiento = dto.fecha_nacimiento ?? minero.fecha_nacimiento;
        minero.direccion_vivienda = dto.direccion_vivienda ?? minero.direccion_vivienda;
        try {
            await this.mineroRepository.save(minero);
            return new MessageDto(`Datos del usuario ${minero.usuario.nombreUsuario} editados exitosamente`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la información'));
        }
    }
    // Método para editar usuario minero 

    async registrarTurnoMinero(numeroDocumento: number, turnoDto: TurnoDto): Promise<MessageDto> {
        const minero = await this.mineroRepository.findOne({ where: { numero_documento: numeroDocumento } });
        if (!minero) {
            throw new NotFoundException('Minero no encontrado');
        }
        const turnoMinero = new TurnoMineroEntity();
        turnoMinero.FechaTurno = turnoDto.FechaTurno;
        turnoMinero.Asistencia = turnoDto.Asistencia;
        turnoMinero.AsignacionTareas = turnoDto.AsignacionTareas;
        turnoMinero.minero = minero;
        try {
            await this.turnoRepository.save(turnoMinero);
            return new MessageDto(`Asistencia registrada correctamente.`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al registrar la asistencia'));
        }
    }
    // Método para registrar los turnos

    async consultarTurnos(): Promise<TurnoMineroEntity[]> {
        const turnos = await this.turnoRepository.find({ relations: ['minero', 'minero.usuario', 'novedad'] });
        if (!turnos.length) {
            throw new NotFoundException(new MessageDto('No hay turnos registrados'));
        }
        return turnos.map(turno => {
            if (turno.novedad) {
                turno.novedad;
            }
            return turno;
        });
    } 
    // Método para consultar las turnos

    async consultarTurnosPorFecha(): Promise<{ hoy: TurnoMineroEntity[], anteriores: TurnoMineroEntity[] }> {
        const turnos = await this.consultarTurnos();
        const hoy = new Date().setHours(0, 0, 0, 0);
        turnos.sort((a, b) => {
            const fechaTurnoA = new Date(a.FechaTurno).getTime();
            const fechaTurnoB = new Date(b.FechaTurno).getTime();
            return fechaTurnoA - fechaTurnoB;
        });
        const hoyTurnos = [];
        const anterioresTurnos = [];
        turnos.forEach(turno => {
            const fechaTurno = new Date(turno.FechaTurno).setHours(0, 0, 0, 0);
            if (fechaTurno === hoy) {
                hoyTurnos.push(turno);
            } else {
                anterioresTurnos.push(turno);
            }
        });
        return { hoy: hoyTurnos, anteriores: anterioresTurnos };
    }

    async consultarTurnosMinero(IdMinero: number): Promise<MineroEntity> {
        const minero = await this.mineroRepository.findOne({
            where: { IdMinero },
            relations: ['turno', 'turno.novedad'],
            select: ['IdMinero'],
        }); 
        const confirmar = await this.mineroRepository.findOne({ where: { IdMinero }, relations: ['turno'],
        }); 
        if (!confirmar) {
            throw new NotFoundException('No tienes asistencias registradas');
        }
        return minero;
    }
    // Método para consultar los turnos de los usuarios
    
    async consultarTurno(idTurno: number): Promise<TurnoMineroEntity> {
        const turno: TurnoMineroEntity = await this.turnoRepository.findOne({ where: {idTurno}});
        if (!turno) {
            throw new NotFoundException(new MessageDto('No se encontró el turno'));
        }
        return turno;
    }
    // Método para consultar una novedad

    async editarTurno(idTurno: number, dto: TurnoDto): Promise<any> {
        const turno = await this.turnoRepository.findOne({ where: {idTurno}});
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