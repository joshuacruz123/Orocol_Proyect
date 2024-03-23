import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MineroEntity } from '../minero/minero.entity';
import { MessageDto } from 'src/dto/common/message.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { NovedadEntity } from './novedad.entity';
import { NovedadDto } from 'src/dto/novedad.dto';
import { MineroService } from '../minero/minero.service';
import { TurnoMineroEntity } from '../minero/turno.entity';
import { AdministradorEntity } from '../administrador/administrador.entity';
import { AdministradorService } from '../administrador/administrador.service';

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

    async registrarNovedad(IdMinero: number, idAdmin: number, dto: NovedadDto): Promise<any> {
        const minero: MineroEntity = await this.mineroService.consultarMinero(IdMinero);
        const administrador: AdministradorEntity = await this.administradorService.consultarAdministrador(idAdmin);
        if (!minero || !administrador) {
            throw new InternalServerErrorException(
              new MessageDto('Ese usuario no existe'),
            );
        }
        const novedad: NovedadEntity = new NovedadEntity();
        novedad.fechaNovedad = dto.fechaNovedad;
        novedad.descripcion = dto.descripcion;
        novedad.minero = minero;
        novedad.administrador = administrador;
        try { // Guardar en la base de datos
            await this.novedadRepository.save(novedad);
            await this.mineroRepository.save(minero);
            await this.administradorRepository.save(administrador);
            return new MessageDto(`novedad de ${minero.usuario.nombreUsuario} ${minero.usuario.apellidosUsuario} registrada`);
        } catch (error) {
            throw new InternalServerErrorException(
                new MessageDto(`Error al registrar la novedad: ${error.message || error}`),
            );
        }
    }
    // Método para registrar las salidas de las novedads

    async consultarNovedades(): Promise<NovedadEntity[]> {
        const novedads = await this.novedadRepository.find({
            relations: ['minero.usuario']
        });
        if (!novedads || novedads.length === 0) {
            throw new NotFoundException(new MessageDto('No hay novedads registrados en el sistema'));
        }
        return novedads;
    }
    // Método para consultar las novedads
    
    async consultarNovedad(idNovedad: number): Promise<NovedadEntity> {
        const minero: MineroEntity = await this.mineroService.consultarMinero(idNovedad);
        if (!minero) {
            throw new NotFoundException(new MessageDto('No se encontró el minero al usuario'));
        }
        const novedad: NovedadEntity = await this.novedadRepository.findOne({
            where: {
                minero: { IdMinero: minero.IdMinero }
            },
            relations: ['minero.usuario']    
        });
        if (!novedad) {
            throw new NotFoundException(new MessageDto('No existe ese registro')); 
        }
        return novedad;
    }
    // Método para consultar una novedad

    async editarNovedad(idNovedad: number, dto: NovedadDto): Promise<any> {
        const novedad = await this.consultarNovedad(idNovedad);
        if (!novedad) {
            throw new NotFoundException(new MessageDto('No existe la novedad'));
        }
        novedad.fechaNovedad = dto.fechaNovedad;
        novedad.descripcion = dto.descripcion;
        try {
            await this.novedadRepository.save(novedad);
            return new MessageDto('Datos de la novedad actualizados exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar la novedad'));
        }
    }
    // Método para editar la novedad del usuario minero

    async eliminarNovedad(idNovedad: number): Promise<any> {
        const novedad = await this.consultarNovedad(idNovedad);
        await this.novedadRepository.delete(idNovedad);
        return new MessageDto(`Novedad de ${novedad.minero.usuario.nombreUsuario} eliminada`);
    } 
    // Método para eliminar la novedad del usuario minero
}
