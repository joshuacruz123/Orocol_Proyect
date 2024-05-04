import { UsuarioEntity } from './usuario.entity';
import { RolEntity } from './../rol/rol.entity';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PerfilEntity } from './perfil.entity';
import { PasswordController } from './password.controller';
import { SolicitudEntity } from './solicitud.entity';
import { SolicitudesController } from './solicitudes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, RolEntity, PerfilEntity, SolicitudEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: '2h' // 2h 5m
        }        
      }),
      inject: [ConfigService],
    }),
    ],
    providers: [UsuarioService, ConfigService, JwtStrategy],
    controllers: [UsuarioController, PasswordController, SolicitudesController],
    exports: [PassportModule, JwtStrategy]
})
export class UsuarioModule { }
