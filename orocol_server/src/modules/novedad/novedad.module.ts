import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { MineroModule } from '../minero/minero.module';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/usuario.service';
import { RolService } from '../rol/rol.service';
import { MineroService } from '../minero/minero.service';
import { Novedad } from './novedad.entity';
import { Minero } from '../minero/minero.entity';
import { TurnoMinero } from '../minero/turno.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Novedad, Minero, TurnoMinero, Rol, Usuario]),
    MineroModule, RolModule, UsuarioModule,
  ],
  providers: [NovedadService, MineroService, RolService, UsuarioService],
  controllers: [NovedadController]
})
export class NovedadModule {}
  