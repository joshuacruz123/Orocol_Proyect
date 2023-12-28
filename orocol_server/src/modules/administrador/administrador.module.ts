import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { Administrador } from './administrador.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Administrador]),
    RolModule, UsuarioModule,
  ],
  providers: [AdministradorService, UsuarioService],
  controllers: [AdministradorController],
})
export class AdministradorModule {}

