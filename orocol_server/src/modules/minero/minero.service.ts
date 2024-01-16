import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MineroEntity } from './minero.entity';
import { MessageDto } from 'src/common/message.dto';
import { mineroDto } from 'src/dto/minero.dto';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MineroService {
    constructor(
        @InjectRepository(MineroEntity)
        private mineroRepository: Repository<MineroEntity>,
        private readonly usuarioService: AuthService, // Inyecta la instancia de AuthService
    ) { }

    async consultarMineros(): Promise<MineroEntity[]> {
        const lista = await this.mineroRepository.find({ relations: ['Usuarios'] });
        if (!lista.length) {
            throw new NotFoundException(new MessageDto('No hay usuarios mineros'));
        }
        return lista;
    }

    async consultarMinero(IdMinero: number): Promise<MineroEntity> {
        const minero = await this.mineroRepository.findOne({
            where: { IdMinero: IdMinero },
            relations: ['Usuarios.roles'],
        }); 
        if (!minero) {
            throw new NotFoundException(`Usuario minero con ID ${IdMinero} no encontrado`);
        }
        return minero;
    }


    async registrarMinero(dto: mineroDto): Promise<any> {
        const { numero_documento } = dto;
        const exists = await this.mineroRepository.findOne({ where: [{ numero_documento: numero_documento }] });
        if (exists) {
            throw new BadRequestException(new MessageDto('Ese número de documento ya existe'));
        }
        const mineroDto: CreateUsuarioDto = {
            nombreUsuario: dto.nombreUsuario,
            apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario,
            passwordUsuario: dto.passwordUsuario,
        }; // Registrar el usuario usuarioistrador utilizando UsuarioService
        const usuario = await this.usuarioService.registrarUsuario(mineroDto);
        const minero = this.mineroRepository.create({
            tipo_documento: dto.tipo_documento,
            numero_documento: dto.numero_documento,
            cambio_documento: dto.cambio_documento,
            telefono: dto.telefono,
            fecha_nacimiento: dto.fecha_nacimiento,
            direccion_vivienda: dto.direccion_vivienda,
            Usuarios: usuario, // Asociar el usuario usuarioistrador al minero
        });
        try {
            // Guardar el minero en la base de datos
            await this.mineroRepository.save(minero);
            return new MessageDto(`Usuario ${usuario.nombreUsuario} registrado`);
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al guardar el usuario'));
        }
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
        try {
            // Guardar el minero en la base de datos
            await this.mineroRepository.save(minero);
            return new MessageDto('Datos del usuario editados exitosamente');
        } catch (error) {
            throw new InternalServerErrorException(new MessageDto('Error al editar'));
        }
    }
    // Método para editar usuario minero  
}