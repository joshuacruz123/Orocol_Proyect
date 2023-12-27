import { PayloadInterface } from './../payload.interface';
import { MessageDto } from './../../common/message.dto';
import { JWT_SECRET } from './../../config/constants';
import { ConfigService } from '@nestjs/config';
import { Usuario } from 'src/modules/usuario/usuario.entity';
import { AuthRepository } from './../auth.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Usuario)
        private readonly authRepository: AuthRepository,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_SECRET)
        });
    }

    async validate(payload: PayloadInterface) {
        const {correoUsuario, passwordUsuario} = payload;
        const usuario = await this.authRepository.findOne({where: [{correoUsuario: correoUsuario}, {passwordUsuario: passwordUsuario}]});
        if(!usuario) return new UnauthorizedException(new MessageDto('credenciales erróneas'));
        return payload;
    }
}