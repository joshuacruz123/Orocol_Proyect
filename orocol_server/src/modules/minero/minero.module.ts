import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { MineroEntity } from './minero.entity';
import { TurnoMineroEntity } from './turno.entity';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { TurnoController } from './turno.controller';
import { PerfilEntity } from '../usuario/perfil.entity';
import { SolicitudEntity } from '../usuario/solicitud.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MineroEntity, TurnoMineroEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
    RolModule, UsuarioModule,
  ],
  providers: [MineroService, RolService, UsuarioService, JwtService],
  controllers: [MineroController, TurnoController]
})
export class MineroModule {}
