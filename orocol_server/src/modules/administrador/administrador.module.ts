import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorEntity } from 'src/entities/administrador.entity';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { PerfilEntity } from 'src/entities/perfil.entity';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
  RolModule, UsuarioModule],
  providers: [AdministradorService, RolService, UsuarioService, JwtService, MailService],
  controllers: [AdministradorController]
})
export class AdministradorModule {}
  