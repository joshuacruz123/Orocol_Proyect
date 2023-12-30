import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Novedad } from './novedad.entity';
import { NovedadDto } from '../../dto/novedad.dto';
import { MineroService } from '../minero/minero.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Minero } from '../minero/minero.entity';
import { TurnoMinero } from '../minero/turno.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Repository } from 'typeorm'; // Repository<>

@Injectable()
export class NovedadService extends MineroService {
    constructor(
        @InjectRepository(Novedad) protected readonly novedadRepository: Repository<Novedad>,
        @InjectRepository(Minero) protected readonly mineroRepository: Repository<Minero>,
        protected readonly mineroService: MineroService,
        @InjectRepository(TurnoMinero) protected readonly turnoRepository: Repository<TurnoMinero>,
        @InjectRepository(Rol) protected readonly rolRepository: Repository<Rol>,
        @InjectRepository(Usuario) protected readonly usuarioRepository: Repository<Usuario>,
        protected readonly usuarioService: UsuarioService,
    ) {
        super(mineroRepository, turnoRepository, rolRepository, usuarioRepository, usuarioService);
    }
    
    async consultarNovedades(): Promise<Novedad[]> {
        const mineros: Minero[] = await this.consultarMineros(); 
        const lista = mineros.filter(
            minero => minero instanceof Novedad
        ) as unknown as Novedad[];
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('La lista de novedades está vacía'));
        }
        return lista;
    } 

    async consultarNovedad(idNovedad: number): Promise<Novedad> {
        const mineros: Minero = await this.consultarMinero(idNovedad);
        const novedad = await this.novedadRepository.findOne({ where: { idNovedad: mineros.IdMinero } });
        if (!novedad) {
            throw new NotFoundException(new MessageDto('No existe la novedad'));
        }
        return novedad;
    }
    // Método para consultar novedad novedad 

    async registrarNovedad(dto: NovedadDto): Promise<any> {
        const { fechaNovedad, descripcion } = dto;
        const novedad = this.novedadRepository.create(dto);
        await this.novedadRepository.save(novedad);
        return new MessageDto(`Compra de ${novedad.fechaNovedad} creada`);
    }
    // Método para registrar novedad 

    async editarNovedad(idNovedad: number, dto: NovedadDto): Promise<any> {
        const novedad = await this.consultarNovedad(idNovedad);
        if (!novedad)
            throw new NotFoundException(new MessageDto('no existe'));
        dto.fechaNovedad ? novedad.fechaNovedad = dto.fechaNovedad : novedad.fechaNovedad = novedad.fechaNovedad;
        dto.descripcion ? novedad.descripcion = dto.descripcion : novedad.descripcion = novedad.descripcion;
        await this.novedadRepository.save(novedad);
        return new MessageDto(`Compra de ${novedad.fechaNovedad} actualizada`);
    }
    // Método para editar novedad novedad
} 