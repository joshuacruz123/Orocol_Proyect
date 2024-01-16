import { TokenDto } from 'src/dto/token.dto';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { RolRepository } from 'src/modules/rol/rol.repository';
import { MessageDto } from './../common/message.dto';
import { NuevoUsuarioDto } from 'src/dto/nuevo-usuario.dto';
import { AuthRepository } from './auth.repository';
import { UsuarioEntity } from 'src/modules/usuario/usuario.entity';
import { RolEntity } from 'src/modules/rol/rol.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolNombre } from 'src/modules/rol/rol.enum';
 
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) {}

    async getall(): Promise<UsuarioEntity[]> {
        const usuarios = await this.authRepository.find();
        if(!usuarios.length) throw new NotFoundException(new MessageDto('no hay usuarios en la lista'));
        return usuarios;
    }

    async create(dto: NuevoUsuarioDto): Promise<any> {
        const {correoUsuario} = dto;
        const exists = await this.authRepository.findOne({where: [{correoUsuario: correoUsuario}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        const rolMinero = await this.rolRepository.findOne({where: {tipoRol: RolNombre.MINERO}});
        if(!rolMinero) throw new InternalServerErrorException(new MessageDto('los roles aún no han sido creados'));
        const user = this.authRepository.create(dto);
        user.roles = [rolMinero];
        await this.authRepository.save(user);
        return new MessageDto('usuario creado');
    } // usuario_rol  rol.usuarios

    async login(dto: LoginUsuarioDto): Promise<any> {
        const {correoUsuario} = dto;
        const usuario = await this.authRepository.findOne({where: [{correoUsuario: correoUsuario}]}); 
        if(!usuario) return new UnauthorizedException(new MessageDto('no existe el usuario'));
        const passwordOK = await compare(dto.passwordUsuario, usuario.passwordUsuario);
        if(!passwordOK) return new UnauthorizedException(new MessageDto('contraseña errónea'));
        const payload: PayloadInterface = {
            idUsuario: usuario.idUsuario,
            correoUsuario: usuario.correoUsuario,
            roles: usuario.roles.map(rol => rol.tipoRol as RolNombre)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }

    async refresh(dto: TokenDto): Promise<any> {
        const usuario = await this.jwtService.decode(dto.token);
        const payload: PayloadInterface = {
            idUsuario: usuario[`id`],
            correoUsuario: usuario[`correoUsuario`],
            roles: usuario[`roles`]
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
}
