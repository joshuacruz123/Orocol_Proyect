import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { Administrador } from './administrador.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.entity';
import { Rol } from '../rol/rol.entity';
import { RolService } from '../rol/rol.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Administrador, Rol, Usuario]),
    RolModule, UsuarioModule,
  ],
  providers: [AdministradorService, RolService, UsuarioService],
  controllers: [AdministradorController],
})
export class AdministradorModule {}
