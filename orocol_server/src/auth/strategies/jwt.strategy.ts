import { PayloadInterface } from './../payload.interface';
import { MessageDto } from '../../dto/common/message.dto';
import { JWT_SECRET } from './../../config/constants';
import { ConfigService } from '@nestjs/config';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
        const secret = this.configService.get(JWT_SECRET);
        // console.log("JWT_SECRET:", secret);
    }

    async validate(payload: PayloadInterface) {
        const {correoUsuario} = payload;
        const usuario = await this.usuarioRepository.findOne({where: {correoUsuario: correoUsuario}});
        if(!usuario) return new UnauthorizedException(new MessageDto('credenciales erróneas'));
        return payload;
    }
}