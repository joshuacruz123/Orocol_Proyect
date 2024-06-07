import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { MineroEntity } from 'src/entities/minero.entity';
import { TurnoMineroEntity } from 'src/entities/turno.entity';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { TurnoController } from './turno.controller';
import { PerfilEntity } from 'src/entities/perfil.entity';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MineroEntity, TurnoMineroEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
    RolModule, UsuarioModule,
  ],
  providers: [MineroService, RolService, UsuarioService, JwtService, MailService],
  controllers: [MineroController, TurnoController]
})
export class MineroModule {}
