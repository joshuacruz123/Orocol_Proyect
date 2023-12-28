import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenDto } from '../dto/token.dto';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginUsuarioDto } from '../dto/login.dto';
import { MessageDto } from './../common/message.dto';
import { NuevoUsuarioDto } from '../dto/nuevo-usuario.dto';
import { AuthRepository } from './auth.repository';
import { Usuario } from './../modules/usuario/usuario.entity';
import { Rol } from './../modules/rol/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/modules/rol/rol.enum';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
        @InjectRepository(Usuario)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async getall(): Promise<Usuario[]> {
        const usuarios = await this.authRepository.find();
        if (!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
        return usuarios;
    }

    async create(dto: NuevoUsuarioDto): Promise<any> {
        const { correoUsuario, passwordUsuario } = dto;
        const exists = await this.authRepository.findOne({ where: [{ correoUsuario: correoUsuario }, { passwordUsuario: passwordUsuario }] });
        if (exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolMinero = await this.rolRepository.findOne({ where: { tipoRol: RolNombre.MINERO } });
        if (!rolMinero) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const user = this.authRepository.create(dto);
        user.roles = [rolMinero];
        await this.authRepository.save(user);
        return new MessageDto('usuario creado');
    }

    async login(dto: LoginUsuarioDto): Promise<any> {
        const { correoUsuario } = dto;
        const usuario = await this.authRepository.findOne({ where: [{ correoUsuario: correoUsuario }, { passwordUsuario: correoUsuario }] });
        if (!usuario) return new UnauthorizedException(new MessageDto('no existe el usuario'));
        const passwordOK = await compare(dto.passwordUsuario, usuario.passwordUsuario);
        if (!passwordOK) return new UnauthorizedException(new MessageDto('contraseña errónea'));
        const payload: PayloadInterface = {
            idUsuario: usuario.idUsuario,
            correoUsuario: usuario.correoUsuario,
            passwordUsuario: usuario.passwordUsuario,
            roles: usuario.roles.map(rol => rol.tipoRol as RolNombre)
        }
        const token = await this.jwtService.sign(payload);
        return { token };
    }

    async refresh(dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        const payload: PayloadInterface = {
            idUsuario: usuario[`idUsuario`],
            correoUsuario: usuario[`correoUsuario`],
            passwordUsuario: usuario[`passwordUsuario`],
            roles: usuario[`roles`]
        }
        const token = await this.jwtService.sign(payload);
        return { token };
    }
}
