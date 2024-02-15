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

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, RolEntity, PerfilEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: '2h' 
        }        
      }),
      inject: [ConfigService],
    }),
    ],
    providers: [UsuarioService, ConfigService, JwtStrategy],
    controllers: [UsuarioController],
    exports: [PassportModule, JwtStrategy]
})
export class UsuarioModule { }
