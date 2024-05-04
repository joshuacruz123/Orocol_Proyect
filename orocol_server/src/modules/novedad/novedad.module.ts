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
import { AdministradorModule } from '../administrador/administrador.module';
import { AdministradorEntity } from '../administrador/administrador.entity';
import { AdministradorService } from '../administrador/administrador.service';
import { PerfilEntity } from '../usuario/perfil.entity';
import { SolicitudEntity } from '../usuario/solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NovedadEntity, MineroEntity, TurnoMineroEntity, AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
  MineroModule, AdministradorModule, UsuarioModule,
],
  providers: [NovedadService, MineroService, AdministradorService, UsuarioService, JwtService],
  controllers: [NovedadController]
})
export class NovedadModule {}
