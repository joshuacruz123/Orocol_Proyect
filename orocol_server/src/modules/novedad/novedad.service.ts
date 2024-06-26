import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MineroEntity } from 'src/entities/minero.entity';
import { MessageDto } from 'src/dto/common/message.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { NovedadEntity } from 'src/entities/novedad.entity';
import { NovedadDto } from 'src/dto/novedad.dto';
import { MineroService } from '../minero/minero.service';
import { TurnoMineroEntity } from 'src/entities/turno.entity';
import { AdministradorEntity } from 'src/entities/administrador.entity';
import { AdministradorService } from '../administrador/administrador.service';
import { Asistencia } from 'src/enums/turno.enum';

@Injectable()
export class NovedadService {

    constructor(
        @InjectRepository(NovedadEntity)
        private novedadRepository: Repository<NovedadEntity>,
        @InjectRepository(MineroEntity)
        private readonly mineroRepository: Repository<MineroEntity>,
        private readonly mineroService: MineroService,
        @InjectRepository(TurnoMineroEntity)
        private turnoRepository: Repository<TurnoMineroEntity>,
        @InjectRepository(AdministradorEntity)
        private administradorRepository: Repository<AdministradorEntity>,
        private readonly administradorService: AdministradorService,
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly usuarioService: UsuarioService,
    ) { }
    
    async registrarNovedad(idTurno: number, dto: NovedadDto): Promise<MessageDto> {
        const turno: TurnoMineroEntity = await this.turnoRepository.findOne({ where: {idTurno}});
        if (!turno) {
            throw new NotFoundException('No existe la asistencia');
        }
        if (turno.Asistencia === Asistencia.Si) {
            throw new BadRequestException(new MessageDto('El usuario sí asistió'));
        }
        const novedad: NovedadEntity = new NovedadEntity();
        novedad.descripcion = dto.descripcion;
        novedad.turno = turno;
        try {
            await this.turnoRepository.save(turno);
            await this.novedadRepository.save(novedad);
            return new MessageDto(`Novedad registrada exitosamente.`)
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al registrar la novedad'))
        }
    }
    // Método para registrar las novedades
    
    async consultarNovedad(idNovedad: number): Promise<NovedadEntity> {
        const novedad: NovedadEntity = await this.novedadRepository.findOne({ where: {idNovedad}});
        if (!novedad) {
            throw new NotFoundException(new MessageDto('No se encontró la novedad'));
        }
        return novedad;
    }
    // Método para consultar una novedad
    
    async editarNovedad(idNovedad: number, dto: NovedadDto): Promise<any> {
        const novedad = await this.consultarNovedad(idNovedad);
        if (!novedad) {
            throw new NotFoundException(new MessageDto('No existe la novedad'));
        }
        novedad.descripcion = dto.descripcion;
        try {
            await this.novedadRepository.save(novedad);
            return new MessageDto('Novedad actualizada exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la novedad'));
        }
    }
    // Método para editar la novedad del usuario minero 
}
