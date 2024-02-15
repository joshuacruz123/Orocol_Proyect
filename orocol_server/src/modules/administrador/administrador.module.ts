import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorEntity } from './administrador.entity';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { PerfilEntity } from '../usuario/perfil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity]),
  RolModule, UsuarioModule],
  providers: [AdministradorService, RolService, UsuarioService, JwtService],
  controllers: [AdministradorController]
})
export class AdministradorModule {}
  