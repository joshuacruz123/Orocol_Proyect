import { Module } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovedadEntity } from 'src/entities/novedad.entity';
import { MineroModule } from '../minero/minero.module';
import { MineroService } from '../minero/minero.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroEntity } from 'src/entities/minero.entity';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { TurnoMineroEntity } from 'src/entities/turno.entity';
import { AdministradorModule } from '../administrador/administrador.module';
import { AdministradorEntity } from 'src/entities/administrador.entity';
import { AdministradorService } from '../administrador/administrador.service';
import { PerfilEntity } from 'src/entities/perfil.entity';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([NovedadEntity, MineroEntity, TurnoMineroEntity, AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
  MineroModule, AdministradorModule, UsuarioModule,
],
  providers: [NovedadService, MineroService, AdministradorService, UsuarioService, JwtService, MailService],
  controllers: [NovedadController]
})
export class NovedadModule {}
