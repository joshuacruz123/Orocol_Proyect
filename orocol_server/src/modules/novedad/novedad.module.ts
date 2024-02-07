import { Module } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovedadEntity } from './novedad.entity';
import { MineroModule } from '../minero/minero.module';
import { MineroService } from '../minero/minero.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroEntity } from '../minero/minero.entity';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { TurnoMineroEntity } from '../minero/turno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NovedadEntity, MineroEntity, TurnoMineroEntity, RolEntity, UsuarioEntity]),
  MineroModule, UsuarioModule,
],
  providers: [NovedadService, MineroService, UsuarioService, JwtService],
  controllers: [NovedadController]
})
export class NovedadModule {}
