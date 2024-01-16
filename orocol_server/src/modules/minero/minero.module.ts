import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { MineroEntity } from './minero.entity';
import { TurnoMineroEntity } from './turno.entity';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { AuthModule } from 'src/auth/auth.module';
import { RolService } from '../rol/rol.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([MineroEntity, TurnoMineroEntity, RolEntity, UsuarioEntity]),
    RolModule, AuthModule,
  ],
  providers: [MineroService, RolService, AuthService, JwtService],
  controllers: [MineroController]
})
export class MineroModule {}
 